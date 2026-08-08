import type { Metadata } from "next";
import { SettingsBillingActions } from "./SettingsBillingActions";

export const metadata: Metadata = {
  title: "Billing Settings",
  robots: { index: false },
};

export default function SettingsBillingPage() {
  return <SettingsBillingActions />;
}
