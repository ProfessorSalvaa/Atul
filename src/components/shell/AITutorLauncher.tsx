"use client";

import { Sparkles } from "lucide-react";
import { useShell } from "./ShellProvider";
import styles from "./AITutorLauncher.module.css";

/** Icon-button trigger for the AI Tutor slide-over (P0 §4: top bar
 *  "AI Tutor launcher"). Shared by AppTopBar and LearningTopBar. */
export function AITutorLauncher() {
  const { setAiTutorOpen } = useShell();

  return (
    <button
      type="button"
      className={styles.trigger}
      onClick={() => setAiTutorOpen(true)}
      aria-label="Open AI Tutor"
    >
      <Sparkles size={18} aria-hidden="true" />
    </button>
  );
}
