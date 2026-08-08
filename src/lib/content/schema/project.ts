import { z } from "zod";
import { slugSchema, difficultySchema, durationMinutesSchema } from "./common.ts";

/** Practice projects are MDX-bodied (brief lives in project.mdx);
 *  this schema is the frontmatter. */
export const projectSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  difficulty: difficultySchema,
  estimatedDurationMinutes: durationMinutesSchema,
  skills: z.array(z.string()).default([]),
  deliverables: z.array(z.string()).min(1),
  rubric: z.array(z.string()).default([]),
});
export type Project = z.infer<typeof projectSchema>;
