import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLessonBySlug, SAMPLE_COURSES } from "@/lib/sample-data/courses";
import { QuizFlow } from "./QuizFlow";

interface PageProps {
  params: Promise<{ slug: string; lesson: string }>;
}

export function generateStaticParams() {
  return SAMPLE_COURSES.flatMap((course) =>
    course.modules.flatMap((m) => m.lessons.map((l) => ({ slug: course.slug, lesson: l.slug }))),
  );
}

export const metadata: Metadata = {
  title: "Quiz",
  robots: { index: false },
};

export default async function QuizPage({ params }: PageProps) {
  const { slug, lesson } = await params;
  const found = getLessonBySlug(slug, lesson);
  if (!found) notFound();

  return <QuizFlow course={found.course} lesson={found.lesson} />;
}
