import type { ReactNode } from "react";
import { AppMobileNav } from "./AppMobileNav";
import { AppSidebar } from "./AppSidebar";
import { AppTopBar } from "./AppTopBar";
import { PageTransition } from "./PageTransition";
import styles from "./AppShell.module.css";

/**
 * Dashboard Layout shell — sidebar (desktop) + top bar + scrollable content
 * region + mobile bottom nav (small screens). Sidebar and MobileNav are both
 * always rendered and toggled by CSS media query (not JS), so there's no
 * hydration flash while screen size is being determined.
 *
 * SkipLink, CommandPaletteHost, AITutorHost, and ScrollManager are mounted
 * once in the root layout (they're global overlays / cross-cutting
 * concerns, not specific to this shell) — see src/app/layout.tsx.
 */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.shell}>
      <div className={styles.sidebarSlot}>
        <AppSidebar />
      </div>
      <div className={styles.column}>
        <AppTopBar />
        <main id="main-content" tabIndex={-1} className={styles.content}>
          <PageTransition>{children}</PageTransition>
        </main>
      </div>
      <div className={styles.mobileNavSlot}>
        <AppMobileNav />
      </div>
    </div>
  );
}
