# Versioning Strategy

## Two layers of versioning, deliberately

1. **Git history** — every content file lives in the repo, so every
   change has a commit, author, and diff for free. This is sufficient
   for "what changed and when" at the file level.
2. **In-content `versionHistory`** (`versionHistoryEntrySchema`,
   `src/lib/content/schema/common.ts`) — an explicit, semver-tagged
   changelog embedded in `course.yaml` itself.

Git history alone isn't enough for two reasons specific to a content
platform: it's not queryable from the app (a course detail page can't
easily ask "what changed in this course, in plain language, since I
last took it"), and a git commit doesn't distinguish a typo fix from a
full module restructure — both look identical in `git log`. The
in-content log solves both: it's structured data the app can read, and
`changeType` (`created | content-update | correction | restructure |
seo-update`) makes the nature of a change explicit rather than inferred
from a diff.

## Format

```yaml
versionHistory:
  - version: "1.0.0"
    date: "2026-08-08"
    author: "Curitiq Content Team"
    summary: "Migrated from M2.5 sample-data fixtures into the M2.75 content engine."
    changeType: created
```

Semver, applied to content rather than code:

- **Major** (`2.0.0`) — restructure: modules reordered/merged/split,
  prerequisites changed, objectives materially changed. Something a
  returning learner would notice as "this course is different now."
- **Minor** (`1.1.0`) — content-update: a lesson rewritten, a module
  added, meaningfully more depth added somewhere.
- **Patch** (`1.0.1`) — correction: typo fixes, broken link fixes, small
  factual corrections that don't change what the course teaches.

`seo-update` is its own `changeType` (typically a patch bump) for
metadata-only changes — keeps the log honest that the actual teaching
content didn't move.

## What's out of scope for M2.75

- Automatic version bumping (a pre-commit hook or CI check that forces
  a `versionHistory` entry on content changes) — worth doing once
  content changes happen frequently enough for the discipline to slip
  without tooling.
- Surfacing version history in the UI (a "what's changed" panel on a
  course a learner has already completed) — a real feature, not
  infrastructure, and out of scope for an engine milestone.
- Content rollback tooling — today, reverting a content file is a git
  revert; nothing beyond that exists yet.

The schema and the discipline described here are the foundation those
build on, not a replacement for building them later.
