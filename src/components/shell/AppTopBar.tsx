"use client";

import { LogOut, User } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Avatar } from "@/components/ui/Avatar";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/components/ui/Dropdown";
import { TopNavigation } from "@/components/navigation/TopNavigation";
import { NOTIFICATIONS } from "@/lib/sample-data/content";
import { getInitials } from "@/lib/initials";
import { logoutAction } from "@/lib/auth/actions";
import { AITutorLauncher } from "./AITutorLauncher";
import { NotificationPanel } from "./NotificationPanel";
import { ThemeSwitcher } from "./ThemeSwitcher";
import { useShell } from "./ShellProvider";
import styles from "./AppTopBar.module.css";

export interface AppTopBarUser {
  name: string;
  email: string;
  avatarUrl?: string | null;
}

/** Top bar for the authenticated app shell — wraps M1's TopNavigation and
 *  fills its `actions` slot with the shell-level pieces P0 §4 calls for:
 *  AI Tutor launcher, notification bell, theme toggle, profile menu.
 *  `user` comes from the real session (see (app)/layout.tsx →
 *  requireAuth) as of M3 — notifications are still sample-data (M5+). */
export function AppTopBar({ user }: { user: AppTopBarUser }) {
  const { setCommandPaletteOpen } = useShell();
  const [loggingOut, setLoggingOut] = useState(false);
  const router = useRouter();

  async function handleLogout() {
    setLoggingOut(true);
    await logoutAction();
    router.push("/login");
    router.refresh();
  }

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
                <Avatar fallback={getInitials(user.name)} size="sm" />
              </button>
            </DropdownTrigger>
            <DropdownContent align="end">
              <div className={styles.profileHeader}>
                <p className={styles.profileName}>{user.name}</p>
                <p className={styles.profileEmail}>{user.email}</p>
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
              <DropdownItem destructive disabled={loggingOut} onSelect={handleLogout}>
                <span className={styles.menuLink}>
                  <LogOut size={15} aria-hidden="true" />
                  {loggingOut ? "Logging out…" : "Log out"}
                </span>
              </DropdownItem>
            </DropdownContent>
          </Dropdown>
        </div>
      }
    />
  );
}
