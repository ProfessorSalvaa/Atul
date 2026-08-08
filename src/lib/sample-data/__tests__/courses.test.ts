import { describe, expect, it } from "vitest";
import { allLessonsFlat, getCourseBySlug, getLessonBySlug, SAMPLE_COURSES } from "../courses";

describe("SAMPLE_COURSES", () => {
  it("has unique slugs", () => {
    const slugs = SAMPLE_COURSES.map((c) => c.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
  });

  it("gives every course at least one free preview lesson", () => {
    // The public preview route (P0 §1/§21) depends on this — a course with
    // no free lesson would have no valid /courses/[slug]/[lesson] preview.
    for (const course of SAMPLE_COURSES) {
      const hasFree = allLessonsFlat(course).some((l) => l.free);
      expect(hasFree, `${course.slug} has no free preview lesson`).toBe(true);
    }
  });
});

describe("getCourseBySlug", () => {
  it("finds an existing course", () => {
    expect(getCourseBySlug("data-analysis-fundamentals")?.title).toBe("Data Analysis Fundamentals");
  });

  it("returns undefined for an unknown slug", () => {
    expect(getCourseBySlug("does-not-exist")).toBeUndefined();
  });
});

describe("getLessonBySlug", () => {
  it("finds a lesson and its parent course/module", () => {
    const result = getLessonBySlug("data-analysis-fundamentals", "why-data-analysis");
    expect(result?.course.slug).toBe("data-analysis-fundamentals");
    expect(result?.module.title).toBe("Thinking in Data");
    expect(result?.lesson.title).toBe("Why Data Analysis, Not Just Charts");
  });

  it("returns undefined for an unknown course", () => {
    expect(getLessonBySlug("does-not-exist", "anything")).toBeUndefined();
  });

  it("returns undefined for an unknown lesson within a real course", () => {
    expect(getLessonBySlug("data-analysis-fundamentals", "does-not-exist")).toBeUndefined();
  });
});
