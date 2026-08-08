/**
 * M1's `LessonCard` (frozen — see docs/design-system-decisions.md) only
 * knows three visual lesson types: concept / code / flashcard. The
 * M2.75 content engine supports eleven. Rather than touching the frozen
 * component, every new lesson type maps down to whichever of the three
 * icons reads closest — this is a display simplification, not a data
 * loss; the full `Lesson["type"]` is still what's stored and validated.
 */
import type { LessonType as CardLessonType } from "@/components/learning/LessonCard";
import type { LessonType } from "./schema";

export function toCardLessonType(type: LessonType): CardLessonType {
  switch (type) {
    case "code":
    case "practice-lab":
    case "challenge":
      return "code";
    case "flashcards":
      return "flashcard";
    default:
      return "concept";
  }
}
