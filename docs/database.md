# Database (M3)

PostgreSQL (Neon, serverless) via Drizzle ORM, using the `neon-http` driver (`@neondatabase/serverless`).

## Why this stack

- **Neon** — serverless Postgres with a generous free tier, branching per environment, and an HTTP-based driver that fits Vercel's serverless functions (no persistent TCP connection pool to manage).
- **`neon-http` over `neon-serverless`/`node-postgres`** — the HTTP driver issues each query as a single fetch request. That has one real limitation (no interactive multi-statement transactions — see below) in exchange for a client that can be constructed lazily, at request time, with zero connection setup cost and zero risk of exhausting a connection pool across many concurrent serverless invocations.
- **Drizzle ORM** — typed schema-as-code, SQL-shaped query builder (no hidden N+1 magic), and a migration toolchain (`drizzle-kit`) that generates plain SQL files checked into the repo rather than an opaque binary migration format.

## Schema boundary — read this first

**The database stores learner and application state only.** It does **not** store authored course content. Courses, modules, lessons, quizzes, and flashcards live exclusively in the flat-file Content Engine (`content/`, read by `src/lib/content/loader.ts`) — that remains the canonical, human-authored source for all 108 launch courses, and M3 does not touch it.

Every table that needs to reference a course or lesson does so with a plain `text` column (`courseSlug`, `lessonSlug`) — **never a foreign key**. A foreign key would require the referenced row to live in this database; course content doesn't, so the reference is deliberately loose. Application code resolves a `courseSlug` against the Content Engine at read time (via `src/lib/content/loader.ts`), the same way it always has. If a `courseSlug` in the database no longer matches any course on disk (e.g. a course was renamed), callers are expected to treat that as a dangling reference and skip it gracefully — see `src/lib/progress/summary.ts` for the pattern.

## Tables

| Table                       | Purpose                                                                      | Notable constraints                                |
| --------------------------- | ---------------------------------------------------------------------------- | -------------------------------------------------- |
| `users`                     | Account + profile (name, email, password hash, avatar, headline, role, plan) | Unique index on `email`                            |
| `sessions`                  | DB-backed session tokens (not JWT)                                           | PK is the SHA-256 hash of the raw cookie token     |
| `email_verification_tokens` | One-time email verification links                                            | Token stored hashed, `consumedAt` marks single-use |
| `password_reset_tokens`     | One-time password reset links                                                | Same pattern as verification tokens                |
| `enrollments`               | Which courses a user has enrolled in                                         | Unique on `(userId, courseSlug)`                   |
| `lesson_progress`           | Per-lesson started/completed timestamps                                      | Unique on `(userId, courseSlug, lessonSlug)`       |
| `quiz_attempts`             | Every quiz submission, with score and raw answers                            | —                                                  |
| `assessment_attempts`       | Course-level final assessment attempts (schema exists, unused — see below)   | —                                                  |
| `saved_courses`             | Bookmarked-for-later courses                                                 | Unique on `(userId, courseSlug)`                   |
| `user_preferences`          | Notification toggles (in-app + email)                                        | PK is `userId` (one row per user)                  |

All tables that belong to a user reference `users.id` with `ON DELETE CASCADE` — deleting a user (see `deleteAccountAction`) removes every session, token, enrollment, progress row, attempt, saved course, and preferences row in one statement, with no orphaned rows and no separate cleanup logic required.

`assessment_attempts` mirrors `quiz_attempts` and exists so attempt-tracking is ready the moment a course-level final assessment is authored — none of the 108 launch courses have one yet (`src/lib/content/schema/assessment.ts` defines the content shape but no loader function or UI currently reads it).

## Roles and plans

`users.role` is a two-value enum: `user` | `admin`. No additional roles were introduced — the founder's spec was explicit about this ("do not create unnecessary roles"). `requireAdmin()` (`src/lib/navigation/route-guard.ts`) checks this column; there is no `/admin` UI surface yet (that's out of M3's scope), only the schema and the authorization helper it needs.

`users.plan` is a two-value enum: `free` | `premium`. This is the subscription state the free/premium gating logic (`src/lib/access/course-access.ts`) reads — see `docs/progress-system.md` for how it's used. No payment provider is integrated; nothing in M3 sets `plan` to `"premium"` automatically. Changing a user's plan today requires a direct database update (`UPDATE users SET plan = 'premium' WHERE id = ...`) or `pnpm db:studio`. Stripe wiring that flips this column automatically is a later milestone.

## Migrations

Drizzle Kit generates plain SQL migration files from `src/lib/db/schema.ts` into `drizzle/`. The initial migration is `drizzle/0000_cooing_joystick.sql`.

```bash
pnpm db:generate   # after editing schema.ts — writes a new SQL file in drizzle/
pnpm db:migrate    # applies pending migrations to DATABASE_URL
pnpm db:push       # dev-only shortcut: pushes schema.ts straight to the DB, no migration file
pnpm db:studio     # opens Drizzle Studio against DATABASE_URL
pnpm db:seed       # see below
```

All four `db:*` commands load `.env.local` via Node's `--env-file-if-exists` flag and run `drizzle-kit` directly from `node_modules/drizzle-kit/bin.cjs` (not the `.bin/drizzle-kit` shell wrapper, which isn't directly `node`-executable).

## Seeding

`pnpm db:seed` runs `scripts/db-seed.ts`, which creates two demo accounts (`admin@curitiq.dev` and `learner@curitiq.dev`, both password `password123`) plus a realistic enrollment/progress/quiz-attempt/saved-course trail for the learner account, so a fresh local database doesn't feel empty.

The seed script **does not** create or modify course content — it only reads two real course slugs from `content/courses` (discovered at seed time, not hardcoded) so its demo enrollment points at lessons that actually exist. It also deliberately avoids importing from `src/lib/auth/*` or `src/lib/db/client.ts`, since those are marked `import "server-only"`, which throws when imported outside Next.js's server bundler — the seed script talks to the schema and a hand-built Drizzle client directly instead. See the comment block at the top of `scripts/db-seed.ts` for the full reasoning.

## Local development without a database

`pnpm build`, `pnpm typecheck`, and most of `pnpm test` all succeed with no `DATABASE_URL` set at all. `src/lib/env.ts` validates environment variables lazily (only when `getEnv()` is actually called at request time, never at module import time), and `src/lib/db/client.ts` constructs the Drizzle client lazily the same way — so Next.js can statically analyze every route module during `pnpm build` without a real database connection. Tests that need real SQL behavior run against PGlite (an in-process, WASM-compiled Postgres) instead of Neon — see `src/test/db.ts` and `docs/security.md`'s testing section.
