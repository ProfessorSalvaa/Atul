# Curitiq Content Architecture (M2.75)

## Objective

Curitiq is a content platform, not just an application. From M2.75 onward,
the application must never depend on hardcoded course data — everything
renders from structured content under `content/`. This document is the
"recommend one architecture, explain why" deliverable the founder asked
for.

## Decision: a hybrid format — MDX for prose, JSON for structured data, YAML for frontmatter and manifests

No single format (pure MDX, pure JSON, pure YAML, pure Markdown) covers
every content type Curitiq needs well. Long-form lesson prose, a
50,000-question quiz bank, and a 500-course manifest have fundamentally
different shapes, and forcing them into one format trades away either
authoring ergonomics or machine-reliability. The hybrid below assigns
each format to the job it's actually good at:

| Content                                                    | Format                             | Why                                                                                                                                                      |
| ---------------------------------------------------------- | ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Lesson bodies, course/project/case-study/cheat-sheet prose | **MDX** (`.mdx`, YAML frontmatter) | Long-form writing, git-diffable, embeds interactive components (`<Flashcard>`, `<CodeBlock>`) directly in the flow of the text                           |
| Quiz banks, flashcard decks, assessments                   | **JSON** (`.json`)                 | Purely structured arrays-of-objects; strictest fit for discriminated-union validation; most reliable format for AI to generate at scale against a schema |
| Course/module manifests, taxonomy, small metadata files    | **YAML** (`.yaml`)                 | Human-editable structural data and frontmatter blocks; more forgiving to hand-edit than JSON, doesn't carry prose                                        |

### Why not pure JSON everywhere

Quiz questions and flashcards are naturally structured — JSON is the
right call there. But prose content in JSON means either unreadable
escaped multi-line strings or a markdown-string-inside-a-JSON-field
anti-pattern that loses every editor/diff/syntax-highlighting benefit.
A 2,000-word lesson shouldn't live as one `"body": "..."` string.

### Why not pure Markdown/MDX everywhere

MDX has no native structured/typed metadata mechanism beyond frontmatter,
which itself is YAML. Quiz question discriminated unions (matching,
ordering, code-output) don't map cleanly onto prose, and forcing them
into MDX would mean inventing ad-hoc parsing conventions instead of
using a real schema.

### Why not pure YAML everywhere

YAML is fine for structured, moderate-size data (a course manifest,
a 20-entry taxonomy file) but is a poor authoring surface for long-form
prose — whitespace-sensitive block scalars, no MDX component embedding,
and weaker editor/diff tooling than Markdown for anything longer than a
page.

### Why MDX specifically (over plain Markdown) for prose

- Embeds interactive components (`<Flashcard>`, `<CodeBlock>`, future
  callouts/diagrams) directly in the authoring flow — no separate data
  channel needed to place them.
- `next-mdx-remote/rsc` compiles MDX inside React Server Components,
  which is what Curitiq's App Router pages already are — zero new
  runtime model.
- Git-diffable and mergeable, which matters for the draft → review → QA
  → approval pipeline (see `publishing-workflow.md`) — a reviewer can
  read a plain diff of what changed in a lesson.
- Frontmatter (YAML) carries all structured per-lesson metadata
  (`type`, `durationMinutes`, `free`, `aiTutorContext`, …) in the same
  file as the prose it describes — one source of truth per lesson, not
  two files that can drift out of sync.

## Folder structure

```
content/
  courses/
    <course-slug>/
      course.yaml           # course metadata + ordered module manifest
      index.mdx              # course overview/description narrative
      reviews.json            # course reviews (SampleReview[] equivalent)
      modules/
        <module-slug>/
          module.yaml          # module metadata + ordered lesson manifest
          lessons/
            <lesson-slug>/
              lesson.mdx         # prose lesson types: frontmatter + body
              lesson.yaml         # non-prose lesson types (quiz/flashcards): frontmatter only
              quiz.json             # optional: this lesson's quiz questions
              flashcards.json         # optional: this lesson's flashcard deck
      assessments/
        <assessment-slug>.json
      projects/
        <project-slug>.mdx
      resources/
        <resource-slug>.yaml
      certificate.yaml
  case-studies/
    <slug>.mdx
  interview-questions/
    <career-path>/
      <slug>.json
  cheat-sheets/
    <slug>.mdx
  seo-pages/
    <slug>.mdx
  taxonomy/
    tags.yaml
    skills.yaml
    career-paths.yaml
    categories.yaml
```

A lesson picks `lesson.mdx` (has prose: reading, video, interactive,
code, assignment, case-study, practice-lab, challenge,
interview-preparation) or `lesson.yaml` (no prose body: quiz,
flashcards) — the loader checks for `lesson.mdx` first and falls back to
`lesson.yaml`, so adding a new prose-vs-non-prose type doesn't need a
loader change, just picking the right file.

## Code-side layout

```
src/lib/content/
  schema/            Zod schemas — one file per content type, barrel-exported from index.ts
  loader.ts           Reads content/, parses MDX+frontmatter (gray-matter) and JSON/YAML,
                       validates every file against its schema, memoizes with React cache()
  validate.ts          Standalone validator (schema + referential integrity) — used by both
                        the loader's implicit checks and scripts/validate-content.ts
  mdx.tsx               MDXBody: wraps next-mdx-remote/rsc with the interactive-component map
  seo.ts                Course → Metadata / JSON-LD / breadcrumbs
  discovery.ts           Search/filter/sort helpers over the full course catalog
  lessonCardAdapter.ts     Maps the 11-value Lesson type down to M1's frozen 3-icon LessonCard
```

Every content file is validated at load time — an invalid file throws
during `next build` (SSG) rather than silently rendering `undefined`
somewhere in a page. `pnpm content:validate` runs the same validation
standalone (plain Node, no Next.js runtime) and is wired into CI as a
required check, so a bad content PR fails the same way a bad code PR
does.

## What this buys at 500+ courses / 10,000+ lessons

- Adding a course is: add a folder under `content/courses/`, run
  `pnpm content:validate`, done. Zero application code changes.
- AI-generated content lands as new files in the same tree — the
  validation pass is the gate, not a human reading every line of every
  file before it can be tested.
- Referential integrity (taxonomy refs, related/prerequisite course
  slugs, "every course needs a free preview lesson") is checked
  automatically rather than trusted to author discipline.
- Discovery (search/tag/skill/career-path/category/difficulty/duration/
  popular/newest/trending/featured/related) and SEO (metadata, JSON-LD,
  sitemap, canonical, breadcrumbs, OG/Twitter cards) are derived from
  the content graph, not hand-maintained per page.
