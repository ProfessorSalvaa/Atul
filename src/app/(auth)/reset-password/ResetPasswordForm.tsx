"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";
import { resetPasswordAction } from "@/lib/auth/actions";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import buttonStyles from "@/components/ui/Button.module.css";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import styles from "../auth-form.module.css";

/** Reads the reset token from the `?token=` query param and calls
 *  resetPasswordAction. Validates password length and confirmation
 *  match client-side before hitting the server. */
export function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token") ?? "";
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [fieldError, setFieldError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setFormError(undefined);
    if (password.length < 8) {
      setFieldError("Use at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setFieldError("Passwords don't match.");
      return;
    }
    setFieldError(undefined);

    if (!token) {
      setFormError("This reset link is missing its token. Request a new one.");
      return;
    }

    setSubmitting(true);
    const result = await resetPasswordAction({ token, password });
    setSubmitting(false);

    if (!result.ok) {
      setFormError(result.error ?? "This reset link is invalid or has expired.");
      return;
    }
    setDone(true);
  }

  if (done) {
    return (
      <Card raised className={styles.card}>
        <div className={styles.successIcon} aria-hidden="true">
          <CheckCircle2 size={28} />
        </div>
        <h1 className={styles.title}>Password reset</h1>
        <p className={styles.subtitle}>Your password has been updated.</p>
        <Link
          href="/login"
          className={cn(
            buttonStyles.button,
            buttonStyles.primary,
            buttonStyles.lg,
            buttonStyles.fullWidth,
            styles.submit,
          )}
        >
          Back to log in
        </Link>
      </Card>
    );
  }

  return (
    <Card raised className={styles.card}>
      <h1 className={styles.title}>Choose a new password</h1>
      <p className={styles.subtitle}>Make it at least 8 characters.</p>
      {formError && (
        <Alert tone="error" description={formError} style={{ marginBottom: "var(--space-4)" }} />
      )}
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="New password"
          type="password"
          name="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <Input
          label="Confirm new password"
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          invalid={Boolean(fieldError)}
          helperText={fieldError}
          required
        />
        <Button type="submit" size="lg" className={styles.submit} loading={submitting}>
          Reset password
        </Button>
      </form>
    </Card>
  );
}
