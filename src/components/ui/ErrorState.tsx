import { AlertTriangle } from "lucide-react";
import { cn } from "@/lib/cn";
import styles from "./EmptyState.module.css";

export interface ErrorStateProps {
  title?: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

/** Shares EmptyState's layout; a distinct component because the intent — and
 *  likely future affordances (retry, report) — differ from a neutral empty
 *  list. */
export function ErrorState({
  title = "Something went wrong",
  description = "That didn't load. Try again in a moment.",
  action,
  className,
}: ErrorStateProps) {
  return (
    <div className={cn(styles.root, className)} role="alert">
      <span className={styles.icon}>
        <AlertTriangle size={22} aria-hidden="true" />
      </span>
      <p className={styles.title}>{title}</p>
      {description && <p className={styles.description}>{description}</p>}
      {action}
    </div>
  );
}
