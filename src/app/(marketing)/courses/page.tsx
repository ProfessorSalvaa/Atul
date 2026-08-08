import type { Metadata } from "next";
import Link from "next/link";
import { CourseCard } from "@/components/learning/CourseCard";
import { Container } from "@/components/shell/Container";
import { PageHeader } from "@/components/shell/PageHeader";
import { SAMPLE_COURSES } from "@/lib/sample-data/courses";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Course Catalog",
  description: "Five flagship courses, hand-authored for real depth over catalog size.",
  alternates: { canonical: "/courses" },
};

export default function CourseCatalogPage() {
  return (
    <Container className={styles.wrap}>
      <PageHeader
        title="Course catalog"
        description="Five flagship courses. No padded catalog, no filler modules — depth over breadth."
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
          </Link>
        ))}
      </div>
    </Container>
  );
}
