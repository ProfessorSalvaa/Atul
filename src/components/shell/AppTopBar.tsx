"use client";

import { User } from "lucide-react";
import Link from "next/link";
import { Avatar } from "@/components/ui/Avatar";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/components/ui/Dropdown";
import { TopNavigation } from "@/components/navigation/TopNavigation";
import { AITutorLauncher } from "./AITutorLauncher";
import { NotificationPanel } from "./NotificationPanel";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useShell } from "./ShellProvider";
import styles from "./AppTopBar.module.css";

/** Top bar for the authenticated app shell — wraps M1's TopNavigation and
 *  fills its `actions` slot with the shell-level pieces P0 §4 calls for:
 *  AI Tutor launcher, notification bell, theme toggle, profile menu. */
export function AppTopBar() {
  const { setCommandPaletteOpen } = useShell();

  return (
    <TopNavigation
      onSearchClick={() => setCommandPaletteOpen(true)}
      actions={
        <div className={styles.actions}>
          <AITutorLauncher />
          <NotificationPanel />
          <ThemeSwitcher />
          <Dropdown>
            <DropdownTrigger asChild>
              <button type="button" className={styles.profileTrigger} aria-label="Profile menu">
                <Avatar fallback="U" size="sm" />
              </button>
            </DropdownTrigger>
            <DropdownContent align="end">
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
