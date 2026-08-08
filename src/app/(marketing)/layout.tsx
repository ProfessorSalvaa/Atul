import type { ReactNode } from "react";
import { PublicShell } from "@/components/shell/PublicShell";

/** Marketing Layout — pricing, course catalog, course detail, about,
 *  terms, privacy. */
export default function MarketingLayout({ children }: { children: ReactNode }) {
  return <PublicShell>{children}</PublicShell>;
}
