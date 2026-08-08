/**
 * Content-driven SEO: turns a loaded Course/Lesson into a Next.js
 * `Metadata` object, JSON-LD structured data, and a breadcrumb trail —
 * so no page component hand-writes SEO fields again. Pages call these
 * instead of constructing `Metadata` literals inline.
 */
import "server-only";
import type { Metadata } from "next";
import type { Course, SEOMetadata } from "./schema";
import type { LoadedCourse } from "./loader";

const SITE_NAME = "Curitiq";
const SITE_URL = "https://curitiq.com";

export function metadataFromSEO(seo: SEOMetadata, path: string): Metadata {
  const canonical = seo.canonicalPath ?? path;
  return {
    title: seo.title,
    description: seo.description,
    keywords: seo.keywords,
    alternates: { canonical },
    robots: seo.noIndex ? { index: false, follow: false } : { index: true, follow: true },
    openGraph: {
      title: seo.title,
      description: seo.description,
      url: `${SITE_URL}${canonical}`,
      siteName: SITE_NAME,
      type: "website",
      ...(seo.ogImage ? { images: [{ url: seo.ogImage }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: seo.title,
      description: seo.description,
      ...(seo.ogImage ? { images: [seo.ogImage] } : {}),
    },
  };
}

export function courseMetadata(loaded: LoadedCourse): Metadata {
  return metadataFromSEO(loaded.course.seo, `/courses/${loaded.course.slug}`);
}

/** schema.org Course structured data — https://schema.org/Course */
export function courseJsonLd(loaded: LoadedCourse): Record<string, unknown> {
  const { course } = loaded;
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: course.title,
    description: course.subtitle,
    provider: {
      "@type": "Organization",
      name: SITE_NAME,
      sameAs: SITE_URL,
    },
    ...(course.rating && course.reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: course.rating,
            reviewCount: course.reviewCount,
          },
        }
      : {}),
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `PT${course.estimatedDurationMinutes}M`,
    },
  };
}

export interface Breadcrumb {
  label: string;
  path: string;
}

export function courseBreadcrumbs(course: Course): Breadcrumb[] {
  return [
    { label: "Home", path: "/" },
    { label: "Courses", path: "/courses" },
    { label: course.title, path: `/courses/${course.slug}` },
  ];
}

export function lessonBreadcrumbs(
  course: Course,
  lessonSlug: string,
  lessonTitle: string,
): Breadcrumb[] {
  return [
    ...courseBreadcrumbs(course),
    { label: lessonTitle, path: `/courses/${course.slug}/${lessonSlug}` },
  ];
}

export function breadcrumbJsonLd(crumbs: Breadcrumb[]): Record<string, unknown> {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.label,
      item: `${SITE_URL}${c.path}`,
    })),
  };
}
