"use client";

import { Check, Code2, FileText, Lock, Layers } from "lucide-react";
import { cn } from "@/lib/cn";
import styles from "./LessonCard.module.css";

export type LessonType = "concept" | "code" | "flashcard";

const typeIcon: Record<LessonType, typeof FileText> = {
  concept: FileText,
  code: Code2,
  flashcard: Layers,
};

export interface LessonCardProps {
  title: string;
  type: LessonType;
  durationLabel: string;
  completed?: boolean;
  locked?: boolean;
  onClick?: () => void;
  className?: string;
}

export function LessonCard({
  title,
  type,
  durationLabel,
  completed,
  locked,
  onClick,
  className,
}: LessonCardProps) {
  const Icon = typeIcon[type];
  return (
    <div
      role="button"
      tabIndex={locked ? -1 : 0}
      aria-disabled={locked || undefined}
      onClick={() => !locked && onClick?.()}
      onKeyDown={(e) => !locked && (e.key === "Enter" || e.key === " ") && onClick?.()}
      data-locked={locked || undefined}
      className={cn(styles.card, className)}
    >
      <span className={styles.iconWrap} data-completed={completed || undefined}>
        {locked ? (
          <Lock size={15} aria-hidden="true" />
        ) : completed ? (
          <Check size={16} aria-hidden="true" />
        ) : (
          <Icon size={15} aria-hidden="true" />
        )}
      </span>
      <div className={styles.body}>
        <p className={styles.title}>{title}</p>
        <p className={styles.meta}>{durationLabel}</p>
      </div>
    </div>
  );
}
