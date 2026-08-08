"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import buttonStyles from "@/components/ui/Button.module.css";
import { cn } from "@/lib/cn";
import { PUBLIC_NAV_LINKS } from "@/lib/navigation/nav-config";
import { ThemeSwitcher } from "./ThemeSwitcher";
import styles from "./PublicHeader.module.css";

/**
 * Header for the unauthenticated site (Home/Marketing/Blog layouts) — a
 * different surface from TopNavigation (M1), which is the authenticated
 * app-shell bar with search/notifications/profile. A logged-out visitor
 * needs nav links + login/signup CTAs, not a command-palette trigger or a
 * bell icon with nothing behind it yet.
 *
 * Login/signup are styled as Buttons by importing Button's own CSS Module
 * classes rather than nesting a <Link> inside a <button> (invalid HTML —
 * Button isn't polymorphic) or modifying Button.tsx to add `asChild`.
 */
export function PublicHeader({ signedIn }: { signedIn: boolean }) {
  const pathname = usePathname();

  return (
    <header className={styles.bar}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo} aria-label="Curitiq home">
          Curitiq
        </Link>
        <nav className={styles.nav} aria-label="Primary">
          {PUBLIC_NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={styles.navLink}
                aria-current={active ? "page" : undefined}
                data-active={active || undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>
        <div className={styles.actions}>
          <ThemeSwitcher />
          {signedIn ? (
            <Link
              href="/dashboard"
              className={cn(buttonStyles.button, buttonStyles.primary, buttonStyles.sm)}
            >
              Dashboard
            </Link>
          ) : (
            <>
              <Link
                href="/login"
                className={cn(buttonStyles.button, buttonStyles.ghost, buttonStyles.sm)}
              >
                Log in
              </Link>
              <Link
                href="/signup"
                className={cn(buttonStyles.button, buttonStyles.primary, buttonStyles.sm)}
              >
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
