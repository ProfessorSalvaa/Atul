"use client";

import { Bell, BellRing } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownTrigger,
} from "@/components/ui/Dropdown";
import { EmptyState } from "@/components/ui/EmptyState";
import styles from "./NotificationPanel.module.css";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  read?: boolean;
}

export interface NotificationPanelProps {
  items?: NotificationItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

/**
 * UI-only per M2 scope — no `notification.list`/`notification.markRead`
 * wiring yet (that's the data layer, M5+). Defaults to an empty inbox so
 * the shell demonstrates the P0 §13 empty-state copy ("Nothing yet.")
 * rather than fabricated notifications.
 */
export function NotificationPanel({ items = [], open, onOpenChange }: NotificationPanelProps) {
  const unreadCount = items.filter((item) => !item.read).length;

  return (
    <Dropdown open={open} onOpenChange={onOpenChange}>
      <DropdownTrigger asChild>
        <button type="button" className={styles.trigger} aria-label="Notifications">
          {unreadCount > 0 ? (
            <BellRing size={18} aria-hidden="true" />
          ) : (
            <Bell size={18} aria-hidden="true" />
          )}
          {unreadCount > 0 && (
            <Badge tone="brand" className={styles.badge}>
              {unreadCount}
            </Badge>
          )}
        </button>
      </DropdownTrigger>
      <DropdownContent align="end" className={styles.content}>
        <DropdownLabel>Notifications</DropdownLabel>
        {items.length === 0 ? (
          <div className={styles.empty}>
            <EmptyState title="Nothing yet." />
          </div>
        ) : (
          items.map((item) => (
            <DropdownItem key={item.id} className={styles.item}>
              <p className={styles.itemTitle}>{item.title}</p>
              <p className={styles.itemDescription}>{item.description}</p>
            </DropdownItem>
          ))
        )}
      </DropdownContent>
    </Dropdown>
  );
}
