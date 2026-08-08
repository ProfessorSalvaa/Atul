"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { type FormEvent, useState } from "react";
import { registerAction } from "@/lib/auth/actions";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import styles from "../auth-form.module.css";

export function SignupForm() {
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [formError, setFormError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setFormError(undefined);
    if (password.length < 8) {
      setPasswordError("Use at least 8 characters.");
      return;
    }
    setPasswordError(undefined);

    const formData = new FormData(e.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");

    setSubmitting(true);
    const result = await registerAction({ name, email, password });
    setSubmitting(false);

    if (!result.ok) {
      setFormError(result.error ?? "Something went wrong. Try again.");
      return;
    }

    router.push("/dashboard");
    router.refresh();
  }

  return (
    <Card raised className={styles.card}>
      <h1 className={styles.title}>Create your account</h1>
      <p className={styles.subtitle}>
        Start with any course’s free first module — no card required.
      </p>
      {formError && (
        <Alert tone="error" description={formError} style={{ marginBottom: "var(--space-4)" }} />
      )}
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
