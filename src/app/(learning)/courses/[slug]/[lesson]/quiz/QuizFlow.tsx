"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { EmptyState } from "@/components/ui/EmptyState";
import { useToast } from "@/components/shell/ToastHost";
import { Progress } from "@/components/ui/Progress";
import { RadioGroup, RadioItem } from "@/components/ui/Radio";
import { cn } from "@/lib/cn";
import type { Course, Lesson, QuizQuestion } from "@/lib/content/schema";
import { submitQuizAction } from "@/lib/progress/actions";
import styles from "./page.module.css";

/**
 * Renderable question shape once a `QuizQuestion` has been normalized —
 * every quiz UI concern (radio list, correctness check) only needs to
 * know about this shape, not about each discriminated-union variant.
 *
 * Currently `single-choice` and `true-false` are normalized (2 of the
 * quiz engine's 9 schema-supported types — see schema/quiz.ts). The
 * remaining 7 (multiple-choice, fill-in-blank, matching, ordering,
 * code-output, scenario-based, explain-why) validate and load correctly
 * but don't have a renderer here yet; unsupported questions are filtered
 * out below rather than crashing the player. Extending this is additive:
 * add a case to `normalizeQuestion`, no schema or loader changes needed.
 */
interface RenderableQuestion {
  id: string;
  prompt: string;
  options: { id: string; text: string }[];
  correctOptionId: string;
  explanation: string;
}

function normalizeQuestion(q: QuizQuestion): RenderableQuestion | null {
  if (q.type === "single-choice") {
    return {
      id: q.id,
      prompt: q.prompt,
      options: q.options,
      correctOptionId: q.correctOptionId,
      explanation: q.explanation,
    };
  }
  if (q.type === "true-false") {
    return {
      id: q.id,
      prompt: q.prompt,
      options: [
        { id: "true", text: "True" },
        { id: "false", text: "False" },
      ],
      correctOptionId: String(q.correctAnswer),
      explanation: q.explanation,
    };
  }
  return null;
}

export function QuizFlow({
  course,
  lesson,
  questions: rawQuestions,
  signedIn,
}: {
  course: Course;
  lesson: Lesson;
  questions: QuizQuestion[];
  signedIn: boolean;
}) {
  const questions = useMemo(
    () => rawQuestions.map(normalizeQuestion).filter((q): q is RenderableQuestion => q !== null),
    [rawQuestions],
  );

  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [finalPercent, setFinalPercent] = useState(0);
  const [finalPassed, setFinalPassed] = useState(false);
  const { notify } = useToast();

  if (questions.length === 0) {
    return (
      <EmptyState
        title="No quiz yet for this lesson"
        description="This lesson's quiz questions haven't been authored yet."
      />
    );
  }

  const question = questions[index];
  const isLast = index === questions.length - 1;
  const isCorrect = revealed && selected === question.correctOptionId;

  function handleCheck() {
    if (selected === null) return;
    setRevealed(true);
    if (selected === question.correctOptionId) setScore((s) => s + 1);
  }

  async function handleNext() {
    const nextAnswers = { ...answers, [question.id]: selected ?? "" };
    setAnswers(nextAnswers);

    if (isLast) {
      if (!signedIn) {
        const percent = Math.round((score / questions.length) * 100);
        setFinalPercent(percent);
        setFinalPassed(percent >= 70);
        setFinished(true);
        notify({
          title: percent >= 70 ? "Quiz passed" : "Quiz not passed — try again anytime",
          description: `You scored ${percent}%. Sign in to save this result.`,
          tone: percent >= 70 ? "success" : "warning",
        });
        return;
      }

      setSubmitting(true);
      const result = await submitQuizAction(course.slug, lesson.slug, nextAnswers);
      setSubmitting(false);
      if (!result.ok) {
        notify({ title: "Couldn't submit quiz", description: result.error, tone: "error" });
        return;
      }
      setFinalPercent(result.scorePercent);
      setFinalPassed(result.passed);
      setFinished(true);
      notify({
        title: result.passed ? "Quiz passed" : "Quiz not passed — try again anytime",
        description: `You scored ${result.scorePercent}%.`,
        tone: result.passed ? "success" : "warning",
      });
      return;
    }
    setIndex((i) => i + 1);
    setSelected(null);
    setRevealed(false);
  }

  function handleRetry() {
    setIndex(0);
    setSelected(null);
    setRevealed(false);
    setAnswers({});
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    return (
      <Card raised className={styles.summaryCard}>
        <span className={styles.summaryIcon}>
          {finalPassed ? (
            <CheckCircle2 size={32} aria-hidden="true" />
          ) : (
            <XCircle size={32} aria-hidden="true" />
          )}
        </span>
        <h1 className={styles.summaryTitle}>{finalPercent}%</h1>
        <p className={styles.summaryText}>
          {finalPassed
            ? "Passed — nice work. Your progress on this module has been marked forward."
            : "Not quite there yet — retry anytime, there's no limit and no penalty."}
        </p>
        <div className={styles.summaryActions}>
          <Button onClick={handleRetry} variant="outline">
            Retake quiz
          </Button>
          <Link href={`/courses/${course.slug}`} className={styles.summaryLink}>
            Back to course
          </Link>
        </div>
      </Card>
    );
  }

  return (
    <div>
      <p className={styles.quizLabel}>Quiz: {lesson.title}</p>
      <Progress
        value={index + 1}
        max={questions.length}
        label={`Question ${index + 1} of ${questions.length}`}
        className={styles.progress}
      />
      <Card raised className={styles.questionCard}>
        <h1 className={styles.questionPrompt}>{question.prompt}</h1>
        <RadioGroup
          className={styles.options}
          value={selected ?? ""}
          onValueChange={(value) => !revealed && setSelected(value)}
        >
          {question.options.map((option) => (
            <RadioItem key={option.id} value={option.id} label={option.text} disabled={revealed} />
          ))}
        </RadioGroup>

        {revealed && (
          <p
            className={cn(
              styles.feedback,
              isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect,
            )}
          >
            {question.explanation}
          </p>
        )}

        <div className={styles.actions}>
          {!revealed ? (
            <Button onClick={handleCheck} disabled={selected === null}>
              Check answer
            </Button>
          ) : (
            <Button onClick={handleNext} loading={isLast && submitting}>
              {isLast ? "See results" : "Next question"}
            </Button>
          )}
        </div>
      </Card>
    </div>
  );
}
