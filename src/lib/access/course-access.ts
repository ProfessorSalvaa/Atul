/**
 * Free/premium access-control policy (M3).
 *
 * The Content Engine ships two independent flags that predate real
 * accounts: `course.premium` (course-level) and `lesson.free` (exactly
 * one free-preview lesson per course, used for SEO indexing — see
 * src/lib/content/schema/lesson.ts). Neither flag alone captures the M3
 * business requirement ("Free = first module of every course"), and
 * changing either would mean touching one or more of the 108 authored
 * course files, which M3 explicitly forbids. This module is the single
 * place that reconciles the two into one gating decision, so course
 * pages and the lesson player never duplicate this logic.
 *
 * Policy:
 *  - Anonymous (no session): only the course's single `lesson.free`
 *    lesson is accessible — everything else is locked.
 *  - Signed in, plan "free":
 *      - `course.premium === false` → every lesson in the course.
 *      - `course.premium === true`  → only lessons in the first module
 *        (module.order === 0, i.e. modules[0] once sorted) are
 *        accessible; every other module is locked.
 *  - Signed in, plan "premium": everything is accessible.
 *
 * Documented in docs/progress-system.md as an explicit judgment call —
 * no pre-existing BUSINESS_MODEL.md was found in the repo to defer to.
 */
import type { UserRow } from "@/lib/db/schema";
import type { Course, Module } from "@/lib/content/schema";

export type ViewerPlan = "anonymous" | "free" | "premium";

export function viewerPlan(user: UserRow | undefined | null): ViewerPlan {
  if (!user) return "anonymous";
  return user.plan === "premium" ? "premium" : "free";
}

/** Whether `module` is the first module of `course` once modules are
 *  ordered — matches the same sort the loader applies. */
export function isFirstModule(course: Course, module: Module): boolean {
  const orderedSlugs = course.modules
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((m) => m.slug);
  return orderedSlugs[0] === module.slug;
}

export function canAccessLesson(
  plan: ViewerPlan,
  course: Course,
  module: Module,
  lesson: { free: boolean },
): boolean {
  if (plan === "premium") return true;
  if (plan === "anonymous") return lesson.free;
  // plan === "free"
  if (!course.premium) return true;
  return isFirstModule(course, module);
}
