"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Sidebar, type SidebarNavItem } from "@/components/navigation/Sidebar";
import { createNavClickHandler } from "@/hooks/use-nav-link-click";
import { APP_SIDEBAR_LINKS } from "@/lib/navigation/nav-config";

/**
 * Desktop sidebar for the authenticated app shell — wraps M1's Sidebar with
 * real route state. Hidden below `lg` via CSS on the shell layout; MobileNav
 * takes over at that point.
 *
 * Sidebar's `onClick` is typed as `() => void` (a framework-agnostic
 * design-system contract with no DOM event). The click handler here needs
 * the real MouseEvent to decide whether a click is plain (SPA-navigate) or
 * modified (ctrl/cmd/middle-click — let the browser open a new tab). Since
 * React invokes the DOM listener with the event regardless of the declared
 * TS signature, this casts rather than widening Sidebar's public type or
 * dropping modifier-key support.
 */
export function AppSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const items: SidebarNavItem[] = APP_SIDEBAR_LINKS.map((link) => ({
    id: link.id,
    label: link.label,
    icon: link.icon,
    href: link.href,
    active: pathname === link.href || pathname.startsWith(`${link.href}/`),
    onClick: createNavClickHandler(router, link.href) as unknown as () => void,
  }));

  return (
    <Sidebar
      logo={
        <Link href="/dashboard" aria-label="Curitiq home">
          Curitiq
        </Link>
      }
      items={items}
    />
  );
}
