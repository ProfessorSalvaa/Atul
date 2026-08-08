import { z } from "zod";
import { difficultySchema, taxonomyRefSchema } from "./common.ts";

export const interviewQuestionSchema = z.object({
  id: z.string().min(1),
  question: z.string().min(1),
  careerPath: taxonomyRefSchema,
  difficulty: difficultySchema,
  sampleAnswer: z.string().min(1),
  followUps: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
});
export type InterviewQuestion = z.infer<typeof interviewQuestionSchema>;
export const interviewQuestionBankSchema = z.array(interviewQuestionSchema).min(1);
