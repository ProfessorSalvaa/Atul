import type { Metadata } from "next";
import { requireAuth } from "@/lib/navigation/route-guard";
import { SettingsBillingActions } from "./SettingsBillingActions";

export const metadata: Metadata = {
  title: "Billing Settings",
  robots: { index: false },
};

export default async function SettingsBillingPage() {
  const user = await requireAuth("/settings/billing");
  return <SettingsBillingActions plan={user.plan} />;
}
