"use client";

import { type FormEvent, useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import inputStyles from "@/components/ui/Input.module.css";
import { Textarea } from "@/components/ui/Textarea";
import { useToast } from "@/components/shell/ToastHost";
import { USER_PROFILE } from "@/lib/sample-data/content";
import styles from "./page.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** UI only — no `user.update` call yet (M5+). Validates client-side and
 *  simulates save latency so the success/error states are honest about
 *  being a UI affordance rather than a real mutation. */
export function ProfileForm() {
  const [name, setName] = useState(USER_PROFILE.name);
  const [email, setEmail] = useState(USER_PROFILE.email);
  const [title, setTitle] = useState(USER_PROFILE.title);
  const [nameError, setNameError] = useState<string | undefined>();
  const [emailError, setEmailError] = useState<string | undefined>();
  const [saving, setSaving] = useState(false);
  const { notify } = useToast();

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const trimmedName = name.trim();
    const hasNameError = trimmedName.length === 0;
    const hasEmailError = !EMAIL_PATTERN.test(email.trim());
    setNameError(hasNameError ? "Full name can't be empty." : undefined);
    setEmailError(hasEmailError ? "Enter a valid email address." : undefined);
    if (hasNameError || hasEmailError) return;

    setSaving(true);
    window.setTimeout(() => {
      setSaving(false);
      notify({ title: "Profile updated", tone: "success" });
    }, 600);
  }

  return (
    <Card className={styles.card}>
      <div className={styles.avatarRow}>
        <Avatar fallback={USER_PROFILE.initials} size="xl" />
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
          helperText={emailError}
        />
        <div className={inputStyles.field}>
          <label htmlFor="profile-title" className={inputStyles.label}>
            What are you learning?
          </label>
          <Textarea
            id="profile-title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
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
          <dd className={styles.statValue}>{USER_PROFILE.stats.coursesCompleted}</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Hours learned</dt>
          <dd className={styles.statValue}>{USER_PROFILE.stats.hoursLearned}</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Current streak</dt>
          <dd className={styles.statValue}>{USER_PROFILE.stats.currentStreak}d</dd>
        </div>
        <div className={styles.stat}>
          <dt className={styles.statLabel}>Longest streak</dt>
          <dd className={styles.statValue}>{USER_PROFILE.stats.longestStreak}d</dd>
        </div>
      </dl>
    </Card>
  );
}
