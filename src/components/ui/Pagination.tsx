"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";
import styles from "./Pagination.module.css";

export interface PaginationProps {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  className?: string;
}

function getPageList(page: number, pageCount: number): (number | "ellipsis")[] {
  const pages: (number | "ellipsis")[] = [];
  const windowSize = 1;
  for (let i = 1; i <= pageCount; i++) {
    if (i === 1 || i === pageCount || Math.abs(i - page) <= windowSize) {
      pages.push(i);
    } else if (pages[pages.length - 1] !== "ellipsis") {
      pages.push("ellipsis");
    }
  }
  return pages;
}

export function Pagination({ page, pageCount, onPageChange, className }: PaginationProps) {
  if (pageCount <= 1) return null;
  const pages = getPageList(page, pageCount);

  return (
    <nav aria-label="Pagination" className={cn(styles.nav, className)}>
      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(page - 1)}
        disabled={page <= 1}
        aria-label="Previous page"
      >
        <ChevronLeft size={16} />
      </button>
      {pages.map((p, i) =>
        p === "ellipsis" ? (
          <span key={`ellipsis-${i}`} className={styles.ellipsis}>
            …
          </span>
        ) : (
          <button
            key={p}
            type="button"
            className={cn(styles.button, p === page && styles.active)}
            onClick={() => onPageChange(p)}
            aria-current={p === page ? "page" : undefined}
            aria-label={`Page ${p}`}
          >
            {p}
          </button>
        ),
      )}
      <button
        type="button"
        className={styles.button}
        onClick={() => onPageChange(page + 1)}
        disabled={page >= pageCount}
        aria-label="Next page"
      >
        <ChevronRight size={16} />
      </button>
    </nav>
  );
}
