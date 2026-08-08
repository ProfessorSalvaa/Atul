/**
 * Content discovery: search/filter/sort helpers over the full course
 * catalog. Pure functions over `LoadedCourse[]` — no filesystem access
 * here (that's loader.ts) so these are trivially unit-testable and safe
 * to call from client components via server-fetched props.
 */
import "server-only";
import { getAllCourses, type LoadedCourse } from "./loader";

function courseHaystack(c: LoadedCourse): string {
  return [
    c.course.title,
    c.course.subtitle,
    c.course.instructor.name,
    ...c.course.tags,
    ...c.course.skills,
  ]
    .join(" ")
    .toLowerCase();
}

export function searchCourses(query: string): LoadedCourse[] {
  const q = query.trim().toLowerCase();
  if (!q) return getAllCourses();
  return getAllCourses().filter((c) => courseHaystack(c).includes(q));
}

export function coursesByTag(tag: string): LoadedCourse[] {
  return getAllCourses().filter((c) => c.course.tags.includes(tag));
}

export function coursesBySkill(skill: string): LoadedCourse[] {
  return getAllCourses().filter((c) => c.course.skills.includes(skill));
}

export function coursesByCareerPath(careerPath: string): LoadedCourse[] {
  return getAllCourses().filter((c) => c.course.careerPaths.includes(careerPath));
}

export function coursesByCategory(category: string): LoadedCourse[] {
  return getAllCourses().filter((c) => c.course.category === category);
}

export function coursesByDifficulty(difficulty: string): LoadedCourse[] {
  return getAllCourses().filter((c) => c.course.difficulty === difficulty);
}

/** Courses whose estimated duration falls within [minMinutes, maxMinutes]. */
export function coursesByDuration(minMinutes: number, maxMinutes: number): LoadedCourse[] {
  return getAllCourses().filter(
    (c) =>
      c.course.estimatedDurationMinutes >= minMinutes &&
      c.course.estimatedDurationMinutes <= maxMinutes,
  );
}

export function popularCourses(limit = 10): LoadedCourse[] {
  return [...getAllCourses()]
    .sort((a, b) => (b.course.enrolledCount ?? 0) - (a.course.enrolledCount ?? 0))
    .slice(0, limit);
}

export function newestCourses(limit = 10): LoadedCourse[] {
  return [...getAllCourses()]
    .sort((a, b) => (b.course.publishedDate ?? "").localeCompare(a.course.publishedDate ?? ""))
    .slice(0, limit);
}

/** "Trending" is a simple heuristic in the absence of real analytics
 *  (M5+): rating × log(enrolledCount). Swap for a real signal (recent
 *  enrollment velocity) once usage data exists. */
export function trendingCourses(limit = 10): LoadedCourse[] {
  return [...getAllCourses()]
    .sort((a, b) => {
      const score = (c: LoadedCourse) =>
        (c.course.rating ?? 0) * Math.log((c.course.enrolledCount ?? 0) + 1);
      return score(b) - score(a);
    })
    .slice(0, limit);
}

/** Featured is editorial, not computed — driven by `course.yaml`'s
 *  `status: published` plus a top slice by rating as a stand-in until
 *  there's a dedicated `featured: true` field wired to an admin UI. */
export function featuredCourses(limit = 4): LoadedCourse[] {
  return [...getAllCourses()]
    .sort((a, b) => (b.course.rating ?? 0) - (a.course.rating ?? 0))
    .slice(0, limit);
}

/** Related courses: prefer the course's own authored `relatedCourseSlugs`;
 *  fall back to tag/category overlap if that list is short. */
export function relatedCourses(courseSlug: string, limit = 3): LoadedCourse[] {
  const all = getAllCourses();
  const course = all.find((c) => c.course.slug === courseSlug);
  if (!course) return [];

  const authored = course.course.relatedCourseSlugs
    .map((slug) => all.find((c) => c.course.slug === slug))
    .filter((c): c is LoadedCourse => c !== undefined);

  if (authored.length >= limit) return authored.slice(0, limit);

  const fallback = all.filter(
    (c) =>
      c.course.slug !== courseSlug &&
      !authored.some((a) => a.course.slug === c.course.slug) &&
      (c.course.category === course.course.category ||
        c.course.tags.some((t) => course.course.tags.includes(t))),
  );

  return [...authored, ...fallback].slice(0, limit);
}
