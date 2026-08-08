import Link from "next/link";
import type { ReactNode } from "react";
import { PageTransition } from "./PageTransition";
import { ThemeSwitcher } from "./ThemeSwitcher";
import styles from "./AuthChrome.module.css";

/**
 * Minimal chrome for the Auth Layout: /login, /signup, /forgot-password,
 * /reset-password, and /onboarding. These are single-task, focused flows —
 * no sidebar/topnav/footer, just a centered card. Onboarding is grouped
 * here rather than under the Dashboard Layout because a first-run user
 * hasn't earned the full app chrome yet and the stepper wants the same
 * "no distractions" treatment as auth (see docs/navigation.md).
 */
export function AuthChrome({ children }: { children: ReactNode }) {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/" className={styles.logo}>
          Curitiq
        </Link>
        <ThemeSwitcher />
      </header>
      <main id="main-content" className={styles.main} tabIndex={-1}>
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
