"use client";

import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { CourseCard } from "@/components/learning/CourseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { allLessonsFlat, SAMPLE_COURSES } from "@/lib/sample-data/courses";
import styles from "./page.module.css";

/**
 * Fallback full-results page (P0 §11) — Cmd+K is the primary interface;
 * this is for deep queries. Filters the same static course/lesson data
 * client-side; `search.query` (Postgres full-text) replaces this in M5+.
 */
export function SearchResults() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return SAMPLE_COURSES;
    return SAMPLE_COURSES.filter((course) => {
      if (course.title.toLowerCase().includes(q)) return true;
      if (course.tags.some((t) => t.toLowerCase().includes(q))) return true;
      return allLessonsFlat(course).some((l) => l.title.toLowerCase().includes(q));
    });
  }, [query]);

  return (
    <>
      <Input
        leadingIcon={<SearchIcon size={16} aria-hidden="true" />}
        placeholder="Search courses, lessons…"
        aria-label="Search"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className={styles.searchInput}
      />

      {results.length === 0 ? (
        <EmptyState
          title="No results found"
          description="Try a different search, or explore a popular course below."
          className={styles.empty}
        />
      ) : (
        <div className={styles.grid}>
          {results.map((course) => (
            <Link key={course.slug} href={`/courses/${course.slug}`} className={styles.link}>
              <CourseCard
                title={course.title}
                description={course.description}
                level={course.level}
                durationLabel={`${course.durationHours} hrs`}
                premium={course.premium}
              />
            </Link>
          ))}
        </div>
      )}
    </>
  );
}
