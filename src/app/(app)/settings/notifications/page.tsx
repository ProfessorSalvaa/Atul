import type { Metadata } from "next";
import { SettingsNotificationsForm } from "./SettingsNotificationsForm";

export const metadata: Metadata = {
  title: "Notification Settings",
  robots: { index: false },
};

export default function SettingsNotificationsPage() {
  return <SettingsNotificationsForm />;
}
