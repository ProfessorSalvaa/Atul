"use client";

import { Clock, Lock } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Progress } from "@/components/ui/Progress";
import { cn } from "@/lib/cn";
import styles from "./CourseCard.module.css";

export type CourseLevel = "beginner" | "intermediate" | "advanced";

export interface CourseCardProps {
  title: string;
  description?: string;
  level: CourseLevel;
  durationLabel: string;
  premium?: boolean;
  /** 0–100. Omit for a course the user hasn't enrolled in. */
  progress?: number;
  onClick?: () => void;
  className?: string;
}

const levelLabel: Record<CourseLevel, string> = {
  beginner: "Beginner",
  intermediate: "Intermediate",
  advanced: "Advanced",
};

export function CourseCard({
  title,
  description,
  level,
  durationLabel,
  premium,
  progress,
  onClick,
  className,
}: CourseCardProps) {
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => (e.key === "Enter" || e.key === " ") && onClick?.()}
      className={cn(styles.card, className)}
    >
      <div className={styles.cover} aria-hidden="true" />
      <div className={styles.body}>
        <div className={styles.metaRow}>
          <Badge tone="neutral">{levelLabel[level]}</Badge>
          {premium && (
            <Badge tone="brand">
              <Lock size={11} aria-hidden="true" /> Premium
            </Badge>
          )}
        </div>
        <h3 className={styles.title}>{title}</h3>
        {description && <p className={styles.description}>{description}</p>}
        {typeof progress === "number" ? (
          <Progress value={progress} showValue />
        ) : (
          <div className={styles.footer}>
            <span className={styles.durationRow}>
              <Clock size={13} aria-hidden="true" /> {durationLabel}
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
