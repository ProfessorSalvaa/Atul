import { Inbox } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./EmptyState.module.css";

export interface EmptyStateProps {
  icon?: ReactNode;
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
}

export function EmptyState({ icon, title, description, action, className }: EmptyStateProps) {
  return (
    <div className={cn(styles.root, className)}>
      <span className={styles.icon}>{icon ?? <Inbox size={22} aria-hidden="true" />}</span>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {action}
    </div>
  );
}
