/**
 * Quiz engine schema. A quiz.json file is `z.array(quizQuestionSchema)`.
 * Discriminated on `type` so each question shape is exactly as strict as
 * it needs to be — no optional-everything grab-bag object.
 */
import { z } from "zod";
import { difficultySchema } from "./common.ts";

const questionBase = {
  id: z.string().min(1),
  prompt: z.string().min(1),
  difficulty: difficultySchema,
  points: z.number().int().positive().default(1),
  hints: z.array(z.string()).default([]),
  /** Shown after answering, regardless of correctness — the "why" behind
   *  the answer, not just the answer itself. */
  explanation: z.string().min(1),
  references: z.array(z.string()).default([]),
};

export const singleChoiceQuestionSchema = z.object({
  ...questionBase,
  type: z.literal("single-choice"),
  options: z.array(z.object({ id: z.string().min(1), text: z.string().min(1) })).min(2),
  correctOptionId: z.string().min(1),
});

export const multipleChoiceQuestionSchema = z.object({
  ...questionBase,
  type: z.literal("multiple-choice"),
  options: z.array(z.object({ id: z.string().min(1), text: z.string().min(1) })).min(2),
  correctOptionIds: z.array(z.string().min(1)).min(1),
});

export const trueFalseQuestionSchema = z.object({
  ...questionBase,
  type: z.literal("true-false"),
  correctAnswer: z.boolean(),
});

export const fillInBlankQuestionSchema = z.object({
  ...questionBase,
  type: z.literal("fill-in-blank"),
  /** Prompt should contain a literal "___" marking the blank. */
  acceptedAnswers: z.array(z.string().min(1)).min(1),
  caseSensitive: z.boolean().default(false),
});

export const matchingQuestionSchema = z.object({
  ...questionBase,
  type: z.literal("matching"),
  pairs: z.array(z.object({ left: z.string().min(1), right: z.string().min(1) })).min(2),
});

export const orderingQuestionSchema = z.object({
  ...questionBase,
  type: z.literal("ordering"),
  /** Items in their correct order — the UI shuffles for presentation. */
  items: z.array(z.string().min(1)).min(2),
});

export const codeOutputQuestionSchema = z.object({
  ...questionBase,
  type: z.literal("code-output"),
  code: z.string().min(1),
  language: z.string().min(1),
  options: z.array(z.object({ id: z.string().min(1), text: z.string().min(1) })).min(2),
  correctOptionId: z.string().min(1),
});

export const scenarioBasedQuestionSchema = z.object({
  ...questionBase,
  type: z.literal("scenario-based"),
  scenario: z.string().min(1),
  options: z.array(z.object({ id: z.string().min(1), text: z.string().min(1) })).min(2),
  correctOptionId: z.string().min(1),
});

export const explainWhyQuestionSchema = z.object({
  ...questionBase,
  type: z.literal("explain-why"),
  /** Free-text response question — not auto-graded, but ships with a
   *  model answer and a rubric so the UI/AI tutor can give feedback. */
  modelAnswer: z.string().min(1),
  rubric: z.array(z.string()).default([]),
});

export const quizQuestionSchema = z.discriminatedUnion("type", [
  singleChoiceQuestionSchema,
  multipleChoiceQuestionSchema,
  trueFalseQuestionSchema,
  fillInBlankQuestionSchema,
  matchingQuestionSchema,
  orderingQuestionSchema,
  codeOutputQuestionSchema,
  scenarioBasedQuestionSchema,
  explainWhyQuestionSchema,
]);
export type QuizQuestion = z.infer<typeof quizQuestionSchema>;
export const quizSchema = z.array(quizQuestionSchema).min(1);
export type Quiz = z.infer<typeof quizSchema>;
