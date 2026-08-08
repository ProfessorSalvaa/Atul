import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Sidebar.module.css";

export interface SidebarNavItem {
  id: string;
  label: string;
  icon: ReactNode;
  href?: string;
  active?: boolean;
  onClick?: () => void;
}

export interface SidebarProps {
  logo?: ReactNode;
  items: SidebarNavItem[];
  collapsed?: boolean;
  footer?: ReactNode;
  className?: string;
}

export function Sidebar({ logo, items, collapsed, footer, className }: SidebarProps) {
  return (
    <aside className={cn(styles.sidebar, className)} data-collapsed={collapsed || undefined}>
      {logo && <div className={styles.logoSlot}>{logo}</div>}
      <nav className={styles.nav} aria-label="Primary">
        {items.map((item) => {
          const Tag = item.href ? "a" : "button";
          return (
            <Tag
              key={item.id}
              href={item.href}
              type={item.href ? undefined : "button"}
              onClick={item.onClick}
              data-active={item.active || undefined}
              aria-current={item.active ? "page" : undefined}
              className={styles.item}
            >
              <span className={styles.icon} aria-hidden="true">
                {item.icon}
              </span>
              <span className={styles.label}>{item.label}</span>
            </Tag>
          );
        })}
      </nav>
      {footer && <div className={styles.footer}>{footer}</div>}
    </aside>
  );
}
