import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";

/** Dashboard Layout — dashboard, learn, progress, achievements, search,
 *  profile, and (nested) settings. */
export default function AppLayout({ children }: { children: ReactNode }) {
  return <AppShell>{children}</AppShell>;
}
