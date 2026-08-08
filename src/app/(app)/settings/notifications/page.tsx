import type { Metadata } from "next";
import { Card, CardHeader } from "@/components/ui/Card";
import { Switch } from "@/components/ui/Switch";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Notification Settings",
  robots: { index: false },
};

const IN_APP_TOGGLES = [
  { id: "achievement", label: "Achievement unlocked", defaultChecked: true },
  { id: "streak-risk", label: "Streak at risk", defaultChecked: true },
  { id: "content-updated", label: "Course content updated", defaultChecked: false },
];

const EMAIL_TOGGLES = [
  { id: "weekly-digest", label: "Weekly progress digest", defaultChecked: true },
  { id: "streak-reminder", label: "Streak-at-risk reminder", defaultChecked: true },
  { id: "billing", label: "Billing receipts and failures", defaultChecked: true },
];

/** UI only — no `notification.getPreferences`/`updatePreferences` calls
 *  yet (M5+). */
export default function SettingsNotificationsPage() {
  return (
    <div className={styles.stack}>
      <Card className={styles.card}>
        <CardHeader title="In-app notifications" />
        <div className={styles.toggleList}>
          {IN_APP_TOGGLES.map((t) => (
            <Switch key={t.id} label={t.label} defaultChecked={t.defaultChecked} />
          ))}
        </div>
      </Card>

      <Card className={styles.card}>
        <CardHeader title="Email notifications" />
        <div className={styles.toggleList}>
          {EMAIL_TOGGLES.map((t) => (
            <Switch key={t.id} label={t.label} defaultChecked={t.defaultChecked} />
          ))}
        </div>
      </Card>
    </div>
  );
}
