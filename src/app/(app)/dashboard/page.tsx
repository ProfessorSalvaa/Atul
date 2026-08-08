import { Flame } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { AchievementBadge } from "@/components/learning/AchievementBadge";
import { CourseCard } from "@/components/learning/CourseCard";
import { Badge } from "@/components/ui/Badge";
import buttonStyles from "@/components/ui/Button.module.css";
import { Card, CardHeader } from "@/components/ui/Card";
import { PageHeader } from "@/components/shell/PageHeader";
import { cn } from "@/lib/cn";
import { ACHIEVEMENTS, DASHBOARD_CONTINUE_LEARNING, STREAK } from "@/lib/sample-data/content";
import { SAMPLE_COURSES } from "@/lib/sample-data/courses";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false },
};

export default function DashboardPage() {
  const recent = ACHIEVEMENTS.filter((a) => a.earned).slice(0, 3);
  const enrolled = SAMPLE_COURSES.slice(0, 2);
  const { courseSlug, courseTitle, lessonSlug, lessonTitle, progressPercent } =
    DASHBOARD_CONTINUE_LEARNING;

  return (
    <>
      <PageHeader title="Welcome back" description="Here's where you left off." />

      <div className={styles.grid}>
        <Card raised className={styles.continueCard}>
          <p className={styles.continueLabel}>Continue learning</p>
          <h2 className={styles.continueCourse}>{courseTitle}</h2>
          <p className={styles.continueLesson}>Next: {lessonTitle}</p>
          <Link
            href={`/courses/${courseSlug}/${lessonSlug}`}
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

        <Card className={styles.streakCard}>
          <span className={styles.streakIcon} aria-hidden="true">
            <Flame size={20} />
          </span>
          <p className={styles.streakCount}>{STREAK.days}-day streak</p>
          <p className={styles.streakNote}>Keep it going — learn something today.</p>
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
        <div className={styles.courseGrid}>
          {enrolled.map((course, i) => (
            <Link key={course.slug} href={`/courses/${course.slug}`} className={styles.courseLink}>
              <CourseCard
                title={course.title}
                level={course.level}
                durationLabel={`${course.durationHours} hrs`}
                progress={i === 0 ? progressPercent : 24}
                premium={course.premium}
              />
            </Link>
          ))}
        </div>
      </section>

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
