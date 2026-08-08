import type { ReactNode } from "react";
import { SettingsShell } from "@/components/shell/SettingsShell";

/** Settings Layout — nests inside the Dashboard shell (AppLayout above),
 *  adding the Account / Billing / Notifications sub-nav. */
export default function SettingsLayout({ children }: { children: ReactNode }) {
  return <SettingsShell>{children}</SettingsShell>;
}
