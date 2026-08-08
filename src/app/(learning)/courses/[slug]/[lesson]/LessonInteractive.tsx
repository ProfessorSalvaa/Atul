"use client";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState, type ReactNode } from "react";
import buttonStyles from "@/components/ui/Button.module.css";
import { Button } from "@/components/ui/Button";
import { useToast } from "@/components/shell/ToastHost";
import { cn } from "@/lib/cn";
import type { Course, Lesson } from "@/lib/content/schema";
import styles from "./page.module.css";

export function LessonInteractive({
  course,
  lesson,
  prev,
  next,
  children,
}: {
  course: Course;
  lesson: Lesson;
  prev?: Lesson;
  next?: Lesson;
  children: ReactNode;
}) {
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const { notify } = useToast();

  function handleMarkComplete() {
    if (completed || saving) return;
    setSaving(true);
    // Simulated save latency — no `progress.update` call yet (M5+). Keeps
    // the button's loading state honest about being a UI affordance.
    window.setTimeout(() => {
      setSaving(false);
      setCompleted(true);
      notify({
        title: "Lesson marked complete",
        description: next ? `Up next: ${next.title}` : "That's the last lesson in this module.",
        tone: "success",
      });
    }, 500);
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
