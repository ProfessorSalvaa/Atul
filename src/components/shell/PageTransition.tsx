"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import styles from "./PageTransition.module.css";

/**
 * Lightweight page-transition wrapper — no animation library. Keying a div
 * by pathname makes React remount it on navigation, which re-triggers the
 * CSS fade/slide-in animation below. `prefers-reduced-motion` is already
 * handled globally in globals.css (animation-duration forced to ~0), so
 * this doesn't need its own reduced-motion check.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  return (
    <div key={pathname} className={styles.transition}>
      {children}
    </div>
  );
}
