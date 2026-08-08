import { CheckCircle2, HelpCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import styles from "./QuizCard.module.css";

export interface QuizCardProps {
  title: string;
  questionCount: number;
  /** Undefined = not attempted yet. */
  scorePercent?: number;
  passThreshold?: number;
  onStart?: () => void;
  className?: string;
}

export function QuizCard({
  title,
  questionCount,
  scorePercent,
  passThreshold = 70,
  onStart,
  className,
}: QuizCardProps) {
  const attempted = typeof scorePercent === "number";
  const passed = attempted && scorePercent >= passThreshold;

  return (
    <div className={cn(styles.card, className)}>
      <div className={styles.header}>
        <div>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.meta}>{questionCount} questions</span>
        </div>
        <HelpCircle size={20} aria-hidden="true" />
      </div>

      {attempted && (
        <div className={cn(styles.resultRow, passed ? styles.passed : styles.failed)}>
          {passed ? (
            <CheckCircle2 size={16} aria-hidden="true" />
          ) : (
            <XCircle size={16} aria-hidden="true" />
          )}
          {scorePercent}% — {passed ? "Passed" : "Try again"}
        </div>
      )}

      <Button onClick={onStart} variant={attempted ? "outline" : "primary"} fullWidth>
        {attempted ? "Retake quiz" : "Start quiz"}
      </Button>
    </div>
  );
}
