import "server-only";
import { getEnv } from "@/lib/env";

interface SendEmailInput {
  to: string;
  subject: string;
  html: string;
  text: string;
}

/**
 * Pluggable email sender. With `RESEND_API_KEY` unset (the default —
 * founder hasn't been asked for one yet), emails are logged to the
 * server console instead of sent — verification/reset flows are fully
 * functional in dev (copy the link from the log), just not delivered to
 * a real inbox. Set RESEND_API_KEY in production before real users rely
 * on these flows; see docs/deployment.md.
 *
 * Uses Resend's plain HTTP API directly (a single fetch call) rather
 * than adding the `resend` SDK as a dependency for something that may
 * not even be configured yet.
 */
export async function sendEmail(input: SendEmailInput): Promise<void> {
  const { RESEND_API_KEY, EMAIL_FROM } = getEnv();

  if (!RESEND_API_KEY) {
    console.log(
      `[email:dev-mode] No RESEND_API_KEY set — logging instead of sending.\n` +
        `  To: ${input.to}\n  Subject: ${input.subject}\n  ---\n${input.text}\n  ---`,
    );
    return;
  }

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: EMAIL_FROM,
      to: input.to,
      subject: input.subject,
      html: input.html,
      text: input.text,
    }),
  });

  if (!res.ok) {
    const body = await res.text().catch(() => "");
    throw new Error(`Failed to send email via Resend (${res.status}): ${body}`);
  }
}
