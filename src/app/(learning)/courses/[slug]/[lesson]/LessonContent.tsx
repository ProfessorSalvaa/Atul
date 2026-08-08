"use client";

import { Check, ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import buttonStyles from "@/components/ui/Button.module.css";
import { Button } from "@/components/ui/Button";
import { CodeBlock } from "@/components/learning/CodeBlock";
import { Flashcard } from "@/components/learning/Flashcard";
import { useToast } from "@/components/shell/ToastHost";
import { cn } from "@/lib/cn";
import type { SampleCourse, SampleLesson, SampleModule } from "@/lib/sample-data/courses";
import { allLessonsFlat } from "@/lib/sample-data/courses";
import styles from "./page.module.css";

const SAMPLE_CODE = `function summarize(rows) {
  // A generated diff often changes more than it needs to —
  // read for intent before you read for correctness.
  return rows
    .filter((r) => r.active)
    .map((r) => r.value)
    .reduce((sum, v) => sum + v, 0);
}`;

export function LessonContent({
  course,
  module: mod,
  lesson,
}: {
  course: SampleCourse;
  module: SampleModule;
  lesson: SampleLesson;
}) {
  const [completed, setCompleted] = useState(false);
  const [saving, setSaving] = useState(false);
  const { notify } = useToast();

  const flat = allLessonsFlat(course);
  const index = flat.findIndex((l) => l.slug === lesson.slug);
  const prev = index > 0 ? flat[index - 1] : undefined;
  const next = index < flat.length - 1 ? flat[index + 1] : undefined;

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
    <article>
      <p className={styles.moduleLabel}>{mod.title}</p>
      <h1 className={styles.title}>{lesson.title}</h1>

      <div className={styles.body}>
        {lesson.type === "code" ? (
          <>
            <p>
              Generated diffs reward a different reading strategy than hand-written ones. Start by
              asking what changed in intent, not line-by-line — then verify the lines that matter.
            </p>
            <CodeBlock code={SAMPLE_CODE} language="javascript" />
            <p>
              Notice the filter-map-reduce chain reads like a sentence. That’s not an accident —
              it’s the fastest shape to verify at a glance, which is exactly what you want when
              reviewing code you didn’t write yourself.
            </p>
          </>
        ) : lesson.type === "flashcard" ? (
          <>
            <p>
              A quick flip-review before moving on — the kind of low-stakes retrieval practice that
              sticks better than re-reading your notes a third time.
            </p>
            <Flashcard
              front="What’s the fastest way to build trust in a generated diff?"
              back="Read for intent first, then verify only the lines that affect behavior you care about."
            />
          </>
        ) : (
          <>
            <p>
              Every lesson in Curitiq is written the way we’d want to be taught — plainly, with
              enough context to actually reason about the material afterward, not just recognize it
              on a quiz.
            </p>
            <p>
              Take your time here. There’s no timer, no streak penalty for pausing mid-lesson, and
              the “Mark complete” button below is yours to press whenever the idea has actually
              landed — not just when you’ve scrolled to the bottom.
            </p>
          </>
        )}
      </div>

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
    </article>
  );
}
