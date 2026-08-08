"use client";

import * as RadixProgress from "@radix-ui/react-progress";
import { cn } from "@/lib/cn";
import styles from "./Progress.module.css";

export interface ProgressProps {
  value: number;
  max?: number;
  label?: string;
  showValue?: boolean;
  className?: string;
}

export function Progress({ value, max = 100, label, showValue, className }: ProgressProps) {
  const pct = Math.min(100, Math.max(0, (value / max) * 100));
  return (
    <div>
      {(label || showValue) && (
        <div className={styles.label}>
          {label && <span>{label}</span>}
          {showValue && <span>{Math.round(pct)}%</span>}
        </div>
      )}
      <RadixProgress.Root
        value={value}
        max={max}
        className={cn(styles.root, className)}
        aria-label={label}
      >
        <RadixProgress.Indicator
          className={styles.indicator}
          style={{ transform: `translateX(-${100 - pct}%)` }}
        />
      </RadixProgress.Root>
    </div>
  );
}
