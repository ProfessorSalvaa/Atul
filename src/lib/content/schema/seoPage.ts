import { z } from "zod";
import { slugSchema, seoMetadataSchema } from "./common.ts";

/**
 * Standalone, MDX-bodied landing pages that exist purely for SEO reach
 * (long-tail queries like "best sql courses for product managers") —
 * not tied to a single course. Lives at content/seo-pages/<slug>.mdx.
 * Distinct from `course.seo`/`caseStudy.seo`, which describe metadata
 * for a page that already exists for a non-SEO reason.
 */
export const seoPageSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  targetQuery: z.string().min(1),
  relatedCourseSlugs: z.array(slugSchema).default([]),
  seo: seoMetadataSchema,
});
export type SEOPage = z.infer<typeof seoPageSchema>;
