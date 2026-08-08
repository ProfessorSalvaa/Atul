"use client";

import { useState } from "react";
import { cn } from "@/lib/cn";
import styles from "./Flashcard.module.css";

export interface FlashcardProps {
  front: string;
  back: string;
  className?: string;
}

export function Flashcard({ front, back, className }: FlashcardProps) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div className={className}>
      <div className={styles.scene}>
        <button
          type="button"
          className={styles.card}
          data-flipped={flipped}
          onClick={() => setFlipped((f) => !f)}
          aria-pressed={flipped}
          aria-label={
            flipped
              ? `Answer: ${back}. Press to show question.`
              : `Question: ${front}. Press to reveal answer.`
          }
        >
          <span className={styles.face}>
            <span className={styles.text}>{front}</span>
          </span>
          <span className={cn(styles.face, styles.back)}>
            <span className={styles.text}>{back}</span>
          </span>
        </button>
      </div>
      <p className={styles.hint}>Click to flip</p>
    </div>
  );
}
