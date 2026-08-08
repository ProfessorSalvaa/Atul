import type { ReactNode } from "react";
import { PublicShell } from "@/components/shell/PublicShell";

/** Home Layout — wraps just "/". Shares PublicShell (header+footer) with
 *  Marketing/Blog; kept as its own layout file per M2's deliverable list
 *  so the home page's container can diverge (e.g. full-bleed hero) without
 *  touching Marketing pages. */
export default function HomeLayout({ children }: { children: ReactNode }) {
  return <PublicShell>{children}</PublicShell>;
}
