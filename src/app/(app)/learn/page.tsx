import type { Metadata } from "next";
import Link from "next/link";
import { CourseCard } from "@/components/learning/CourseCard";
import { PageHeader } from "@/components/shell/PageHeader";
import { getAllCourses } from "@/lib/content/loader";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "My Courses",
  robots: { index: false },
};

// Sample enrollment state — first two courses "enrolled" with progress,
// the rest not yet started. Real state arrives with `enrollment.list` (M5+).
const PROGRESS_BY_SLUG: Record<string, number> = {
  "ai-tooling-for-developers": 62,
  "data-analysis-fundamentals": 24,
};

export default function LearnPage() {
  const enrolledSlugs = Object.keys(PROGRESS_BY_SLUG);
  const all = getAllCourses();
  const enrolled = all.filter((c) => enrolledSlugs.includes(c.course.slug));
  const notStarted = all.filter((c) => !enrolledSlugs.includes(c.course.slug));

  return (
    <>
      <PageHeader title="My courses" description="Everything you're learning, in one place." />

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>In progress</h2>
        <div className={styles.grid}>
          {enrolled.map(({ course }) => (
            <Link key={course.slug} href={`/courses/${course.slug}`} className={styles.link}>
              <CourseCard
                title={course.title}
                level={course.difficulty}
                durationLabel={`${Math.round(course.estimatedDurationMinutes / 60)} hrs`}
                progress={PROGRESS_BY_SLUG[course.slug]}
                premium={course.premium}
              />
            </Link>
          ))}
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionHeading}>Not started yet</h2>
        <div className={styles.grid}>
          {notStarted.map(({ course }) => (
            <Link key={course.slug} href={`/courses/${course.slug}`} className={styles.link}>
              <CourseCard
                title={course.title}
                description={course.subtitle}
                level={course.difficulty}
                durationLabel={`${Math.round(course.estimatedDurationMinutes / 60)} hrs`}
                premium={course.premium}
              />
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
