# Security (M3)

A plain-language account of what's implemented, what's deliberately deferred, and why — written as the self-audit the M3 spec asked for ("audit the implementation for common authentication vulnerabilities").

## Implemented

**Password storage.** bcryptjs, cost factor 12. Never logged, never returned from any Server Action, never stored in a session or cookie.

**Session security.** DB-backed sessions (not JWT), identified by the SHA-256 hash of a random 32-byte token — the raw token only ever exists in the httpOnly cookie and briefly in transit; a database compromise alone doesn't yield replayable sessions. Cookies are `httpOnly`, `sameSite: "lax"`, and `secure` in production. See `docs/authentication.md` for the full session lifecycle.

**Timing-attack resistance on login.** A fixed dummy bcrypt hash is compared against when the looked-up email doesn't exist, so failed-login response time doesn't leak whether an account exists.

**Anti-enumeration on password reset.** `requestPasswordResetAction` always responds `{ ok: true }`; only actually issues a token if the email matches an account.

**Input validation.** Every mutating code path validates server-side, independent of client-side checks — email format, password length (8–72, both bounds enforced — bcrypt silently truncates past 72 bytes), required fields. See `src/lib/auth/service.ts`; none of this validation lives only in the React form components.

**Authorization checks are server-side, not just UI-level.** `requireAuth()`/`requireAdmin()` (`src/lib/navigation/route-guard.ts`) gate every protected layout and Server Action. Free/premium lesson access (`canAccessLesson`, see `docs/progress-system.md`) is re-checked inside `markLessonStartedAction`, `markLessonCompleteAction`, and `submitQuizAction` — not just at the page level — so there's no Server Action a signed-in free-tier user could call directly (bypassing the UI) to write progress against a lesson they're not entitled to.

**SQL injection.** Every query goes through Drizzle's parameterized query builder (`eq()`, `and()`, etc.); there is no raw string-interpolated SQL anywhere in the codebase.

**Open redirect.** The login form's `?redirect=` param is only followed if it's a same-site relative path that isn't protocol-relative (`//evil.com`) — see `docs/authentication.md`.

**Rate limiting.** In-memory, fixed-window (`src/lib/auth/rate-limit.ts`), applied to: registration (5 / 10 min / IP), login (10 / 10 min / IP, and separately per normalized email), forgot-password (5 / 10 min / IP), resend-verification (3 / 10 min / user), and quiz submission (20 / 10 min / user / lesson, to blunt brute-forcing a gradable quiz). **Known limitation, stated plainly:** this is per-server-instance memory. On Vercel's serverless platform, concurrent invocations can land on different instances, so this is not a durable, fleet-wide limit — it stops the common case (one script hammering one warm instance) but not a distributed attacker. Before this app handles real adversarial traffic at scale, replace it with a durable shared store (Upstash Redis + `@upstash/ratelimit` is the standard Vercel pairing).

**Environment variable validation.** `src/lib/env.ts` validates `DATABASE_URL`, `AUTH_SECRET` (minimum 32 characters), and friends with Zod, but only when actually read at request time (`getEnv()`), never at module import time — this is what lets `pnpm build` succeed without a real database, since Next.js imports every route module during static analysis without executing top-level code that would otherwise throw.

**No secrets in source control.** `.env*` is gitignored; `.env.example` documents every variable's name and purpose with no real values.

**HTTP security headers.** `next.config.ts` sets `X-Frame-Options: DENY` (clickjacking), `X-Content-Type-Options: nosniff` (MIME-sniffing), `Referrer-Policy: strict-origin-when-cross-origin`, and a `Permissions-Policy` disabling camera/microphone/geolocation (unused by this app).

**CSRF.** Handled by Next.js Server Actions' built-in Origin-header verification; no custom token scheme was layered on top.

## Deliberately deferred (with a stated reason)

- **Durable, cross-instance rate limiting** — see above. Upstash Redis is the identified upgrade path.
- **Multi-factor authentication** — not in the M3 feature list.
- **OAuth (Google)** — env vars reserved (`AUTH_GOOGLE_ID`/`AUTH_GOOGLE_SECRET`), not implemented; explicitly out of scope for M3 per the founder's spec.
- **Payment provider integration** — the `users.plan` column exists to support subscription state, but nothing sets it automatically; changing a plan today is a manual database update. Explicitly deferred per the founder's instruction.
- **Content Security Policy header** — not added in M3. The app doesn't currently load third-party scripts, so the immediate risk is low, but a CSP is worth adding before handling untrusted user-generated content at scale.

## Testing approach

Auth and progress business logic (`src/lib/auth/service.ts`, `src/lib/progress/service.ts`, `src/lib/preferences/service.ts`) is tested against **PGlite** — a real, in-process, WASM-compiled Postgres — rather than mocked. Each test gets a fresh database with the actual Drizzle migration applied, so tests exercise genuine SQL behavior: unique constraints (duplicate email registration), cascading deletes (account deletion removing every related row), and real query results — not a hand-rolled mock of the query builder's return shape. 25 tests across those three files as of M3; see `docs/authentication.md`/`docs/progress-system.md` for what each area covers, and `pnpm test` to run them.

Session handling itself (`src/lib/auth/session.ts`) is thin glue over `next/headers`'s `cookies()` and the same DB primitives already covered by the service-layer tests; it wasn't separately unit-tested in M3 since doing so meaningfully would require mocking Next's cookie APIs, which trades real behavior coverage for mock-fidelity risk. It's exercised in practice via the manual auth-flow verification described in the M3 completion report.

## Reporting a concern

There's no external users yet, so no formal disclosure process exists. If this becomes a live product before that changes, add one here.
