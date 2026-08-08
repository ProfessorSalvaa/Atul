import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllCourseSlugs, getLessonBySlug, loadCourse, loadQuiz } from "@/lib/content/loader";
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
  const quiz = loadQuiz(slug, lesson) ?? [];

  return <QuizFlow course={found.course} lesson={found.lesson} questions={quiz} />;
}
