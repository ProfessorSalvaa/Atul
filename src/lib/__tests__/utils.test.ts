import { describe, expect, it } from "vitest";
import { clamp, cx, humanizeSlug } from "../utils";

describe("cx", () => {
  it("joins truthy class names with a space", () => {
    expect(cx("a", "b", "c")).toBe("a b c");
  });

  it("skips falsy values", () => {
    expect(cx("a", false, null, undefined, "b")).toBe("a b");
  });

  it("returns an empty string when nothing is truthy", () => {
    expect(cx(false, null, undefined)).toBe("");
  });
});

describe("clamp", () => {
  it("returns the value when inside the range", () => {
    expect(clamp(5, 0, 10)).toBe(5);
  });

  it("clamps to the minimum", () => {
    expect(clamp(-5, 0, 10)).toBe(0);
  });

  it("clamps to the maximum", () => {
    expect(clamp(50, 0, 10)).toBe(10);
  });

  it("throws when min is greater than max", () => {
    expect(() => clamp(5, 10, 0)).toThrow(RangeError);
  });
});

describe("humanizeSlug", () => {
  it("title-cases hyphenated slugs", () => {
    expect(humanizeSlug("intro-to-data-analysis")).toBe("Intro To Data Analysis");
  });

  it("handles a single word", () => {
    expect(humanizeSlug("onboarding")).toBe("Onboarding");
  });

  it("collapses repeated hyphens without producing empty words", () => {
    expect(humanizeSlug("a--b")).toBe("A B");
  });
});
