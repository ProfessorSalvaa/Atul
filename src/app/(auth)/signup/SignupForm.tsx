"use client";

import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Checkbox } from "@/components/ui/Checkbox";
import { Input } from "@/components/ui/Input";
import styles from "../auth-form.module.css";

export function SignupForm() {
  return (
    <Card raised className={styles.card}>
      <h1 className={styles.title}>Create your account</h1>
      <p className={styles.subtitle}>
        Start with any course’s free first module — no card required.
      </p>
      <form
        className={styles.form}
        onSubmit={(e) => {
          // UI only — no auth call yet (M3).
          e.preventDefault();
        }}
      >
        <Input label="Full name" type="text" name="name" autoComplete="name" required />
        <Input label="Email" type="email" name="email" autoComplete="email" required />
        <Input
          label="Password"
          type="password"
          name="password"
          autoComplete="new-password"
          helperText="At least 8 characters."
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
        <Button type="submit" size="lg" className={styles.submit}>
          Create account
        </Button>
      </form>
      <p className={styles.footer}>
        Already have an account? <Link href="/login">Log in</Link>
      </p>
    </Card>
  );
}
