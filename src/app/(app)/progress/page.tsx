import type { Metadata } from "next";
import Link from "next/link";
import { ProgressTimeline, type TimelineEntry } from "@/components/learning/ProgressTimeline";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { Progress } from "@/components/ui/Progress";
import { PageHeader } from "@/components/shell/PageHeader";
import { getLessonBySlug } from "@/lib/content/loader";
import { requireAuth } from "@/lib/navigation/route-guard";
import { getDb } from "@/lib/db/client";
import * as progressService from "@/lib/progress/service";
import { aggregateLearningStats, getEnrolledCourseSummaries } from "@/lib/progress/summary";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Progress",
  robots: { index: false },
};

function formatDateLabel(date: Date): string {
  const now = new Date();
  const isToday = date.toDateString() === now.toDateString();
  if (isToday) return "Today";
  return new Intl.DateTimeFormat("en-US", { month: "short", day: "numeric" }).format(date);
}

export default async function ProgressPage() {
  const user = await requireAuth("/progress");
  const summaries = await getEnrolledCourseSummaries(user.id);
  const stats = aggregateLearningStats(summaries);

  const db = getDb();
  const recentRows = await progressService.getRecentlyCompletedLessons(db, user.id, 8);
  const timeline: TimelineEntry[] = recentRows
    .filter((r) => r.completedAt)
    .map((r) => {
      const found = getLessonBySlug(r.courseSlug, r.lessonSlug);
      const title = found ? found.lesson.title : r.lessonSlug;
      return {
        id: r.id,
        title: `Completed: ${title}`,
        dateLabel: formatDateLabel(r.completedAt as Date),
        state: "done" as const,
      };
    });

  // Longest-streak-style stats aren't tracked yet (no streak table in
  // the M3 schema — see docs/progress-system.md); "current streak" and
  // "longest streak" cards are intentionally omitted here rather than
  // showing fabricated numbers.

  return (
    <>
      <PageHeader title="Progress" description="Everything you've accumulated so far." />

      <div className={styles.overview}>
        <div className={styles.overviewItem}>
          <p className={styles.overviewValue}>{stats.hoursLearned}</p>
          <p className={styles.overviewLabel}>Hours learned</p>
        </div>
        <div className={styles.overviewItem}>
          <p className={styles.overviewValue}>{stats.coursesCompleted}</p>
          <p className={styles.overviewLabel}>Courses completed</p>
        </div>
        <div className={styles.overviewItem}>
          <p className={styles.overviewValue}>{stats.coursesInProgress}</p>
          <p className={styles.overviewLabel}>Courses in progress</p>
        </div>
        <div className={styles.overviewItem}>
          <p className={styles.overviewValue}>{summaries.length}</p>
          <p className={styles.overviewLabel}>Courses enrolled</p>
        </div>
      </div>

      <div className={styles.layout}>
        <div>
          <h2 className={styles.sectionHeading}>Course progress</h2>
          {summaries.length > 0 ? (
            <div className={styles.progressList}>
              {summaries.map((s) => (
                <Card key={s.courseSlug} className={styles.progressCard}>
                  <Link href={`/courses/${s.courseSlug}`} className={styles.courseTitle}>
                    {s.course.title}
                  </Link>
                  <Progress value={s.percent} showValue />
                </Card>
              ))}
            </div>
          ) : (
            <EmptyState
              title="No progress yet"
              description="Enroll in a course to start tracking your progress."
            />
          )}
        </div>

        <div>
          <h2 className={styles.sectionHeading}>Recent activity</h2>
          <Card className={styles.timelineCard}>
            {timeline.length > 0 ? (
              <ProgressTimeline entries={timeline} />
            ) : (
              <EmptyState
                title="Nothing completed yet"
                description="Finish a lesson to see it show up here."
              />
            )}
          </Card>
        </div>
      </div>
    </>
  );
}
