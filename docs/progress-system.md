# Progress system (M3)

How enrollment, lesson completion, quiz attempts, and free/premium access control work — the layer that joins the database (learner state) with the Content Engine (course content).

## Architecture

Same two-layer split as authentication:

- **`src/lib/progress/service.ts`** — framework-agnostic DB queries (enroll, mark lesson started/complete, record quiz attempts, save/unsave a course). No content-loader imports, no Next.js imports. Tested directly against PGlite in `src/lib/progress/__tests__/service.test.ts`.
- **`src/lib/progress/actions.ts`** — `"use server"` wrappers that add `requireAuth()`, re-check free/premium access before every mutation, and call `revalidatePath` on the pages that show progress.
- **`src/lib/progress/summary.ts`** — server-only (uses the content loader), joins DB progress rows with Content Engine data (course titles, lesson counts, durations) to produce the shapes the dashboard/progress/profile pages actually render. Kept separate from `service.ts` specifically so `service.ts` stays loader-free and unit-testable against PGlite.

## What's tracked, and what isn't

Tracked in the database: enrollment, per-lesson started/completed timestamps, quiz attempts (score, pass/fail, raw answers), saved courses, notification preferences.

**Not tracked in M3**, on purpose: streaks and achievements. The founder's M3 spec listed exactly seven tables to build (Enrollment, Course progress, Lesson completion, Quiz attempts, Assessment attempts, Saved courses, User preferences) — no streak or achievement table is among them. The dashboard and achievements pages still render `STREAK`/`ACHIEVEMENTS` sample data (`src/lib/sample-data/content.ts`) for these two specific widgets; every other number on those pages (hours learned, courses completed, enrolled courses, recent activity) is real. This is a deliberate scope boundary, not an oversight — building a streak/achievement system is naturally a later milestone's work.

## Completion percentage

Computed, not stored: `completionPercent(completedCount, totalLessons)` in `service.ts` is `round(completed / total * 100)`. "Total lessons" for a course always comes from the Content Engine (`allLessonsFlat()`), never from a cached count in the database — so a course gaining or losing a lesson in content/ is immediately reflected without a migration or backfill.

## Free / premium access control

The Content Engine ships two pre-existing flags that predate real accounts and weren't touched during M3 (per the founder's explicit instruction not to modify the 108 authored courses):

- `course.premium: boolean` — course-level.
- `lesson.free: boolean` — exactly one lesson per course, used for SEO indexing of a free preview.

Neither flag alone expresses the founder's M3 requirement ("Free = first module of every course + basic progress tracking"). Reconciling that gap without touching content required a judgment call, made explicitly and documented here: **`src/lib/access/course-access.ts`** is the single place that combines the two into one access decision (`canAccessLesson`):

| Viewer                       | Non-premium course            | Premium course                                    |
| ---------------------------- | ----------------------------- | ------------------------------------------------- |
| Anonymous (no session)       | Only the `lesson.free` lesson | Only the `lesson.free` lesson                     |
| Signed in, `plan: "free"`    | Every lesson                  | Only lessons in the first module (lowest `order`) |
| Signed in, `plan: "premium"` | Every lesson                  | Every lesson                                      |

This same function is called in three places, so the check can never be bypassed by going straight to a lesson URL: the course detail page (to decide which lessons render as links vs. locked cards), the lesson page (redirects to `/login` or back to the course detail page if the viewer isn't entitled), and every progress-mutating Server Action (`markLessonStartedAction`, `markLessonCompleteAction`, `submitQuizAction` all re-check access server-side before writing anything — the UI-level lock is a convenience, not the actual boundary).

## Quiz grading

Grading happens server-side, in `submitQuizAction`, against the same `quiz.json` the Content Engine loader reads — never trusting a client-submitted score. The client (`QuizFlow.tsx`) still does its own per-question "check answer" reveal for UX, but the score that gets persisted and that decides pass/fail is recomputed from scratch server-side from the submitted answer map. `submitQuizAction` is rate-limited (20 submissions per user per lesson per 10 minutes) since a gradable quiz is an oracle a signed-in user could otherwise brute-force by resubmitting rapidly.

An anonymous or free-tier-but-not-entitled viewer can still take a quiz on a free-preview lesson for practice; the result is scored client-side for display but never persisted, since there's no entitled account to attach it to.

## Content ↔ database boundary (restated)

Every table in this system references course/lesson content by plain-text slug, never by foreign key — see `docs/database.md`. This module is the boundary's main consumer: it's the one place progress data (database) and course structure (Content Engine) meet, and it's written to degrade gracefully (skip, don't crash) if a `courseSlug` in the database no longer resolves to a course on disk.
