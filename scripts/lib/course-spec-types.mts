/**
 * Authoring-time input shape for the M2.8 launch-library generator
 * (scripts/generate-courses.mts). A CourseSpec is what a human (or,
 * later, an AI generation job per docs/content/ai-generation-strategy.md)
 * actually writes — compact, substantive teaching points rather than
 * hand-formatted MDX/YAML/JSON. The generator expands each spec
 * deterministically into a full content/courses/<slug>/ tree that
 * validates against the M2.75 content schema.
 */

export type Difficulty = "beginner" | "intermediate" | "advanced";
export type LessonKind =
  "reading" | "code" | "interactive" | "flashcards" | "case-study" | "interview-preparation";

export interface LessonSpec {
  slug: string;
  title: string;
  kind: LessonKind;
  durationMinutes: number;
  free?: boolean;
  /** The real teaching content, as concise, specific bullets — not
   *  generic filler. The generator expands these into lesson prose,
   *  quiz questions, and (for the AI tutor) key concepts. 4-7 per
   *  lesson is typical. */
  points: string[];
  /** Only for kind: "code" — a realistic, runnable-looking example
   *  illustrating the lesson's point. */
  code?: { language: string; code: string };
  /** Only for kind: "flashcards" — explicit term/definition pairs. */
  cards?: { front: string; back: string }[];
  /** Only for kind: "interview-preparation" — explicit Q&A pairs. */
  interviewQA?: { question: string; answer: string }[];
}

export interface ModuleSpec {
  slug: string;
  title: string;
  description: string;
  lessons: LessonSpec[];
}

export interface CourseSpec {
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  difficulty: Difficulty;
  estimatedDurationMinutes: number;
  tags: string[];
  skills: string[];
  careerPaths: string[];
  instructor: { name: string; title: string; avatarInitials: string };
  objectives: string[];
  /** Free-text prerequisite descriptions, or slugs of other courses in
   *  this same launch library (validated by content:validate). */
  prerequisites: { description?: string; courseSlug?: string }[];
  modules: ModuleSpec[];
  project: {
    slug: string;
    title: string;
    deliverables: string[];
    rubric: string[];
  };
  resources: {
    title: string;
    type: "external-link" | "template" | "dataset";
    url: string;
    description: string;
  }[];
  certificateCriteria: string[];
  relatedCourseSlugs?: string[];
}
