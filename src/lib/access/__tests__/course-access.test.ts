import { describe, expect, it } from "vitest";
import { canAccessLesson, isFirstModule, viewerPlan } from "../course-access";
import type { Course, Module } from "@/lib/content/schema";

function makeCourse(overrides: Partial<Course> = {}): Course {
  return {
    slug: "test-course",
    title: "Test Course",
    subtitle: "A course",
    status: "published",
    difficulty: "beginner",
    estimatedDurationMinutes: 120,
    tags: [],
    skills: [],
    careerPaths: [],
    category: "test",
    premium: false,
    objectives: [],
    prerequisites: [],
    instructor: { name: "I", title: "T", bio: "B", avatarInitials: "AB" },
    modules: [
      { slug: "module-1", order: 0 },
      { slug: "module-2", order: 1 },
    ],
    projectSlugs: [],
    assessmentSlugs: [],
    resources: [],
    relatedCourseSlugs: [],
    seo: { metaTitle: "T", metaDescription: "D" },
    aiTutorContext: { summary: "S" },
    versionHistory: [{ version: "1.0.0", date: "2026-01-01", summary: "Initial" }],
    ...overrides,
  } as Course;
}

function makeModule(slug: string, order: number): Module {
  return {
    slug,
    title: slug,
    description: "d",
    order,
    objectives: [],
    lessons: [{ slug: "l1", order: 0 }],
  };
}

describe("course-access", () => {
  it("viewerPlan maps user state to a plan", () => {
    expect(viewerPlan(undefined)).toBe("anonymous");
    expect(viewerPlan(null)).toBe("anonymous");
  });

  it("isFirstModule checks ordering, not array position", () => {
    const course = makeCourse({
      modules: [
        { slug: "module-2", order: 1 },
        { slug: "module-1", order: 0 },
      ],
    });
    expect(isFirstModule(course, makeModule("module-1", 0))).toBe(true);
    expect(isFirstModule(course, makeModule("module-2", 1))).toBe(false);
  });

  describe("canAccessLesson", () => {
    const module1 = makeModule("module-1", 0);
    const module2 = makeModule("module-2", 1);

    it("premium plan can access anything", () => {
      const course = makeCourse({ premium: true });
      expect(canAccessLesson("premium", course, module2, { free: false })).toBe(true);
    });

    it("anonymous can only access the free-preview lesson", () => {
      const course = makeCourse({ premium: false });
      expect(canAccessLesson("anonymous", course, module1, { free: true })).toBe(true);
      expect(canAccessLesson("anonymous", course, module1, { free: false })).toBe(false);
    });

    it("free plan gets full access to a non-premium course", () => {
      const course = makeCourse({ premium: false });
      expect(canAccessLesson("free", course, module2, { free: false })).toBe(true);
    });

    it("free plan is limited to the first module of a premium course", () => {
      const course = makeCourse({ premium: true });
      expect(canAccessLesson("free", course, module1, { free: false })).toBe(true);
      expect(canAccessLesson("free", course, module2, { free: false })).toBe(false);
    });
  });
});
