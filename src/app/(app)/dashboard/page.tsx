import { Flame } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AchievementBadge } from "@/components/learning/AchievementBadge";
import { CourseCard } from "@/components/learning/CourseCard";
import { Badge } from "@/components/ui/Badge";
import { EmptyState } from "@/components/ui/EmptyState";
import buttonStyles from "@/components/ui/Button.module.css";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/shell/PageHeader";
import { cn } from "@/lib/cn";
import { ACHIEVEMENTS, DASHBOARD_RECOMMENDED, STREAK } from "@/lib/sample-data/content";
import { loadCourse } from "@/lib/content/loader";
import { requireAuth } from "@/lib/navigation/route-guard";
import { getEnrolledCourseSummaries, aggregateLearningStats } from "@/lib/progress/summary";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false },
};

export default async function DashboardPage() {
  const user = await requireAuth("/dashboard");
  const summaries = await getEnrolledCourseSummaries(user.id);
  const stats = aggregateLearningStats(summaries);

  const recent = ACHIEVEMENTS.filter((a) => a.earned).slice(0, 4);
  const enrolledSlugs = new Set(summaries.map((s) => s.courseSlug));
  const recommended = DASHBOARD_RECOMMENDED.filter((slug) => !enrolledSlugs.has(slug))
    .map((slug) => loadCourse(slug))
    .filter((c) => c !== undefined);

  const continueLearning = summaries.find((s) => s.percent < 100) ?? summaries[0];
  const firstName = user.name.split(" ")[0];

  return (
    <>
      <PageHeader
        title={`Welcome back, ${firstName}`}
        description={`${stats.hoursLearned} hours learned so far — here's where you left off.`}
      />

      <div className={styles.grid}>
        {continueLearning ? (
          <Card raised className={styles.continueCard}>
            <p className={styles.continueLabel}>Continue learning</p>
            <h2 className={styles.continueCourse}>{continueLearning.course.title}</h2>
            <p className={styles.continueLesson}>{continueLearning.percent}% complete</p>
            <Link
              href={`/courses/${continueLearning.courseSlug}/${continueLearning.resumeLessonSlug ?? ""}`}
              className={cn(
                buttonStyles.button,
                buttonStyles.primary,
                buttonStyles.md,
                styles.continueCta,
              )}
            >
              Resume lesson
            </Link>
          </Card>
        ) : (
          <Card raised className={styles.continueCard}>
            <p className={styles.continueLabel}>Continue learning</p>
            <h2 className={styles.continueCourse}>No courses yet</h2>
            <p className={styles.continueLesson}>Enroll in a course to get started.</p>
            <Link
              href="/courses"
              className={cn(
                buttonStyles.button,
                buttonStyles.primary,
                buttonStyles.md,
                styles.continueCta,
              )}
            >
              Browse catalog
            </Link>
          </Card>
        )}

        <Card className={styles.streakCard}>
          <span className={styles.streakIcon} aria-hidden="true">
            <Flame size={20} />
          </span>
          <p className={styles.streakCount}>{STREAK.days}-day streak</p>
          <p className={styles.streakNote}>
            Longest streak: {STREAK.longestStreak} days. Keep it going today.
          </p>
        </Card>
      </div>

      <section className={styles.section}>
        <CardHeader
          title="Your roadmap"
          action={
            <Link href="/learn" className={styles.sectionLink}>
              View all →
            </Link>
          }
        />
        {summaries.length > 0 ? (
          <div className={styles.courseGrid}>
            {summaries.map((s) => (
              <Link
                key={s.courseSlug}
                href={`/courses/${s.courseSlug}`}
                className={styles.courseLink}
              >
                <CourseCard
                  title={s.course.title}
                  level={s.course.difficulty}
                  durationLabel={`${Math.round(s.course.estimatedDurationMinutes / 60)} hrs`}
                  progress={s.percent}
                  premium={s.course.premium}
                />
              </Link>
            ))}
          </div>
        ) : (
          <EmptyState
            title="No enrolled courses yet"
            description="Browse the catalog and enroll in your first course."
          />
        )}
      </section>

      {recommended.length > 0 && (
        <section className={styles.section}>
          <CardHeader
            title="Recommended for you"
            action={
              <Link href="/courses" className={styles.sectionLink}>
                Browse catalog →
              </Link>
            }
          />
          <div className={styles.courseGrid}>
            {recommended.map((loaded) => (
              <Link
                key={loaded.course.slug}
                href={`/courses/${loaded.course.slug}`}
                className={styles.courseLink}
              >
                <CourseCard
                  title={loaded.course.title}
                  description={loaded.course.subtitle}
                  level={loaded.course.difficulty}
                  durationLabel={`${Math.round(loaded.course.estimatedDurationMinutes / 60)} hrs`}
                  premium={loaded.course.premium}
                />
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className={styles.section}>
        <CardHeader
          title="Recent achievements"
          action={
            <Link href="/achievements" className={styles.sectionLink}>
              View all →
            </Link>
          }
        />
        <div className={styles.achievementRow}>
          {recent.map((a) => (
            <AchievementBadge key={a.id} label={a.label} />
          ))}
          {recent.length === 0 && <Badge tone="neutral">No achievements yet</Badge>}
        </div>
      </section>
    </>
  );
}
