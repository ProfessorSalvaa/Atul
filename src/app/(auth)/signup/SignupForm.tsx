"use client";

import Link from "next/link";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import { useToast } from "@/components/shell/ToastHost";
import styles from "../auth-form.module.css";

export function SignupForm() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const { notify } = useToast();

  function handleSubmit(e: FormEvent) {
    // UI only — no auth call yet (M3). Password length is validated
    // client-side so the error state is real; nothing is persisted.
    e.preventDefault();
    if (password.length < 8) {
      setPasswordError("Use at least 8 characters.");
      return;
    }
    setPasswordError(undefined);
    setSubmitting(true);
    window.setTimeout(() => {
      setSubmitting(false);
      notify({
        title: "Sign-up isn't wired up yet",
        description: "Real account creation ships in M3.",
        tone: "info",
      });
    }, 500);
  }

  return (
    <Card raised className={styles.card}>
      <h1 className={styles.title}>Create your account</h1>
      <p className={styles.subtitle}>
        Start with any course’s free first module — no card required.
      </p>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input label="Full name" type="text" name="name" autoComplete="name" required />
        <Input label="Email" type="email" name="email" autoComplete="email" required />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          invalid={Boolean(passwordError)}
          helperText={passwordError ?? "At least 8 characters."}
          required
        />
        <Checkbox
          label={
            <>
              I agree to the <Link href="/terms">Terms</Link> and{" "}
              <Link href="/privacy">Privacy Policy</Link>
            </>
          }
          name="agree"
          required
        />
        <Button type="submit" size="lg" className={styles.submit} loading={submitting}>
          Create account
        </Button>
      </form>
      <p className={styles.footer}>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </Card>
  );
}
