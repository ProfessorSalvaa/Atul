import { z } from "zod";
import { slugSchema } from "./common.ts";
import { resourceRefSchema } from "./common.ts";

export const standaloneResourceSchema = resourceRefSchema.extend({
  slug: slugSchema,
  relatedCourseSlugs: z.array(slugSchema).default([]),
});
export type StandaloneResource = z.infer<typeof standaloneResourceSchema>;
