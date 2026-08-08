"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { Breadcrumb, type BreadcrumbItem } from "@/components/ui/Breadcrumb";
import { humanizeSlug } from "@/lib/utils";
import { AITutorLauncher } from "./AITutorLauncher";
import { ThemeSwitcher } from "./ThemeSwitcher";
import styles from "./LearningTopBar.module.css";

export interface LearningTopBarProps {
  courseSlug: string;
  lessonSlug: string;
}

/**
 * Slim top bar for the Learning Layout — deliberately not the full
 * Dashboard sidebar/topnav chrome, to keep the reading/player surface
 * focused (P0 §4: breadcrumbs are used "only inside course/lesson pages").
 * Applies to the lesson player and quiz for both anonymous preview and
 * enrolled users — see docs/navigation.md for why this route doesn't
 * branch layouts by auth state in M2. The layout wraps both
 * /courses/[slug]/[lesson] and its nested /quiz route, so whether "Quiz"
 * appears in the breadcrumb is read from the current pathname rather than
 * a prop.
 */
export function LearningTopBar({ courseSlug, lessonSlug }: LearningTopBarProps) {
  const pathname = usePathname();
  const isQuiz = pathname.endsWith("/quiz");

  const items: BreadcrumbItem[] = [
    { label: "Courses", href: "/courses" },
    { label: humanizeSlug(courseSlug), href: `/courses/${courseSlug}` },
    {
      label: humanizeSlug(lessonSlug),
      href: isQuiz ? `/courses/${courseSlug}/${lessonSlug}` : undefined,
    },
    ...(isQuiz ? [{ label: "Quiz" }] : []),
  ];

  return (
    <div className={styles.bar}>
      <Breadcrumb items={items} linkComponent={BreadcrumbLink} className={styles.breadcrumb} />
      <div className={styles.actions}>
        <AITutorLauncher />
        <ThemeSwitcher />
        <Link href={`/courses/${courseSlug}`} className={styles.exit} aria-label="Exit to course">
          <X size={16} aria-hidden="true" />
        </Link>
      </div>
    </div>
  );
}

function BreadcrumbLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
