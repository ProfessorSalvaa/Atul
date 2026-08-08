"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { SETTINGS_NAV_LINKS } from "@/lib/navigation/nav-config";
import styles from "./SettingsSubNav.module.css";

/** Tab-style sub-navigation for the Settings Layout — Account / Billing /
 *  Notifications. Real <Link> elements (not a Tabs widget) since these are
 *  distinct routes, not client-side panel switches. */
export function SettingsSubNav() {
  const pathname = usePathname();

  return (
    <nav className={styles.nav} aria-label="Settings">
      {SETTINGS_NAV_LINKS.map((link) => {
        const active = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={styles.link}
            aria-current={active ? "page" : undefined}
            data-active={active || undefined}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
