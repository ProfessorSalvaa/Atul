/**
 * Static sample content for M2's high-fidelity shell pages. Not real
 * product data — no DB entity backs this yet (that's M5). Shaped to match
 * the `Course/Module/Lesson` entities named in the P0 blueprint §21 so the
 * eventual real data layer is a drop-in replacement for these fixtures,
 * not a redesign of the pages that consume them.
 */

export type LessonType = "concept" | "code" | "flashcard";

export interface SampleLesson {
  slug: string;
  title: string;
  type: LessonType;
  durationMinutes: number;
  free?: boolean;
}

export interface SampleModule {
  title: string;
  lessons: SampleLesson[];
}

export interface SampleCourse {
  slug: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  durationHours: number;
  tags: string[];
  premium: boolean;
  modules: SampleModule[];
}

export const SAMPLE_COURSES: SampleCourse[] = [
  {
    slug: "data-analysis-fundamentals",
    title: "Data Analysis Fundamentals",
    description:
      "Go from spreadsheets to real analytical thinking — clean, explore, and tell honest stories with data, no prior stats background assumed.",
    level: "beginner",
    durationHours: 9,
    tags: ["Data", "Analytics", "Spreadsheets"],
    premium: false,
    modules: [
      {
        title: "Thinking in Data",
        lessons: [
          {
            slug: "why-data-analysis",
            title: "Why Data Analysis, Not Just Charts",
            type: "concept",
            durationMinutes: 12,
            free: true,
          },
          {
            slug: "clean-vs-dirty-data",
            title: "Clean vs. Dirty Data",
            type: "concept",
            durationMinutes: 15,
          },
          {
            slug: "spot-the-bias",
            title: "Spot the Bias: A Flashcard Drill",
            type: "flashcard",
            durationMinutes: 8,
          },
        ],
      },
      {
        title: "Exploring a Real Dataset",
        lessons: [
          {
            slug: "reading-a-schema",
            title: "Reading a Schema Like a Detective",
            type: "concept",
            durationMinutes: 14,
          },
          {
            slug: "writing-your-first-query",
            title: "Writing Your First Query",
            type: "code",
            durationMinutes: 20,
          },
        ],
      },
    ],
  },
  {
    slug: "ai-tooling-for-developers",
    title: "AI Tooling for Developers",
    description:
      "Practical, opinionated guidance on working with modern AI coding tools — prompting patterns, review discipline, and where to trust vs. verify.",
    level: "advanced",
    durationHours: 7,
    tags: ["AI", "Developer Tools", "Workflow"],
    premium: true,
    modules: [
      {
        title: "Working With, Not Against, the Model",
        lessons: [
          {
            slug: "the-trust-boundary",
            title: "The Trust Boundary",
            type: "concept",
            durationMinutes: 11,
            free: true,
          },
          {
            slug: "prompt-patterns-that-hold-up",
            title: "Prompt Patterns That Hold Up Under Change",
            type: "code",
            durationMinutes: 18,
          },
        ],
      },
      {
        title: "Review Discipline",
        lessons: [
          {
            slug: "reading-a-generated-diff",
            title: "Reading a Generated Diff Fast",
            type: "code",
            durationMinutes: 16,
          },
          {
            slug: "when-to-throw-it-out",
            title: "When to Throw It Out and Start Over",
            type: "concept",
            durationMinutes: 9,
          },
        ],
      },
    ],
  },
  {
    slug: "systems-design-deep-dive",
    title: "Systems Design Deep Dive",
    description:
      "Beyond the interview script — how real systems actually scale, degrade, and get debugged at 2am. For engineers who already ship.",
    level: "advanced",
    durationHours: 11,
    tags: ["Systems", "Architecture", "Scale"],
    premium: true,
    modules: [
      {
        title: "Foundations Worth Re-Examining",
        lessons: [
          {
            slug: "consistency-is-a-spectrum",
            title: "Consistency Is a Spectrum, Not a Switch",
            type: "concept",
            durationMinutes: 17,
            free: true,
          },
          {
            slug: "caching-that-actually-holds",
            title: "Caching That Actually Holds Up",
            type: "code",
            durationMinutes: 22,
          },
        ],
      },
    ],
  },
  {
    slug: "modern-product-design-foundations",
    title: "Modern Product Design Foundations",
    description:
      "The judgment behind good product design — hierarchy, restraint, and how to critique your own work before anyone else has to.",
    level: "beginner",
    durationHours: 6,
    tags: ["Design", "UX", "Product"],
    premium: false,
    modules: [
      {
        title: "Seeing Hierarchy",
        lessons: [
          {
            slug: "whats-actually-first",
            title: "What's Actually First on the Page",
            type: "concept",
            durationMinutes: 13,
            free: true,
          },
          {
            slug: "restraint-as-a-skill",
            title: "Restraint as a Skill",
            type: "flashcard",
            durationMinutes: 7,
          },
        ],
      },
    ],
  },
  {
    slug: "prompt-engineering-for-builders",
    title: "Prompt Engineering for Builders",
    description:
      "Structured, testable prompting for people shipping real features — not trivia, a repeatable process for prompts that survive contact with users.",
    level: "intermediate",
    durationHours: 5,
    tags: ["AI", "Product", "Prompting"],
    premium: true,
    modules: [
      {
        title: "A Process, Not a Trick",
        lessons: [
          {
            slug: "prompts-as-specifications",
            title: "Prompts as Specifications",
            type: "concept",
            durationMinutes: 10,
            free: true,
          },
          {
            slug: "testing-a-prompt-like-code",
            title: "Testing a Prompt Like Code",
            type: "code",
            durationMinutes: 19,
          },
        ],
      },
    ],
  },
];

export function getCourseBySlug(slug: string): SampleCourse | undefined {
  return SAMPLE_COURSES.find((c) => c.slug === slug);
}

export function getLessonBySlug(
  courseSlug: string,
  lessonSlug: string,
): { course: SampleCourse; module: SampleModule; lesson: SampleLesson } | undefined {
  const course = getCourseBySlug(courseSlug);
  if (!course) return undefined;
  for (const mod of course.modules) {
    const lesson = mod.lessons.find((l) => l.slug === lessonSlug);
    if (lesson) return { course, module: mod, lesson };
  }
  return undefined;
}

export function allLessonsFlat(course: SampleCourse): SampleLesson[] {
  return course.modules.flatMap((m) => m.lessons);
}
