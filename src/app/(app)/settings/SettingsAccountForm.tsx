"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/Button";
import buttonStyles from "@/components/ui/Button.module.css";
import { Card, CardHeader } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { useToast } from "@/components/shell/ToastHost";
import { cn } from "@/lib/cn";
import { USER_PROFILE } from "@/lib/sample-data/content";
import styles from "./page.module.css";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** UI only — no `user.update`/`user.delete` calls yet (M5+/M8 for the
 *  compliance-required delete flow). Forms validate client-side and
 *  simulate save latency; delete requires a confirm step but never
 *  actually deletes anything in this preview. */
export function SettingsAccountForm() {
  const [name, setName] = useState(USER_PROFILE.name);
  const [email, setEmail] = useState(USER_PROFILE.email);
  const [profileErrors, setProfileErrors] = useState<{ name?: string; email?: string }>({});
  const [savingProfile, setSavingProfile] = useState(false);

  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState<string | undefined>();
  const [savingPassword, setSavingPassword] = useState(false);

  const [confirmDeleteOpen, setConfirmDeleteOpen] = useState(false);

  const { notify } = useToast();

  function handleProfileSubmit(e: FormEvent) {
    e.preventDefault();
    const errors: { name?: string; email?: string } = {};
    if (name.trim().length === 0) errors.name = "Full name can't be empty.";
    if (!EMAIL_PATTERN.test(email.trim())) errors.email = "Enter a valid email address.";
    setProfileErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setSavingProfile(true);
    window.setTimeout(() => {
      setSavingProfile(false);
      notify({ title: "Profile updated", tone: "success" });
    }, 600);
  }

  function handlePasswordSubmit(e: FormEvent) {
    e.preventDefault();
    if (newPassword.length > 0 && newPassword.length < 8) {
      setPasswordError("New password must be at least 8 characters.");
      return;
    }
    if (currentPassword.length === 0 || newPassword.length === 0) {
      setPasswordError("Both fields are required.");
      return;
    }
    setPasswordError(undefined);
    setSavingPassword(true);
    window.setTimeout(() => {
      setSavingPassword(false);
      setCurrentPassword("");
      setNewPassword("");
      notify({ title: "Password updated", tone: "success" });
    }, 600);
  }

  function handleConfirmDelete() {
    setConfirmDeleteOpen(false);
    notify({
      title: "Account deletion is disabled in this preview",
      description: "This ships with the real account & billing system (M8).",
      tone: "info",
    });
  }

  return (
    <div className={styles.stack}>
      <Card className={styles.card}>
        <CardHeader title="Profile" />
        <form className={styles.form} onSubmit={handleProfileSubmit} noValidate>
          <Input
            label="Full name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            name="name"
            invalid={Boolean(profileErrors.name)}
            helperText={profileErrors.name}
          />
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            invalid={Boolean(profileErrors.email)}
            helperText={profileErrors.email}
          />
          <Button type="submit" className={styles.save} loading={savingProfile}>
            Save changes
          </Button>
        </form>
      </Card>

      <Card className={styles.card}>
        <CardHeader title="Password" />
        <form className={styles.form} onSubmit={handlePasswordSubmit} noValidate>
          <Input
            label="Current password"
            type="password"
            name="currentPassword"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
          />
          <Input
            label="New password"
            type="password"
            name="newPassword"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            invalid={Boolean(passwordError)}
            helperText={passwordError}
          />
          <Button type="submit" className={styles.save} loading={savingPassword}>
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
          onClick={() => setConfirmDeleteOpen(true)}
        >
          Delete account
        </button>
      </Card>

      <Modal
        open={confirmDeleteOpen}
        onOpenChange={setConfirmDeleteOpen}
        title="Delete your account?"
        description="This permanently deletes your account and all learning progress. This can't be undone."
        footer={
          <>
            <Button variant="outline" onClick={() => setConfirmDeleteOpen(false)}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete account
            </Button>
          </>
        }
      />
    </div>
  );
}
