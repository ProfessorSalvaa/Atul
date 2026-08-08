import { Clock, Lock, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import buttonStyles from "@/components/ui/Button.module.css";
import { LessonCard } from "@/components/learning/LessonCard";
import { ModuleCard } from "@/components/learning/ModuleCard";
import { Container } from "@/components/shell/Container";
import { cn } from "@/lib/cn";
import { getCourseBySlug, SAMPLE_COURSES } from "@/lib/sample-data/courses";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return SAMPLE_COURSES.map((course) => ({ slug: course.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) return {};
  return {
    title: course.title,
    description: course.description,
    alternates: { canonical: `/courses/${course.slug}` },
    openGraph: { title: course.title, description: course.description },
  };
}

const levelLabel = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };

/**
 * Public course detail — also the enrolled course view once auth ships
 * (M3+). Per docs/navigation.md, this route deliberately doesn't branch
 * layouts by auth state; the enrolled variant will render richer state
 * (resume CTA, real progress) within this same Marketing Layout page.
 */
export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const course = getCourseBySlug(slug);
  if (!course) notFound();

  const totalLessons = course.modules.reduce((sum, m) => sum + m.lessons.length, 0);

  return (
    <Container className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.metaRow}>
          <Badge tone="neutral">{levelLabel[course.level]}</Badge>
          {course.premium && (
            <Badge tone="brand">
              <Lock size={11} aria-hidden="true" /> Premium
            </Badge>
          )}
        </div>
        <h1 className={styles.title}>{course.title}</h1>
        <p className={styles.description}>{course.description}</p>
        <div className={styles.ratingRow}>
          <span className={styles.ratingScore}>
            <Star size={14} aria-hidden="true" className={styles.starIcon} />
            {course.rating.toFixed(1)}
          </span>
          <span className={styles.ratingCount}>
            ({course.reviewCount.toLocaleString()} reviews) ·{" "}
            {course.enrolledCount.toLocaleString()} learners enrolled
          </span>
        </div>
        <div className={styles.instructorRow}>
          <Avatar fallback={course.instructor.initials} size="sm" />
          <div>
            <p className={styles.instructorName}>{course.instructor.name}</p>
            <p className={styles.instructorTitle}>{course.instructor.title}</p>
          </div>
        </div>
        <div className={styles.metaFooter}>
          <span className={styles.durationRow}>
            <Clock size={14} aria-hidden="true" /> {course.durationHours} hours · {totalLessons}{" "}
            lessons
          </span>
          <div className={styles.tags}>
            {course.tags.map((tag) => (
              <Badge key={tag} tone="neutral">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
        <div className={styles.actions}>
          <Link
            href={`/signup`}
            className={cn(buttonStyles.button, buttonStyles.primary, buttonStyles.lg)}
          >
            Enroll — sign up free
          </Link>
        </div>
      </div>

      <div className={styles.outline}>
        <h2 className={styles.outlineHeading}>Course outline</h2>
        {course.modules.map((mod) => (
          <ModuleCard key={mod.title} title={mod.title} lessonCount={mod.lessons.length}>
            {mod.lessons.map((lesson) =>
              lesson.free ? (
                <Link
                  key={lesson.slug}
                  href={`/courses/${course.slug}/${lesson.slug}`}
                  className={styles.lessonLink}
                >
                  <LessonCard
                    title={lesson.title}
                    type={lesson.type}
                    durationLabel={`${lesson.durationMinutes} min · Free preview`}
                  />
                </Link>
              ) : (
                <LessonCard
                  key={lesson.slug}
                  title={lesson.title}
                  type={lesson.type}
                  durationLabel={`${lesson.durationMinutes} min`}
                  locked
                />
              ),
            )}
          </ModuleCard>
        ))}
      </div>

      {course.reviews.length > 0 && (
        <div className={styles.reviews}>
          <h2 className={styles.outlineHeading}>What learners say</h2>
          <div className={styles.reviewGrid}>
            {course.reviews.map((review) => (
              <Card key={review.name} className={styles.reviewCard}>
                <div className={styles.reviewStars}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={13} aria-hidden="true" className={styles.starIcon} />
                  ))}
                </div>
                <p className={styles.reviewQuote}>“{review.quote}”</p>
                <p className={styles.reviewName}>{review.name}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
