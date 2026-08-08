"use client";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import styles from "../auth-form.module.css";

export function ResetPasswordForm() {
  return (
    <Card raised className={styles.card}>
      <h1 className={styles.title}>Choose a new password</h1>
      <p className={styles.subtitle}>Make it at least 8 characters.</p>
      <form
        className={styles.form}
        onSubmit={(e) => {
          // UI only — no auth call yet (M3).
          e.preventDefault();
        }}
      >
        <Input
          label="New password"
          type="password"
          name="password"
          autoComplete="new-password"
          required
        />
        <Input
          label="Confirm new password"
          type="password"
          name="confirmPassword"
          autoComplete="new-password"
          required
        />
        <Button type="submit" size="lg" className={styles.submit}>
          Reset password
        </Button>
      </form>
    </Card>
  );
}
