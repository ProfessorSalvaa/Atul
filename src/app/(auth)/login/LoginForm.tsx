"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/shell/ToastHost";
import styles from "../auth-form.module.css";

export function LoginForm() {
  const [submitting, setSubmitting] = useState(false);
  const { notify } = useToast();

  function handleSubmit(e: FormEvent) {
    // UI only — no auth call yet (M3). Simulates latency so the loading
    // state is real, then discloses honestly that nothing was persisted.
    e.preventDefault();
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      notify({
        title: "Sign-in isn't wired up yet",
        description: "Real authentication ships in M3.",
        tone: "info",
      });
    }, 500);
  }

  return (
    <Card raised className={styles.card}>
      <h1 className={styles.title}>Welcome back</h1>
      <p className={styles.subtitle}>Log in to continue where you left off.</p>
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
