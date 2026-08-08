"use client";

import { Button } from "@/components/ui/Button";
import buttonStyles from "@/components/ui/Button.module.css";
import { Card, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import styles from "./page.module.css";

/** UI only — no `user.update`/`user.delete` calls yet (M5+/M8 for the
 *  compliance-required delete flow). */
export function SettingsAccountForm() {
  return (
    <div className={styles.stack}>
      <Card className={styles.card}>
        <CardHeader title="Profile" />
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input label="Full name" defaultValue="Atul" name="name" />
          <Input label="Email" type="email" defaultValue="atulsinghvfx@gmail.com" name="email" />
          <Button type="submit" className={styles.save}>
            Save changes
          </Button>
        </form>
      </Card>

      <Card className={styles.card}>
        <CardHeader title="Password" />
        <form
          className={styles.form}
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <Input label="Current password" type="password" name="currentPassword" />
          <Input label="New password" type="password" name="newPassword" />
          <Button type="submit" className={styles.save}>
            Update password
          </Button>
        </form>
      </Card>

      <Card className={cn(styles.card, styles.dangerCard)}>
        <CardHeader title="Delete account" />
        <p className={styles.dangerText}>
          Permanently deletes your account and progress. This can’t be undone.
        </p>
        <button
          type="button"
          className={cn(buttonStyles.button, buttonStyles.danger, buttonStyles.sm)}
        >
          Delete account
        </button>
      </Card>
    </div>
  );
}
