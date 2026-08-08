"use client";

import { useSyncExternalStore } from "react";

/**
 * Matches a CSS media query. Values mirror the breakpoint tokens in
 * src/styles/tokens/layout.css (--bp-sm..--bp-2xl) — kept as literal px
 * here because matchMedia needs a resolved value, not a custom property.
 *
 * Built on useSyncExternalStore rather than useState+useEffect so the
 * initial value comes from a subscription, not a setState call inside an
 * effect body (the latter causes an extra render pass and is what
 * react-hooks/set-state-in-effect warns against).
 */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Breakpoint tokens from src/styles/tokens/layout.css, as JS px values. */
export const BREAKPOINTS = {
  sm: 480,
  md: 768,
  lg: 1024,
  xl: 1280,
  "2xl": 1536,
} as const;

/** True below the `lg` breakpoint — the point the app shell switches from
 *  desktop sidebar to mobile bottom nav. */
export function useIsMobile(): boolean {
  return useMediaQuery(`(max-width: ${BREAKPOINTS.lg - 1}px)`);
}
