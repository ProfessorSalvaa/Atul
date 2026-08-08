"use client";

import { CheckCircle2, XCircle } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { RadioGroup, RadioItem } from "@/components/ui/Radio";
import { cn } from "@/lib/cn";
import type { SampleCourse, SampleLesson } from "@/lib/sample-data/courses";
import styles from "./page.module.css";

interface Question {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
  feedback: { correct: string; incorrect: string };
}

const QUESTIONS: Question[] = [
  {
    id: "q1",
    prompt: "What's the recommended first step when reviewing a generated diff?",
    options: [
      "Read every line in file order",
      "Understand the intent of the change before checking individual lines",
      "Run the test suite and skip reading entirely",
    ],
    correctIndex: 1,
    feedback: {
      correct: "Right — intent first, then verify the lines that actually affect behavior.",
      incorrect: "Not quite — reading line-by-line first is slower and easier to rubber-stamp.",
    },
  },
  {
    id: "q2",
    prompt: "Why does Curitiq scope the AI tutor to the current lesson?",
    options: [
      "To reduce hallucination risk and keep answers grounded",
      "Because a full knowledge base is too expensive to build",
      "It doesn't — the tutor sees the entire course",
    ],
    correctIndex: 0,
    feedback: {
      correct: "Exactly — scoping keeps answers grounded in what you're actually reading.",
      incorrect: "Close, but the real reason is grounding, not cost or scope of course access.",
    },
  },
  {
    id: "q3",
    prompt: "What passing threshold does a Curitiq quiz typically use?",
    options: ["50%", "70%", "100%, no retries allowed"],
    correctIndex: 1,
    feedback: {
      correct: "70% is the default pass threshold, with unlimited retries — no punitive lockout.",
      incorrect: "The default threshold is 70%, and retries are always unlimited.",
    },
  },
];

export function QuizFlow({ course, lesson }: { course: SampleCourse; lesson: SampleLesson }) {
  const [index, setIndex] = useState(0);
  const [selected, setSelected] = useState<string | null>(null);
  const [revealed, setRevealed] = useState(false);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);

  const question = QUESTIONS[index];
  const isLast = index === QUESTIONS.length - 1;
  const isCorrect = revealed && Number(selected) === question.correctIndex;

  function handleCheck() {
    if (selected === null) return;
    setRevealed(true);
    if (Number(selected) === question.correctIndex) setScore((s) => s + 1);
  }

  function handleNext() {
    if (isLast) {
      setFinished(true);
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
    setScore(0);
    setFinished(false);
  }

  if (finished) {
    const percent = Math.round((score / QUESTIONS.length) * 100);
    const passed = percent >= 70;
    return (
      <Card raised className={styles.summaryCard}>
        <span className={styles.summaryIcon}>
          {passed ? (
            <CheckCircle2 size={32} aria-hidden="true" />
          ) : (
            <XCircle size={32} aria-hidden="true" />
          )}
        </span>
        <h1 className={styles.summaryTitle}>{percent}%</h1>
        <p className={styles.summaryText}>
          {passed
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
        max={QUESTIONS.length}
        label={`Question ${index + 1} of ${QUESTIONS.length}`}
        className={styles.progress}
      />
      <Card raised className={styles.questionCard}>
        <h1 className={styles.questionPrompt}>{question.prompt}</h1>
        <RadioGroup
          className={styles.options}
          value={selected ?? ""}
          onValueChange={(value) => !revealed && setSelected(value)}
        >
          {question.options.map((option, i) => (
            <RadioItem key={option} value={String(i)} label={option} disabled={revealed} />
          ))}
        </RadioGroup>

        {revealed && (
          <p
            className={cn(
              styles.feedback,
              isCorrect ? styles.feedbackCorrect : styles.feedbackIncorrect,
            )}
          >
            {isCorrect ? question.feedback.correct : question.feedback.incorrect}
          </p>
        )}

        <div className={styles.actions}>
          {!revealed ? (
            <Button onClick={handleCheck} disabled={selected === null}>
              Check answer
            </Button>
          ) : (
            <Button onClick={handleNext}>{isLast ? "See results" : "Next question"}</Button>
          )}
        </div>
      </Card>
    </div>
  );
}
