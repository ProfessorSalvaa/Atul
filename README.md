# Curitiq

Help anyone master modern digital skills through beautifully designed, AI-powered learning experiences.

This repository is the engineering source of truth for Curitiq, built milestone by milestone per the approved roadmap and product blueprint (P0). **M0 — Engineering Foundations**, **M1 — Design System**, **M2 — Application Shell & Navigation**, and **M2.5 — Founder Demo Build** are complete: repo/tooling/CI, the full token + component library, every route from the P0 blueprint with rich, realistic demo data, and interaction polish (loading/success/error states, toasts, keyboard shortcuts) throughout — a full clickable product demo with no real backend yet. See `docs/component-inventory.md`, `docs/navigation.md`, and `docs/performance.md` for what exists. Real data, auth, and business logic start at M3+.

## Stack (decided in the roadmap, see repo docs)

Next.js 16 (App Router) · TypeScript (strict) · pnpm · ESLint + Prettier · Vitest · GitHub Actions · Vercel.

## Getting started

```bash
pnpm install
cp .env.example .env.local
pnpm dev
```

## Scripts

| Script                         | Purpose                |
| ------------------------------ | ---------------------- |
| `pnpm dev`                     | Local dev server       |
| `pnpm build`                   | Production build       |
| `pnpm lint`                    | ESLint                 |
| `pnpm format` / `format:check` | Prettier write / check |
| `pnpm typecheck`               | `tsc --noEmit`         |
| `pnpm test`                    | Vitest (single run)    |
| `pnpm test:watch`              | Vitest watch mode      |

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

`src/server/`, `src/db/` etc. arrive with the milestones that need them (M3+). Deliberately not pre-scaffolded now to avoid empty, ungrounded folders.

## Environments

- **Local** — `.env.local` (gitignored), copied from `.env.example`.
- **Preview** — one Vercel preview deployment per PR, environment variables set in Vercel project settings.
- **Production** — `main` branch, deploys to the production Vercel environment.

## Manual setup still outstanding

The GitHub repo is live and CI is running on push/PR. Still needs a human with account access (see `DEPLOYMENT.md` for exact steps):

1. Enable branch protection on `main` (require CI to pass + 1 review before merge).
2. Link the Vercel project to the GitHub repo (auto-deploys previews + production from there).
3. Point Hostinger DNS at Vercel once the domain is ready to go live — Hostinger stays the registrar, Vercel hosts the app.
