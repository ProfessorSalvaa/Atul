import type { ReactNode } from "react";
import { LearningShell } from "@/components/shell/LearningShell";

interface LayoutProps {
  children: ReactNode;
  params: Promise<{ slug: string; lesson: string }>;
}

export default async function LessonLayout({ children, params }: LayoutProps) {
  const { slug, lesson } = await params;
  return (
    <LearningShell courseSlug={slug} lessonSlug={lesson}>
      {children}
    </LearningShell>
  );
}
