# Publishing Workflow

## Pipeline

Every content item (course, lesson, case study, cheat sheet, ...) that
has a `status` field moves through the same six states, defined once in
`contentStatusSchema` (`src/lib/content/schema/common.ts`):

```
draft → in_review → qa → approved → published → archived
```

- **draft** — being written (human or AI-generated-and-staged). Not
  loaded by the public site.
- **in_review** — handed to an editor/reviewer for voice, accuracy, and
  pedagogical soundness (see `authoring-guide.md`).
- **qa** — passes `pnpm content:validate` with zero errors, and has been
  spot-checked in a local `next dev` run (lesson renders, quiz plays,
  links resolve).
- **approved** — a designated approver (today: the founder; later:
  whoever owns content sign-off) has signed off. Not yet live.
- **published** — live. **Only `status: published` courses currently
  render** — the loader doesn't filter on status yet (M2.75 ships with
  the migrated reference courses all set to `published`), but the field
  exists specifically so that filter is a one-line change in
  `loader.ts` (`getAllCourses`/`getAllCourseSlugs`) whenever draft
  content starts coexisting with live content in the same `content/`
  tree — which it will, the moment AI generation is turned on.
- **archived** — was published, no longer should be. Kept for history/
  version continuity rather than deleted.

## Who does what (today vs. eventually)

M2.75 doesn't build the multi-role authoring system the founder
described (human writers, AI writers, editors, reviewers) — it builds
the pipeline states and validation gate that system will run on top of.
Today, one person (the founder) plays every role. The pipeline is
designed so that doesn't need to change structurally later — only the
tooling around "who can move an item from `in_review` to `approved`"
needs to be added (a CMS/admin UI, most naturally — out of scope here).

## The gate: `pnpm content:validate`

This is the one mechanical checkpoint every piece of content passes
through regardless of who authored it. It's wired into CI
(`.github/workflows/ci.yml`, "Validate content" step) as a required
check — a content-only PR that fails validation fails CI exactly like a
code PR with a failing test.

What it checks (see `src/lib/content/validate.ts` for the exact rules):

- Every file parses against its Zod schema.
- Taxonomy references (tags/skills/careerPaths/category) resolve
  against `content/taxonomy/*.yaml`.
- Module/lesson manifests in `course.yaml`/`module.yaml` match folders
  that actually exist on disk.
- `relatedCourseSlugs` and `prerequisites[].courseSlug` resolve to real
  courses.
- Every course has at least one `free: true` lesson.
- Quiz/flashcard lessons have their corresponding `quiz.json`/
  `flashcards.json` file.

## Versioning ties in here

Every status transition that changes published content should add a
`versionHistoryEntry` (see `versioning-strategy.md`) — the pipeline and
the version log are two views of the same event, not separate systems.
