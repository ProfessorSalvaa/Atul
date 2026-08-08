import type { ReactNode } from "react";
import { LearningTopBar } from "./LearningTopBar";
import { PageTransition } from "./PageTransition";
import styles from "./LearningShell.module.css";

export interface LearningShellProps {
  courseSlug: string;
  lessonSlug: string;
  children: ReactNode;
}

/** Learning Layout shell — slim top bar (breadcrumb + AI tutor + exit),
 *  no sidebar. See LearningTopBar.tsx for why this is deliberately not the
 *  Dashboard shell. */
export function LearningShell({ courseSlug, lessonSlug, children }: LearningShellProps) {
  return (
    <div className={styles.page}>
      <LearningTopBar courseSlug={courseSlug} lessonSlug={lessonSlug} />
      <main id="main-content" tabIndex={-1} className={styles.main}>
        <PageTransition>{children}</PageTransition>
      </main>
    </div>
  );
}
