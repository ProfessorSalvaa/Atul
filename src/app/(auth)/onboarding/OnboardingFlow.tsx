"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Progress } from "@/components/ui/Progress";
import { RadioGroup, RadioItem } from "@/components/ui/Radio";
import { useToast } from "@/components/shell/ToastHost";
import styles from "./OnboardingFlow.module.css";

const STEPS = [
  {
    key: "goal",
    question: "What brings you to Curitiq?",
    options: [
      "Switching careers into a technical field",
      "Going deeper on a skill I already use at work",
      "Learning something new out of curiosity",
    ],
  },
  {
    key: "level",
    question: "How would you describe your current level?",
    options: ["Just starting out", "Comfortable with the basics", "Already experienced"],
  },
  {
    key: "time",
    question: "How much time can you realistically give this per week?",
    options: ["A few minutes here and there", "2–4 hours", "5+ hours"],
  },
] as const;

/** UI only — selections aren't persisted anywhere yet (no `User` write
 *  until the data layer, M5+). "Finish" just routes to /dashboard. */
export function OnboardingFlow() {
  const router = useRouter();
  const { notify } = useToast();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const current = STEPS[step];
  const isLast = step === STEPS.length - 1;
  const canContinue = Boolean(answers[current.key]);

  function handleNext() {
    if (isLast) {
      notify({ title: "You're all set", description: "Welcome to Curitiq.", tone: "success" });
      router.push("/dashboard");
      return;
    }
    setStep((s) => s + 1);
  }

  return (
    <Card raised className={styles.card}>
      <Progress
        value={step + 1}
        max={STEPS.length}
        label={`Step ${step + 1} of ${STEPS.length}`}
        className={styles.progress}
      />
      <h1 className={styles.question}>{current.question}</h1>
      <RadioGroup
        className={styles.options}
        value={answers[current.key] ?? ""}
        onValueChange={(value) => setAnswers((a) => ({ ...a, [current.key]: value }))}
      >
        {current.options.map((option) => (
          <RadioItem key={option} value={option} label={option} />
        ))}
      </RadioGroup>
      <div className={styles.actions}>
        {step > 0 && (
          <Button variant="ghost" onClick={() => setStep((s) => s - 1)}>
            Back
          </Button>
        )}
        <Button onClick={handleNext} disabled={!canContinue} fullWidth={step === 0}>
          {isLast ? "Finish" : "Continue"}
        </Button>
      </div>
    </Card>
  );
}
