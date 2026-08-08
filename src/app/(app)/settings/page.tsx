import type { Metadata } from "next";
import { requireAuth } from "@/lib/navigation/route-guard";
import { SettingsAccountForm } from "./SettingsAccountForm";

export const metadata: Metadata = {
  title: "Account Settings",
  robots: { index: false },
};

export default async function SettingsAccountPage() {
  const user = await requireAuth("/settings");
  return <SettingsAccountForm user={{ name: user.name, email: user.email }} />;
}
