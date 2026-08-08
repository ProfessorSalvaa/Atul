import type { ReactNode } from "react";
import { SettingsSubNav } from "./SettingsSubNav";
import styles from "./SettingsShell.module.css";

/** Settings Layout — nests inside the Dashboard shell's <main> (still gets
 *  sidebar/topnav/mobile-nav from AppShell) and adds the Account / Billing
 *  / Notifications tab strip P0 §21 describes as three separate routes. */
export function SettingsShell({ children }: { children: ReactNode }) {
  return (
    <div className={styles.wrap}>
      <h1 className={styles.heading}>Settings</h1>
      <SettingsSubNav />
      {children}
    </div>
  );
}
