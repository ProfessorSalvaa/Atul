import { Clock, Lock, Star } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Avatar } from "@/components/ui/Avatar";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { LessonCard } from "@/components/learning/LessonCard";
import { ModuleCard } from "@/components/learning/ModuleCard";
import { Container } from "@/components/shell/Container";
import { getAllCourseSlugs, allLessonsFlat, loadCourse } from "@/lib/content/loader";
import { toCardLessonType } from "@/lib/content/lessonCardAdapter";
import { courseMetadata } from "@/lib/content/seo";
import { canAccessLesson, viewerPlan } from "@/lib/access/course-access";
import { getCurrentUser } from "@/lib/auth/current-user";
import { getDb } from "@/lib/db/client";
import * as progressService from "@/lib/progress/service";
import { EnrollCta } from "./EnrollCta";
import styles from "./page.module.css";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getAllCourseSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const loaded = loadCourse(slug);
  if (!loaded) return {};
  return courseMetadata(loaded);
}

const levelLabel = { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" };

/**
 * Public course detail — also the enrolled course view once auth ships
 * (M3+). Per docs/navigation.md, this route deliberately doesn't branch
 * layouts by auth state; the enrolled variant renders richer state
 * (resume CTA, real progress, real per-lesson locking) within this same
 * Marketing Layout page.
 */
export default async function CourseDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const loaded = loadCourse(slug);
  if (!loaded) notFound();
  const { course, modules, reviews } = loaded;

  const totalLessons = modules.reduce((sum, m) => sum + m.lessons.length, 0);

  const user = await getCurrentUser();
  const plan = viewerPlan(user);

  let enrolled = false;
  let progressByLesson = new Map<string, { completedAt: Date | null }>();
  if (user) {
    const db = getDb();
    const enrollment = await progressService.getEnrollment(db, user.id, slug);
    enrolled = Boolean(enrollment);
    progressByLesson = await progressService.getCourseLessonProgress(db, user.id, slug);
  }

  const flat = allLessonsFlat(loaded);
  const firstIncomplete = flat.find((l) => !progressByLesson.get(l.slug)?.completedAt);
  const resumeLesson = firstIncomplete ?? flat[0];
  const resumeHref = resumeLesson
    ? `/courses/${course.slug}/${resumeLesson.slug}`
    : `/courses/${course.slug}`;

  return (
    <Container className={styles.wrap}>
      <div className={styles.header}>
        <div className={styles.metaRow}>
          <Badge tone="neutral">{levelLabel[course.difficulty]}</Badge>
          {course.premium && (
            <Badge tone="brand">
              <Lock size={11} aria-hidden="true" /> Premium
            </Badge>
          )}
        </div>
        <h1 className={styles.title}>{course.title}</h1>
        <p className={styles.description}>{course.subtitle}</p>
        <div className={styles.ratingRow}>
          <span className={styles.ratingScore}>
            <Star size={14} aria-hidden="true" className={styles.starIcon} />
            {(course.rating ?? 0).toFixed(1)}
          </span>
          <span className={styles.ratingCount}>
            ({(course.reviewCount ?? 0).toLocaleString()} reviews) ·{" "}
            {(course.enrolledCount ?? 0).toLocaleString()} learners enrolled
          </span>
        </div>
        <div className={styles.instructorRow}>
          <Avatar fallback={course.instructor.avatarInitials} size="sm" />
          <div>
            <p className={styles.instructorName}>{course.instructor.name}</p>
            <p className={styles.instructorTitle}>{course.instructor.title}</p>
          </div>
        </div>
        <div className={styles.metaFooter}>
          <span className={styles.durationRow}>
            <Clock size={14} aria-hidden="true" />{" "}
            {Math.round(course.estimatedDurationMinutes / 60)} hours · {totalLessons} lessons
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
          <EnrollCta
            courseSlug={course.slug}
            signedIn={Boolean(user)}
            enrolled={enrolled}
            resumeHref={resumeHref}
          />
        </div>
      </div>

      <div className={styles.outline}>
        <h2 className={styles.outlineHeading}>Course outline</h2>
        {modules.map(({ module: mod, lessons }) => (
          <ModuleCard key={mod.slug} title={mod.title} lessonCount={lessons.length}>
            {lessons.map(({ lesson }) => {
              const accessible = canAccessLesson(plan, course, mod, lesson);
              const completed = Boolean(progressByLesson.get(lesson.slug)?.completedAt);
              const durationLabel = lesson.free
                ? `${lesson.durationMinutes} min · Free preview`
                : `${lesson.durationMinutes} min`;
              return accessible ? (
                <Link
                  key={lesson.slug}
                  href={`/courses/${course.slug}/${lesson.slug}`}
                  className={styles.lessonLink}
                >
                  <LessonCard
                    title={lesson.title}
                    type={toCardLessonType(lesson.type)}
                    durationLabel={durationLabel}
                    completed={completed}
                  />
                </Link>
              ) : (
                <LessonCard
                  key={lesson.slug}
                  title={lesson.title}
                  type={toCardLessonType(lesson.type)}
                  durationLabel={durationLabel}
                  locked
                />
              );
            })}
          </ModuleCard>
        ))}
      </div>

      {reviews.length > 0 && (
        <div className={styles.reviews}>
          <h2 className={styles.outlineHeading}>What learners say</h2>
          <div className={styles.reviewGrid}>
            {reviews.map((review) => (
              <Card key={review.id} className={styles.reviewCard}>
                <div className={styles.reviewStars}>
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star key={i} size={13} aria-hidden="true" className={styles.starIcon} />
                  ))}
                </div>
                <p className={styles.reviewQuote}>&ldquo;{review.quote}&rdquo;</p>
                <p className={styles.reviewName}>{review.authorName}</p>
              </Card>
            ))}
          </div>
        </div>
      )}
    </Container>
  );
}
