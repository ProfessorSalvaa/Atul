"use client";

import { Award, Bell, BellRing, MessageSquare, Sparkles, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  Dropdown,
  DropdownContent,
  DropdownItem,
  DropdownLabel,
  DropdownTrigger,
} from "@/components/ui/Dropdown";
import { EmptyState } from "@/components/ui/EmptyState";
import styles from "./NotificationPanel.module.css";

export type NotificationType = "achievement" | "content" | "streak" | "social";

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  read?: boolean;
  type?: NotificationType;
  timeAgo?: string;
}

export interface NotificationPanelProps {
  items?: NotificationItem[];
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const typeIcon: Record<NotificationType, typeof Bell> = {
  achievement: Award,
  content: Sparkles,
  streak: TrendingUp,
  social: MessageSquare,
};

/**
 * UI-only per M2 scope — no `notification.list`/`notification.markRead`
 * wiring yet (that's the data layer, M5+). "Mark all as read" is local
 * component state, not a mutation. Defaults to an empty inbox so the shell
 * still demonstrates the P0 §13 empty-state copy ("Nothing yet.") when no
 * `items` are passed.
 */
export function NotificationPanel({ items = [], open, onOpenChange }: NotificationPanelProps) {
  const [localItems, setLocalItems] = useState(items);
  // Adjust local state during render when the `items` prop identity
  // changes, per https://react.dev/learn/you-might-not-need-an-effect —
  // avoids a setState-in-effect render cascade for what's just a
  // controlled-to-local handoff (so "Mark all read" can be local state).
  const [prevItems, setPrevItems] = useState(items);
  if (items !== prevItems) {
    setPrevItems(items);
    setLocalItems(items);
  }

  const unreadCount = localItems.filter((item) => !item.read).length;

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
        <div className={styles.header}>
          <DropdownLabel>Notifications</DropdownLabel>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              className={styles.markAll}
              onClick={(e) => {
                e.stopPropagation();
                setLocalItems((prev) => prev.map((item) => ({ ...item, read: true })));
              }}
            >
              Mark all read
            </Button>
          )}
        </div>
        {localItems.length === 0 ? (
          <div className={styles.empty}>
            <EmptyState title="Nothing yet." />
          </div>
        ) : (
          localItems.map((item) => {
            const Icon = item.type ? typeIcon[item.type] : Bell;
            return (
              <DropdownItem
                key={item.id}
                className={styles.item}
                data-unread={!item.read || undefined}
              >
                <span className={styles.itemIcon} aria-hidden="true">
                  <Icon size={14} />
                </span>
                <div className={styles.itemBody}>
                  <p className={styles.itemTitle}>{item.title}</p>
                  <p className={styles.itemDescription}>{item.description}</p>
                  {item.timeAgo && <p className={styles.itemTime}>{item.timeAgo}</p>}
                </div>
                {!item.read && <span className={styles.unreadDot} aria-hidden="true" />}
              </DropdownItem>
            );
          })
        )}
      </DropdownContent>
    </Dropdown>
  );
}
