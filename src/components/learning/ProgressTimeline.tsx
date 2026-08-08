import { cn } from "@/lib/cn";
import styles from "./ProgressTimeline.module.css";

export type TimelineState = "done" | "current" | "upcoming";

export interface TimelineEntry {
  id: string;
  title: string;
  dateLabel?: string;
  state: TimelineState;
}

export interface ProgressTimelineProps {
  entries: TimelineEntry[];
  className?: string;
}

export function ProgressTimeline({ entries, className }: ProgressTimelineProps) {
  return (
    <ol className={cn(styles.list, className)}>
      {entries.map((entry, i) => (
        <li key={entry.id} className={styles.item}>
          <span className={styles.rail}>
            <span className={styles.dot} data-state={entry.state} />
            {i < entries.length - 1 && <span className={styles.line} />}
          </span>
          <span className={styles.body}>
            <p className={styles.title} data-state={entry.state}>
              {entry.title}
            </p>
            {entry.dateLabel && <p className={styles.date}>{entry.dateLabel}</p>}
          </span>
        </li>
      ))}
    </ol>
  );
}
