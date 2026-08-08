import { z } from "zod";
import "server-only";

/**
 * Server-only environment variable validation (M3).
 *
 * Deliberately lazy: `getEnv()` only parses `process.env` the first time
 * something actually needs it at request time (inside `getDb()`, the auth
 * module, or the email sender) — never at module import time. This is
 * what lets `pnpm build` succeed in CI/local dev without `DATABASE_URL`
 * set: Next.js imports route modules while collecting page data, but a
 * dynamic route (everything auth/db-backed here is force-dynamic) is
 * never *executed* at build time, so `getEnv()` never actually runs
 * until a real request comes in.
 *
 * If you add a new required var, add it here — do not read
 * `process.env.X` directly elsewhere in server code.
 */
const envSchema = z.object({
  DATABASE_URL: z
    .string()
    .min(1, "DATABASE_URL is required — set it to a Neon Postgres connection string."),
  AUTH_SECRET: z
    .string()
    .min(32, "AUTH_SECRET must be at least 32 characters — generate with `openssl rand -hex 32`."),
  NEXT_PUBLIC_APP_URL: z.string().url().default("http://localhost:3000"),
  // Optional — email sending degrades to console-logging the link/code in
  // dev when unset (see src/lib/email/send.ts). Required for real password
  // reset / verification emails to reach users in production.
  RESEND_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().default("Curitiq <no-reply@curitiq.com>"),
});

export type Env = z.infer<typeof envSchema>;

let cached: Env | undefined;

/** Validates and returns process.env, throwing a clear error naming the
 *  exact missing/invalid var(s). Cached after first successful call. */
export function getEnv(): Env {
  if (cached) return cached;
  const parsed = envSchema.safeParse(process.env);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
      .join("\n");
    throw new Error(`Invalid or missing environment variables:\n${issues}`);
  }
  cached = parsed.data;
  return cached;
}
