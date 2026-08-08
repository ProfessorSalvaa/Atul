import type { Metadata } from "next";
import { PageHeader } from "@/components/shell/PageHeader";
import { allLessonsFlat, getAllCourses } from "@/lib/content/loader";
import { SearchResults, type SearchableCourse } from "./SearchResults";

export const metadata: Metadata = {
  title: "Search",
  robots: { index: false },
};

export default function SearchPage() {
  // Content is loaded server-side (loader.ts touches the filesystem and
  // can't run in a client component) and handed down as a plain,
  // serializable array — SearchResults then does the same client-side
  // filter-as-you-type it always has, just sourced from content/ instead
  // of the old sample-data fixtures.
  const searchable: SearchableCourse[] = getAllCourses().map((loaded) => ({
    slug: loaded.course.slug,
    title: loaded.course.title,
    description: loaded.course.subtitle,
    level: loaded.course.difficulty,
    durationHours: Math.round(loaded.course.estimatedDurationMinutes / 60),
    premium: loaded.course.premium,
    tags: loaded.course.tags,
    lessonTitles: allLessonsFlat(loaded).map((l) => l.title),
  }));

  return (
    <>
      <PageHeader
        title="Search"
        description="Cmd+K works from anywhere — this is the full-results view."
      />
      <SearchResults courses={searchable} />
    </>
  );
}
