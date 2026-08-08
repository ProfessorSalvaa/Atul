# Deployment setup (manual, one-time)

These steps need a human with GitHub/Vercel/Hostinger account access — they weren't done automatically because this repo was built in a credential-less sandbox.

## 1. GitHub

1. Create a new **private** repository named `curitiq` under your account/org.
2. From this project directory:
   ```bash
   git remote add origin git@github.com:<you>/curitiq.git
   git push -u origin main
   ```
3. Repo Settings → Branches → add a branch protection rule for `main`:
   - Require a pull request before merging.
   - Require status checks to pass before merging → select the `CI / Lint, typecheck, test, build` check once it's run once.
   - Require branches to be up to date before merging.
4. Update `.github/CODEOWNERS` with real GitHub usernames as the team grows.

## 2. Vercel

1. Import the GitHub repo as a new Vercel project (vercel.com → Add New → Project).
2. Framework preset: Next.js (auto-detected, no `vercel.json` needed for M0).
3. Add environment variables from `.env.example` as they become real (start with none required for M0 — the app builds and runs without any).
4. Every PR gets a Preview deployment automatically; `main` deploys to Production automatically once connected.

## 3. Domain (Hostinger → Vercel)

Hostinger holds the domain registration; Vercel hosts the app. Do **not** point the domain at Hostinger hosting.

1. In Vercel project settings → Domains, add your domain (e.g. `curitiq.com`).
2. Vercel will show the required DNS records (typically an `A` record to `76.76.21.21` for the apex domain and a `CNAME` for `www`, but use whatever Vercel displays — it can change).
3. In Hostinger's DNS zone editor for the domain, add those exact records.
4. Wait for propagation (usually minutes, can take up to 24–48h) — Vercel's dashboard shows verification status live.

Do this well before any announced launch date, not on launch day.
