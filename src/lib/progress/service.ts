/**
 * Progress service — framework-agnostic DB logic for enrollment, lesson
 * completion, quiz/assessment attempts, and saved courses. Mirrors the
 * split used in src/lib/auth/service.ts: this file takes a `Database`
 * instance as its first argument and has no Next.js imports, so it's
 * directly testable against PGlite. src/lib/progress/actions.ts is the
 * thin "use server" wrapper that adds auth, redirects, and cache
 * invalidation.
 *
 * Content-Engine boundary: every function here takes/returns plain-text
 * `courseSlug`/`lessonSlug` — never a foreign key into course content,
 * since that content lives in content/, not this database.
 */
import { and, desc, eq, inArray } from "drizzle-orm";
import type { Database } from "@/lib/db/client";
import {
  enrollments,
  lessonProgress,
  quizAttempts,
  assessmentAttempts,
  savedCourses,
} from "@/lib/db/schema";

export async function getEnrollment(db: Database, userId: string, courseSlug: string) {
  const [row] = await db
    .select()
    .from(enrollments)
    .where(and(eq(enrollments.userId, userId), eq(enrollments.courseSlug, courseSlug)))
    .limit(1);
  return row;
}

export async function enrollInCourse(db: Database, userId: string, courseSlug: string) {
  const existing = await getEnrollment(db, userId, courseSlug);
  if (existing) return existing;
  const [row] = await db
    .insert(enrollments)
    .values({ userId, courseSlug })
    .onConflictDoNothing({ target: [enrollments.userId, enrollments.courseSlug] })
    .returning();
  return row ?? (await getEnrollment(db, userId, courseSlug));
}

export async function touchEnrollment(db: Database, userId: string, courseSlug: string) {
  await db
    .update(enrollments)
    .set({ lastAccessedAt: new Date() })
    .where(and(eq(enrollments.userId, userId), eq(enrollments.courseSlug, courseSlug)));
}

export async function listEnrollments(db: Database, userId: string) {
  return db
    .select()
    .from(enrollments)
    .where(eq(enrollments.userId, userId))
    .orderBy(desc(enrollments.lastAccessedAt));
}

export async function getLessonProgressRow(
  db: Database,
  userId: string,
  courseSlug: string,
  lessonSlug: string,
) {
  const [row] = await db
    .select()
    .from(lessonProgress)
    .where(
      and(
        eq(lessonProgress.userId, userId),
        eq(lessonProgress.courseSlug, courseSlug),
        eq(lessonProgress.lessonSlug, lessonSlug),
      ),
    )
    .limit(1);
  return row;
}

/** Upserts a "started" row (no-op if already started or completed). */
export async function markLessonStarted(
  db: Database,
  userId: string,
  courseSlug: string,
  lessonSlug: string,
) {
  const existing = await getLessonProgressRow(db, userId, courseSlug, lessonSlug);
  if (existing) return existing;
  const [row] = await db
    .insert(lessonProgress)
    .values({ userId, courseSlug, lessonSlug })
    .onConflictDoNothing({
      target: [lessonProgress.userId, lessonProgress.courseSlug, lessonProgress.lessonSlug],
    })
    .returning();
  return row ?? (await getLessonProgressRow(db, userId, courseSlug, lessonSlug));
}

export async function markLessonComplete(
  db: Database,
  userId: string,
  courseSlug: string,
  lessonSlug: string,
) {
  await markLessonStarted(db, userId, courseSlug, lessonSlug);
  const [row] = await db
    .update(lessonProgress)
    .set({ completedAt: new Date() })
    .where(
      and(
        eq(lessonProgress.userId, userId),
        eq(lessonProgress.courseSlug, courseSlug),
        eq(lessonProgress.lessonSlug, lessonSlug),
      ),
    )
    .returning();
  return row;
}

/** All lesson-progress rows for a course, keyed by lessonSlug — the
 *  shape callers actually want (O(1) lookup per lesson when rendering a
 *  course outline or computing completion %). */
export async function getCourseLessonProgress(db: Database, userId: string, courseSlug: string) {
  const rows = await db
    .select()
    .from(lessonProgress)
    .where(and(eq(lessonProgress.userId, userId), eq(lessonProgress.courseSlug, courseSlug)));
  const byLesson = new Map<string, (typeof rows)[number]>();
  for (const row of rows) byLesson.set(row.lessonSlug, row);
  return byLesson;
}

/** Lesson-progress rows across multiple courses at once — used by the
 *  dashboard/progress pages so they don't do N+1 queries per enrolled
 *  course. */
export async function getLessonProgressForCourses(
  db: Database,
  userId: string,
  courseSlugs: string[],
) {
  if (courseSlugs.length === 0) return [];
  return db
    .select()
    .from(lessonProgress)
    .where(and(eq(lessonProgress.userId, userId), inArray(lessonProgress.courseSlug, courseSlugs)));
}

export async function getRecentlyCompletedLessons(db: Database, userId: string, limit = 10) {
  return db
    .select()
    .from(lessonProgress)
    .where(eq(lessonProgress.userId, userId))
    .orderBy(desc(lessonProgress.completedAt))
    .limit(limit);
}

export async function recordQuizAttempt(
  db: Database,
  input: {
    userId: string;
    courseSlug: string;
    lessonSlug: string;
    scorePercent: number;
    passed: boolean;
    answers: Record<string, string>;
  },
) {
  const [row] = await db.insert(quizAttempts).values(input).returning();
  return row;
}

export async function getQuizAttempts(
  db: Database,
  userId: string,
  courseSlug: string,
  lessonSlug: string,
) {
  return db
    .select()
    .from(quizAttempts)
    .where(
      and(
        eq(quizAttempts.userId, userId),
        eq(quizAttempts.courseSlug, courseSlug),
        eq(quizAttempts.lessonSlug, lessonSlug),
      ),
    )
    .orderBy(desc(quizAttempts.attemptedAt));
}

export async function recordAssessmentAttempt(
  db: Database,
  input: {
    userId: string;
    courseSlug: string;
    assessmentSlug: string;
    scorePercent: number;
    passed: boolean;
    answers: Record<string, string>;
  },
) {
  const [row] = await db.insert(assessmentAttempts).values(input).returning();
  return row;
}

export async function isCourseSaved(db: Database, userId: string, courseSlug: string) {
  const [row] = await db
    .select()
    .from(savedCourses)
    .where(and(eq(savedCourses.userId, userId), eq(savedCourses.courseSlug, courseSlug)))
    .limit(1);
  return Boolean(row);
}

export async function saveCourse(db: Database, userId: string, courseSlug: string) {
  await db
    .insert(savedCourses)
    .values({ userId, courseSlug })
    .onConflictDoNothing({ target: [savedCourses.userId, savedCourses.courseSlug] });
}

export async function unsaveCourse(db: Database, userId: string, courseSlug: string) {
  await db
    .delete(savedCourses)
    .where(and(eq(savedCourses.userId, userId), eq(savedCourses.courseSlug, courseSlug)));
}

export async function listSavedCourseSlugs(db: Database, userId: string) {
  const rows = await db
    .select({ courseSlug: savedCourses.courseSlug })
    .from(savedCourses)
    .where(eq(savedCourses.userId, userId))
    .orderBy(desc(savedCourses.savedAt));
  return rows.map((r) => r.courseSlug);
}

/** Completion percent for one course given its total lesson count (the
 *  Content Engine, not this DB, knows how many lessons a course has —
 *  callers pass it in rather than this module reaching into content/). */
export function completionPercent(completedCount: number, totalLessons: number): number {
  if (totalLessons <= 0) return 0;
  return Math.round((completedCount / totalLessons) * 100);
}
