import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./ModuleCard.module.css";

export interface ModuleCardProps {
  title: string;
  lessonCount: number;
  completedCount?: number;
  /** LessonCard elements. */
  children?: ReactNode;
  className?: string;
}

export function ModuleCard({
  title,
  lessonCount,
  completedCount = 0,
  children,
  className,
}: ModuleCardProps) {
  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.header}>
        <h4 className={styles.title}>{title}</h4>
        <span className={styles.count}>
          {completedCount}/{lessonCount} lessons
        </span>
      </div>
      {children && <div className={styles.list}>{children}</div>}
    </div>
  );
}
