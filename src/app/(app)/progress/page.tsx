import type { Metadata } from "next";
import { ProgressTimeline, type TimelineEntry } from "@/components/learning/ProgressTimeline";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { PageHeader } from "@/components/shell/PageHeader";
import { USER_PROFILE } from "@/lib/sample-data/content";
import { getAllCourses } from "@/lib/content/loader";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Progress",
  robots: { index: false },
};

const PROGRESS_BY_SLUG: Record<string, number> = {
  "ai-tooling-for-developers": 62,
  "data-analysis-fundamentals": 24,
};

const TIMELINE: TimelineEntry[] = [
  {
    id: "t1",
    title: "Completed: Reading a Schema Like a Detective",
    dateLabel: "Aug 5",
    state: "done",
  },
  { id: "t2", title: "Completed: Writing Your First Query", dateLabel: "Aug 6", state: "done" },
  {
    id: "t3",
    title: "In progress: Reading a Generated Diff Fast",
    dateLabel: "Today",
    state: "current",
  },
  { id: "t4", title: "Next: When to Throw It Out and Start Over", state: "upcoming" },
];

export default function ProgressPage() {
  const enrolled = getAllCourses().filter((c) => c.course.slug in PROGRESS_BY_SLUG);

  return (
    <>
      <PageHeader title="Progress" description="Everything you've accumulated so far." />

      <div className={styles.overview}>
        <div className={styles.overviewItem}>
          <p className={styles.overviewValue}>{USER_PROFILE.stats.hoursLearned}</p>
          <p className={styles.overviewLabel}>Hours learned</p>
        </div>
        <div className={styles.overviewItem}>
          <p className={styles.overviewValue}>{USER_PROFILE.stats.coursesCompleted}</p>
          <p className={styles.overviewLabel}>Courses completed</p>
        </div>
        <div className={styles.overviewItem}>
          <p className={styles.overviewValue}>{USER_PROFILE.stats.currentStreak}d</p>
          <p className={styles.overviewLabel}>Current streak</p>
        </div>
        <div className={styles.overviewItem}>
          <p className={styles.overviewValue}>{USER_PROFILE.stats.longestStreak}d</p>
          <p className={styles.overviewLabel}>Longest streak</p>
        </div>
      </div>

      <div className={styles.layout}>
        <div>
          <h2 className={styles.sectionHeading}>Course progress</h2>
          <div className={styles.progressList}>
            {enrolled.map(({ course }) => (
              <Card key={course.slug} className={styles.progressCard}>
                <p className={styles.courseTitle}>{course.title}</p>
                <Progress value={PROGRESS_BY_SLUG[course.slug]} showValue />
              </Card>
            ))}
          </div>
        </div>

        <div>
          <h2 className={styles.sectionHeading}>Recent activity</h2>
          <Card className={styles.timelineCard}>
            <ProgressTimeline entries={TIMELINE} />
          </Card>
        </div>
      </div>
    </>
  );
}
