# Authentication (M3)

Custom, DB-backed session authentication — email + password, no third-party auth provider (NextAuth/Clerk/etc.) and no OAuth yet.

## Why custom, not a library

No pre-existing "approved authentication architecture" document was found in the repository (searched before starting M3 — see the M3 completion report for details). The closest signal was `.env.example`, which already reserved `AUTH_SECRET`, `AUTH_GOOGLE_ID`, and `AUTH_GOOGLE_SECRET` — an Auth.js/NextAuth-shaped convention — for a future milestone.

A custom implementation was chosen deliberately, for one concrete reason: the founder's M3 feature list (sign up, log in, log out, email verification, forgot/reset password, change password, account deletion, session management) requires custom business logic regardless of which library sits underneath. A third-party auth library would still need every one of those flows hand-wired through its extension points, at which point it adds an abstraction layer without removing meaningful work — while making the security properties (password hashing, token handling, session storage) less directly auditable. `AUTH_GOOGLE_ID`/`AUTH_GOOGLE_SECRET` remain reserved and unused; adding Google OAuth later is additive, not a rework.

## Architecture

Two layers, mirrored across every feature area added in M3 (auth, progress, preferences):

- **`src/lib/auth/service.ts`** — framework-agnostic business logic. Takes a Drizzle `Database` instance as its first argument, has no Next.js imports (no `cookies()`, `redirect()`, `"use server"`). This is what's under test in `src/lib/auth/__tests__/service.test.ts`, against a real PGlite database.
- **`src/lib/auth/actions.ts`** — thin `"use server"` Server Actions that add the Next.js-specific bits (rate limiting by IP, cookie access via `session.ts`, redirects, email dispatch) and call straight into `service.ts`.

## Password storage

`bcryptjs` (pure JavaScript, cost factor 12) — chosen over native bcrypt/argon2 bindings specifically because it needs no native build step, so it runs unmodified on Vercel's serverless runtime. Cost 12 costs roughly 150–250ms per hash on typical serverless CPU: slow enough to resist brute-forcing, fast enough not to be a noticeable login delay.

Password policy (`validatePasswordStrength` in `src/lib/auth/password.ts`): 8–72 characters, enforced server-side independent of any client-side check (bcrypt silently truncates input past 72 bytes, so the upper bound is a real constraint, not an arbitrary one).

## Sessions

DB-backed, not JWT (`src/lib/auth/session.ts`, `sessions` table). A session is a random 32-byte token (`generateToken()`, base64url); only its SHA-256 hash (`hashToken()`) is ever stored, as both the session row's primary key and the lookup key — a database read or leak alone can never be replayed as a valid session, only a matching raw cookie value can.

- 30-day duration, sliding: a session with fewer than 15 days left is transparently renewed on the next request that reads it, so an active user is never logged out mid-use.
- Cookie flags: `httpOnly`, `sameSite: "lax"`, `secure` in production, `path: "/"`.
- Logout deletes the session row and clears the cookie (`invalidateCurrentSession`). Password change and account deletion invalidate **every** session for that user (`invalidateAllSessionsForUser`) — a stolen-but-undetected session anywhere else is kicked out the moment the password changes.

The same opaque-token pattern (raw value to the client, hashed value in the database) is reused for email verification and password reset tokens, for the same reason.

## Flows

| Flow                | Entry point                                      | Notes                                                                                                                                             |
| ------------------- | ------------------------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------- |
| Register            | `registerAction`                                 | Creates the user, sends a verification email, and signs them in immediately (a new account isn't blocked from using the product while unverified) |
| Log in              | `loginAction`                                    | Rate-limited by IP and by normalized email; timing-attack mitigated (see below)                                                                   |
| Log out             | `logoutAction`                                   | Deletes the session row, clears the cookie                                                                                                        |
| Verify email        | `verifyEmailAction` (`/verify-email?token=`)     | One-time token, 24h expiry                                                                                                                        |
| Resend verification | `resendVerificationAction`                       | Rate-limited (3 per 10 min per user)                                                                                                              |
| Forgot password     | `requestPasswordResetAction`                     | Always returns success — see anti-enumeration below                                                                                               |
| Reset password      | `resetPasswordAction` (`/reset-password?token=`) | One-time token, 1h expiry; invalidates every existing session on success                                                                          |
| Change password     | `changePasswordAction`                           | Requires current password; invalidates every session, then issues a fresh one for the current browser                                             |
| Update profile      | `updateProfileAction`                            | Changing email clears `emailVerifiedAt` and re-sends a verification email                                                                         |
| Delete account      | `deleteAccountAction`                            | Requires current password; cascades to every related table via `ON DELETE CASCADE`                                                                |

## Vulnerability mitigations

- **Timing attacks on login** — when the looked-up email doesn't exist, `verifyPasswordForLogin` still runs a bcrypt comparison against a fixed dummy hash (`DUMMY_HASH`) rather than short-circuiting. Failed-login latency is the same shape whether the email exists or not.
- **Account enumeration via forgot-password** — `requestPasswordResetAction` always returns `{ ok: true }`, whether or not the email exists. A reset email is only actually created and sent if it does.
- **Open redirect via `?redirect=`** — the login form only follows a post-login redirect if it's a same-site relative path (`startsWith("/")`) that isn't protocol-relative (`!startsWith("//")`, which a browser resolves as `https://evil.com`). See `LoginForm.tsx`.
- **CSRF** — Next.js Server Actions include built-in Origin-header verification; no custom CSRF token handling was added on top of that.
- **Rate limiting** — see `docs/security.md`.
- **Session fixation / privilege persistence** — password change and account deletion both invalidate all existing sessions, not just the current one.

## What's deliberately out of scope for M3

- OAuth (Google or otherwise) — env vars reserved, not implemented.
- Multi-factor authentication.
- A durable, cross-instance rate limiter (current one is in-memory — see `docs/security.md`).
- Admin-facing session/user management UI.
