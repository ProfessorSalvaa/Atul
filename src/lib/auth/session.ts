import "server-only";
import { cookies } from "next/headers";
import { eq } from "drizzle-orm";
import { getDb } from "@/lib/db/client";
import { sessions, users, type UserRow } from "@/lib/db/schema";
import { generateToken, hashToken } from "./tokens";

export const SESSION_COOKIE_NAME = "curitiq_session";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days
// If a session is read with less than this much life left, silently
// extend it — a signed-in user active every few days never gets logged
// out mid-use, without writing to the DB on every single request.
const RENEW_THRESHOLD_MS = 1000 * 60 * 60 * 24 * 15; // 15 days

export interface SessionValidationResult {
  session: { id: string; expiresAt: Date } | null;
  user: UserRow | null;
}

/** Creates a session row + sets the httpOnly cookie. Called after
 *  successful login or registration. */
export async function createSession(userId: string): Promise<void> {
  const token = generateToken();
  const id = hashToken(token);
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  await getDb().insert(sessions).values({ id, userId, expiresAt });

  const cookieStore = await cookies();
  cookieStore.set(SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    expires: expiresAt,
  });
}

/** Validates the session cookie against the database. Returns both the
 *  session and the user in one round trip when valid; both null when
 *  not (no cookie, expired, or revoked). Transparently renews a
 *  soon-to-expire session and clears an expired one. */
export async function validateSession(): Promise<SessionValidationResult> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) return { session: null, user: null };

  const id = hashToken(token);
  const db = getDb();
  const rows = await db
    .select({ session: sessions, user: users })
    .from(sessions)
    .innerJoin(users, eq(sessions.userId, users.id))
    .where(eq(sessions.id, id))
    .limit(1);

  const row = rows[0];
  if (!row) return { session: null, user: null };

  if (Date.now() >= row.session.expiresAt.getTime()) {
    await db.delete(sessions).where(eq(sessions.id, id));
    cookieStore.delete(SESSION_COOKIE_NAME);
    return { session: null, user: null };
  }

  if (row.session.expiresAt.getTime() - Date.now() < RENEW_THRESHOLD_MS) {
    const newExpiresAt = new Date(Date.now() + SESSION_DURATION_MS);
    await db.update(sessions).set({ expiresAt: newExpiresAt }).where(eq(sessions.id, id));
    row.session.expiresAt = newExpiresAt;
    cookieStore.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      expires: newExpiresAt,
    });
  }

  return { session: row.session, user: row.user };
}

/** Invalidates the current session (logout) — deletes the DB row and
 *  clears the cookie. */
export async function invalidateCurrentSession(): Promise<void> {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (token) {
    await getDb()
      .delete(sessions)
      .where(eq(sessions.id, hashToken(token)));
  }
  cookieStore.delete(SESSION_COOKIE_NAME);
}

/** Invalidates every session for a user — used on password change and
 *  account deletion so a stolen-but-not-yet-noticed session can't
 *  outlive the credential change. */
export async function invalidateAllSessionsForUser(userId: string): Promise<void> {
  await getDb().delete(sessions).where(eq(sessions.userId, userId));
}
