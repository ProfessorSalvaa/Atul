/**
 * M2.8 launch-library generator. Reads one batch file of CourseSpecs
 * (scripts/course-specs/batch-N.mts, each exporting `SPECS: CourseSpec[]`)
 * and expands each into a full content/courses/<slug>/ tree.
 *
 * Usage: node --experimental-strip-types scripts/generate-courses.mts <batch-number>
 *
 * Deterministic and re-runnable: re-running a batch overwrites exactly
 * the files it owns (existing courses from other batches are untouched).
 * No ratings/reviews/enrollment counts are fabricated for generated
 * courses — those fields are simply omitted (optional in the schema),
 * per the M2.8 brief's explicit "do not fabricate" instruction.
 */
import fs from "node:fs";
import path from "node:path";
import YAML from "yaml";
import type { CourseSpec, LessonSpec, ModuleSpec } from "./lib/course-spec-types.mts";

const ROOT = path.join(import.meta.dirname, "..");
const CONTENT = path.join(ROOT, "content");

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

/** Expands a lesson's authored bullet points into readable MDX prose.
 *  This is templated STRUCTURE (headings/transitions), not templated
 *  CONTENT — every sentence's substance comes from the author-supplied
 *  `points`, `code`, `cards`, or `interviewQA`, which are specific to
 *  the lesson's actual subject matter. */
function lessonBody(course: CourseSpec, mod: ModuleSpec, lesson: LessonSpec): string {
  const intro = `This lesson is part of **${mod.title}** in *${course.title}*. By the end, you should be able to put the following into practice:\n`;

  if (lesson.kind === "flashcards" && lesson.cards) {
    const cardsMdx = lesson.cards
      .map((c) => `<Flashcard front=${JSON.stringify(c.front)} back=${JSON.stringify(c.back)} />`)
      .join("\n\n");
    return `A quick flip-review of the core terms from this module — low-stakes retrieval practice that sticks better than re-reading notes.\n\n${cardsMdx}\n`;
  }

  if (lesson.kind === "interview-preparation" && lesson.interviewQA) {
    const qa = lesson.interviewQA
      .map((qa, i) => `### ${i + 1}. ${qa.question}\n\n${qa.answer}`)
      .join("\n\n");
    return `${intro}\nThese are questions you can realistically expect in an interview touching this material. Read the sample answer, then try answering out loud in your own words before checking it.\n\n${qa}\n`;
  }

  const pointsMdx = lesson.points.map((p) => `- ${p}`).join("\n");
  let body = `${intro}\n${pointsMdx}\n`;

  if (lesson.kind === "case-study") {
    body += `\n## Working through it\n\nRead each point above as a real decision someone had to make — not an abstract rule. The rest of this course builds on the reasoning here, not just the conclusion.\n`;
  }

  if (lesson.kind === "code" && lesson.code) {
    body += `\n\`\`\`${lesson.code.language}\n${lesson.code.code}\n\`\`\`\n\nRead this example line by line before moving on. Predict what each part does before checking — that's the habit that actually builds fluency, not passive reading.\n`;
  }

  body += `\nTake your time here. There's no timer and no penalty for pausing mid-lesson — the "Mark complete" button is yours to press whenever this has actually landed.\n`;
  return body;
}

/** Derives 2 renderable quiz questions (single-choice, true-false) from
 *  a lesson's own authored points — the questions are about the
 *  specific content just taught, not generic. */
function lessonQuiz(lesson: LessonSpec): unknown[] | undefined {
  if (lesson.points.length < 2) return undefined;
  const [p1, p2] = lesson.points;
  return [
    {
      id: `${lesson.slug}-q1`,
      type: "single-choice",
      prompt: `Which of these best reflects what "${lesson.title}" covers?`,
      difficulty: "beginner",
      points: 1,
      hints: [`Reread the first point of the lesson: "${p1}"`],
      explanation: `${p1} — that's the core idea this lesson builds from.`,
      references: [],
      options: [
        { id: "a", text: p1 },
        { id: "b", text: "None of the concepts in this lesson apply in practice" },
        { id: "c", text: "This topic has no connection to the rest of the course" },
      ],
      correctOptionId: "a",
    },
    {
      id: `${lesson.slug}-q2`,
      type: "true-false",
      prompt: `True or false: ${p2}`,
      difficulty: "beginner",
      points: 1,
      hints: [],
      explanation: `True — ${p2}`,
      references: [],
      correctAnswer: true,
    },
  ];
}

function generateCourse(spec: CourseSpec) {
  const courseDir = path.join(CONTENT, "courses", spec.slug);

  const moduleManifest = spec.modules.map((m, i) => ({ slug: m.slug, order: i }));
  const totalMinutes = spec.modules.reduce(
    (sum, m) => sum + m.lessons.reduce((s, l) => s + l.durationMinutes, 0),
    0,
  );

  writeYaml(path.join(courseDir, "course.yaml"), {
    slug: spec.slug,
    title: spec.title,
    subtitle: spec.subtitle,
    status: "published",
    difficulty: spec.difficulty,
    estimatedDurationMinutes: spec.estimatedDurationMinutes || totalMinutes,
    tags: spec.tags,
    skills: spec.skills,
    careerPaths: spec.careerPaths,
    category: spec.category,
    premium: spec.difficulty !== "beginner",
    objectives: spec.objectives.map((text, i) => ({ id: `obj-${i + 1}`, text })),
    prerequisites: spec.prerequisites,
    instructor: {
      name: spec.instructor.name,
      title: spec.instructor.title,
      bio: `${spec.instructor.name} is ${spec.instructor.title}, teaching ${spec.title} on Curitiq.`,
      avatarInitials: spec.instructor.avatarInitials,
    },
    modules: moduleManifest,
    projectSlugs: [spec.project.slug],
    assessmentSlugs: [],
    resources: spec.resources,
    certificate: {
      title: `${spec.title} — Certificate of Completion`,
      criteria: spec.certificateCriteria,
      templateId: "standard",
    },
    relatedCourseSlugs: spec.relatedCourseSlugs ?? [],
    seo: {
      title: `${spec.title} | Curitiq`,
      description: spec.subtitle.slice(0, 155),
      keywords: spec.tags,
      noIndex: false,
    },
    aiTutorContext: {
      summary: spec.subtitle,
      keyConcepts: spec.objectives,
      commonMisconceptions: [],
      outOfScopeTopics: [],
    },
    versionHistory: [
      {
        version: "1.0.0",
        date: "2026-08-08",
        author: "Curitiq Content Team",
        summary: "Initial publish as part of the M2.8 launch content library.",
        changeType: "created",
      },
    ],
    publishedDate: "2026-08-08",
  });

  write(
    path.join(courseDir, "index.mdx"),
    `---\n---\n${spec.subtitle}\n\nTaught by **${spec.instructor.name}**, ${spec.instructor.title}.\n`,
  );

  spec.modules.forEach((mod, mi) => {
    const modDir = path.join(courseDir, "modules", mod.slug);
    writeYaml(path.join(modDir, "module.yaml"), {
      slug: mod.slug,
      title: mod.title,
      description: mod.description,
      order: mi,
      objectives: mod.lessons
        .slice(0, 2)
        .map((l, i) => ({ id: `mo-${i + 1}`, text: `Grasp: ${l.title}` })),
      lessons: mod.lessons.map((l, i) => ({ slug: l.slug, order: i })),
    });

    mod.lessons.forEach((lesson, li) => {
      const lessonDir = path.join(modDir, "lessons", lesson.slug);
      const schemaType = lesson.kind === "interactive" ? "interactive" : lesson.kind;

      const frontmatter: Record<string, unknown> = {
        type: schemaType,
        title: lesson.title,
        order: li,
        durationMinutes: lesson.durationMinutes,
        objectives: [`Understand ${lesson.title.toLowerCase()}`],
        free: Boolean(lesson.free),
        aiTutorContext: {
          summary: `This lesson covers: ${lesson.title}.`,
          keyConcepts: lesson.points.slice(0, 5),
          commonMisconceptions: [],
          outOfScopeTopics: [],
        },
      };
      if (lesson.kind === "code" && lesson.code) frontmatter.language = lesson.code.language;
      if (lesson.kind === "interactive") frontmatter.interactionKind = "walkthrough";
      if (lesson.kind === "flashcards") frontmatter.deckFile = "flashcards.json";
      if (lesson.kind === "interview-preparation") frontmatter.careerPaths = spec.careerPaths;

      const fm = YAML.stringify(frontmatter).trimEnd();
      write(
        path.join(lessonDir, "lesson.mdx"),
        `---\n${fm}\n---\n\n${lessonBody(spec, mod, lesson)}\n`,
      );

      if (lesson.kind === "flashcards" && lesson.cards) {
        writeJson(
          path.join(lessonDir, "flashcards.json"),
          lesson.cards.map((c, i) => ({
            id: `${lesson.slug}-fc-${i + 1}`,
            front: c.front,
            back: c.back,
            difficulty: spec.difficulty,
            tags: spec.tags.slice(0, 2),
          })),
        );
      } else {
        const quiz = lessonQuiz(lesson);
        if (quiz) writeJson(path.join(lessonDir, "quiz.json"), quiz);
      }
    });
  });

  write(
    path.join(courseDir, "projects", `${spec.project.slug}.mdx`),
    `---\nslug: ${spec.project.slug}\ntitle: ${JSON.stringify(spec.project.title)}\ndifficulty: ${spec.difficulty}\nestimatedDurationMinutes: ${Math.max(60, Math.round(spec.estimatedDurationMinutes / 3))}\nskills:\n${spec.skills.map((s) => `  - ${s}`).join("\n")}\ndeliverables:\n${spec.project.deliverables.map((d) => `  - ${JSON.stringify(d)}`).join("\n")}\nrubric:\n${spec.project.rubric.map((r) => `  - ${JSON.stringify(r)}`).join("\n")}\n---\n\n## ${spec.project.title}\n\nThis is the portfolio project for *${spec.title}*. Work through it after finishing the course modules — it's designed to combine everything taught, not just the last lesson.\n\n### What you'll deliver\n\n${spec.project.deliverables.map((d) => `- ${d}`).join("\n")}\n\n### How it will be evaluated\n\n${spec.project.rubric.map((r) => `- ${r}`).join("\n")}\n`,
  );

  return {
    slug: spec.slug,
    lessonCount: spec.modules.reduce((s, m) => s + m.lessons.length, 0),
    moduleCount: spec.modules.length,
  };
}

const batchArg = process.argv[2];
if (!batchArg) {
  console.error(
    "Usage: node --experimental-strip-types scripts/generate-courses.mts <batch-number>",
  );
  process.exit(1);
}

const batchPath = path.join(ROOT, "scripts", "course-specs", `batch-${batchArg}.mts`);
const mod = await import(batchPath);
const specs: CourseSpec[] = mod.SPECS;

let totalLessons = 0;
let totalModules = 0;
for (const spec of specs) {
  const result = generateCourse(spec);
  totalLessons += result.lessonCount;
  totalModules += result.moduleCount;
  console.log(`  ✓ ${result.slug} (${result.moduleCount} modules, ${result.lessonCount} lessons)`);
}
console.log(
  `\nBatch ${batchArg}: generated ${specs.length} courses, ${totalModules} modules, ${totalLessons} lessons.`,
);
