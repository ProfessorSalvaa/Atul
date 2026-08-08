import { Bell, Search } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./TopNavigation.module.css";

export interface TopNavigationProps {
  logo?: ReactNode;
  onSearchClick?: () => void;
  notificationCount?: number;
  /** Theme toggle, profile menu, etc. */
  actions?: ReactNode;
  className?: string;
}

export function TopNavigation({
  logo,
  onSearchClick,
  notificationCount,
  actions,
  className,
}: TopNavigationProps) {
  return (
    <header className={cn(styles.bar, className)}>
      <div className={styles.left}>
        {logo}
        <button type="button" className={styles.searchTrigger} onClick={onSearchClick}>
          <Search size={15} aria-hidden="true" />
          Search…
          <span className={styles.kbd}>⌘K</span>
        </button>
      </div>
      <div className={styles.right}>
        <button type="button" className={styles.iconButton} aria-label="Notifications">
          <Bell size={18} aria-hidden="true" />
          {typeof notificationCount === "number" && notificationCount > 0 && (
            <span className="sr-only">{notificationCount} unread</span>
          )}
        </button>
        {actions}
      </div>
    </header>
  );
}
