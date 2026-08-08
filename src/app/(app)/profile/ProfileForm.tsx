"use client";

import { type FormEvent, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import inputStyles from "@/components/ui/Input.module.css";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/shell/ToastHost";
import { getInitials } from "@/lib/initials";
import { updateProfileAction } from "@/lib/auth/actions";
import styles from "./page.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export interface ProfileStats {
  coursesCompleted: number;
  hoursLearned: number;
  coursesInProgress: number;
  coursesEnrolled: number;
}

export function ProfileForm({
  user,
  stats,
}: {
  user: { name: string; email: string; headline: string };
  stats: ProfileStats;
}) {
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [headline, setHeadline] = useState(user.headline);
  const [nameError, setNameError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const { notify } = useToast();

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const hasNameError = trimmedName.length === 0;
    const hasEmailError = !EMAIL_PATTERN.test(email.trim());
    setNameError(hasNameError ? "Full name can't be empty." : undefined);
    setEmailError(hasEmailError ? "Enter a valid email address." : undefined);
    if (hasNameError || hasEmailError) return;

    setSaving(true);
    const result = await updateProfileAction({ name: trimmedName, email: email.trim(), headline });
    setSaving(false);
    if (!result.ok) {
      notify({ title: "Couldn't update profile", description: result.error, tone: "error" });
      return;
    }
    notify({ title: result.message ?? "Profile updated", tone: "success" });
  }

  return (
    <Card className={styles.card}>
      <div className={styles.avatarRow}>
        <Avatar fallback={getInitials(user.name)} size="xl" />
        <div>
          <Button variant="outline" size="sm" type="button">
            Change photo
          </Button>
          <p className={styles.avatarHint}>JPG or PNG, up to 2MB.</p>
        </div>
      </div>
      <form className={styles.form} onSubmit={handleSubmit} noValidate>
        <Input
          label="Full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          name="name"
          invalid={Boolean(nameError)}
          helperText={nameError}
        />
        <Input
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          name="email"
          invalid={Boolean(emailError)}
          helperText={emailError ?? "Changing your email requires re-verifying it."}
        />
        <div className={inputStyles.field}>
          <label htmlFor="profile-title" className={inputStyles.label}>
            What are you learning?
          </label>
          <Textarea
            id="profile-title"
            value={headline}
            onChange={(e) => setHeadline(e.target.value)}
            name="title"
            rows={2}
          />
        </div>
        <Button type="submit" className={styles.save} loading={saving}>
          Save changes
        </Button>
      </form>

      <CardHeader title="Learning stats" className={styles.statsHeader} />
      <dl className={styles.statsGrid}>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Courses completed</dt>
          <dd className={styles.statValue}>{stats.coursesCompleted}</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Hours learned</dt>
          <dd className={styles.statValue}>{stats.hoursLearned}</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Courses in progress</dt>
          <dd className={styles.statValue}>{stats.coursesInProgress}</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Courses enrolled</dt>
          <dd className={styles.statValue}>{stats.coursesEnrolled}</dd>
        </div>
      </dl>
    </Card>
  );
}
