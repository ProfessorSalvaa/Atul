import type { Metadata } from "next";
import Link from "next/link";
import { CourseCard } from "@/components/learning/CourseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { PageHeader } from "@/components/shell/PageHeader";
import { requireAuth } from "@/lib/navigation/route-guard";
import { getEnrolledCourseSummaries } from "@/lib/progress/summary";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "My Courses",
  robots: { index: false },
};

export default async function LearnPage() {
  const user = await requireAuth("/learn");
  const summaries = await getEnrolledCourseSummaries(user.id);

  const inProgress = summaries.filter((s) => s.percent > 0 && s.percent < 100);
  const notStarted = summaries.filter((s) => s.percent === 0);
  const completed = summaries.filter((s) => s.percent === 100);

  return (
    <>
      <PageHeader title="My courses" description="Everything you're learning, in one place." />

      {summaries.length === 0 ? (
        <EmptyState
          title="No courses yet"
          description="Enroll in a course from the catalog to see it here."
          action={
            <Link href="/courses" className={styles.browseLink}>
              Browse catalog →
            </Link>
          }
        />
      ) : (
        <>
          {inProgress.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>In progress</h2>
              <div className={styles.grid}>
                {inProgress.map((s) => (
                  <Link
                    key={s.courseSlug}
                    href={`/courses/${s.courseSlug}`}
                    className={styles.link}
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
            </section>
          )}

          {notStarted.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Not started yet</h2>
              <div className={styles.grid}>
                {notStarted.map((s) => (
                  <Link
                    key={s.courseSlug}
                    href={`/courses/${s.courseSlug}`}
                    className={styles.link}
                  >
                    <CourseCard
                      title={s.course.title}
                      description={s.course.subtitle}
                      level={s.course.difficulty}
                      durationLabel={`${Math.round(s.course.estimatedDurationMinutes / 60)} hrs`}
                      premium={s.course.premium}
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}

          {completed.length > 0 && (
            <section className={styles.section}>
              <h2 className={styles.sectionHeading}>Completed</h2>
              <div className={styles.grid}>
                {completed.map((s) => (
                  <Link
                    key={s.courseSlug}
                    href={`/courses/${s.courseSlug}`}
                    className={styles.link}
                  >
                    <CourseCard
                      title={s.course.title}
                      level={s.course.difficulty}
                      durationLabel={`${Math.round(s.course.estimatedDurationMinutes / 60)} hrs`}
                      progress={100}
                      premium={s.course.premium}
                    />
                  </Link>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </>
  );
}
