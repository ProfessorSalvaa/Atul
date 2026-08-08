"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db/client";
import { requireAuth } from "@/lib/navigation/route-guard";
import { checkRateLimit } from "@/lib/auth/rate-limit";
import { getLessonBySlug, loadQuiz } from "@/lib/content/loader";
import { canAccessLesson, viewerPlan } from "@/lib/access/course-access";
import * as service from "./service";

export type ActionState = { ok: true } | { ok: false; error: string };

/** Enrolls the current user in a course. Redirects to /login if signed
 *  out (via requireAuth) — enrollment is always an authenticated action,
 *  there's no anonymous-cart concept here. */
export async function enrollAction(courseSlug: string): Promise<ActionState> {
  const user = await requireAuth(`/courses/${courseSlug}`);
  const db = getDb();
  await service.enrollInCourse(db, user.id, courseSlug);
  revalidatePath(`/courses/${courseSlug}`);
  revalidatePath("/dashboard");
  revalidatePath("/progress");
  return { ok: true };
}

/** Marks a lesson "started" — called once when the lesson player mounts.
 *  Silently returns ok:false rather than redirecting if the viewer isn't
 *  enrolled/entitled, since this fires as a background effect, not a
 *  user-initiated submission. */
export async function markLessonStartedAction(
  courseSlug: string,
  lessonSlug: string,
): Promise<ActionState> {
  const user = await requireAuth(`/courses/${courseSlug}/${lessonSlug}`);
  const found = getLessonBySlug(courseSlug, lessonSlug);
  if (!found) return { ok: false, error: "Lesson not found." };
  if (!canAccessLesson(viewerPlan(user), found.course, found.module, found.lesson)) {
    return { ok: false, error: "This lesson isn't included in your plan yet." };
  }
  const db = getDb();
  await service.enrollInCourse(db, user.id, courseSlug);
  await service.touchEnrollment(db, user.id, courseSlug);
  await service.markLessonStarted(db, user.id, courseSlug, lessonSlug);
  return { ok: true };
}

export async function markLessonCompleteAction(
  courseSlug: string,
  lessonSlug: string,
): Promise<ActionState> {
  const user = await requireAuth(`/courses/${courseSlug}/${lessonSlug}`);
  const found = getLessonBySlug(courseSlug, lessonSlug);
  if (!found) return { ok: false, error: "Lesson not found." };
  if (!canAccessLesson(viewerPlan(user), found.course, found.module, found.lesson)) {
    return { ok: false, error: "This lesson isn't included in your plan yet." };
  }
  const db = getDb();
  await service.markLessonComplete(db, user.id, courseSlug, lessonSlug);
  revalidatePath(`/courses/${courseSlug}`);
  revalidatePath("/dashboard");
  revalidatePath("/progress");
  return { ok: true };
}

export type QuizSubmitResult =
  { ok: true; scorePercent: number; passed: boolean } | { ok: false; error: string };

/** Grades a quiz submission server-side against the authored quiz.json
 *  (never trusts a client-computed score), records the attempt, and
 *  marks the lesson complete on a pass. `answers` maps question id →
 *  selected option id (or "true"/"false" for true-false questions),
 *  matching the normalization QuizFlow already does client-side. */
export async function submitQuizAction(
  courseSlug: string,
  lessonSlug: string,
  answers: Record<string, string>,
): Promise<QuizSubmitResult> {
  const user = await requireAuth(`/courses/${courseSlug}/${lessonSlug}/quiz`);

  // Quiz answers are gradable server-side, which makes this endpoint an
  // oracle an authenticated user could brute-force by resubmitting
  // rapidly. A generous per-user, per-lesson limit stops scripted
  // brute-forcing without getting in the way of a real retry.
  const rl = checkRateLimit(`quiz-submit:${user.id}:${courseSlug}:${lessonSlug}`, 20, 10 * 60_000);
  if (!rl.allowed) {
    return { ok: false, error: "Too many attempts. Try again in a few minutes." };
  }

  const found = getLessonBySlug(courseSlug, lessonSlug);
  if (!found) return { ok: false, error: "Lesson not found." };
  if (!canAccessLesson(viewerPlan(user), found.course, found.module, found.lesson)) {
    return { ok: false, error: "This lesson isn't included in your plan yet." };
  }

  const questions = loadQuiz(courseSlug, lessonSlug) ?? [];
  const gradable = questions.filter((q) => q.type === "single-choice" || q.type === "true-false");
  if (gradable.length === 0) return { ok: false, error: "This quiz has no gradable questions." };

  let correct = 0;
  for (const q of gradable) {
    const given = answers[q.id];
    const expected = q.type === "single-choice" ? q.correctOptionId : String(q.correctAnswer);
    if (given === expected) correct += 1;
  }
  const scorePercent = Math.round((correct / gradable.length) * 100);
  const passingScore = found.lesson.type === "quiz" ? found.lesson.passingScorePercent : 70;
  const passed = scorePercent >= passingScore;

  const db = getDb();
  await service.enrollInCourse(db, user.id, courseSlug);
  await service.recordQuizAttempt(db, {
    userId: user.id,
    courseSlug,
    lessonSlug,
    scorePercent,
    passed,
    answers,
  });
  if (passed) {
    await service.markLessonComplete(db, user.id, courseSlug, lessonSlug);
  }
  revalidatePath(`/courses/${courseSlug}`);
  revalidatePath("/dashboard");
  revalidatePath("/progress");
  return { ok: true, scorePercent, passed };
}

export async function saveCourseAction(courseSlug: string): Promise<ActionState> {
  const user = await requireAuth(`/courses/${courseSlug}`);
  const db = getDb();
  await service.saveCourse(db, user.id, courseSlug);
  revalidatePath(`/courses/${courseSlug}`);
  return { ok: true };
}

export async function unsaveCourseAction(courseSlug: string): Promise<ActionState> {
  const user = await requireAuth(`/courses/${courseSlug}`);
  const db = getDb();
  await service.unsaveCourse(db, user.id, courseSlug);
  revalidatePath(`/courses/${courseSlug}`);
  return { ok: true };
}
