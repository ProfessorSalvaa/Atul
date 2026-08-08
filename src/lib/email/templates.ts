import "server-only";
import { getEnv } from "@/lib/env";

function wrap(bodyHtml: string): string {
  return `<div style="font-family:sans-serif;max-width:480px;margin:0 auto;padding:24px;">
    <p style="font-weight:700;font-size:18px;margin-bottom:24px;">Curitiq</p>
    ${bodyHtml}
    <p style="color:#888;font-size:12px;margin-top:32px;">If you didn't request this, you can safely ignore this email.</p>
  </div>`;
}

export function verificationEmail(token: string) {
  const { NEXT_PUBLIC_APP_URL } = getEnv();
  const url = `${NEXT_PUBLIC_APP_URL}/verify-email?token=${token}`;
  return {
    subject: "Verify your Curitiq email",
    text: `Verify your email: ${url}\n\nThis link expires in 24 hours.`,
    html: wrap(
      `<p>Confirm your email address to finish setting up your account.</p>
       <p><a href="${url}" style="display:inline-block;background:#111;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Verify email</a></p>
       <p style="color:#888;font-size:13px;">This link expires in 24 hours.</p>`,
    ),
  };
}

export function passwordResetEmail(token: string) {
  const { NEXT_PUBLIC_APP_URL } = getEnv();
  const url = `${NEXT_PUBLIC_APP_URL}/reset-password?token=${token}`;
  return {
    subject: "Reset your Curitiq password",
    text: `Reset your password: ${url}\n\nThis link expires in 1 hour.`,
    html: wrap(
      `<p>We received a request to reset your password.</p>
       <p><a href="${url}" style="display:inline-block;background:#111;color:#fff;padding:10px 20px;border-radius:6px;text-decoration:none;">Reset password</a></p>
       <p style="color:#888;font-size:13px;">This link expires in 1 hour.</p>`,
    ),
  };
}
