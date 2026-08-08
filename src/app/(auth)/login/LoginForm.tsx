"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import styles from "../auth-form.module.css";

export function LoginForm() {
  return (
    <Card raised className={styles.card}>
      <h1 className={styles.title}>Welcome back</h1>
      <p className={styles.subtitle}>Log in to continue where you left off.</p>
      <form
        className={styles.form}
        onSubmit={(e) => {
          // UI only — no auth call yet (M3). Prevents an unstyled full
          // page reload from the default form submission in the meantime.
          e.preventDefault();
        }}
      >
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
        <Button type="submit" size="lg" className={styles.submit}>
          Log in
        </Button>
      </form>
      <p className={styles.footer}>
        Don&apos;t have an account? <Link href="/signup">Sign up</Link>
      </p>
    </Card>
  );
}
