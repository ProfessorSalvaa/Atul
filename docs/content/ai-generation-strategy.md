# AI Content Generation Strategy

## The target workflow

> Generate 25 courses. Review. Approve. Publish. Repeat forever. No
> application code should change.

This document is the strategy for getting there safely. **M2.75 built
the engine; M2.8 exercised it.** M2.8 shipped 100 new courses using the
`CourseSpec → generate-courses.mts → content:validate` pipeline
described below — with a human directly authoring every `CourseSpec`'s
teaching content, not an LLM. See `launch-library.md` for what was
actually generated, in what volume, and the exact daily-publishing
pipeline that reuses this same mechanism. The one thing M2.8 still
doesn't do is call an LLM in the loop — `CourseSpec` is proven as the
generation _contract_, but nothing yet produces one automatically.

## Why the schema-first architecture is what makes this safe

An LLM generating raw prose into a hand-maintained data structure is how
content platforms get silently corrupted — a missing field, a malformed
reference, a duplicate slug that nobody notices until a page 500s in
production. Curitiq's content engine inverts that risk:

1. **The schema is the contract.** Every content type (course, lesson,
   quiz question, flashcard, ...) has a Zod schema in
   `src/lib/content/schema/`. An AI generation job's job is to produce
   files that satisfy that schema — not to be trusted freeform.
2. **Validation is mechanical, not editorial.** `pnpm content:validate`
   (`scripts/validate-content.ts`) checks structural correctness
   (required fields, correct types, discriminated-union shape) and
   referential integrity (taxonomy refs resolve, related/prerequisite
   course slugs exist, every course has a free preview lesson) without
   a human reading every generated file first.
3. **JSON for the highest-volume content.** Quiz question banks
   (50,000+) and flashcards (100,000+) are exactly the content types
   where LLMs are most reliable — strict JSON generation against a
   schema is a well-understood, high-accuracy task, far more reliable
   than getting an LLM to produce well-formed MDX with correctly nested
   embedded components at scale.

## Proposed generation pipeline (future milestone, not built yet)

1. **Prompt templates per content type**, each grounded in the relevant
   Zod schema (schemas can generate their own JSON-Schema/examples via
   `zod-to-json-schema` or similar — not wired up yet, noted here as the
   mechanism) plus a small number of hand-authored reference examples
   (the 8 migrated courses serve this purpose today).
2. **Generation writes to a `content/_generated/` staging area**, never
   directly into `content/courses/` — nothing generated is live until
   it passes review.
3. **`pnpm content:validate` runs against the staged batch first.**
   Anything that fails schema or referential-integrity validation is
   rejected before a human reviewer ever sees it — reviewers should
   spend their time on quality and voice, not catching malformed JSON.
4. **Human review pass** against the authoring guide's style notes
   (`authoring-guide.md`) — voice, accuracy, pedagogical soundness. This
   is the step that doesn't get automated.
5. **Move from staging into `content/courses/` with `status: draft`**,
   then proceed through the normal publishing pipeline
   (`publishing-workflow.md`) — review → QA → approval → published.

## Guardrails worth calling out explicitly

- **No application code changes for new content, ever.** If generating
  a batch of courses requires touching `src/`, the schema or loader is
  incomplete — that's a bug in the engine, not an expected cost of
  adding content.
- **Slugs are permanent and must be collision-checked** before
  generation writes any file — the validator catches folder/frontmatter
  slug mismatches, but a pre-generation slug-uniqueness check against
  the existing catalog should happen before files are even written.
- **AI tutor context is not optional and not filler.** A generated
  lesson without a real `aiTutorContext.summary` and `keyConcepts`
  produces a tutor that answers from general knowledge instead of the
  lesson — exactly the failure mode the scoped-tutor design exists to
  prevent. This should be a required, reviewed field in any generation
  prompt, not an afterthought.
- **Batch size stays reviewable.** "Generate 25 courses" implies review
  happens in human-sized batches, not as a 500-course dump. The
  pipeline should default to small batches even once automated.

## What's explicitly out of scope for M2.75

- Actually calling an LLM to generate content.
- A staging/review UI (CMS-like tooling) — today "review" means a human
  reading files in the `content/_generated/` directory before moving
  them.
- Automated slug-collision or duplicate-content detection beyond what
  `validate-content.ts` already checks.

These are natural M3+/M4+ follow-ups now that the engine has been
exercised with 100 real courses in M2.8 (see `launch-library.md`).
Specifically, M2.8 proved out steps 2-3 of the pipeline above exactly
as designed (`generate-courses.mts` as the mechanical expansion step,
`content:validate` as the pre-review gate) using human-authored
`CourseSpec` objects in place of LLM output — the natural next step is
wiring an actual LLM call to produce `CourseSpec` JSON against a
prompt grounded in the schema, with everything downstream of that
(validation, staging, review, publishing) unchanged.
