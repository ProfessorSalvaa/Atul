/**
 * Lesson schema: discriminated union on `type`. Every lesson type shares
 * a common metadata envelope (title, duration, objectives, free-preview
 * flag, AI tutor context) plus a type-specific `body`/payload shape.
 *
 * MDX-bodied types (reading, case-study, interview-prep, cheat-sheet,
 * assignment) carry their prose in the lesson.mdx file itself — the
 * frontmatter of that file is exactly this schema minus `body`, and the
 * loader attaches the compiled MDX as `body` after parsing. Non-prose
 * types (quiz, flashcards) instead point at sibling JSON files.
 */
import { z } from "zod";
import { slugSchema, durationMinutesSchema, aiTutorContextSchema } from "./common.ts";

const lessonBase = {
  slug: slugSchema,
  title: z.string().min(1),
  order: z.number().int().nonnegative(),
  durationMinutes: durationMinutesSchema,
  objectives: z.array(z.string()).default([]),
  /** Free-preview lessons are visible without enrollment — every course
   *  needs at least one (enforced in the referential-integrity pass). */
  free: z.boolean().default(false),
  aiTutorContext: aiTutorContextSchema.optional(),
};

export const readingLessonSchema = z.object({ ...lessonBase, type: z.literal("reading") });
export const videoLessonSchema = z.object({
  ...lessonBase,
  type: z.literal("video"),
  videoUrl: z.string().min(1),
  transcriptAvailable: z.boolean().default(true),
});
export const interactiveLessonSchema = z.object({
  ...lessonBase,
  type: z.literal("interactive"),
  interactionKind: z.enum(["simulation", "walkthrough", "sandbox"]),
});
export const codeLessonSchema = z.object({
  ...lessonBase,
  type: z.literal("code"),
  language: z.string().min(1),
  starterCode: z.string().optional(),
  solutionCode: z.string().optional(),
});
export const flashcardsLessonSchema = z.object({
  ...lessonBase,
  type: z.literal("flashcards"),
  /** Filename (within the same lesson folder) of the flashcards.json. */
  deckFile: z.string().default("flashcards.json"),
});
export const quizLessonSchema = z.object({
  ...lessonBase,
  type: z.literal("quiz"),
  quizFile: z.string().default("quiz.json"),
  passingScorePercent: z.number().int().min(0).max(100).default(70),
});
export const assignmentLessonSchema = z.object({
  ...lessonBase,
  type: z.literal("assignment"),
  submissionFormat: z.enum(["text", "file-upload", "url", "code-repo"]),
  rubric: z.array(z.string()).default([]),
});
export const caseStudyLessonSchema = z.object({ ...lessonBase, type: z.literal("case-study") });
export const practiceLabLessonSchema = z.object({
  ...lessonBase,
  type: z.literal("practice-lab"),
  environment: z.string().min(1),
});
export const challengeLessonSchema = z.object({
  ...lessonBase,
  type: z.literal("challenge"),
  timeLimitMinutes: durationMinutesSchema.optional(),
});
export const interviewPrepLessonSchema = z.object({
  ...lessonBase,
  type: z.literal("interview-preparation"),
  careerPaths: z.array(z.string()).default([]),
});

export const lessonSchema = z.discriminatedUnion("type", [
  readingLessonSchema,
  videoLessonSchema,
  interactiveLessonSchema,
  codeLessonSchema,
  flashcardsLessonSchema,
  quizLessonSchema,
  assignmentLessonSchema,
  caseStudyLessonSchema,
  practiceLabLessonSchema,
  challengeLessonSchema,
  interviewPrepLessonSchema,
]);
export type Lesson = z.infer<typeof lessonSchema>;
export type LessonType = Lesson["type"];
