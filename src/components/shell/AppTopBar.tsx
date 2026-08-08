"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/components/ui/Dropdown";
import { TopNavigation } from "@/components/navigation/TopNavigation";
import { NOTIFICATIONS, USER_PROFILE } from "@/lib/sample-data/content";
import { AITutorLauncher } from "./AITutorLauncher";
import { NotificationPanel } from "./NotificationPanel";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useShell } from "./ShellProvider";
import styles from "./AppTopBar.module.css";

/** Top bar for the authenticated app shell — wraps M1's TopNavigation and
 *  fills its `actions` slot with the shell-level pieces P0 §4 calls for:
 *  AI Tutor launcher, notification bell, theme toggle, profile menu.
 *  M2.5: seeded with sample-data (`NOTIFICATIONS`, `USER_PROFILE`) so the
 *  authenticated shell reads as a real, in-use account rather than an
 *  empty one — still no `notification.list`/`user.me` call (M5+). */
export function AppTopBar() {
  const { setCommandPaletteOpen } = useShell();

  return (
    <TopNavigation
      onSearchClick={() => setCommandPaletteOpen(true)}
      actions={
        <div className={styles.actions}>
          <AITutorLauncher />
          <NotificationPanel items={NOTIFICATIONS} />
          <ThemeSwitcher />
          <Dropdown>
            <DropdownTrigger asChild>
              <button type="button" className={styles.profileTrigger} aria-label="Profile menu">
                <Avatar fallback={USER_PROFILE.initials} size="sm" />
              </button>
            </DropdownTrigger>
            <DropdownContent align="end">
              <div className={styles.profileHeader}>
                <p className={styles.profileName}>{USER_PROFILE.name}</p>
                <p className={styles.profileEmail}>{USER_PROFILE.email}</p>
              </div>
              <DropdownItem asChild>
                <Link href="/profile" className={styles.menuLink}>
                  <User size={15} aria-hidden="true" />
                  Profile
                </Link>
              </DropdownItem>
              <DropdownItem asChild>
                <Link href="/settings" className={styles.menuLink}>
                  Settings
                </Link>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      }
    />
  );
}
