import "server-only";
import { and, eq, isNull } from "drizzle-orm";
import type { Database } from "@/lib/db/client";
import {
  emailVerificationTokens,
  passwordResetTokens,
  userPreferences,
  users,
  type UserRow,
} from "@/lib/db/schema";
import { hashPassword, validatePasswordStrength, verifyPassword } from "./password";
import { generateToken, hashToken } from "./tokens";

/**
 * Core auth business logic — deliberately Next.js-agnostic (no
 * `cookies()`/`redirect()`/`"use server"` here) so it can be exercised
 * directly in tests against a real (PGlite) database, and so the thin
 * Server Action wrappers in `actions.ts` stay genuinely thin.
 */

const EMAIL_VERIFICATION_TTL_MS = 1000 * 60 * 60 * 24; // 24h
const PASSWORD_RESET_TTL_MS = 1000 * 60 * 60; // 1h

// A fixed, valid-format bcrypt hash of a string nobody will ever type.
// Used to run a dummy password comparison when a login email doesn't
// match any user, so failed-login latency doesn't leak "this email
// doesn't exist" via a timing difference against "wrong password".
const DUMMY_HASH = "$2b$12$C6UzMDM.H6dfI/f/IKcEeO2FRXd9WrK4vAjhKmoQvxwZzY.3Kh9Nq";

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export type AuthResult<T> = { ok: true; value: T } | { ok: false; error: string };

export async function findUserByEmail(db: Database, email: string): Promise<UserRow | undefined> {
  const [row] = await db
    .select()
    .from(users)
    .where(eq(users.email, normalizeEmail(email)))
    .limit(1);
  return row;
}

export async function findUserById(db: Database, id: string): Promise<UserRow | undefined> {
  const [row] = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return row;
}

export async function registerUser(
  db: Database,
  input: { name: string; email: string; password: string },
): Promise<AuthResult<{ user: UserRow; verificationToken: string }>> {
  const name = input.name.trim();
  const email = normalizeEmail(input.email);

  if (name.length === 0) return { ok: false, error: "Full name is required." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }
  const passwordError = validatePasswordStrength(input.password);
  if (passwordError) return { ok: false, error: passwordError };

  const existing = await findUserByEmail(db, email);
  if (existing) return { ok: false, error: "An account with this email already exists." };

  const passwordHash = await hashPassword(input.password);
  const [user] = await db.insert(users).values({ name, email, passwordHash }).returning();
  if (!user) return { ok: false, error: "Could not create account. Try again." };

  await db.insert(userPreferences).values({ userId: user.id });

  const verificationToken = generateToken();
  await db.insert(emailVerificationTokens).values({
    userId: user.id,
    tokenHash: hashToken(verificationToken),
    expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TTL_MS),
  });

  return { ok: true, value: { user, verificationToken } };
}

export async function verifyPasswordForLogin(
  db: Database,
  email: string,
  password: string,
): Promise<AuthResult<UserRow>> {
  const user = await findUserByEmail(db, email);
  const validPassword = await verifyPassword(password, user?.passwordHash ?? DUMMY_HASH);

  if (!user || !validPassword) {
    return { ok: false, error: "Incorrect email or password." };
  }
  return { ok: true, value: user };
}

export async function verifyEmailToken(db: Database, token: string): Promise<AuthResult<null>> {
  const tokenHash = hashToken(token);
  const [row] = await db
    .select()
    .from(emailVerificationTokens)
    .where(
      and(
        eq(emailVerificationTokens.tokenHash, tokenHash),
        isNull(emailVerificationTokens.consumedAt),
      ),
    )
    .limit(1);

  if (!row || row.expiresAt.getTime() < Date.now()) {
    return { ok: false, error: "This verification link is invalid or has expired." };
  }

  await db
    .update(emailVerificationTokens)
    .set({ consumedAt: new Date() })
    .where(eq(emailVerificationTokens.id, row.id));
  await db.update(users).set({ emailVerifiedAt: new Date() }).where(eq(users.id, row.userId));

  return { ok: true, value: null };
}

/** Issues a fresh verification token for an unverified user, invalidating
 *  the concept of any previous one simply by making a new one — old
 *  tokens still validate until they individually expire, which is an
 *  acceptable tradeoff for the "resend" case (avoids a schema migration
 *  purely to support multi-token invalidation). */
export async function createEmailVerificationToken(db: Database, userId: string): Promise<string> {
  const token = generateToken();
  await db.insert(emailVerificationTokens).values({
    userId,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + EMAIL_VERIFICATION_TTL_MS),
  });
  return token;
}

export async function createPasswordResetToken(
  db: Database,
  email: string,
): Promise<string | null> {
  const user = await findUserByEmail(db, email);
  if (!user) return null; // caller must still respond as if it succeeded

  const token = generateToken();
  await db.insert(passwordResetTokens).values({
    userId: user.id,
    tokenHash: hashToken(token),
    expiresAt: new Date(Date.now() + PASSWORD_RESET_TTL_MS),
  });
  return token;
}

export async function resetPasswordWithToken(
  db: Database,
  token: string,
  newPassword: string,
): Promise<AuthResult<{ userId: string }>> {
  const passwordError = validatePasswordStrength(newPassword);
  if (passwordError) return { ok: false, error: passwordError };

  const tokenHash = hashToken(token);
  const [row] = await db
    .select()
    .from(passwordResetTokens)
    .where(
      and(eq(passwordResetTokens.tokenHash, tokenHash), isNull(passwordResetTokens.consumedAt)),
    )
    .limit(1);

  if (!row || row.expiresAt.getTime() < Date.now()) {
    return { ok: false, error: "This reset link is invalid or has expired." };
  }

  const passwordHash = await hashPassword(newPassword);
  await db
    .update(users)
    .set({ passwordHash, updatedAt: new Date() })
    .where(eq(users.id, row.userId));
  await db
    .update(passwordResetTokens)
    .set({ consumedAt: new Date() })
    .where(eq(passwordResetTokens.id, row.id));

  return { ok: true, value: { userId: row.userId } };
}

export async function changePassword(
  db: Database,
  userId: string,
  currentPassword: string,
  newPassword: string,
): Promise<AuthResult<null>> {
  const user = await findUserById(db, userId);
  if (!user) return { ok: false, error: "Account not found." };

  const valid = await verifyPassword(currentPassword, user.passwordHash);
  if (!valid) return { ok: false, error: "Current password is incorrect." };

  const passwordError = validatePasswordStrength(newPassword);
  if (passwordError) return { ok: false, error: passwordError };

  const passwordHash = await hashPassword(newPassword);
  await db.update(users).set({ passwordHash, updatedAt: new Date() }).where(eq(users.id, userId));
  return { ok: true, value: null };
}

export async function updateProfile(
  db: Database,
  userId: string,
  input: { name: string; email: string; headline?: string },
): Promise<AuthResult<{ user: UserRow; emailChanged: boolean; verificationToken?: string }>> {
  const name = input.name.trim();
  const email = normalizeEmail(input.email);
  if (name.length === 0) return { ok: false, error: "Full name can't be empty." };
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { ok: false, error: "Enter a valid email address." };
  }

  const current = await findUserById(db, userId);
  if (!current) return { ok: false, error: "Account not found." };

  const emailChanged = email !== current.email;
  if (emailChanged) {
    const existing = await findUserByEmail(db, email);
    if (existing) return { ok: false, error: "That email is already in use." };
  }

  const [user] = await db
    .update(users)
    .set({
      name,
      email,
      headline: input.headline?.trim() || null,
      emailVerifiedAt: emailChanged ? null : current.emailVerifiedAt,
      updatedAt: new Date(),
    })
    .where(eq(users.id, userId))
    .returning();

  if (!user) return { ok: false, error: "Could not update profile." };

  let verificationToken: string | undefined;
  if (emailChanged) {
    verificationToken = await createEmailVerificationToken(db, userId);
  }

  return { ok: true, value: { user, emailChanged, verificationToken } };
}

export async function deleteAccount(
  db: Database,
  userId: string,
  password: string,
): Promise<AuthResult<null>> {
  const user = await findUserById(db, userId);
  if (!user) return { ok: false, error: "Account not found." };

  const valid = await verifyPassword(password, user.passwordHash);
  if (!valid) return { ok: false, error: "Incorrect password." };

  // Every other table FKs to users.id ON DELETE CASCADE — this one
  // delete removes sessions, tokens, enrollments, progress, attempts,
  // saved courses, and preferences with it.
  await db.delete(users).where(eq(users.id, userId));
  return { ok: true, value: null };
}
