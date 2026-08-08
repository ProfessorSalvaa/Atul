import { cn } from "@/lib/cn";
import { Spinner } from "./Spinner";
import styles from "./LoadingState.module.css";

export interface LoadingStateProps {
  label?: string;
  className?: string;
}

/** Full-region loading placeholder. For inline content prefer Skeleton. */
export function LoadingState({ label = "Loading…", className }: LoadingStateProps) {
  return (
    <div className={cn(styles.root, className)}>
      <Spinner size={24} brand />
      <span className={styles.label}>{label}</span>
    </div>
  );
}
