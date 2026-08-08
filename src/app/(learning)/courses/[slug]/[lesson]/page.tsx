import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getAllCourseSlugs, getLessonBySlug, loadCourse } from "@/lib/content/loader";
import { canAccessLesson, viewerPlan } from "@/lib/access/course-access";
import { getCurrentUser } from "@/lib/auth/current-user";
import { getDb } from "@/lib/db/client";
import * as progressService from "@/lib/progress/service";
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

  const user = await getCurrentUser();
  const plan = viewerPlan(user);

  if (!canAccessLesson(plan, found.course, found.module, found.lesson)) {
    if (!user) {
      redirect(`/login?redirect=${encodeURIComponent(`/courses/${slug}/${lesson}`)}`);
    }
    // Signed in but the plan doesn't cover this lesson (premium course,
    // free plan, not in the first module) — send them to the course
    // detail page, which renders the real locked/unlocked outline.
    redirect(`/courses/${slug}`);
  }

  let completed = false;
  if (user) {
    const db = getDb();
    const row = await progressService.getLessonProgressRow(db, user.id, slug, lesson);
    completed = Boolean(row?.completedAt);
  }

  return (
    <LessonContent
      course={found.course}
      module={found.module}
      lesson={found.lesson}
      mdxSource={found.mdxSource}
      signedIn={Boolean(user)}
      initiallyCompleted={completed}
    />
  );
}
