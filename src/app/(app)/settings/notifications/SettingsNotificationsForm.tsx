"use client";

import { useState } from "react";
import { Card, CardHeader } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import { useToast } from "@/components/shell/ToastHost";
import { updatePreferenceAction } from "@/lib/preferences/actions";
import type { PreferenceKey } from "@/lib/preferences/service";
import styles from "./page.module.css";

const IN_APP_TOGGLES: { id: PreferenceKey; label: string }[] = [
  { id: "notifyAchievement", label: "Achievement unlocked" },
  { id: "notifyStreakRisk", label: "Streak at risk" },
  { id: "notifyContentUpdated", label: "Course content updated" },
];

const EMAIL_TOGGLES: { id: PreferenceKey; label: string }[] = [
  { id: "emailWeeklyDigest", label: "Weekly progress digest" },
  { id: "emailStreakReminder", label: "Streak-at-risk reminder" },
  { id: "emailBilling", label: "Billing receipts and failures" },
];

export function SettingsNotificationsForm({
  preferences,
}: {
  preferences: Record<PreferenceKey, boolean>;
}) {
  const [values, setValues] = useState(preferences);
  const { notify } = useToast();

  async function handleToggle(id: PreferenceKey, label: string, checked: boolean) {
    setValues((v) => ({ ...v, [id]: checked }));
    const result = await updatePreferenceAction(id, checked);
    if (!result.ok) {
      setValues((v) => ({ ...v, [id]: !checked }));
      notify({ title: "Couldn't save preference", description: result.error, tone: "error" });
      return;
    }
    notify({
      title: checked ? `${label} enabled` : `${label} disabled`,
      tone: "neutral",
    });
  }

  return (
    <div className={styles.stack}>
      <Card className={styles.card}>
        <CardHeader title="In-app notifications" />
        <div className={styles.toggleList}>
          {IN_APP_TOGGLES.map((t) => (
            <Switch
              key={t.id}
              label={t.label}
              checked={values[t.id]}
              onCheckedChange={(checked) => handleToggle(t.id, t.label, checked)}
            />
          ))}
        </div>
      </Card>

      <Card className={styles.card}>
        <CardHeader title="Email notifications" />
        <div className={styles.toggleList}>
          {EMAIL_TOGGLES.map((t) => (
            <Switch
              key={t.id}
              label={t.label}
              checked={values[t.id]}
              onCheckedChange={(checked) => handleToggle(t.id, t.label, checked)}
            />
          ))}
        </div>
      </Card>
    </div>
  );
}
