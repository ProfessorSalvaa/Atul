"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import styles from "../auth-form.module.css";

export function ForgotPasswordForm() {
  return (
    <Card raised className={styles.card}>
      <h1 className={styles.title}>Reset your password</h1>
      <p className={styles.subtitle}>
        Enter the email on your account and we’ll send a reset link.
      </p>
      <form
        className={styles.form}
        onSubmit={(e) => {
          // UI only — no email dispatch yet (M3).
          e.preventDefault();
        }}
      >
        <Input label="Email" type="email" name="email" autoComplete="email" required />
        <Button type="submit" size="lg" className={styles.submit}>
          Send reset link
        </Button>
      </form>
      <p className={styles.footer}>
        Remembered it? <Link href="/login">Back to log in</Link>
      </p>
    </Card>
  );
}
