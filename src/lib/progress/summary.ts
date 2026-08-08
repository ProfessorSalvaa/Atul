/**
 * Server-only summaries that join DB progress state with Content Engine
 * data (course/lesson metadata). Lives separately from service.ts, which
 * stays framework-agnostic and DB-only for testability — this file pulls
 * in the content loader, so it's for Server Components/Server Actions
 * only, not for PGlite-backed unit tests.
 */
import "server-only";
import { getDb } from "@/lib/db/client";
import { allLessonsFlat, loadCourse } from "@/lib/content/loader";
import type { Course } from "@/lib/content/schema";
import * as service from "./service";

export interface EnrolledCourseSummary {
  courseSlug: string;
  course: Course;
  totalLessons: number;
  completedLessons: number;
  percent: number;
  resumeLessonSlug?: string;
  lastAccessedAt: Date;
}

/** One summary row per enrollment, ordered by most-recently-accessed
 *  first (matches listEnrollments' ordering). Enrollments pointing at a
 *  course slug that no longer exists in content/ are silently skipped —
 *  the DB doesn't hold a foreign key to content, so this is the one
 *  place that has to handle a dangling reference gracefully. */
export async function getEnrolledCourseSummaries(userId: string): Promise<EnrolledCourseSummary[]> {
  const db = getDb();
  const enrollmentRows = await service.listEnrollments(db, userId);
  const slugs = enrollmentRows.map((r) => r.courseSlug);
  const progressRows = await service.getLessonProgressForCourses(db, userId, slugs);

  const progressByCourse = new Map<string, typeof progressRows>();
  for (const row of progressRows) {
    const list = progressByCourse.get(row.courseSlug) ?? [];
    list.push(row);
    progressByCourse.set(row.courseSlug, list);
  }

  const summaries: EnrolledCourseSummary[] = [];
  for (const enr of enrollmentRows) {
    const loaded = loadCourse(enr.courseSlug);
    if (!loaded) continue;
    const flat = allLessonsFlat(loaded);
    const rows = progressByCourse.get(enr.courseSlug) ?? [];
    const completedSlugs = new Set(rows.filter((r) => r.completedAt).map((r) => r.lessonSlug));
    const firstIncomplete = flat.find((l) => !completedSlugs.has(l.slug));
    summaries.push({
      courseSlug: enr.courseSlug,
      course: loaded.course,
      totalLessons: flat.length,
      completedLessons: completedSlugs.size,
      percent: service.completionPercent(completedSlugs.size, flat.length),
      resumeLessonSlug: (firstIncomplete ?? flat[0])?.slug,
      lastAccessedAt: enr.lastAccessedAt,
    });
  }
  return summaries;
}

/** Aggregate stats for the profile/progress pages — derived entirely
 *  from enrolled-course summaries, no separate query. */
export function aggregateLearningStats(summaries: EnrolledCourseSummary[]) {
  const coursesCompleted = summaries.filter((s) => s.percent === 100).length;
  const coursesInProgress = summaries.filter((s) => s.percent > 0 && s.percent < 100).length;
  const totalMinutes = summaries.reduce(
    (sum, s) => sum + (s.percent / 100) * s.course.estimatedDurationMinutes,
    0,
  );
  return {
    coursesCompleted,
    coursesInProgress,
    hoursLearned: Math.round(totalMinutes / 60),
  };
}
