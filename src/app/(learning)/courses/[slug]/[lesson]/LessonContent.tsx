import { allLessonsFlat, loadCourse } from "@/lib/content/loader";
import { MDXBody } from "@/lib/content/mdx";
import type { Course, Lesson, Module } from "@/lib/content/schema";
import { LessonInteractive } from "./LessonInteractive";
import styles from "./page.module.css";

/**
 * Server Component: resolves prev/next lessons and compiles the lesson's
 * MDX body, then hands everything to the client-side `LessonInteractive`
 * for the stateful bits (mark-complete, toasts, pager). MDX compilation
 * (`next-mdx-remote/rsc`) only works in a Server Component, which is why
 * this split exists — see docs/content/architecture.md.
 */
export function LessonContent({
  course,
  module: mod,
  lesson,
  mdxSource,
}: {
  course: Course;
  module: Module;
  lesson: Lesson;
  mdxSource?: string;
}) {
  const loaded = loadCourse(course.slug);
  const flat = loaded ? allLessonsFlat(loaded) : [];
  const index = flat.findIndex((l) => l.slug === lesson.slug);
  const prev = index > 0 ? flat[index - 1] : undefined;
  const next = index >= 0 && index < flat.length - 1 ? flat[index + 1] : undefined;

  return (
    <article>
      <p className={styles.moduleLabel}>{mod.title}</p>
      <h1 className={styles.title}>{lesson.title}</h1>

      <LessonInteractive course={course} lesson={lesson} prev={prev} next={next}>
        <div className={styles.body}>{mdxSource ? <MDXBody source={mdxSource} /> : null}</div>
      </LessonInteractive>
    </article>
  );
}
