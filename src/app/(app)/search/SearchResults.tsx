"use client";

import { Search as SearchIcon } from "lucide-react";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { CourseCard, type CourseLevel } from "@/components/learning/CourseCard";
import { EmptyState } from "@/components/ui/EmptyState";
import { Input } from "@/components/ui/Input";
import { Skeleton } from "@/components/ui/Skeleton";
import styles from "./page.module.css";

export interface SearchableCourse {
  slug: string;
  title: string;
  description: string;
  level: CourseLevel;
  durationHours: number;
  premium: boolean;
  tags: string[];
  lessonTitles: string[];
}

/**
 * Fallback full-results page (P0 §11) — Cmd+K is the primary interface;
 * this is for deep queries. Filters the course list (server-fetched from
 * the content engine in page.tsx) client-side; `search.query` (Postgres
 * full-text) replaces this in M5+. A short artificial debounce drives a
 * skeleton loading state so the page demonstrates that state rather than
 * always resolving instantly.
 */
export function SearchResults({ courses }: { courses: SearchableCourse[] }) {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const isSearching = query !== debouncedQuery;

  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedQuery(query);
    }, 220);
    return () => window.clearTimeout(timer);
  }, [query]);

  const results = useMemo(() => {
    const q = debouncedQuery.trim().toLowerCase();
    if (!q) return courses;
    return courses.filter((course) => {
      if (course.title.toLowerCase().includes(q)) return true;
      if (course.tags.some((t) => t.toLowerCase().includes(q))) return true;
      return course.lessonTitles.some((t) => t.toLowerCase().includes(q));
    });
  }, [debouncedQuery, courses]);

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

      {isSearching ? (
        <div className={styles.grid} aria-live="polite" aria-busy="true">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={styles.skeletonCard}>
              <Skeleton height={120} className={styles.skeletonCover} />
              <Skeleton height={14} width="70%" />
              <Skeleton height={12} width="90%" />
              <Skeleton height={12} width="50%" />
            </div>
          ))}
        </div>
      ) : results.length === 0 ? (
        <EmptyState
          title="No results found"
          description={`Nothing matched “${debouncedQuery}”. Try a different search, or explore a popular course below.`}
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
