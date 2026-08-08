import { beforeEach, describe, expect, it } from "vitest";
import type { Database } from "@/lib/db/client";
import { createTestDb } from "@/test/db";
import * as authService from "@/lib/auth/service";
import * as service from "../service";

async function makeUser(db: Database, email: string) {
  const reg = await authService.registerUser(db, {
    name: "Test User",
    email,
    password: "a-strong-password",
  });
  if (!reg.ok) throw new Error("setup failed");
  return reg.value.user;
}

describe("progress/service", () => {
  let db: Database;

  beforeEach(async () => {
    db = await createTestDb();
  });

  describe("enrollment", () => {
    it("enrolls a user in a course, idempotently", async () => {
      const user = await makeUser(db, "learner@example.com");
      const first = await service.enrollInCourse(db, user.id, "sql-for-product-thinking");
      const second = await service.enrollInCourse(db, user.id, "sql-for-product-thinking");
      expect(first?.courseSlug).toBe("sql-for-product-thinking");
      expect(second?.id).toBe(first?.id);

      const all = await service.listEnrollments(db, user.id);
      expect(all).toHaveLength(1);
    });

    it("touchEnrollment updates lastAccessedAt", async () => {
      const user = await makeUser(db, "touch@example.com");
      const enrollment = await service.enrollInCourse(db, user.id, "course-a");
      const before = enrollment?.lastAccessedAt.getTime();
      await new Promise((r) => setTimeout(r, 5));
      await service.touchEnrollment(db, user.id, "course-a");
      const [after] = await service.listEnrollments(db, user.id);
      expect(after.lastAccessedAt.getTime()).toBeGreaterThanOrEqual(before ?? 0);
    });
  });

  describe("lesson progress", () => {
    it("marks a lesson started, then complete, without duplicate rows", async () => {
      const user = await makeUser(db, "progress@example.com");
      await service.markLessonStarted(db, user.id, "course-a", "lesson-1");
      const started = await service.getLessonProgressRow(db, user.id, "course-a", "lesson-1");
      expect(started?.completedAt).toBeNull();

      await service.markLessonComplete(db, user.id, "course-a", "lesson-1");
      const completed = await service.getLessonProgressRow(db, user.id, "course-a", "lesson-1");
      expect(completed?.completedAt).not.toBeNull();
      expect(completed?.id).toBe(started?.id);
    });

    it("computes per-course progress maps and cross-course lookups", async () => {
      const user = await makeUser(db, "multi@example.com");
      await service.markLessonComplete(db, user.id, "course-a", "lesson-1");
      await service.markLessonStarted(db, user.id, "course-a", "lesson-2");
      await service.markLessonComplete(db, user.id, "course-b", "lesson-1");

      const byLessonA = await service.getCourseLessonProgress(db, user.id, "course-a");
      expect(byLessonA.size).toBe(2);
      expect(byLessonA.get("lesson-1")?.completedAt).not.toBeNull();
      expect(byLessonA.get("lesson-2")?.completedAt).toBeNull();

      const acrossCourses = await service.getLessonProgressForCourses(db, user.id, [
        "course-a",
        "course-b",
      ]);
      expect(acrossCourses).toHaveLength(3);
    });

    it("returns recently completed lessons most-recent-first", async () => {
      const user = await makeUser(db, "recent@example.com");
      await service.markLessonComplete(db, user.id, "course-a", "lesson-1");
      await new Promise((r) => setTimeout(r, 5));
      await service.markLessonComplete(db, user.id, "course-a", "lesson-2");

      const recent = await service.getRecentlyCompletedLessons(db, user.id, 10);
      expect(recent).toHaveLength(2);
      expect(recent[0].lessonSlug).toBe("lesson-2");
    });
  });

  describe("quiz attempts", () => {
    it("records attempts and lists them most-recent-first", async () => {
      const user = await makeUser(db, "quiz@example.com");
      await service.recordQuizAttempt(db, {
        userId: user.id,
        courseSlug: "course-a",
        lessonSlug: "lesson-1",
        scorePercent: 40,
        passed: false,
        answers: { q1: "wrong" },
      });
      await new Promise((r) => setTimeout(r, 5));
      await service.recordQuizAttempt(db, {
        userId: user.id,
        courseSlug: "course-a",
        lessonSlug: "lesson-1",
        scorePercent: 100,
        passed: true,
        answers: { q1: "right" },
      });

      const attempts = await service.getQuizAttempts(db, user.id, "course-a", "lesson-1");
      expect(attempts).toHaveLength(2);
      expect(attempts[0].passed).toBe(true);
      expect(attempts[0].scorePercent).toBe(100);
    });
  });

  describe("saved courses", () => {
    it("saves, checks, and unsaves a course", async () => {
      const user = await makeUser(db, "save@example.com");
      expect(await service.isCourseSaved(db, user.id, "course-a")).toBe(false);

      await service.saveCourse(db, user.id, "course-a");
      expect(await service.isCourseSaved(db, user.id, "course-a")).toBe(true);
      expect(await service.listSavedCourseSlugs(db, user.id)).toEqual(["course-a"]);

      // Saving twice doesn't error or duplicate.
      await service.saveCourse(db, user.id, "course-a");
      expect(await service.listSavedCourseSlugs(db, user.id)).toHaveLength(1);

      await service.unsaveCourse(db, user.id, "course-a");
      expect(await service.isCourseSaved(db, user.id, "course-a")).toBe(false);
    });
  });

  describe("completionPercent", () => {
    it("computes a rounded percentage, guarding against zero total", () => {
      expect(service.completionPercent(0, 0)).toBe(0);
      expect(service.completionPercent(1, 3)).toBe(33);
      expect(service.completionPercent(2, 3)).toBe(67);
      expect(service.completionPercent(3, 3)).toBe(100);
    });
  });

  describe("cascade on account deletion", () => {
    it("removes enrollments/progress/attempts when the user is deleted", async () => {
      const user = await makeUser(db, "cascade@example.com");
      await service.enrollInCourse(db, user.id, "course-a");
      await service.markLessonComplete(db, user.id, "course-a", "lesson-1");
      await service.saveCourse(db, user.id, "course-a");

      await authService.deleteAccount(db, user.id, "a-strong-password");

      expect(await service.listEnrollments(db, user.id)).toHaveLength(0);
      expect(await service.getCourseLessonProgress(db, user.id, "course-a")).toHaveProperty(
        "size",
        0,
      );
      expect(await service.listSavedCourseSlugs(db, user.id)).toHaveLength(0);
    });
  });
});
