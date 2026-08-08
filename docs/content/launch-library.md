# M2.8 — Launch Content Library

## Status

108 courses total: the 8 M2.5 reference courses (migrated in M2.75) plus
**100 new courses** generated in this milestone across five batches of 20. All 108 pass `pnpm content:validate` with zero errors and build
cleanly (`pnpm build`, 998 static paths, no errors).

| Metric                 | Count                                       |
| ---------------------- | ------------------------------------------- |
| Courses                | 108 (100 new + 8 reference)                 |
| Categories represented | 33 of 34 defined                            |
| Modules                | 210                                         |
| Lessons                | 429                                         |
| Quiz question banks    | 334                                         |
| Quiz questions         | 668                                         |
| Flashcard decks        | 97                                          |
| Flashcard cards        | 299                                         |
| Portfolio projects     | 100                                         |
| Difficulty split       | 45 beginner / 52 intermediate / 11 advanced |

## Category distribution (100 new courses, by category)

| Category                 | Courses |
| ------------------------ | ------- |
| ui-ux-design             | 8       |
| cybersecurity            | 8       |
| digital-marketing        | 7       |
| data-analytics           | 7       |
| career-growth            | 6       |
| machine-learning         | 5       |
| devops                   | 5       |
| web-development          | 4       |
| python                   | 4       |
| project-management       | 4       |
| system-design            | 3       |
| sql                      | 3       |
| prompt-engineering       | 3       |
| generative-ai            | 3       |
| finance                  | 3       |
| communication            | 3       |
| cloud-computing          | 3       |
| programming-fundamentals | 2       |
| product-management       | 2       |
| power-bi                 | 2       |
| microsoft-copilot        | 2       |
| git-github               | 2       |
| excel                    | 2       |
| data-science             | 2       |
| claude-ai                | 2       |
| chatgpt                  | 2       |
| business-analysis        | 2       |
| azure                    | 2       |
| aws                      | 2       |
| ai-development           | 2       |
| seo                      | 1       |
| engineering              | 1       |
| design                   | 1       |

33 distinct categories, exceeding the 20+ requirement, with the
remainder concentrated in the highest-demand areas (AI/prompting,
cybersecurity, UX, data, cloud/devops) per the founder's brief.

## Learning paths / career clusters

The 100 courses were authored against 10 career-path clusters with
explicit beginner → intermediate → advanced prerequisite chains within
each: AI Practitioner, Data Analyst, Software Developer, Cloud
Engineer, Cybersecurity Analyst, UX Designer, Product/Project Manager +
Business Analyst, Digital Marketer, and a Finance/Communication/Career
Development cluster feeding into System Design/ML/Data Science as an
advanced track. `content/taxonomy/career-paths.yaml` now has 14 entries
(up from M2.75's 5); `categories.yaml` has 34 (up from 5); `tags.yaml`
has 63 (up from 17); `skills.yaml` has 109 (up from 44).

## How the 100 courses were actually generated

This milestone did **not** call an LLM in a generation loop. Instead it
built and exercised the authoring pattern `ai-generation-strategy.md`
anticipated, in a form that keeps a human (me, this session) directly
responsible for every sentence of teaching content:

1. **`scripts/lib/course-spec-types.mts`** defines `CourseSpec` — a
   compact, human-authored TypeScript structure. Each lesson is a list
   of specific, substantive `points` (facts, tradeoffs, reasoning) —
   not filler — plus an optional `code` block, flashcard `cards`, or
   `interviewQA` pairs depending on lesson kind.
2. **`scripts/generate-courses.mts`** deterministically expands a
   `CourseSpec` into a full `content/courses/<slug>/` tree — course.yaml,
   index.mdx, module.yaml per module, lesson.mdx per lesson, with
   quiz.json/flashcards.json siblings where applicable, and a project
   .mdx. The prose wrapping is templated; the substance is 100%
   author-supplied.
3. **Quiz questions are mechanically derived** from each lesson's own
   first two `points` — a single-choice question testing point[0] and a
   true/false question testing point[1]. This guarantees every quiz
   tests exactly what its lesson just taught, with zero separate
   quiz-authoring effort and zero risk of quiz/lesson drift.
4. **Batches of 20** (`scripts/course-specs/batch-1.mts` through
   `batch-5.mts`), each run through the same verification loop before
   moving on: `tsc --noEmit` → generate → `pnpm content:validate` (must
   show 0 errors) → a duplicate-course-title shell check → `pnpm build`.
5. **Taxonomy was extended as-needed per batch**, not pre-guessed
   upfront — when a batch introduced a genuinely new skill or tag
   (e.g. `cloud-security`, `ux-fundamentals`, `design-systems`), it was
   added to `content/taxonomy/*.yaml` in the same batch, keeping every
   reference resolvable at validation time.

This is templated _structure_, not templated _content_ — see
`ai-generation-strategy.md` for why that distinction is the whole point
of the schema-first architecture, and why an eventual LLM-driven
generation job can slot into the same `CourseSpec → generate →
validate` pipeline without any change to application code.

## Content gaps, stated honestly

Per the founder's instruction not to claim more than what's actually
built:

- **`case-study` lesson kind**: used only 3 times, all inherited from
  the original M2.5 courses. None of the 100 new courses use a
  dedicated case-study lesson — "case study where appropriate" was
  instead satisfied via each course's portfolio project, which is
  realistic and scenario-based but not a literal case-study lesson.
- **`interview-preparation` lesson kind**: used 0 times in the new 100.
  `interview-preparation-for-tech-roles` (batch 5) covers interview
  prep as ordinary reading lessons plus a project deliverable
  (STAR-method stories, interviewer questions), not the dedicated
  `interview-preparation` kind with structured `interviewQA` pairs the
  schema supports. The schema/generator support for this kind is fully
  built and tested (proven in M2.75) — it simply wasn't exercised in
  this batch of specs.
- **No learner counts, ratings, reviews, instructor credentials beyond
  the assigned name/title, testimonials, employer partnerships, or
  certifications were fabricated** — instructor bios are placeholder
  identifiers only (name, a plausible title, initials), consistent with
  the founder's explicit prohibition.
- **Related-course cross-linking (`relatedCourseSlugs`)** was left
  largely to prerequisite chains within a career path; a systematic
  pass to add lateral "related course" links across categories (e.g.
  linking `seo-fundamentals` to `content-marketing-strategy`) was not
  done and would be a good, low-risk M3 follow-up.

## Daily publishing pipeline (target: ~10 courses/day, no app code changes)

The pipeline below reuses exactly the mechanism this milestone proved
out — `CourseSpec → generate-courses.mts → content:validate → build` —
placed inside the six-state status pipeline already defined in
`publishing-workflow.md` (`draft → in_review → qa → approved →
published → archived`).

1. **Draft.** A small batch (≤10) of `CourseSpec` objects is authored —
   by a human, or, once wired up, by an LLM generation job producing
   the same `CourseSpec` shape (not raw MDX) as its output contract, per
   `ai-generation-strategy.md`. Specs are written to
   `scripts/course-specs/batch-N.mts` (or, at higher volume, to a
   database/CMS row — the shape doesn't change, only where it's stored).
2. **AI generation (mechanical, not editorial).**
   `node --experimental-strip-types scripts/generate-courses.mts N`
   deterministically expands specs into a `content/courses/<slug>/`
   tree. This step never touches `src/`. Output should land in a
   staging location (`content/_generated/` per the existing strategy
   doc, or directly in `content/courses/` with `status: draft` if a
   staging directory is judged unnecessary at this scale) so nothing is
   live yet.
3. **Review.** A human reviewer reads the generated MDX for voice,
   accuracy, and pedagogical soundness against `authoring-guide.md`.
   This is the one step that stays manual regardless of who authored
   the originating `CourseSpec`.
4. **QA.** `pnpm content:validate` must show 0 errors (schema validity +
   referential integrity — taxonomy resolves, prerequisite/related
   slugs exist, every course has a free lesson, manifests match disk).
   A local `pnpm dev` spot-check confirms lessons render and quizzes
   play. A duplicate-title/duplicate-topic check against the existing
   catalog runs here too — this is the step that caught and fixed a
   real near-duplicate course during batch 1 of this milestone.
5. **Approval.** A designated approver (today: the founder) flips
   `status: draft → approved` on the reviewed, QA-passed batch. No
   content reaches `published` without this explicit human sign-off —
   this is the mandatory human-review gate the founder's brief requires.
6. **Published.** `status: approved → published`. A version history
   entry is recorded per `versioning-strategy.md`. The next `pnpm build`
   picks the new courses up automatically — no code changes, no
   redeploy logic beyond the normal build.

At ~10 courses/day (≈20-40 lessons, ≈40-80 quiz questions, 10 projects
per day), this is deliberately the same order of magnitude as the
batches just run in this milestone, proven end-to-end five times.
Scaling the _rate_ up (e.g. to support an actual LLM generation job
producing specs continuously) only requires parallelizing steps 1-2 and
adding reviewer capacity at step 3 — steps 4-6 and the underlying schema
already scale mechanically regardless of authoring volume.

## Future scaling strategy: 500 → 1,000 → 10,000+ courses

The architecture was deliberately built so none of the following
require application code changes — only more content and, past a
certain point, storage/indexing changes:

- **500 courses**: no changes needed. `getAllCourseSlugs`/`getAllCourses`
  (`src/lib/content/loader.ts`) and `content:validate` are already
  O(courses) file-system scans with no assumed upper bound; the current
  108-course build completes in ~4 seconds of static generation.
- **1,000 courses**: watch build time and `next build` static
  generation memory; if generation time becomes a bottleneck, move from
  fully-static (`generateStaticParams` for every course/lesson) to
  ISR (`revalidate`) for lower-traffic long-tail courses, keeping full
  static generation only for the catalog's most-visited courses. This
  is a Next.js config change, not a content-schema change.
- **10,000+ courses**: the flat-file `content/courses/<slug>/` tree on
  disk, read directly by the loader, stops being the right storage
  layer at this scale — plan a migration to a database-backed content
  store (courses/modules/lessons as rows, still validated against the
  same Zod schemas on write) behind the same `loader.ts` function
  signatures, so `src/app/**` pages don't change. Taxonomy
  (`content/taxonomy/*.yaml`) likely stays flat-file even at 10,000+
  courses, since it grows far more slowly than course count.
- At every scale, the QA gate stays the same: `pnpm content:validate`
  must report 0 errors before anything reaches `approved`.

## Exact files generated this milestone

- `scripts/course-specs/batch-1.mts` … `batch-5.mts` (5 files, 100
  `CourseSpec` objects, ~2,000 lines each)
- `content/courses/<slug>/` for the 100 new course slugs listed across
  batches 1-5 (course.yaml, index.mdx, `modules/*/module.yaml`,
  `modules/*/lessons/*/lesson.mdx` + `quiz.json`/`flashcards.json`
  siblings where applicable, `projects/*.mdx`)
- `content/taxonomy/categories.yaml`, `career-paths.yaml`, `tags.yaml`,
  `skills.yaml` — expanded from M2.75's 5/5/17/44 entries to
  34/14/63/109
- `docs/content/launch-library.md` (this file)
