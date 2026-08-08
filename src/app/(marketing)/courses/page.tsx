import { Star, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CourseCard } from "@/components/learning/CourseCard";
import { Container } from "@/components/shell/Container";
import { PageHeader } from "@/components/shell/PageHeader";
import { getAllCourses } from "@/lib/content/loader";
import styles from "./page.module.css";

const courseCount = getAllCourses().length;

export const metadata: Metadata = {
  title: "Course Catalog",
  description: `${courseCount} flagship courses, hand-authored for real depth over catalog size.`,
  alternates: { canonical: "/courses" },
};

export default function CourseCatalogPage() {
  const courses = getAllCourses();

  return (
    <Container className={styles.wrap}>
      <PageHeader
        title="Course catalog"
        description={`${courses.length} flagship courses. No padded catalog, no filler modules — depth over breadth.`}
      />
      <div className={styles.grid}>
        {courses.map(({ course }) => (
          <Link key={course.slug} href={`/courses/${course.slug}`} className={styles.link}>
            <CourseCard
              title={course.title}
              description={course.subtitle}
              level={course.difficulty}
              durationLabel={`${Math.round(course.estimatedDurationMinutes / 60)} hrs`}
              premium={course.premium}
            />
            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <Star size={13} aria-hidden="true" className={styles.starIcon} />
                {(course.rating ?? 0).toFixed(1)}
                <span className={styles.metaMuted}>
                  ({(course.reviewCount ?? 0).toLocaleString()})
                </span>
              </span>
              <span className={styles.metaItem}>
                <Users size={13} aria-hidden="true" />
                {(course.enrolledCount ?? 0).toLocaleString()} learners
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
