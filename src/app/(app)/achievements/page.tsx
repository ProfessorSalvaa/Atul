import type { Metadata } from "next";
import { AchievementCard } from "@/components/shell/AchievementCard";
import { PageHeader } from "@/components/shell/PageHeader";
import { Card } from "@/components/ui/Card";
import { ACHIEVEMENTS, type SampleAchievement } from "@/lib/sample-data/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Achievements",
  robots: { index: false },
};

const CATEGORIES: { key: SampleAchievement["category"]; label: string }[] = [
  { key: "milestone", label: "Milestones" },
  { key: "streak", label: "Streaks" },
  { key: "mastery", label: "Mastery" },
];

export default function AchievementsPage() {
  const earnedCount = ACHIEVEMENTS.filter((a) => a.earned).length;

  return (
    <>
      <PageHeader
        title="Achievements"
        description="A quiet record of what you've earned — no leaderboard, no comparison."
      />

      <Card className={styles.summary}>
        <p className={styles.summaryCount}>
          {earnedCount} <span className={styles.summaryTotal}>/ {ACHIEVEMENTS.length} earned</span>
        </p>
        <p className={styles.summaryText}>Keep learning — three more are within reach this week.</p>
      </Card>

      {CATEGORIES.map(({ key, label }) => {
        const items = ACHIEVEMENTS.filter((a) => a.category === key);
        if (items.length === 0) return null;
        return (
          <section key={key} className={styles.section}>
            <h2 className={styles.sectionTitle}>{label}</h2>
            <div className={styles.grid}>
              {items.map((a) => (
                <AchievementCard key={a.id} achievement={a} />
              ))}
            </div>
          </section>
        );
      })}
    </>
  );
}
