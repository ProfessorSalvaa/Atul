"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

export interface ScrollManagerProps {
  /** DOM id of the element that owns independent scroll (the app shell's
   *  content region) and receives focus after a route change. */
  targetId?: string;
}

/**
 * Handles the two things Next.js's built-in scroll behavior doesn't cover
 * for a fixed-sidebar app shell:
 *
 * 1. Scroll restoration — Next resets *window* scroll on push navigations,
 *    but the app shell's content lives in its own scrollable region (the
 *    sidebar/topnav stay put), so window scroll was never the thing that
 *    needed resetting here. This resets the content region instead.
 * 2. Focus management — moves focus to the main landmark on route change
 *    so screen readers announce the new page, matching standard SPA a11y
 *    guidance (Next's default App Router behavior doesn't move focus).
 *
 * Skips the very first render (no navigation has happened yet, and moving
 * focus away from the browser chrome on initial load would be disruptive).
 */
export function ScrollManager({ targetId = "main-content" }: ScrollManagerProps) {
  const pathname = usePathname();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const target = document.getElementById(targetId);
    if (!target) return;
    target.scrollTop = 0;
    target.focus({ preventScroll: true });
  }, [pathname, targetId]);

  return null;
}
