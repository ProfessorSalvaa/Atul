/**
 * One-time migration: reads the M2.5 sample-data fixtures and writes
 * out the equivalent content/ files (course.yaml, module.yaml,
 * lesson.mdx, quiz.json, flashcards.json, taxonomy/*.yaml). This is the
 * "migration strategy" deliverable made concrete — see
 * docs/content/migration-strategy.md for the write-up. Not meant to be
 * run again after the initial migration; kept in scripts/ as a record
 * and as a template for any future bulk-import job.
 */
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import {
  SAMPLE_COURSES,
  type SampleCourse,
  type SampleLesson,
} from "../src/lib/sample-data/courses.ts";

const ROOT = path.join(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "content");

function slugifyTag(tag: string): string {
  return tag
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

function write(filePath: string, content: string) {
  fs.mkdirSync(path.dirname(filePath), { recursive: true });
  fs.writeFileSync(filePath, content, "utf-8");
}

function writeYaml(filePath: string, data: unknown) {
  write(filePath, YAML.stringify(data, { lineWidth: 100 }));
}

function writeJson(filePath: string, data: unknown) {
  write(filePath, JSON.stringify(data, null, 2) + "\n");
}

// ---------------------------------------------------------------------
// Taxonomy
// ---------------------------------------------------------------------
const allTags = Array.from(new Set(SAMPLE_COURSES.flatMap((c) => c.tags)));
writeYaml(
  path.join(CONTENT, "taxonomy", "tags.yaml"),
  allTags.map((t) => ({ slug: slugifyTag(t), label: t })),
);

const SKILLS: Record<string, string[]> = {
  "data-analysis-fundamentals": ["data-cleaning", "sql-fundamentals", "data-storytelling"],
  "ai-tooling-for-developers": ["prompt-engineering", "code-review", "ai-assisted-development"],
  "systems-design-deep-dive": ["distributed-systems", "caching-strategy", "capacity-planning"],
  "modern-product-design-foundations": [
    "visual-hierarchy",
    "design-critique",
    "interaction-design",
  ],
  "prompt-engineering-for-builders": ["prompt-engineering", "prompt-testing", "llm-integration"],
  "sql-for-product-thinking": ["sql-fundamentals", "cohort-analysis", "funnel-analysis"],
  "technical-writing-for-engineers": ["technical-writing", "design-docs", "postmortems"],
  "career-systems-for-engineers": ["career-planning", "scope-management", "visibility-building"],
};
const allSkills = Array.from(new Set(Object.values(SKILLS).flat()));
writeYaml(
  path.join(CONTENT, "taxonomy", "skills.yaml"),
  allSkills.map((s) => ({
    slug: s,
    label: s.replace(/-/g, " ").replace(/\b\w/g, (m) => m.toUpperCase()),
  })),
);

const CAREER_PATHS: Record<string, string[]> = {
  "data-analysis-fundamentals": ["data-analyst"],
  "ai-tooling-for-developers": ["software-engineer", "ai-engineer"],
  "systems-design-deep-dive": ["software-engineer"],
  "modern-product-design-foundations": ["product-designer"],
  "prompt-engineering-for-builders": ["ai-engineer", "product-manager"],
  "sql-for-product-thinking": ["data-analyst", "product-manager"],
  "technical-writing-for-engineers": ["software-engineer"],
  "career-systems-for-engineers": ["software-engineer", "product-manager"],
};
const allCareerPaths = Array.from(new Set(Object.values(CAREER_PATHS).flat()));
const CAREER_PATH_LABELS: Record<string, string> = {
  "data-analyst": "Data Analyst",
  "software-engineer": "Software Engineer",
  "ai-engineer": "AI Engineer",
  "product-designer": "Product Designer",
  "product-manager": "Product Manager",
};
writeYaml(
  path.join(CONTENT, "taxonomy", "career-paths.yaml"),
  allCareerPaths.map((c) => ({ slug: c, label: CAREER_PATH_LABELS[c] ?? c })),
);

const CATEGORY: Record<string, string> = {
  "data-analysis-fundamentals": "data-analytics",
  "ai-tooling-for-developers": "ai-development",
  "systems-design-deep-dive": "engineering",
  "modern-product-design-foundations": "design",
  "prompt-engineering-for-builders": "ai-development",
  "sql-for-product-thinking": "data-analytics",
  "technical-writing-for-engineers": "career-growth",
  "career-systems-for-engineers": "career-growth",
};
const allCategories = Array.from(new Set(Object.values(CATEGORY)));
const CATEGORY_LABELS: Record<string, string> = {
  "data-analytics": "Data & Analytics",
  "ai-development": "AI Development",
  engineering: "Engineering",
  design: "Design",
  "career-growth": "Career Growth",
};
writeYaml(
  path.join(CONTENT, "taxonomy", "categories.yaml"),
  allCategories.map((c) => ({ slug: c, label: CATEGORY_LABELS[c] ?? c })),
);

// ---------------------------------------------------------------------
// Courses
// ---------------------------------------------------------------------
function moduleSlugify(title: string): string {
  return slugifyTag(title);
}

function lessonBody(course: SampleCourse, lesson: SampleLesson): string {
  if (lesson.type === "code") {
    return `Generated diffs and unfamiliar code reward a different reading strategy than writing from scratch. Start by asking what changed in *intent* — then verify only the lines that affect behavior you actually care about.

\`\`\`javascript
function summarize(rows) {
  return rows
    .filter((r) => r.active)
    .map((r) => r.value)
    .reduce((sum, v) => sum + v, 0);
}
\`\`\`

Notice the filter-map-reduce chain reads almost like a sentence. That's not an accident — it's the fastest shape to verify at a glance, which matters most in exactly the situation this lesson is about: **${lesson.title}**.

By the end of this lesson you should be able to apply this directly to your own work in ${course.title.toLowerCase()}.`;
  }
  if (lesson.type === "flashcard") {
    return `A quick flip-review before moving on — the kind of low-stakes retrieval practice that sticks better than re-reading your notes a third time.

Work through the deck below at your own pace. There's no score attached — just flip, recall, check.

<Flashcard front="What's the fastest way to build trust in unfamiliar material?" back="Recall it in your own words first, then check — retrieval beats re-reading." />`;
  }
  return `Every lesson in Curitiq is written the way we'd want to be taught — plainly, with enough context to actually reason about the material afterward, not just recognize it on a quiz.

This lesson, **${lesson.title}**, is part of *${course.title}*. Take your time here. There's no timer, no streak penalty for pausing mid-lesson, and the "Mark complete" button is yours to press whenever the idea has actually landed — not just when you've scrolled to the bottom.

By the end, you should be able to explain this in your own words to someone who hasn't taken the course.`;
}

function lessonTypeMap(t: SampleLesson["type"]): "reading" | "code" | "flashcards" {
  if (t === "code") return "code";
  if (t === "flashcard") return "flashcards";
  return "reading";
}

let totalLessons = 0;
let totalModules = 0;

for (const course of SAMPLE_COURSES) {
  const courseDir = path.join(CONTENT, "courses", course.slug);

  const moduleManifest = course.modules.map((m, i) => ({
    slug: moduleSlugify(m.title),
    order: i,
  }));

  writeYaml(path.join(courseDir, "course.yaml"), {
    slug: course.slug,
    title: course.title,
    subtitle: course.description,
    status: "published",
    difficulty: course.level,
    estimatedDurationMinutes: course.durationHours * 60,
    tags: course.tags.map(slugifyTag),
    skills: SKILLS[course.slug] ?? [],
    careerPaths: CAREER_PATHS[course.slug] ?? [],
    category: CATEGORY[course.slug],
    premium: course.premium,
    objectives: course.modules
      .flatMap((m) => m.lessons)
      .slice(0, 4)
      .map((l, i) => ({ id: `obj-${i + 1}`, text: `Understand: ${l.title}` })),
    prerequisites:
      course.level === "beginner"
        ? []
        : [{ description: "Comfort with the fundamentals of this topic area" }],
    instructor: {
      name: course.instructor.name,
      title: course.instructor.title,
      bio: `${course.instructor.name} is ${course.instructor.title}, teaching ${course.title} on Curitiq.`,
      avatarInitials: course.instructor.initials,
    },
    modules: moduleManifest,
    projectSlugs: [],
    assessmentSlugs: [],
    resources: [],
    relatedCourseSlugs: SAMPLE_COURSES.filter(
      (c) => c.slug !== course.slug && c.tags.some((t) => course.tags.includes(t)),
    )
      .slice(0, 3)
      .map((c) => c.slug),
    seo: {
      title: `${course.title} | Curitiq`,
      description: course.description.slice(0, 155),
      keywords: course.tags,
      noIndex: false,
    },
    aiTutorContext: {
      summary: course.description,
      keyConcepts: course.tags,
      commonMisconceptions: [],
      outOfScopeTopics: [],
    },
    versionHistory: [
      {
        version: "1.0.0",
        date: "2026-08-08",
        author: "Curitiq Content Team",
        summary: "Migrated from M2.5 sample-data fixtures into the M2.75 content engine.",
        changeType: "created",
      },
    ],
    publishedDate: "2026-08-08",
    rating: course.rating,
    reviewCount: course.reviewCount,
    enrolledCount: course.enrolledCount,
  });

  write(
    path.join(courseDir, "index.mdx"),
    `---\n---\n${course.description}\n\nThis course is taught by **${course.instructor.name}**, ${course.instructor.title}.\n`,
  );

  writeJson(
    path.join(courseDir, "reviews.json"),
    course.reviews.map((r, i) => ({
      id: `${course.slug}-review-${i + 1}`,
      authorName: r.name,
      authorInitials: r.name
        .split(" ")
        .map((p) => p[0])
        .join("")
        .slice(0, 3),
      rating: r.rating,
      quote: r.quote,
    })),
  );

  course.modules.forEach((mod, mi) => {
    totalModules++;
    const modSlug = moduleSlugify(mod.title);
    const modDir = path.join(courseDir, "modules", modSlug);

    writeYaml(path.join(modDir, "module.yaml"), {
      slug: modSlug,
      title: mod.title,
      description: `${mod.title} — part of ${course.title}.`,
      order: mi,
      objectives: mod.lessons
        .slice(0, 2)
        .map((l, i) => ({ id: `mo-${i + 1}`, text: `Grasp: ${l.title}` })),
      lessons: mod.lessons.map((l, i) => ({ slug: l.slug, order: i })),
    });

    mod.lessons.forEach((lesson, li) => {
      totalLessons++;
      const lessonDir = path.join(modDir, "lessons", lesson.slug);
      const mappedType = lessonTypeMap(lesson.type);

      const frontmatter: Record<string, unknown> = {
        type: mappedType,
        title: lesson.title,
        order: li,
        durationMinutes: lesson.durationMinutes,
        objectives: [`Understand ${lesson.title.toLowerCase()}`],
        free: Boolean(lesson.free),
        aiTutorContext: {
          summary: `This lesson covers: ${lesson.title}.`,
          keyConcepts: [lesson.title],
          commonMisconceptions: [],
          outOfScopeTopics: [],
        },
      };
      if (mappedType === "code") frontmatter.language = "javascript";
      if (mappedType === "flashcards") frontmatter.deckFile = "flashcards.json";

      const fm = YAML.stringify(frontmatter).trimEnd();
      write(
        path.join(lessonDir, "lesson.mdx"),
        `---\n${fm}\n---\n\n${lessonBody(course, lesson)}\n`,
      );

      if (mappedType === "flashcards") {
        writeJson(path.join(lessonDir, "flashcards.json"), [
          {
            id: `${lesson.slug}-fc-1`,
            front: `What's the core idea behind "${lesson.title}"?`,
            back: `Recall it in your own words, then check it against the lesson body.`,
            difficulty: course.level,
            tags: course.tags.map(slugifyTag).slice(0, 2),
          },
          {
            id: `${lesson.slug}-fc-2`,
            front: `Why does "${lesson.title}" matter in practice?`,
            back: `Because it's one of the recurring failure points learners hit without this grounding.`,
            difficulty: course.level,
            tags: course.tags.map(slugifyTag).slice(0, 2),
          },
        ]);
      }

      // Every lesson gets a small quiz.json — QuizFlow will read this
      // once wired (task #48/#51); today's QuizFlow keeps its own fixed
      // question set as a fallback so nothing regresses mid-migration.
      writeJson(path.join(lessonDir, "quiz.json"), [
        {
          id: `${lesson.slug}-q1`,
          type: "single-choice",
          prompt: `What's the main takeaway of "${lesson.title}"?`,
          difficulty: course.level,
          points: 1,
          hints: ["Think back to the lesson's opening paragraph."],
          explanation: `The lesson "${lesson.title}" is primarily about applying this idea in ${course.title}.`,
          references: [],
          options: [
            { id: "a", text: `Applying "${lesson.title}" directly to real work` },
            { id: "b", text: "Memorizing terminology without context" },
            { id: "c", text: "Skipping ahead without practicing" },
          ],
          correctOptionId: "a",
        },
        {
          id: `${lesson.slug}-q2`,
          type: "true-false",
          prompt: `True or false: "${lesson.title}" is meant to be understood, not just memorized.`,
          difficulty: course.level,
          points: 1,
          hints: [],
          explanation: "Every Curitiq lesson favors durable understanding over rote memorization.",
          references: [],
          correctAnswer: true,
        },
      ]);
    });
  });
}

console.log(
  `Migrated ${SAMPLE_COURSES.length} courses, ${totalModules} modules, ${totalLessons} lessons.`,
);
