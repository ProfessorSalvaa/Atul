"use client";

import { useRouter } from "next/navigation";
import type { MouseEvent } from "react";

type Router = ReturnType<typeof useRouter>;

/**
 * The M1 design system's Sidebar/MobileNavigation render plain <a> tags by
 * design (framework-agnostic, unit-testable without a router). Rather than
 * couple those components to next/navigation, the app-shell integration
 * layer intercepts plain left-clicks to get client-side routing, while
 * leaving modified clicks (cmd/ctrl/shift/middle-click) alone so "open in
 * new tab" keeps working exactly like a real <a href>. Breadcrumb already
 * accepts a `linkComponent` prop for this same reason — this covers the
 * two components that don't.
 *
 * `createNavClickHandler` is the plain-function form, for building one
 * handler per item inside a list (hooks can't be called in a loop).
 * `useNavLinkClick` is the hook form, for the single-link case.
 */
export function createNavClickHandler(router: Router, href: string) {
  return (event: MouseEvent<HTMLElement>) => {
    const isModified =
      event.defaultPrevented ||
      event.button !== 0 ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey;
    if (isModified) return;
    event.preventDefault();
    router.push(href);
  };
}

export function useNavLinkClick(href: string) {
  const router = useRouter();
  return createNavClickHandler(router, href);
}
