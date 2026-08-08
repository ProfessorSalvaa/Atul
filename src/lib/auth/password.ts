import "server-only";
import bcrypt from "bcryptjs";

// Cost factor 12 — bcryptjs is pure JS (no native bindings, so it runs
// anywhere including Vercel serverless without a build step) at a
// reasonable ~150-250ms per hash on typical serverless CPU, deliberately
// slow to resist brute-forcing without being an unusable login latency.
const SALT_ROUNDS = 12;

export async function hashPassword(plain: string): Promise<string> {
  return bcrypt.hash(plain, SALT_ROUNDS);
}

export async function verifyPassword(plain: string, hash: string): Promise<boolean> {
  return bcrypt.compare(plain, hash);
}

/** Minimum password policy, enforced both client-side (existing forms)
 *  and here server-side (the only copy that actually matters). */
export function validatePasswordStrength(password: string): string | undefined {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (password.length > 72) {
    // bcrypt silently truncates input beyond 72 bytes — reject instead of
    // silently accepting a password whose tail is never actually checked.
    return "Password must be 72 characters or fewer.";
  }
  return undefined;
}
