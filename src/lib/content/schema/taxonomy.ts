import { z } from "zod";
import { slugSchema } from "./common.ts";

/** Shared shape for content/taxonomy/{tags,skills,career-paths,categories}.yaml
 *  — each file is `z.array(taxonomyEntrySchema)`. Every taxonomyRef used
 *  elsewhere in the content graph must resolve to one of these `slug`s;
 *  checked by the referential-integrity pass, not by zod itself. */
export const taxonomyEntrySchema = z.object({
  slug: slugSchema,
  label: z.string().min(1),
  description: z.string().optional(),
});
export type TaxonomyEntry = z.infer<typeof taxonomyEntrySchema>;
export const taxonomyFileSchema = z.array(taxonomyEntrySchema);
