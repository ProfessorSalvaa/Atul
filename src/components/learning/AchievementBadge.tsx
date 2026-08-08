import { Award, Lock } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./AchievementBadge.module.css";

export interface AchievementBadgeProps {
  label: string;
  icon?: ReactNode;
  locked?: boolean;
  className?: string;
}

export function AchievementBadge({ label, icon, locked, className }: AchievementBadgeProps) {
  return (
    <div className={cn(styles.root, className)}>
      <span className={styles.iconWrap} data-locked={locked || undefined}>
        {locked ? (
          <Lock size={20} aria-hidden="true" />
        ) : (
          (icon ?? <Award size={24} aria-hidden="true" />)
        )}
      </span>
      <span className={styles.label} data-locked={locked || undefined}>
        {label}
      </span>
    </div>
  );
}
