import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import { getAllCourseSlugs, getLessonBySlug, loadCourse, loadQuiz } from "@/lib/content/loader";
import { canAccessLesson, viewerPlan } from "@/lib/access/course-access";
import { getCurrentUser } from "@/lib/auth/current-user";
import { QuizFlow } from "./QuizFlow";

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

export const metadata: Metadata = {
  title: "Quiz",
  robots: { index: false },
};

export default async function QuizPage({ params }: PageProps) {
  const { slug, lesson } = await params;
  const found = getLessonBySlug(slug, lesson);
  if (!found) notFound();

  const user = await getCurrentUser();
  const plan = viewerPlan(user);
  if (!canAccessLesson(plan, found.course, found.module, found.lesson)) {
    if (!user) {
      redirect(`/login?redirect=${encodeURIComponent(`/courses/${slug}/${lesson}/quiz`)}`);
    }
    redirect(`/courses/${slug}`);
  }

  const quiz = loadQuiz(slug, lesson) ?? [];

  return (
    <QuizFlow
      course={found.course}
      lesson={found.lesson}
      questions={quiz}
      signedIn={Boolean(user)}
    />
  );
}
