import { z } from "zod";
import {
  slugSchema,
  difficultySchema,
  durationMinutesSchema,
  seoMetadataSchema,
} from "./common.ts";

/** Standalone (not lesson-embedded) case studies — MDX-bodied. */
export const caseStudySchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  industry: z.string().optional(),
  difficulty: difficultySchema,
  estimatedDurationMinutes: durationMinutesSchema,
  relatedCourseSlugs: z.array(slugSchema).default([]),
  seo: seoMetadataSchema,
});
export type CaseStudy = z.infer<typeof caseStudySchema>;
