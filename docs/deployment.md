# Deployment (M3)

What's needed to run Curitiq locally, in Vercel Preview, and in Vercel Production now that it has a real database and real authentication. For the one-time GitHub/Vercel/domain setup steps, see `DEPLOYMENT.md` at the repo root — this document is specifically about the M3-and-later environment variables and what a human needs to provide.

## Environment variables

All variables are documented with setup instructions in `.env.example`. Copy it to `.env.local` for local development; set the same names in Vercel's project settings (Preview and Production can use different values, e.g. separate Neon branches) for hosted environments.

| Variable                                | Required                        | Introduced         | Notes                                                                                                                                                                               |
| --------------------------------------- | ------------------------------- | ------------------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `NEXT_PUBLIC_APP_URL`                   | Yes                             | M0                 | Base URL used to build absolute links in emails (verification, password reset). Defaults to `http://localhost:3000`.                                                                |
| `DATABASE_URL`                          | **Yes**                         | M3                 | Neon Postgres connection string, must include `?sslmode=require`.                                                                                                                   |
| `AUTH_SECRET`                           | **Yes**                         | M3                 | Minimum 32 characters. Generate with `openssl rand -hex 32`. Not currently used to sign anything directly (sessions are DB-backed, not JWT) but validated and reserved — see below. |
| `AUTH_GOOGLE_ID` / `AUTH_GOOGLE_SECRET` | No                              | M3 (reserved)      | Not implemented. Leave unset.                                                                                                                                                       |
| `RESEND_API_KEY`                        | No (recommended for production) | M3                 | Without it, verification/reset emails are logged to the server console instead of sent — fine for local dev, not acceptable in production.                                          |
| `EMAIL_FROM`                            | No                              | M3                 | Defaults to `Curitiq <no-reply@curitiq.com>`.                                                                                                                                       |
| `ANTHROPIC_API_KEY` and AI Tutor caps   | No                              | M6 (not yet used)  | Reserved.                                                                                                                                                                           |
| `STRIPE_*`                              | No                              | M7 (not yet used)  | Reserved.                                                                                                                                                                           |
| Analytics vars                          | No                              | M10 (not yet used) | Reserved.                                                                                                                                                                           |

**A credential a human must provide before M3 can run against a real database:** a Neon project and its connection string (`DATABASE_URL`). Create one at https://neon.tech, copy the pooled connection string. This can't be generated or guessed — it requires an account.

**`AUTH_SECRET` can be generated locally** (`openssl rand -hex 32`) and doesn't require an external account; it still needs a human to run that command and set the value, since it must stay out of source control.

**Recommended before production traffic:** a Resend account and API key (https://resend.com), so verification and password-reset emails actually send instead of only logging to the server console.

## Local development

```bash
pnpm install
cp .env.example .env.local
# Edit .env.local: set DATABASE_URL (from a Neon project) and AUTH_SECRET (openssl rand -hex 32)
pnpm db:migrate   # applies drizzle/0000_cooing_joystick.sql
pnpm db:seed      # optional — creates two demo accounts, see docs/database.md
pnpm dev
```

The app **builds and typechecks without `DATABASE_URL`/`AUTH_SECRET` set** (see `docs/database.md`'s "Local development without a database" section) — those are only required to actually run `pnpm dev`/`pnpm start` and hit a route that touches the database (which, as of M3, is most authenticated routes).

## Vercel

1. Add `DATABASE_URL` and `AUTH_SECRET` in the Vercel project's Environment Variables settings, for both Preview and Production (a separate Neon branch per environment is recommended, so Preview deployments don't share data or migrations state with Production).
2. Add `RESEND_API_KEY`/`EMAIL_FROM` for Production once ready to send real emails.
3. Run `pnpm db:migrate` against each environment's `DATABASE_URL` before the first deploy that depends on it — Vercel's build step does not run migrations automatically; this is a deliberate choice so a bad migration can't be applied as a side effect of a routine deploy. Run it manually (from a machine with the right `DATABASE_URL` set) as part of the release process.
4. Everything else in `DEPLOYMENT.md` (GitHub branch protection, Vercel project linking, Hostinger DNS) is unchanged by M3.

## What's not automated yet

- Migrations are not run automatically on deploy (see above — intentional for now).
- There's no seed step for Preview/Production — `db:seed` is a local development convenience only; running it against a shared environment would create the two demo accounts there too, which is not desired outside local dev.
- No monitoring/alerting on auth failures, rate-limit hits, or database errors — reserved for a later milestone (M10, analytics/observability, per `.env.example`).
