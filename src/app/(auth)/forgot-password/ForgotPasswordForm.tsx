"use client";

import { MailCheck } from "lucide-react";
import Link from "next/link";
import { type FormEvent, useState } from "react";
import { requestPasswordResetAction } from "@/lib/auth/actions";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import styles from "../auth-form.module.css";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | undefined>();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(undefined);
    setSubmitting(true);
    const result = await requestPasswordResetAction(email);
    setSubmitting(false);
    if (!result.ok) {
      setError(result.error ?? "Something went wrong. Try again.");
      return;
    }
    setSent(true);
  }

  if (sent) {
    return (
      <Card raised className={styles.card}>
        <div className={styles.successIcon} aria-hidden="true">
          <MailCheck size={28} />
        </div>
        <h1 className={styles.title}>Check your email</h1>
        <p className={styles.subtitle}>
          If an account exists for <strong>{email}</strong>, a reset link is on its way.
        </p>
        <p className={styles.footer}>
          <Link href="/login">Back to log in</Link>
        </p>
      </Card>
    );
  }

  return (
    <Card raised className={styles.card}>
      <h1 className={styles.title}>Reset your password</h1>
      <p className={styles.subtitle}>
        Enter the email on your account and we’ll send a reset link.
      </p>
      {error && (
        <Alert tone="error" description={error} style={{ marginBottom: "var(--space-4)" }} />
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          label="Email"
          type="email"
          name="email"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <Button type="submit" size="lg" className={styles.submit} loading={submitting}>
          Send reset link
        </Button>
      </form>
      <p className={styles.footer}>
        Remembered it? <Link href="/login">Back to log in</Link>
      </p>
    </Card>
  );
}
