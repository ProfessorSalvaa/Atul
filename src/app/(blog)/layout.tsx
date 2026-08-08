import type { ReactNode } from "react";
import { PublicShell } from "@/components/shell/PublicShell";

/** Blog Layout — same header/footer chrome as Marketing, but a narrower
 *  reading column suited to Newsreader long-form typography (P0 §7/§21). */
export default function BlogLayout({ children }: { children: ReactNode }) {
  return <PublicShell narrow>{children}</PublicShell>;
}
