"use client";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useState, type ReactNode } from "react";
import buttonStyles from "@/components/ui/Button.module.css";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/shell/ToastHost";
import { cn } from "@/lib/cn";
import type { Course, Lesson } from "@/lib/content/schema";
import { markLessonCompleteAction, markLessonStartedAction } from "@/lib/progress/actions";
import styles from "./page.module.css";

export function LessonInteractive({
  course,
  lesson,
  prev,
  next,
  signedIn,
  initiallyCompleted,
  children,
}: {
  course: Course;
  lesson: Lesson;
  prev?: Lesson;
  next?: Lesson;
  signedIn: boolean;
  initiallyCompleted: boolean;
  children: ReactNode;
}) {
  const [completed, setCompleted] = useState(initiallyCompleted);
  const [saving, setSaving] = useState(false);
  const { notify } = useToast();

  // Marks the lesson "started" once per mount — access has already been
  // verified server-side (page.tsx redirects otherwise), this just
  // records the visit. Skipped entirely for anonymous free-preview
  // viewers, since there's no account to attach progress to.
  useEffect(() => {
    if (!signedIn) return;
    void markLessonStartedAction(course.slug, lesson.slug);
  }, [course.slug, lesson.slug, signedIn]);

  async function handleMarkComplete() {
    if (completed || saving) return;
    if (!signedIn) {
      notify({
        title: "Sign in to save progress",
        description: "Create a free account to track completed lessons.",
        tone: "info",
      });
      return;
    }
    setSaving(true);
    const result = await markLessonCompleteAction(course.slug, lesson.slug);
    setSaving(false);
    if (!result.ok) {
      notify({ title: "Couldn't save progress", description: result.error, tone: "error" });
      return;
    }
    setCompleted(true);
    notify({
      title: "Lesson marked complete",
      description: next ? `Up next: ${next.title}` : "That's the last lesson in this module.",
      tone: "success",
    });
  }

  return (
    <>
      {children}

      <div className={styles.footer}>
        <Button
          variant={completed ? "outline" : "primary"}
          onClick={handleMarkComplete}
          loading={saving}
          leadingIcon={completed ? <Check size={16} aria-hidden="true" /> : undefined}
          disabled={completed}
        >
          {completed ? "Completed" : "Mark complete"}
        </Button>
        <Link
          href={`/courses/${course.slug}/${lesson.slug}/quiz`}
          className={cn(buttonStyles.button, buttonStyles.outline, buttonStyles.md)}
        >
          Take module quiz
        </Link>
      </div>

      <nav className={styles.pager} aria-label="Lesson navigation">
        {prev ? (
          <Link href={`/courses/${course.slug}/${prev.slug}`} className={styles.pagerLink}>
            <ChevronLeft size={15} aria-hidden="true" /> {prev.title}
          </Link>
        ) : (
          <span />
        )}
        {next && (
          <Link
            href={`/courses/${course.slug}/${next.slug}`}
            className={cn(styles.pagerLink, styles.pagerNext)}
          >
            {next.title} <ChevronRight size={15} aria-hidden="true" />
          </Link>
        )}
      </nav>
    </>
  );
}
