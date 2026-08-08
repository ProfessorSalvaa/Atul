import { z } from "zod";
import { slugSchema, durationMinutesSchema } from "./common.ts";
import { quizQuestionSchema } from "./quiz.ts";

/** A course-level (not lesson-level) assessment — e.g. a final exam
 *  gating the certificate. Reuses the same question bank shape as
 *  lesson quizzes so the QuizFlow UI can render either. */
export const assessmentSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  passingScorePercent: z.number().int().min(0).max(100).default(80),
  timeLimitMinutes: durationMinutesSchema.optional(),
  questions: z.array(quizQuestionSchema).min(1),
});
export type Assessment = z.infer<typeof assessmentSchema>;
