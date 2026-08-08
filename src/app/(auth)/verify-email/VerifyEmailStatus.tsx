"use client";

import { AlertCircle, CheckCircle2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { resendVerificationAction, verifyEmailAction } from "@/lib/auth/actions";
import { Button } from "@/components/ui/Button";
import buttonStyles from "@/components/ui/Button.module.css";
import { Card } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import styles from "../auth-form.module.css";

type Status = "verifying" | "success" | "error";

/** Reads `?token=` from the URL and verifies it on mount. Offers a resend
 *  action if verification fails (e.g. an expired token) — resend requires
 *  the user to be signed in, since the token is tied to their account. */
export function VerifyEmailStatus() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [status, setStatus] = useState<Status>(token ? "verifying" : "error");
  const [error, setError] = useState<string | undefined>(
    token ? undefined : "This verification link is missing its token.",
  );
  const [resent, setResent] = useState(false);
  const [resending, setResending] = useState(false);
  const [resendError, setResendError] = useState<string | undefined>();

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    void verifyEmailAction(token).then((result) => {
      if (cancelled) return;
      if (result.ok) {
        setStatus("success");
      } else {
        setStatus("error");
        setError(result.error ?? "This verification link is invalid or has expired.");
      }
    });
    return () => {
      cancelled = true;
    };
  }, [token]);

  async function handleResend() {
    setResending(true);
    setResendError(undefined);
    const result = await resendVerificationAction();
    setResending(false);
    if (result.ok) {
      setResent(true);
    } else {
      setResendError(result.error ?? "Couldn't send a new link. Try again.");
    }
  }

  if (status === "verifying") {
    return (
      <Card raised className={styles.card}>
        <div className={styles.successIcon} aria-hidden="true">
          <Loader2 size={28} className="animate-spin" />
        </div>
        <h1 className={styles.title}>Verifying your email…</h1>
        <p className={styles.subtitle}>Just a moment.</p>
      </Card>
    );
  }

  if (status === "success") {
    return (
      <Card raised className={styles.card}>
        <div className={styles.successIcon} aria-hidden="true">
          <CheckCircle2 size={28} />
        </div>
        <h1 className={styles.title}>Email verified</h1>
        <p className={styles.subtitle}>Your account is confirmed.</p>
        <Link
          href="/dashboard"
          className={cn(
            buttonStyles.button,
            buttonStyles.primary,
            buttonStyles.lg,
            buttonStyles.fullWidth,
            styles.submit,
          )}
        >
          Go to dashboard
        </Link>
      </Card>
    );
  }

  return (
    <Card raised className={styles.card}>
      <div className={styles.successIcon} aria-hidden="true">
        <AlertCircle size={28} />
      </div>
      <h1 className={styles.title}>Verification failed</h1>
      <p className={styles.subtitle}>{error}</p>
      {resent ? (
        <p className={styles.footer}>A new verification link is on its way.</p>
      ) : (
        <>
          {resendError && <p className={styles.footer}>{resendError}</p>}
          <Button
            type="button"
            size="lg"
            className={styles.submit}
            loading={resending}
            onClick={handleResend}
          >
            Send a new link
          </Button>
        </>
      )}
      <p className={styles.footer}>
        <Link href="/login">Back to log in</Link>
      </p>
    </Card>
  );
}
