import { z } from "zod";
import { slugSchema, seoMetadataSchema } from "./common.ts";

/** MDX-bodied quick-reference sheets. */
export const cheatSheetSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  summary: z.string().min(1),
  relatedCourseSlugs: z.array(slugSchema).default([]),
  seo: seoMetadataSchema,
});
export type CheatSheet = z.infer<typeof cheatSheetSchema>;
