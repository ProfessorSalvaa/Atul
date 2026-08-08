import type { Metadata } from "next";
import { SettingsAccountForm } from "./SettingsAccountForm";

export const metadata: Metadata = {
  title: "Account Settings",
  robots: { index: false },
};

export default function SettingsAccountPage() {
  return <SettingsAccountForm />;
}
