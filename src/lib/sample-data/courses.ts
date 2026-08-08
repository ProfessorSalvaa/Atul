/**
 * Static sample content for the M2/M2.5 high-fidelity shell pages. Not real
 * product data — no DB entity backs this yet (that's M5). Shaped to match
 * the `Course/Module/Lesson` entities named in the P0 blueprint §21 so the
 * eventual real data layer is a drop-in replacement for these fixtures,
 * not a redesign of the pages that consume them.
 *
 * M2.5 addendum: added `instructor`/`rating`/`reviewCount`/`enrolledCount`
 * so catalog/detail screens can read as a live product rather than an
 * empty shell — see docs/navigation.md for the M2.5 addendum.
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

export interface SampleInstructor {
  name: string;
  title: string;
  initials: string;
}

export interface SampleReview {
  name: string;
  rating: number;
  quote: string;
}

export interface SampleCourse {
  slug: string;
  title: string;
  description: string;
  level: "beginner" | "intermediate" | "advanced";
  durationHours: number;
  tags: string[];
  premium: boolean;
  instructor: SampleInstructor;
  rating: number;
  reviewCount: number;
  enrolledCount: number;
  reviews: SampleReview[];
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
    instructor: { name: "Dana Okafor", title: "Ex-Head of Analytics, Fieldstone", initials: "DO" },
    rating: 4.8,
    reviewCount: 1284,
    enrolledCount: 18420,
    reviews: [
      {
        name: "Priya N.",
        rating: 5,
        quote: "The dataset walkthroughs finally made joins click for me.",
      },
      {
        name: "Sam T.",
        rating: 5,
        quote: "Went in knowing pivot tables, came out actually thinking like an analyst.",
      },
      {
        name: "Kwame B.",
        rating: 4,
        quote: "Excellent pacing. Wish there were two more modules on visualization.",
      },
    ],
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
    instructor: { name: "Theo Marsh", title: "Staff Engineer, ex-Vercel", initials: "TM" },
    rating: 4.9,
    reviewCount: 2113,
    enrolledCount: 26710,
    reviews: [
      {
        name: "Marcus D.",
        rating: 5,
        quote: "The review-discipline module alone paid for the subscription.",
      },
      {
        name: "Lina H.",
        rating: 5,
        quote: "First course on this topic that isn't just prompt trivia.",
      },
      {
        name: "Owen P.",
        rating: 5,
        quote: "Changed how my whole team reviews generated diffs.",
      },
    ],
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
    instructor: { name: "Renata Silva", title: "Principal Engineer, ex-Datadog", initials: "RS" },
    rating: 4.9,
    reviewCount: 941,
    enrolledCount: 11380,
    reviews: [
      {
        name: "Jon K.",
        rating: 5,
        quote: "The caching module is the clearest explanation I've ever read.",
      },
      {
        name: "Amara O.",
        rating: 5,
        quote: "Feels like debugging alongside someone who's actually been paged at 2am.",
      },
    ],
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
    instructor: { name: "Yuki Tanaka", title: "Design Lead, ex-Notion", initials: "YT" },
    rating: 4.7,
    reviewCount: 1567,
    enrolledCount: 21990,
    reviews: [
      {
        name: "Elena R.",
        rating: 5,
        quote: "Reframed how I look at my own screens before shipping them.",
      },
      {
        name: "Diego M.",
        rating: 4,
        quote: "Short and dense in the best way — nothing feels like filler.",
      },
    ],
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
    instructor: { name: "Theo Marsh", title: "Staff Engineer, ex-Vercel", initials: "TM" },
    rating: 4.8,
    reviewCount: 803,
    enrolledCount: 9640,
    reviews: [
      {
        name: "Nadia F.",
        rating: 5,
        quote: "The 'testing a prompt like code' lesson changed my whole workflow.",
      },
      {
        name: "Ravi S.",
        rating: 4,
        quote: "Dense but worth slowing down for. Took notes on every lesson.",
      },
    ],
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
  {
    slug: "sql-for-product-thinking",
    title: "SQL for Product Thinking",
    description:
      "Write SQL that answers real product questions — funnels, retention, and cohort analysis, taught by working backward from decisions, not syntax.",
    level: "intermediate",
    durationHours: 8,
    tags: ["SQL", "Product", "Analytics"],
    premium: true,
    instructor: { name: "Dana Okafor", title: "Ex-Head of Analytics, Fieldstone", initials: "DO" },
    rating: 4.7,
    reviewCount: 612,
    enrolledCount: 8130,
    reviews: [
      {
        name: "Felix W.",
        rating: 5,
        quote: "First SQL course that starts with the question, not the JOIN syntax.",
      },
      {
        name: "Grace L.",
        rating: 4,
        quote: "The cohort analysis lesson alone was worth the module.",
      },
    ],
    modules: [
      {
        title: "Questions Before Queries",
        lessons: [
          {
            slug: "start-with-the-decision",
            title: "Start With the Decision, Not the Table",
            type: "concept",
            durationMinutes: 11,
            free: true,
          },
          {
            slug: "funnels-in-sql",
            title: "Building a Funnel Query",
            type: "code",
            durationMinutes: 21,
          },
        ],
      },
    ],
  },
  {
    slug: "technical-writing-for-engineers",
    title: "Technical Writing for Engineers",
    description:
      "Design docs, PR descriptions, and postmortems that people actually read — clarity as a skill you can practice, not a personality trait.",
    level: "beginner",
    durationHours: 4,
    tags: ["Writing", "Communication", "Career"],
    premium: false,
    instructor: { name: "Renata Silva", title: "Principal Engineer, ex-Datadog", initials: "RS" },
    rating: 4.6,
    reviewCount: 489,
    enrolledCount: 7020,
    reviews: [
      {
        name: "Ibrahim K.",
        rating: 5,
        quote: "My design docs get approved on the first pass now.",
      },
      {
        name: "Chloe A.",
        rating: 4,
        quote: "Short, practical, no fluff. Wish I'd had this five years ago.",
      },
    ],
    modules: [
      {
        title: "Clarity Is a Structure Problem",
        lessons: [
          {
            slug: "the-one-sentence-summary",
            title: "The One-Sentence Summary Test",
            type: "concept",
            durationMinutes: 9,
            free: true,
          },
          {
            slug: "writing-a-postmortem",
            title: "Writing a Postmortem Nobody Dreads Reading",
            type: "concept",
            durationMinutes: 14,
          },
        ],
      },
    ],
  },
  {
    slug: "career-systems-for-engineers",
    title: "Career Systems for Engineers",
    description:
      "Building a career you don't need to recover from — scope, visibility, and pace, treated as systems you can design instead of just endure.",
    level: "intermediate",
    durationHours: 5,
    tags: ["Career", "Growth", "Product"],
    premium: true,
    instructor: { name: "Yuki Tanaka", title: "Design Lead, ex-Notion", initials: "YT" },
    rating: 4.8,
    reviewCount: 356,
    enrolledCount: 5210,
    reviews: [
      {
        name: "Tom V.",
        rating: 5,
        quote: "The framework for scoping visibility work is something I use monthly now.",
      },
      {
        name: "Ana P.",
        rating: 5,
        quote: "Calm, sane advice. Not another hustle-culture career course.",
      },
    ],
    modules: [
      {
        title: "Designing, Not Enduring",
        lessons: [
          {
            slug: "scope-as-a-lever",
            title: "Scope as a Lever You Can Pull",
            type: "concept",
            durationMinutes: 12,
            free: true,
          },
          {
            slug: "visibility-without-burnout",
            title: "Visibility Without Burnout",
            type: "concept",
            durationMinutes: 13,
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
