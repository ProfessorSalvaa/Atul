"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { type FormEvent, useState } from "react";
import { loginAction } from "@/lib/auth/actions";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import styles from "../auth-form.module.css";

export function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | undefined>();
  const router = useRouter();
  const searchParams = useSearchParams();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(undefined);
    const formData = new FormData(e.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    setSubmitting(true);
    const result = await loginAction({ email, password });
    setSubmitting(false);

    if (!result.ok) {
      setError(result.error ?? "Something went wrong. Try again.");
      return;
    }

    const redirectTo = searchParams.get("redirect");
    // Only ever follow a same-site relative path — "/dashboard" is fine,
    // "//evil.com" (browser-parsed as protocol-relative) or an absolute
    // "https://evil.com" is not. Guards against an open-redirect via a
    // crafted `?redirect=` query param.
    const safeRedirect =
      redirectTo && redirectTo.startsWith("/") && !redirectTo.startsWith("//")
        ? redirectTo
        : "/dashboard";
    router.push(safeRedirect);
    router.refresh();
  }

  return (
    <Card raised className={styles.card}>
      <h1 className={styles.title}>Welcome back</h1>
      <p className={styles.subtitle}>Log in to continue where you left off.</p>
      {error && (
        <Alert tone="error" description={error} style={{ marginBottom: "var(--space-4)" }} />
      )}
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input label="Email" type="email" name="email" autoComplete="email" required />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="current-password"
          required
        />
        <div className={styles.row}>
          <Checkbox label="Remember me" name="remember" />
          <Link href="/forgot-password" className={styles.forgotLink}>
            Forgot password?
          </Link>
        </div>
        <Button type="submit" size="lg" className={styles.submit} loading={submitting}>
          Log in
        </Button>
      </form>
      <p className={styles.footer}>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </Card>
  );
}
