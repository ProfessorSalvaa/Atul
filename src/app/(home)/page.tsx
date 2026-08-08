import { BookOpen, MessageCircleQuestion, Sparkles } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import buttonStyles from "@/components/ui/Button.module.css";
import { CourseCard } from "@/components/learning/CourseCard";
import { Container } from "@/components/shell/Container";
import { cn } from "@/lib/cn";
import { SITE_STATS, TESTIMONIALS } from "@/lib/sample-data/content";
import { featuredCourses } from "@/lib/content/discovery";
import styles from "./page.module.css";

const VALUE_PROPS = [
  {
    icon: BookOpen,
    title: "Real depth, not filler",
    description:
      "Five flagship courses, hand-authored, no padded catalog. Every lesson earns its place.",
  },
  {
    icon: Sparkles,
    title: "An AI tutor that stays on topic",
    description:
      "Scoped to the lesson you're on — it nudges you toward understanding instead of handing over answers.",
  },
  {
    icon: MessageCircleQuestion,
    title: "Quiet progress, not pressure",
    description:
      "Streaks and achievements that inform you — never guilt-trip or gamify you into opening the app.",
  },
];

export default function HomePage() {
  const featured = featuredCourses(3);

  return (
    <>
      <section className={styles.hero}>
        <Container className={styles.heroInner}>
          <Badge tone="brand" className={styles.heroBadge}>
            Now teaching {SITE_STATS.coursesCount} flagship courses
          </Badge>
          <h1 className={styles.heroTitle}>
            Master modern digital skills, one well-made lesson at a time.
          </h1>
          <p className={styles.heroSubtitle}>
            Curitiq is a calm, AI-assisted learning platform built for people who want real
            competence — not streak anxiety, leaderboards, or a bloated catalog.
          </p>
          <div className={styles.heroActions}>
            <Link
              href="/courses"
              className={cn(buttonStyles.button, buttonStyles.primary, buttonStyles.lg)}
            >
              Browse courses
            </Link>
            <Link
              href="/signup"
              className={cn(buttonStyles.button, buttonStyles.outline, buttonStyles.lg)}
            >
              Sign up free
            </Link>
          </div>
        </Container>
      </section>

      <section aria-label="Curitiq by the numbers" className={styles.statsSection}>
        <Container className={styles.statsInner}>
          <div className={styles.statItem}>
            <p className={styles.statValue}>{SITE_STATS.learners.toLocaleString()}+</p>
            <p className={styles.statLabel}>Learners</p>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statValue}>{SITE_STATS.avgRating.toFixed(1)}/5</p>
            <p className={styles.statLabel}>Average course rating</p>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statValue}>{SITE_STATS.coursesCount}</p>
            <p className={styles.statLabel}>Flagship courses</p>
          </div>
          <div className={styles.statItem}>
            <p className={styles.statValue}>{SITE_STATS.hoursOfContent}+</p>
            <p className={styles.statLabel}>Hours of content</p>
          </div>
        </Container>
      </section>

      <section aria-labelledby="value-props-heading">
        <Container className={styles.section}>
          <h2 id="value-props-heading" className={styles.sectionHeading}>
            Built differently, on purpose
          </h2>
          <div className={styles.valueGrid}>
            {VALUE_PROPS.map((prop) => (
              <div key={prop.title} className={styles.valueCard}>
                <prop.icon size={22} aria-hidden="true" className={styles.valueIcon} />
                <h3 className={styles.valueTitle}>{prop.title}</h3>
                <p className={styles.valueDescription}>{prop.description}</p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <section aria-labelledby="featured-courses-heading">
        <Container className={styles.section}>
          <div className={styles.sectionHeader}>
            <h2 id="featured-courses-heading" className={styles.sectionHeading}>
              Featured courses
            </h2>
            <Link href="/courses" className={styles.sectionLink}>
              View all courses →
            </Link>
          </div>
          <div className={styles.courseGrid}>
            {featured.map(({ course }) => (
              <Link
                key={course.slug}
                href={`/courses/${course.slug}`}
                className={styles.courseLink}
              >
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
        </Container>
      </section>

      <section aria-labelledby="testimonials-heading">
        <Container className={styles.section}>
          <h2 id="testimonials-heading" className={styles.sectionHeading}>
            What early learners say
          </h2>
          <div className={styles.testimonialGrid}>
            {TESTIMONIALS.map((t) => (
              <figure key={t.name} className={styles.testimonial}>
                <blockquote className={styles.testimonialQuote}>“{t.quote}”</blockquote>
                <figcaption className={styles.testimonialAuthor}>
                  {t.name} — <span>{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </Container>
      </section>

      <section className={styles.ctaSection}>
        <Container className={styles.ctaInner}>
          <h2 className={styles.ctaTitle}>Ready to start learning something real?</h2>
          <Link
            href="/signup"
            className={cn(buttonStyles.button, buttonStyles.primary, buttonStyles.lg)}
          >
            Sign up free
          </Link>
        </Container>
      </section>
    </>
  );
}
