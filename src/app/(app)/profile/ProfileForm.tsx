"use client";

import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import styles from "./page.module.css";

/** UI only — no `user.update` call yet (M5+). */
export function ProfileForm() {
  return (
    <Card className={styles.card}>
      <div className={styles.avatarRow}>
        <Avatar fallback="AT" size="xl" />
        <Button variant="outline" size="sm">
          Change photo
        </Button>
      </div>
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
  );
}
