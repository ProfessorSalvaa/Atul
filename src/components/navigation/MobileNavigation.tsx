import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./MobileNavigation.module.css";

export interface MobileNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  active?: boolean;
  onClick?: () => void;
}

export interface MobileNavigationProps {
  items: MobileNavItem[];
  className?: string;
}

/** Bottom tab bar. Cap at 5 items per the design system's MobileNav slot count. */
export function MobileNavigation({ items, className }: MobileNavigationProps) {
  return (
    <nav className={cn(styles.nav, className)} aria-label="Primary">
      {items.slice(0, 5).map((item) => (
        <button
          key={item.id}
          type="button"
          className={styles.item}
          data-active={item.active || undefined}
          aria-current={item.active ? "page" : undefined}
          onClick={item.onClick}
        >
          {item.icon}
          <span className={styles.label}>{item.label}</span>
        </button>
      ))}
    </nav>
  );
}
