"use client";

import { CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import buttonStyles from "@/components/ui/Button.module.css";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import styles from "../auth-form.module.css";

/** UI only — no auth call yet (M3). Validates password length and
 *  confirmation match client-side, then shows a real success screen. */
export function ResetPasswordForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (password.length < 8) {
      setError("Use at least 8 characters.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }
    setError(undefined);
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      setDone(true);
    }, 500);
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
          invalid={Boolean(error)}
          helperText={error}
          required
        />
        <Button type="submit" size="lg" className={styles.submit} loading={submitting}>
          Reset password
        </Button>
      </form>
    </Card>
  );
}
