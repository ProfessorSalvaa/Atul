/**
 * Shared utility helpers. Kept deliberately minimal in M0 — this file exists
 * to give the test/lint/typecheck pipeline something real to check, not to
 * anticipate M1+ utilities.
 */

/**
 * Merge class name fragments, skipping falsy values. A minimal stand-in for
 * `clsx`/`cn` until the design system (M1) brings its own conventions.
 */
export function cx(...classes: Array<string | false | null | undefined>): string {
  return classes.filter(Boolean).join(" ");
}

/**
 * Clamp a number between a lower and upper bound.
 */
export function clamp(value: number, min: number, max: number): number {
  if (min > max) {
    throw new RangeError("clamp: min must be <= max");
  }
  return Math.min(Math.max(value, min), max);
}

/** "intro-to-data-analysis" -> "Intro To Data Analysis". Used for
 *  placeholder breadcrumb/title labels until real course/lesson data
 *  exists (M5+) — pages pass a real title once content is wired up. */
export function humanizeSlug(slug: string): string {
  return slug
    .split("-")
    .filter(Boolean)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
