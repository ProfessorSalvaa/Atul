import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCourseSlugs, getLessonBySlug, loadCourse } from "@/lib/content/loader";
import { LessonContent } from "./LessonContent";

interface PageProps {
  params: Promise<{ slug: string; lesson: string }>;
}

export function generateStaticParams() {
  return getAllCourseSlugs().flatMap((slug) => {
    const loaded = loadCourse(slug);
    if (!loaded) return [];
    return loaded.modules.flatMap((m) => m.lessons.map((l) => ({ slug, lesson: l.lesson.slug })));
  });
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug, lesson } = await params;
  const found = getLessonBySlug(slug, lesson);
  if (!found) return {};
  const isFreePreview = Boolean(found.lesson.free);
  return {
    title: found.lesson.title,
    description: `${found.course.title} — ${found.module.title}`,
    alternates: { canonical: `/courses/${slug}/${lesson}` },
    // Only the free-preview lesson of each course is indexable (P0 §18);
    // the full lesson player behind enrollment is noindex.
    robots: { index: isFreePreview },
  };
}

export default async function LessonPage({ params }: PageProps) {
  const { slug, lesson } = await params;
  const found = getLessonBySlug(slug, lesson);
  if (!found) notFound();

  return (
    <LessonContent
      course={found.course}
      module={found.module}
      lesson={found.lesson}
      mdxSource={found.mdxSource}
    />
  );
}
