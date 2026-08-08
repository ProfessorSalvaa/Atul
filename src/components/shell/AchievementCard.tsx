import { AchievementBadge } from "@/components/learning/AchievementBadge";
import { Progress } from "@/components/ui/Progress";
import type { SampleAchievement } from "@/lib/sample-data/content";
import styles from "./AchievementCard.module.css";

/**
 * M2.5 addition — composes the frozen M1 `AchievementBadge` with progress
 * and earned-date detail rather than modifying it (design system freeze
 * from M2 still holds; see docs/design-system-decisions.md). Wraps, never
 * edits.
 */
export function AchievementCard({ achievement }: { achievement: SampleAchievement }) {
  const { label, description, earned, progress } = achievement;
  return (
    <div className={styles.root} title={description}>
      <AchievementBadge label={label} locked={!earned} />
      {earned ? (
        <p className={styles.meta}>Earned</p>
      ) : progress ? (
        <div className={styles.progressWrap}>
          <Progress value={progress.current} max={progress.target} className={styles.progress} />
          <p className={styles.meta}>
            {progress.current}/{progress.target}
          </p>
        </div>
      ) : (
        <p className={styles.meta}>Locked</p>
      )}
    </div>
  );
}
