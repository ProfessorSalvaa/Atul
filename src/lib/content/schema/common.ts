/**
 * Shared primitives used across every content type. This file has no
 * dependents outside `schema/` — it exists so `course.ts`, `lesson.ts`,
 * `quiz.ts`, etc. don't each redefine the same handful of cross-cutting
 * concerns (status, SEO, versioning, difficulty).
 *
 * See docs/content/schema-reference.md for the human-readable version of
 * everything defined here.
 */
import { z } from "zod";

/** A URL-safe identifier. Every content file's frontmatter `slug` (or the
 *  filename it lives in) must satisfy this — it's what routes are built
 *  from, so it's validated strictly rather than left as a plain string. */
export const slugSchema = z
  .string()
  .min(1)
  .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, 'must be lowercase kebab-case (e.g. "data-analysis-basics")');

export const isoDateSchema = z
  .string()
  .regex(/^\d{4}-\d{2}-\d{2}$/, "must be an ISO date (YYYY-MM-DD)");

/**
 * The publishing pipeline every piece of content moves through (P0/M2.75
 * "CONTENT PIPELINE"). `draft` content is never loaded into the app in
 * production; `published` is the only status the public site renders by
 * default. See docs/content/publishing-workflow.md.
 */
export const contentStatusSchema = z.enum([
  "draft",
  "in_review",
  "qa",
  "approved",
  "published",
  "archived",
]);
export type ContentStatus = z.infer<typeof contentStatusSchema>;

export const difficultySchema = z.enum(["beginner", "intermediate", "advanced"]);
export type Difficulty = z.infer<typeof difficultySchema>;

/** One entry in a content item's changelog. Append-only — see
 *  docs/content/versioning-strategy.md for why this lives inside the
 *  content file itself rather than relying solely on git history. */
export const versionHistoryEntrySchema = z.object({
  version: z.string().regex(/^\d+\.\d+\.\d+$/, 'must be semver (e.g. "1.2.0")'),
  date: isoDateSchema,
  author: z.string().min(1),
  summary: z.string().min(1),
  /** What changed, in the pipeline sense — a version bump on its own
   *  isn't necessarily a re-publish. */
  changeType: z.enum(["created", "content-update", "correction", "restructure", "seo-update"]),
});
export type VersionHistoryEntry = z.infer<typeof versionHistoryEntrySchema>;

export const seoMetadataSchema = z.object({
  title: z.string().min(1).max(70),
  description: z.string().min(1).max(160),
  keywords: z.array(z.string()).default([]),
  /** Defaults to the content's own canonical route if omitted — only set
   *  this explicitly when a page should canonicalize to a *different*
   *  URL (e.g. a syndicated SEO landing page). */
  canonicalPath: z.string().startsWith("/").optional(),
  ogImage: z.string().optional(),
  noIndex: z.boolean().default(false),
});
export type SEOMetadata = z.infer<typeof seoMetadataSchema>;

/**
 * Grounding context handed to the AI tutor when a learner asks a question
 * on this piece of content (P0's "scoped, not whole-course" tutor design —
 * see docs/navigation.md). This is authored content, not a live prompt.
 */
export const aiTutorContextSchema = z.object({
  summary: z.string().min(1),
  keyConcepts: z.array(z.string()).default([]),
  commonMisconceptions: z.array(z.string()).default([]),
  /** Explicit boundaries — topics the tutor should redirect away from
   *  even if asked, to keep answers grounded in this lesson. */
  outOfScopeTopics: z.array(z.string()).default([]),
});
export type AITutorContext = z.infer<typeof aiTutorContextSchema>;

export const resourceRefSchema = z.object({
  title: z.string().min(1),
  type: z.enum(["pdf", "template", "dataset", "code-repo", "slide-deck", "external-link"]),
  url: z.string().min(1),
  description: z.string().optional(),
});
export type ResourceRef = z.infer<typeof resourceRefSchema>;

/** A duration in minutes, kept as a plain integer everywhere (never a
 *  formatted string) so discovery/sort-by-duration doesn't need parsing. */
export const durationMinutesSchema = z.number().int().positive();

/** Taxonomy references are plain slug strings that must resolve against
 *  `content/taxonomy/*.yaml` — enforced by the referential-integrity pass
 *  in `validate.ts`, not by the zod schema itself (zod has no way to see
 *  the rest of the content graph). */
export const taxonomyRefSchema = slugSchema;
