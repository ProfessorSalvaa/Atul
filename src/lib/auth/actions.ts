"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { getDb } from "@/lib/db/client";
import { sendEmail } from "@/lib/email/send";
import { passwordResetEmail, verificationEmail } from "@/lib/email/templates";
import { checkRateLimit } from "./rate-limit";
import * as service from "./service";
import { createSession, invalidateAllSessionsForUser, invalidateCurrentSession } from "./session";
import { getCurrentUser } from "./current-user";

export type ActionState = { ok: boolean; error?: string; message?: string };

async function clientIp(): Promise<string> {
  const h = await headers();
  // Vercel sets x-forwarded-for; fall back to a constant so local dev
  // (no proxy) still gets a working, if coarse, rate-limit key.
  return h.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "local";
}

export async function registerAction(input: {
  name: string;
  email: string;
  password: string;
}): Promise<ActionState> {
  const ip = await clientIp();
  const rl = checkRateLimit(`register:${ip}`, 5, 10 * 60_000);
  if (!rl.allowed) {
    return { ok: false, error: "Too many sign-up attempts. Try again in a few minutes." };
  }

  const db = getDb();
  const result = await service.registerUser(db, input);
  if (!result.ok) return { ok: false, error: result.error };

  const { user, verificationToken } = result.value;
  const email = verificationEmail(verificationToken);
  await sendEmail({ to: user.email, ...email });
  await createSession(user.id);

  return { ok: true };
}

export async function loginAction(input: {
  email: string;
  password: string;
}): Promise<ActionState> {
  const ip = await clientIp();
  const ipLimit = checkRateLimit(`login:ip:${ip}`, 10, 10 * 60_000);
  const emailLimit = checkRateLimit(
    `login:email:${service.normalizeEmail(input.email)}`,
    10,
    10 * 60_000,
  );
  if (!ipLimit.allowed || !emailLimit.allowed) {
    return { ok: false, error: "Too many attempts. Try again in a few minutes." };
  }

  const db = getDb();
  const result = await service.verifyPasswordForLogin(db, input.email, input.password);
  if (!result.ok) return { ok: false, error: result.error };

  await createSession(result.value.id);
  return { ok: true };
}

export async function logoutAction(): Promise<void> {
  await invalidateCurrentSession();
  redirect("/login");
}

export async function requestPasswordResetAction(email: string): Promise<ActionState> {
  const ip = await clientIp();
  const rl = checkRateLimit(`forgot-password:${ip}`, 5, 10 * 60_000);
  if (!rl.allowed) {
    // Still returns "ok" shape below regardless — see note there — but a
    // hard rate limit is still worth enforcing to blunt token-generation
    // spam even though the response never reveals it.
    return { ok: true };
  }

  const db = getDb();
  const token = await service.createPasswordResetToken(db, email);
  if (token) {
    const user = await service.findUserByEmail(db, email);
    if (user) {
      const emailContent = passwordResetEmail(token);
      await sendEmail({ to: user.email, ...emailContent });
    }
  }

  // Always "ok" whether or not the email exists — the whole point of
  // this flow is that the response can't be used to enumerate accounts.
  return { ok: true };
}

export async function resetPasswordAction(input: {
  token: string;
  password: string;
}): Promise<ActionState> {
  const db = getDb();
  const result = await service.resetPasswordWithToken(db, input.token, input.password);
  if (!result.ok) return { ok: false, error: result.error };

  await invalidateAllSessionsForUser(result.value.userId);
  return { ok: true };
}

export async function verifyEmailAction(token: string): Promise<ActionState> {
  const db = getDb();
  const result = await service.verifyEmailToken(db, token);
  if (!result.ok) return { ok: false, error: result.error };
  return { ok: true };
}

export async function resendVerificationAction(): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "You need to be signed in." };
  if (user.emailVerifiedAt) return { ok: true, message: "Your email is already verified." };

  const rl = checkRateLimit(`resend-verify:${user.id}`, 3, 10 * 60_000);
  if (!rl.allowed) {
    return { ok: false, error: "Too many requests. Try again in a few minutes." };
  }

  const db = getDb();
  const token = await service.createEmailVerificationToken(db, user.id);
  const emailContent = verificationEmail(token);
  await sendEmail({ to: user.email, ...emailContent });
  return { ok: true };
}

export async function changePasswordAction(input: {
  currentPassword: string;
  newPassword: string;
}): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "You need to be signed in." };

  const db = getDb();
  const result = await service.changePassword(
    db,
    user.id,
    input.currentPassword,
    input.newPassword,
  );
  if (!result.ok) return { ok: false, error: result.error };

  // Invalidate every session (including this one) then issue a fresh one
  // for the current browser, so a stolen session elsewhere is kicked out
  // but the user changing their own password isn't logged out mid-flow.
  await invalidateAllSessionsForUser(user.id);
  await createSession(user.id);
  return { ok: true };
}

export async function updateProfileAction(input: {
  name: string;
  email: string;
  headline?: string;
}): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "You need to be signed in." };

  const db = getDb();
  const result = await service.updateProfile(db, user.id, input);
  if (!result.ok) return { ok: false, error: result.error };

  if (result.value.verificationToken) {
    const emailContent = verificationEmail(result.value.verificationToken);
    await sendEmail({ to: result.value.user.email, ...emailContent });
    return { ok: true, message: "Profile updated. Check your new email to verify it." };
  }
  return { ok: true, message: "Profile updated." };
}

export async function deleteAccountAction(password: string): Promise<ActionState> {
  const user = await getCurrentUser();
  if (!user) return { ok: false, error: "You need to be signed in." };

  const db = getDb();
  const result = await service.deleteAccount(db, user.id, password);
  if (!result.ok) return { ok: false, error: result.error };

  await invalidateCurrentSession();
  redirect("/");
}
