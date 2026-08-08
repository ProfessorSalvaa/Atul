/**
 * Content loader: the only place in the app allowed to touch the
 * filesystem under content/. Everything else — pages, discovery, SEO —
 * goes through the typed getters exported here.
 *
 * Server-only (uses node:fs). Every read is validated against the Zod
 * schemas in ./schema before it's returned — an invalid content file
 * throws at load time (loudly, at build time for SSG) rather than
 * silently rendering `undefined` somewhere deep in a page component.
 *
 * Results are memoized with React's `cache()` so repeated calls within
 * one render pass (e.g. a layout and a page both asking for the same
 * course) hit the filesystem once, and reset between requests in dev.
 */
import "server-only";
import fs from "node:fs";
import path from "node:path";
import { cache } from "react";
import matter from "gray-matter";
import YAML from "yaml";
import readingTime from "reading-time";

import {
  courseSchema,
  moduleSchema,
  lessonSchema,
  reviewSchema,
  quizSchema,
  flashcardDeckSchema,
  taxonomyFileSchema,
  type Course,
  type Module,
  type Lesson,
  type Review,
  type Quiz,
  type FlashcardDeck,
  type TaxonomyEntry,
} from "./schema";

const CONTENT_ROOT = path.join(process.cwd(), "content");
const COURSES_DIR = path.join(CONTENT_ROOT, "courses");
const TAXONOMY_DIR = path.join(CONTENT_ROOT, "taxonomy");

function readYaml(filePath: string): unknown {
  return YAML.parse(fs.readFileSync(filePath, "utf-8"));
}

function readJson(filePath: string): unknown {
  return JSON.parse(fs.readFileSync(filePath, "utf-8"));
}

function dirExists(p: string): boolean {
  return fs.existsSync(p) && fs.statSync(p).isDirectory();
}

/** A lesson plus its compiled-ready MDX source (for prose types) and its
 *  reading-time estimate. Quiz/flashcard lesson types carry `mdxSource`
 *  as `undefined` — their payload lives in loadQuiz/loadFlashcards. */
export interface LoadedLesson {
  lesson: Lesson;
  mdxSource?: string;
  readingTimeMinutes?: number;
}

export interface LoadedModule {
  module: Module;
  lessons: LoadedLesson[];
}

export interface LoadedCourse {
  course: Course;
  indexMdxSource: string;
  reviews: Review[];
  modules: LoadedModule[];
}

/** Every course slug that has a course.yaml — used for
 *  generateStaticParams and catalog listing. */
export const getAllCourseSlugs = cache((): string[] => {
  if (!dirExists(COURSES_DIR)) return [];
  return fs
    .readdirSync(COURSES_DIR)
    .filter((entry) => fs.existsSync(path.join(COURSES_DIR, entry, "course.yaml")))
    .sort();
});

function loadModuleSync(courseSlug: string, moduleSlug: string): LoadedModule {
  const moduleDir = path.join(COURSES_DIR, courseSlug, "modules", moduleSlug);
  const moduleFile = path.join(moduleDir, "module.yaml");
  const parsedModule = moduleSchema.parse(readYaml(moduleFile));

  const lessons = parsedModule.lessons
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(({ slug: lessonSlug }) => loadLessonSync(moduleDir, lessonSlug));

  return { module: parsedModule, lessons };
}

function loadLessonSync(moduleDir: string, lessonSlug: string): LoadedLesson {
  const lessonDir = path.join(moduleDir, "lessons", lessonSlug);
  const mdxFile = path.join(lessonDir, "lesson.mdx");

  if (fs.existsSync(mdxFile)) {
    const raw = fs.readFileSync(mdxFile, "utf-8");
    const { data, content } = matter(raw);
    const lesson = lessonSchema.parse({ ...data, slug: lessonSlug });
    return {
      lesson,
      mdxSource: content,
      readingTimeMinutes: Math.ceil(readingTime(content).minutes),
    };
  }

  // Non-MDX lesson types (quiz, flashcards) declare their frontmatter in
  // a plain lesson.yaml since there's no prose body to carry it.
  const yamlFile = path.join(lessonDir, "lesson.yaml");
  const lesson = lessonSchema.parse({ ...(readYaml(yamlFile) as object), slug: lessonSlug });
  return { lesson };
}

export const loadCourse = cache((courseSlug: string): LoadedCourse | undefined => {
  const courseDir = path.join(COURSES_DIR, courseSlug);
  const courseFile = path.join(courseDir, "course.yaml");
  if (!fs.existsSync(courseFile)) return undefined;

  const course = courseSchema.parse(readYaml(courseFile));

  const indexMdxFile = path.join(courseDir, "index.mdx");
  const indexMdxSource = fs.existsSync(indexMdxFile)
    ? matter(fs.readFileSync(indexMdxFile, "utf-8")).content
    : "";

  const reviewsFile = path.join(courseDir, "reviews.json");
  const reviews = fs.existsSync(reviewsFile)
    ? reviewSchema.array().parse(readJson(reviewsFile))
    : [];

  const modules = course.modules
    .slice()
    .sort((a, b) => a.order - b.order)
    .map(({ slug }) => loadModuleSync(courseSlug, slug));

  return { course, indexMdxSource, reviews, modules };
});

export const getAllCourses = cache((): LoadedCourse[] =>
  getAllCourseSlugs()
    .map(loadCourse)
    .filter((c): c is LoadedCourse => c !== undefined),
);

export interface LoadedLessonWithContext {
  course: Course;
  module: Module;
  lesson: Lesson;
  mdxSource?: string;
  readingTimeMinutes?: number;
}

export const getLessonBySlug = cache(
  (courseSlug: string, lessonSlug: string): LoadedLessonWithContext | undefined => {
    const loaded = loadCourse(courseSlug);
    if (!loaded) return undefined;
    for (const lm of loaded.modules) {
      const found = lm.lessons.find((l) => l.lesson.slug === lessonSlug);
      if (found) {
        return {
          course: loaded.course,
          module: lm.module,
          lesson: found.lesson,
          mdxSource: found.mdxSource,
          readingTimeMinutes: found.readingTimeMinutes,
        };
      }
    }
    return undefined;
  },
);

/** Flattened, module-order-then-lesson-order lesson list for a course —
 *  mirrors the M2.5 `allLessonsFlat` sample-data helper so pager /
 *  progress logic doesn't need to change when switching data sources. */
export function allLessonsFlat(loaded: LoadedCourse): Lesson[] {
  return loaded.modules.flatMap((m) => m.lessons.map((l) => l.lesson));
}

function findLessonDir(courseSlug: string, lessonSlug: string): string | undefined {
  const loaded = loadCourse(courseSlug);
  if (!loaded) return undefined;
  for (const lm of loaded.modules) {
    if (lm.lessons.some((l) => l.lesson.slug === lessonSlug)) {
      return path.join(COURSES_DIR, courseSlug, "modules", lm.module.slug, "lessons", lessonSlug);
    }
  }
  return undefined;
}

export const loadQuiz = cache((courseSlug: string, lessonSlug: string): Quiz | undefined => {
  const lessonDir = findLessonDir(courseSlug, lessonSlug);
  if (!lessonDir) return undefined;
  const quizFile = path.join(lessonDir, "quiz.json");
  if (!fs.existsSync(quizFile)) return undefined;
  return quizSchema.parse(readJson(quizFile));
});

export const loadFlashcards = cache(
  (courseSlug: string, lessonSlug: string): FlashcardDeck | undefined => {
    const lessonDir = findLessonDir(courseSlug, lessonSlug);
    if (!lessonDir) return undefined;
    const deckFile = path.join(lessonDir, "flashcards.json");
    if (!fs.existsSync(deckFile)) return undefined;
    return flashcardDeckSchema.parse(readJson(deckFile));
  },
);

export const loadTaxonomy = cache(
  (file: "tags" | "skills" | "career-paths" | "categories"): TaxonomyEntry[] => {
    const filePath = path.join(TAXONOMY_DIR, `${file}.yaml`);
    if (!fs.existsSync(filePath)) return [];
    return taxonomyFileSchema.parse(readYaml(filePath));
  },
);

export function getContentRoot(): string {
  return CONTENT_ROOT;
}
