import type { Metadata } from "next";
import { AchievementBadge } from "@/components/learning/AchievementBadge";
import { PageHeader } from "@/components/shell/PageHeader";
import { ACHIEVEMENTS } from "@/lib/sample-data/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Achievements",
  robots: { index: false },
};

export default function AchievementsPage() {
  return (
    <>
      <PageHeader
        title="Achievements"
        description="A quiet record of what you've earned — no leaderboard, no comparison."
      />
      <div className={styles.grid}>
        {ACHIEVEMENTS.map((a) => (
          <AchievementBadge key={a.id} label={a.label} locked={!a.earned} />
        ))}
      </div>
    </>
  );
}
