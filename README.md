# Curitiq

Help anyone master modern digital skills through beautifully designed, AI-powered learning experiences.

This repository is the engineering source of truth for Curitiq, built milestone by milestone per the approved roadmap and product blueprint (P0). **M0 — Engineering Foundations** through **M2.8 — Launch Content Library** are complete: repo/tooling/CI, the full token + component library, every route from the P0 blueprint with interaction polish, a schema-validated content engine (`content/`, `src/lib/content/`) built to scale to 500+ courses, and a 108-course launch catalog. **M3 — Authentication + Database Foundation** is also complete: real accounts (PostgreSQL/Neon via Drizzle ORM), DB-backed sessions, email verification, password reset, real enrollment/lesson-completion/quiz-attempt persistence, and free/premium access control — all wired into the existing UI without changing the M1 design system or touching the 108 authored courses. See `docs/component-inventory.md`, `docs/navigation.md`, `docs/performance.md`, `docs/content/architecture.md`, `docs/database.md`, `docs/authentication.md`, `docs/progress-system.md`, and `docs/security.md` for what exists. Payments, AI Tutor, and the full Admin Studio start at M4+.

## Stack (decided in the roadmap, see repo docs)

Next.js 16 (App Router) · TypeScript (strict) · pnpm · ESLint + Prettier · Vitest · GitHub Actions · Vercel.

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Scripts

| Script                         | Purpose                                         |
| ------------------------------ | ----------------------------------------------- |
| `pnpm dev`                     | Local dev server                                |
| `pnpm build`                   | Production build                                |
| `pnpm lint`                    | ESLint                                          |
| `pnpm format` / `format:check` | Prettier write / check                          |
| `pnpm typecheck`               | `tsc --noEmit`                                  |
| `pnpm test`                    | Vitest (single run)                             |
| `pnpm test:watch`              | Vitest watch mode                               |
| `pnpm db:generate`             | Generate a Drizzle migration from `schema.ts`   |
| `pnpm db:migrate`              | Apply pending migrations to `DATABASE_URL`      |
| `pnpm db:push`                 | Dev-only: push `schema.ts` straight to the DB   |
| `pnpm db:studio`               | Open Drizzle Studio against `DATABASE_URL`      |
| `pnpm db:seed`                 | Seed two demo accounts (see `docs/database.md`) |

All five — `lint`, `format:check`, `typecheck`, `test`, `build` — run in CI on every PR (`.github/workflows/ci.yml`) and must pass before merge.

## Project structure

```
src/
  app/          Next.js App Router routes (7 layouts, 24 routes — see docs/navigation.md)
  components/
    ui/         Core design-system components (Button, Input, Modal, ...)
    learning/   Learning-specific components (CourseCard, AITutorPanel, ...)
    navigation/ Sidebar, TopNavigation, MobileNavigation, Footer
    shell/      App-shell wiring (M2) — layout chrome, overlays, hooks-backed nav
    providers/  Theme provider
  hooks/        Shared client hooks (useMediaQuery, nav-link click handling)
  lib/          Utilities, sample-data fixtures, SEO/navigation config
  styles/tokens/ Design tokens (colors, typography, spacing, ...)
```

As of M3, `src/lib/db/` (Drizzle schema + client), `src/lib/auth/`, `src/lib/progress/`, `src/lib/preferences/`, and `src/lib/access/` hold the database, authentication, and progress-tracking code — see `docs/database.md`, `docs/authentication.md`, and `docs/progress-system.md`. Payment/billing code and the full Admin Studio arrive with the milestones that need them (M4+).

## Environments

- **Local** — `.env.local` (gitignored), copied from `.env.example`.
- **Preview** — one Vercel preview deployment per PR, environment variables set in Vercel project settings.
- **Production** — `main` branch, deploys to the production Vercel environment.

## Manual setup still outstanding

The GitHub repo is live and CI is running on push/PR. Still needs a human with account access (see `DEPLOYMENT.md` for exact steps):

1. Enable branch protection on `main` (require CI to pass + 1 review before merge).
2. Link the Vercel project to the GitHub repo (auto-deploys previews + production from there).
3. Point Hostinger DNS at Vercel once the domain is ready to go live — Hostinger stays the registrar, Vercel hosts the app.
