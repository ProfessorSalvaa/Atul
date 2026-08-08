import "server-only";

/**
 * In-memory fixed-window rate limiter for auth endpoints (login, signup,
 * forgot-password, resend-verification).
 *
 * Known limitation, stated plainly: this is per-server-instance memory.
 * On Vercel's serverless platform each invocation can land on a
 * different instance, so this does NOT provide a hard global rate limit
 * across a fleet — a distributed attacker spread across many invocations
 * could exceed the intended limit. It DOES stop the common case
 * (repeated attempts from one script hitting one warm instance) and is a
 * meaningfully better baseline than nothing. Before this app handles
 * real adversarial traffic at scale, replace this with a durable shared
 * store (Upstash Redis + `@upstash/ratelimit` is the standard Vercel
 * pairing) — see docs/security.md.
 */

interface Bucket {
  count: number;
  resetAt: number;
}

const buckets = new Map<string, Bucket>();

// Cheap opportunistic cleanup so `buckets` doesn't grow unbounded across
// a long-lived server instance — runs at most once a minute, on whatever
// request happens to trigger it.
let lastCleanup = 0;
function cleanup() {
  const now = Date.now();
  if (now - lastCleanup < 60_000) return;
  lastCleanup = now;
  for (const [key, bucket] of buckets) {
    if (bucket.resetAt <= now) buckets.delete(key);
  }
}

export interface RateLimitResult {
  allowed: boolean;
  retryAfterSeconds?: number;
}

/** `key` should combine the action + identifier, e.g. `login:1.2.3.4` or
 *  `login:user@example.com` — callers typically check both IP and
 *  identifier to catch either a single attacker or credential stuffing
 *  spread across many source IPs against one account. */
export function checkRateLimit(key: string, limit: number, windowMs: number): RateLimitResult {
  cleanup();
  const now = Date.now();
  const bucket = buckets.get(key);

  if (!bucket || bucket.resetAt <= now) {
    buckets.set(key, { count: 1, resetAt: now + windowMs });
    return { allowed: true };
  }

  if (bucket.count >= limit) {
    return { allowed: false, retryAfterSeconds: Math.ceil((bucket.resetAt - now) / 1000) };
  }

  bucket.count += 1;
  return { allowed: true };
}
