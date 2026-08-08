/**
 * Standalone content validator — the logic backing `pnpm content:validate`
 * (scripts/validate-content.ts) and reusable by the loader or a future
 * CI/CMS webhook. Two passes:
 *
 *  1. Schema validation — every content file must parse against its Zod
 *     schema (schema/*.ts). Structural errors (wrong type, missing
 *     required field) are caught here.
 *  2. Referential integrity — cross-file references that Zod can't see
 *     on its own: taxonomy refs must resolve, related/prerequisite
 *     course slugs must exist, every course needs at least one free
 *     preview lesson, module/lesson manifests must match the folders
 *     that actually exist on disk.
 *
 * This file has no "server-only" import (unlike loader.ts) so it can run
 * under plain `node` in CI without a Next.js runtime.
 */
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import YAML from "yaml";
import { z } from "zod";

import {
  courseSchema,
  moduleSchema,
  lessonSchema,
  reviewSchema,
  quizSchema,
  flashcardDeckSchema,
  taxonomyFileSchema,
  type Course,
} from "./schema/index.ts";

export interface ValidationIssue {
  level: "error" | "warning";
  file: string;
  message: string;
}

function readYaml(p: string): unknown {
  return YAML.parse(fs.readFileSync(p, "utf-8"));
}
function readJson(p: string): unknown {
  return JSON.parse(fs.readFileSync(p, "utf-8"));
}
function rel(root: string, p: string): string {
  return path.relative(root, p);
}

function zodIssuesToMessages(err: z.ZodError): string[] {
  return err.issues.map((i) => `${i.path.join(".") || "(root)"}: ${i.message}`);
}

export function validateContentTree(contentRoot: string): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const coursesDir = path.join(contentRoot, "courses");
  const taxonomyDir = path.join(contentRoot, "taxonomy");

  // --- Taxonomy ---------------------------------------------------
  const taxonomyFiles = ["tags", "skills", "career-paths", "categories"] as const;
  const taxonomySlugs: Record<(typeof taxonomyFiles)[number], Set<string>> = {
    tags: new Set(),
    skills: new Set(),
    "career-paths": new Set(),
    categories: new Set(),
  };
  for (const name of taxonomyFiles) {
    const file = path.join(taxonomyDir, `${name}.yaml`);
    if (!fs.existsSync(file)) {
      issues.push({
        level: "warning",
        file: rel(contentRoot, file),
        message: "taxonomy file missing",
      });
      continue;
    }
    const parsed = taxonomyFileSchema.safeParse(readYaml(file));
    if (!parsed.success) {
      for (const m of zodIssuesToMessages(parsed.error)) {
        issues.push({ level: "error", file: rel(contentRoot, file), message: m });
      }
      continue;
    }
    for (const entry of parsed.data) taxonomySlugs[name].add(entry.slug);
  }

  if (!fs.existsSync(coursesDir)) {
    issues.push({
      level: "error",
      file: "courses/",
      message: "content/courses directory does not exist",
    });
    return issues;
  }

  const courseSlugsOnDisk = fs
    .readdirSync(coursesDir)
    .filter((e) => fs.statSync(path.join(coursesDir, e)).isDirectory());
  const validCourses = new Map<string, Course>();

  // --- Courses, modules, lessons -----------------------------------
  for (const courseSlug of courseSlugsOnDisk) {
    const courseDir = path.join(coursesDir, courseSlug);
    const courseFile = path.join(courseDir, "course.yaml");
    if (!fs.existsSync(courseFile)) {
      issues.push({
        level: "error",
        file: rel(contentRoot, courseDir),
        message: "missing course.yaml",
      });
      continue;
    }

    const courseParsed = courseSchema.safeParse(readYaml(courseFile));
    if (!courseParsed.success) {
      for (const m of zodIssuesToMessages(courseParsed.error)) {
        issues.push({ level: "error", file: rel(contentRoot, courseFile), message: m });
      }
      continue;
    }
    const course = courseParsed.data;
    if (course.slug !== courseSlug) {
      issues.push({
        level: "error",
        file: rel(contentRoot, courseFile),
        message: `frontmatter slug "${course.slug}" does not match folder name "${courseSlug}"`,
      });
    }
    validCourses.set(courseSlug, course);

    // taxonomy refs
    for (const tag of course.tags) {
      if (!taxonomySlugs.tags.has(tag)) {
        issues.push({
          level: "error",
          file: rel(contentRoot, courseFile),
          message: `unknown tag "${tag}"`,
        });
      }
    }
    for (const skill of course.skills) {
      if (!taxonomySlugs.skills.has(skill)) {
        issues.push({
          level: "error",
          file: rel(contentRoot, courseFile),
          message: `unknown skill "${skill}"`,
        });
      }
    }
    for (const cp of course.careerPaths) {
      if (!taxonomySlugs["career-paths"].has(cp)) {
        issues.push({
          level: "error",
          file: rel(contentRoot, courseFile),
          message: `unknown careerPath "${cp}"`,
        });
      }
    }
    if (!taxonomySlugs.categories.has(course.category)) {
      issues.push({
        level: "error",
        file: rel(contentRoot, courseFile),
        message: `unknown category "${course.category}"`,
      });
    }

    if (!fs.existsSync(path.join(courseDir, "index.mdx"))) {
      issues.push({
        level: "warning",
        file: rel(contentRoot, courseDir),
        message: "missing index.mdx",
      });
    }

    const reviewsFile = path.join(courseDir, "reviews.json");
    if (fs.existsSync(reviewsFile)) {
      const parsed = reviewSchema.array().safeParse(readJson(reviewsFile));
      if (!parsed.success) {
        for (const m of zodIssuesToMessages(parsed.error)) {
          issues.push({ level: "error", file: rel(contentRoot, reviewsFile), message: m });
        }
      }
    }

    let courseHasFreeLesson = false;

    for (const modEntry of course.modules) {
      const modDir = path.join(courseDir, "modules", modEntry.slug);
      const modFile = path.join(modDir, "module.yaml");
      if (!fs.existsSync(modFile)) {
        issues.push({
          level: "error",
          file: rel(contentRoot, courseFile),
          message: `course references module "${modEntry.slug}" but ${rel(contentRoot, modFile)} does not exist`,
        });
        continue;
      }
      const modParsed = moduleSchema.safeParse(readYaml(modFile));
      if (!modParsed.success) {
        for (const m of zodIssuesToMessages(modParsed.error)) {
          issues.push({ level: "error", file: rel(contentRoot, modFile), message: m });
        }
        continue;
      }
      const mod = modParsed.data;

      for (const lessonEntry of mod.lessons) {
        const lessonDir = path.join(modDir, "lessons", lessonEntry.slug);
        const mdxFile = path.join(lessonDir, "lesson.mdx");
        const yamlFile = path.join(lessonDir, "lesson.yaml");
        const lessonFile = fs.existsSync(mdxFile) ? mdxFile : yamlFile;

        if (!fs.existsSync(lessonFile)) {
          issues.push({
            level: "error",
            file: rel(contentRoot, modFile),
            message: `module references lesson "${lessonEntry.slug}" but neither lesson.mdx nor lesson.yaml exists`,
          });
          continue;
        }

        const raw = fs.existsSync(mdxFile)
          ? matter(fs.readFileSync(mdxFile, "utf-8")).data
          : (readYaml(yamlFile) as object);
        const lessonParsed = lessonSchema.safeParse({ ...raw, slug: lessonEntry.slug });
        if (!lessonParsed.success) {
          for (const m of zodIssuesToMessages(lessonParsed.error)) {
            issues.push({ level: "error", file: rel(contentRoot, lessonFile), message: m });
          }
          continue;
        }
        if (lessonParsed.data.free) courseHasFreeLesson = true;

        if (lessonParsed.data.type === "quiz" || fs.existsSync(path.join(lessonDir, "quiz.json"))) {
          const quizFile = path.join(lessonDir, "quiz.json");
          if (fs.existsSync(quizFile)) {
            const qParsed = quizSchema.safeParse(readJson(quizFile));
            if (!qParsed.success) {
              for (const m of zodIssuesToMessages(qParsed.error)) {
                issues.push({ level: "error", file: rel(contentRoot, quizFile), message: m });
              }
            }
          } else if (lessonParsed.data.type === "quiz") {
            issues.push({
              level: "error",
              file: rel(contentRoot, lessonDir),
              message: "quiz lesson missing quiz.json",
            });
          }
        }

        if (lessonParsed.data.type === "flashcards") {
          const deckFile = path.join(lessonDir, "flashcards.json");
          if (!fs.existsSync(deckFile)) {
            issues.push({
              level: "error",
              file: rel(contentRoot, lessonDir),
              message: "flashcards lesson missing flashcards.json",
            });
          } else {
            const dParsed = flashcardDeckSchema.safeParse(readJson(deckFile));
            if (!dParsed.success) {
              for (const m of zodIssuesToMessages(dParsed.error)) {
                issues.push({ level: "error", file: rel(contentRoot, deckFile), message: m });
              }
            }
          }
        }
      }
    }

    if (!courseHasFreeLesson) {
      issues.push({
        level: "error",
        file: rel(contentRoot, courseFile),
        message: "course has no free-preview lesson (at least one lesson must have free: true)",
      });
    }
  }

  // --- Cross-course references --------------------------------------
  for (const [courseSlug, course] of validCourses) {
    for (const relatedSlug of course.relatedCourseSlugs) {
      if (!validCourses.has(relatedSlug)) {
        issues.push({
          level: "error",
          file: `courses/${courseSlug}/course.yaml`,
          message: `relatedCourseSlugs references unknown course "${relatedSlug}"`,
        });
      }
    }
    for (const prereq of course.prerequisites) {
      if (prereq.courseSlug && !validCourses.has(prereq.courseSlug)) {
        issues.push({
          level: "error",
          file: `courses/${courseSlug}/course.yaml`,
          message: `prerequisite references unknown course "${prereq.courseSlug}"`,
        });
      }
    }
  }

  return issues;
}
