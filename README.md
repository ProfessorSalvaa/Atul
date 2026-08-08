# Curitiq

Help anyone master modern digital skills through beautifully designed, AI-powered learning experiences.

This repository is the engineering source of truth for Curitiq, built milestone by milestone per the approved roadmap and product blueprint (P0). **M0 — Engineering Foundations** is complete: repo, tooling, CI, and project structure. No product features exist yet — those start at M1 (design system) and M2 (data layer).

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
  app/          Next.js App Router routes
  lib/          Shared utilities (framework-agnostic where possible)
```

This will grow milestone by milestone — `src/components`, `src/server`, `src/db` etc. arrive with the milestones that need them (M1, M2). Deliberately not pre-scaffolded now to avoid empty, ungrounded folders.

## Environments

- **Local** — `.env.local` (gitignored), copied from `.env.example`.
- **Preview** — one Vercel preview deployment per PR, environment variables set in Vercel project settings.
- **Production** — `main` branch, deploys to the production Vercel environment.

## Manual setup this repo cannot do for itself

This repo was built in an isolated environment without GitHub/Vercel credentials. Before M1 starts, the founder needs to:

1. Create the GitHub repository and push this code (see `DEPLOYMENT.md`).
2. Enable branch protection on `main` (require CI to pass + 1 review before merge).
3. Link the Vercel project to the GitHub repo (auto-deploys previews + production from there).
4. Point Hostinger DNS at Vercel once the domain is ready to go live (see `DEPLOYMENT.md`) — Hostinger stays the registrar, Vercel hosts the app.

See `DEPLOYMENT.md` for exact steps.
