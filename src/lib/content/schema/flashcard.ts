import { z } from "zod";
import { difficultySchema } from "./common.ts";

export const flashcardSchema = z.object({
  id: z.string().min(1),
  front: z.string().min(1),
  back: z.string().min(1),
  difficulty: difficultySchema.default("beginner"),
  tags: z.array(z.string()).default([]),
});
export type Flashcard = z.infer<typeof flashcardSchema>;
export const flashcardDeckSchema = z.array(flashcardSchema).min(1);
export type FlashcardDeck = z.infer<typeof flashcardDeckSchema>;
