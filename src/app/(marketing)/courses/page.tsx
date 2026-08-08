import { Star, Users } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { CourseCard } from "@/components/learning/CourseCard";
import { Container } from "@/components/shell/Container";
import { PageHeader } from "@/components/shell/PageHeader";
import { SAMPLE_COURSES } from "@/lib/sample-data/courses";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Course Catalog",
  description: "Eight flagship courses, hand-authored for real depth over catalog size.",
  alternates: { canonical: "/courses" },
};

export default function CourseCatalogPage() {
  return (
    <Container className={styles.wrap}>
      <PageHeader
        title="Course catalog"
        description="Eight flagship courses. No padded catalog, no filler modules — depth over breadth."
      />
      <div className={styles.grid}>
        {SAMPLE_COURSES.map((course) => (
          <Link key={course.slug} href={`/courses/${course.slug}`} className={styles.link}>
            <CourseCard
              title={course.title}
              description={course.description}
              level={course.level}
              durationLabel={`${course.durationHours} hrs`}
              premium={course.premium}
            />
            <div className={styles.meta}>
              <span className={styles.metaItem}>
                <Star size={13} aria-hidden="true" className={styles.starIcon} />
                {course.rating.toFixed(1)}
                <span className={styles.metaMuted}>({course.reviewCount.toLocaleString()})</span>
              </span>
              <span className={styles.metaItem}>
                <Users size={13} aria-hidden="true" />
                {course.enrolledCount.toLocaleString()} learners
              </span>
            </div>
          </Link>
        ))}
      </div>
    </Container>
  );
}
