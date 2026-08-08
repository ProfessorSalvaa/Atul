import type { ReactNode } from "react";
import { AppShell } from "@/components/shell/AppShell";
import { requireAuth } from "@/lib/navigation/route-guard";

/** Dashboard Layout — dashboard, learn, progress, achievements, search,
 *  profile, and (nested) settings. Every route under this layout is in
 *  PROTECTED_ROUTE_PREFIXES (src/lib/navigation/route-guard.ts); this is
 *  the single enforcement point for the whole group — requireAuth
 *  redirects to /login before any child page renders. */
export default async function AppLayout({ children }: { children: ReactNode }) {
  const user = await requireAuth();
  return (
    <AppShell user={{ name: user.name, email: user.email, avatarUrl: user.avatarUrl }}>
      {children}
    </AppShell>
  );
}
