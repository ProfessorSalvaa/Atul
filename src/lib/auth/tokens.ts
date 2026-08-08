import "server-only";
import { createHash, randomBytes } from "node:crypto";

/**
 * Shared opaque-token pattern for sessions, email verification, and
 * password reset: generate a high-entropy random token, hand the RAW
 * token to the client (cookie or emailed link) and store only its
 * SHA-256 hash in the database. A database read/leak alone can never be
 * replayed as a valid credential — you'd also need the raw token, which
 * only ever exists in the user's browser/inbox.
 */

export function generateToken(): string {
  return randomBytes(32).toString("base64url");
}

export function hashToken(token: string): string {
  return createHash("sha256").update(token).digest("hex");
}
