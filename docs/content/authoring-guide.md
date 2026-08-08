# Content Authoring Guide

Audience: anyone writing Curitiq content — human writers today; the same
guide constrains AI-generated content once that pipeline is turned on
(see `ai-generation-strategy.md`).

## Before you write anything

1. Pick a course slug (kebab-case, e.g. `data-analysis-fundamentals`).
   Slugs are permanent — routes, related-course references, and
   progress records will all key off it eventually.
2. Confirm every tag/skill/careerPath/category you plan to use already
   exists in `content/taxonomy/*.yaml`. If it doesn't, add it there
   first — `pnpm content:validate` will fail on an unknown reference.
3. Skim 1–2 existing courses under `content/courses/` for tone and
   structure before writing a new one. Consistency matters more than
   any individual course being clever.

## Writing a course

Create `content/courses/<slug>/course.yaml`. Required fields are
enforced by `courseSchema` (`src/lib/content/schema/course.ts`) — the
validator will tell you exactly what's missing or malformed. Notably:

- `status` starts as `draft`. It only becomes visible to the public
  loader once `published` (see `publishing-workflow.md`).
- Every course needs **at least one lesson with `free: true`** —
  enforced by the validator, not just a style guideline. This is the
  free-preview lesson SEO indexes (P0 §18).
- `instructor`, `seo`, and `aiTutorContext` are not optional — a course
  without SEO metadata or tutor grounding context isn't done.

Write `index.mdx` as the course's narrative overview — this is prose,
not a restatement of `course.yaml`'s fields.

## Writing a module

`content/courses/<slug>/modules/<module-slug>/module.yaml`. A module is
just a title, description, objectives, and an ordered list of lesson
slugs — the lessons themselves live one level deeper.

## Writing a lesson

Pick the right `type` first (see `schema/lesson.ts` for the full list of
11). The type determines both the frontmatter shape and which file the
lesson lives in:

- **Has prose** (reading, video, interactive, code, assignment,
  case-study, practice-lab, challenge, interview-preparation): write
  `lesson.mdx`. Frontmatter is YAML between `---` fences; the body below
  it is the lesson content.
- **No prose** (quiz, flashcards): write `lesson.yaml` instead — same
  frontmatter fields, no body needed. Point `quizFile`/`deckFile` at the
  sibling JSON file.

Every lesson needs `aiTutorContext` — a `summary`, `keyConcepts`, and
ideally `commonMisconceptions`. This is what grounds the in-lesson AI
tutor; a lesson without it means the tutor answers from general
knowledge instead of this specific lesson, which is the exact failure
mode Curitiq's tutor design exists to avoid.

### Embedding interactive components in MDX

Only components registered in `src/lib/content/mdx.tsx`'s
`mdxComponents` map are usable in lesson prose. Today that's
`<Flashcard front="..." back="..." />` and `<CodeBlock code="..."
language="..." />`. Adding a new one is a one-line change to that map —
every existing and future MDX file gets it automatically, no per-file
migration.

## Writing a quiz

`quiz.json` next to the lesson it belongs to — an array validated
against `quizQuestionSchema`'s discriminated union (9 types, see
`schema/quiz.ts`). Every question needs an `explanation` (shown after
answering, right or wrong) — a quiz question without one is incomplete.

Two of the nine types (`single-choice`, `true-false`) currently render
in the quiz player; the rest validate and load correctly and are
schema-ready but don't have a UI renderer yet (extending `QuizFlow.tsx`
is additive — see `src/app/(learning)/courses/[slug]/[lesson]/quiz/QuizFlow.tsx`
for the extensibility note). Write quiz content in whichever type
actually fits the question — don't force a matching/ordering question
into single-choice just because that's what renders today.

## Style notes

- Second person, plain language, no filler ("in this lesson, we will
  learn about..."). Say the thing.
- Every lesson should be completable in the `durationMinutes` you
  declare — don't pad the estimate.
- Code examples should be runnable/realistic, not pseudocode, unless
  the lesson is explicitly conceptual.

## Before submitting

Run `pnpm content:validate`. Fix every error (warnings are advisory).
This is the same check CI runs — nothing merges with content-validation
errors.
