import type { Metadata } from "next";
import { requireAuth } from "@/lib/navigation/route-guard";
import { getDb } from "@/lib/db/client";
import { getPreferences } from "@/lib/preferences/service";
import { SettingsNotificationsForm } from "./SettingsNotificationsForm";

export const metadata: Metadata = {
  title: "Notification Settings",
  robots: { index: false },
};

export default async function SettingsNotificationsPage() {
  const user = await requireAuth("/settings/notifications");
  const db = getDb();
  const preferences = await getPreferences(db, user.id);
  return <SettingsNotificationsForm preferences={preferences} />;
}
