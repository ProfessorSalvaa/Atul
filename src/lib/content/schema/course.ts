/**
 * Course-level schema: the top of the content hierarchy. A course.yaml
 * file in content/courses/<slug>/ must satisfy `courseSchema`.
 */
import { z } from "zod";
import {
  slugSchema,
  isoDateSchema,
  contentStatusSchema,
  difficultySchema,
  versionHistoryEntrySchema,
  seoMetadataSchema,
  aiTutorContextSchema,
  resourceRefSchema,
  durationMinutesSchema,
  taxonomyRefSchema,
} from "./common.ts";

export const learningObjectiveSchema = z.object({
  id: z.string().min(1),
  text: z.string().min(1),
});
export type LearningObjective = z.infer<typeof learningObjectiveSchema>;

export const prerequisiteSchema = z
  .object({
    /** Either a reference to another course's slug, or a freeform
     *  description ("basic SQL familiarity") when there's no course to
     *  link to yet. Exactly one of the two must be present. */
    courseSlug: slugSchema.optional(),
    description: z.string().min(1).optional(),
  })
  .refine((v) => v.courseSlug || v.description, {
    message: "prerequisite needs either courseSlug or description",
  });
export type Prerequisite = z.infer<typeof prerequisiteSchema>;

export const certificateSchema = z.object({
  title: z.string().min(1),
  /** What must be true for the certificate to be issued. Kept as a
   *  human-readable rule set now; can become machine-checked later. */
  criteria: z.array(z.string()).default(["Complete all modules", "Pass the final assessment"]),
  templateId: z.string().default("standard"),
});
export type Certificate = z.infer<typeof certificateSchema>;

/** A module is a named group of lessons within a course. The module
 *  itself doesn't inline its lessons — lessons live as their own files
 *  under modules/<module-slug>/lessons/, and module.yaml just orders
 *  them by slug. This keeps a single lesson movable/reorderable without
 *  rewriting a giant nested course file. */
export const moduleManifestEntrySchema = z.object({
  slug: slugSchema,
  order: z.number().int().nonnegative(),
});

export const moduleSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  description: z.string().min(1),
  order: z.number().int().nonnegative(),
  objectives: z.array(learningObjectiveSchema).default([]),
  lessons: z.array(moduleManifestEntrySchema).min(1),
});
export type Module = z.infer<typeof moduleSchema>;

export const courseSchema = z.object({
  slug: slugSchema,
  title: z.string().min(1),
  subtitle: z.string().min(1),
  status: contentStatusSchema,
  difficulty: difficultySchema,
  estimatedDurationMinutes: durationMinutesSchema,
  tags: z.array(taxonomyRefSchema).default([]),
  skills: z.array(taxonomyRefSchema).default([]),
  careerPaths: z.array(taxonomyRefSchema).default([]),
  category: taxonomyRefSchema,
  /** Gates enrollment behind a paid plan — mirrors the M2.5 sample-data
   *  `premium` flag until real billing (M8) drives this instead. */
  premium: z.boolean().default(false),

  objectives: z.array(learningObjectiveSchema).default([]),
  prerequisites: z.array(prerequisiteSchema).default([]),

  instructor: z.object({
    name: z.string().min(1),
    title: z.string().min(1),
    bio: z.string().min(1),
    avatarInitials: z.string().min(1).max(3),
  }),

  /** Ordered list of module slugs — the actual module.yaml files are the
   *  source of truth for each module's contents; this is the course's
   *  own view of "which modules, in what order." */
  modules: z.array(moduleManifestEntrySchema).min(1),

  projectSlugs: z.array(slugSchema).default([]),
  assessmentSlugs: z.array(slugSchema).default([]),
  resources: z.array(resourceRefSchema).default([]),
  certificate: certificateSchema.optional(),

  relatedCourseSlugs: z.array(slugSchema).default([]),

  seo: seoMetadataSchema,
  aiTutorContext: aiTutorContextSchema,

  versionHistory: z.array(versionHistoryEntrySchema).min(1),
  publishedDate: isoDateSchema.optional(),
  updatedDate: isoDateSchema.optional(),

  /** Demo-only social proof fields, carried over from the M2.5 sample
   *  data model. These stay hand-authored (not derived) until M5+ wires
   *  up a real enrollment/reviews backend. */
  rating: z.number().min(0).max(5).optional(),
  reviewCount: z.number().int().nonnegative().optional(),
  enrolledCount: z.number().int().nonnegative().optional(),
});
export type Course = z.infer<typeof courseSchema>;

export const reviewSchema = z.object({
  id: z.string().min(1),
  authorName: z.string().min(1),
  authorInitials: z.string().min(1).max(3),
  rating: z.number().min(1).max(5),
  quote: z.string().min(1),
  date: isoDateSchema.optional(),
});
export type Review = z.infer<typeof reviewSchema>;
