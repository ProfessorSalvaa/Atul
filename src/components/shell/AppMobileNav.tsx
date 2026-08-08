"use client";

import { usePathname, useRouter } from "next/navigation";
import { MobileNavigation, type MobileNavItem } from "@/components/navigation/MobileNavigation";
import { MOBILE_NAV_ITEMS } from "@/lib/navigation/nav-config";
import { useShell } from "./ShellProvider";

/**
 * Bottom tab bar for small screens — visible only below `lg` via CSS.
 * MobileNavigation always renders a <button> (no href/anchor semantics to
 * preserve, unlike Sidebar), so a plain router.push on click is correct
 * here — no modifier-key handling needed. The "Tutor" slot opens the AI
 * Tutor drawer instead of navigating, matching P0 §4/§10 (the tutor is a
 * persistent panel, not a route).
 */
export function AppMobileNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { setAiTutorOpen } = useShell();

  const items: MobileNavItem[] = MOBILE_NAV_ITEMS.map((item) => {
    if (!("href" in item) || !item.href) {
      return {
        id: item.id,
        label: item.label,
        icon: item.icon,
        onClick: () => setAiTutorOpen(true),
      };
    }
    return {
      id: item.id,
      label: item.label,
      icon: item.icon,
      active: pathname === item.href || pathname.startsWith(`${item.href}/`),
      onClick: () => router.push(item.href),
    };
  });

  return <MobileNavigation items={items} />;
}
