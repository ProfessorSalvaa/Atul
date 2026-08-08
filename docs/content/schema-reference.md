# Content Schema Reference

Human-readable summary of `src/lib/content/schema/`. The Zod schemas
there are the source of truth — this doc is a map of what exists and
where, not a restatement of every field (read the schema file itself
for exact field types/validation rules; each one is commented).

| File                   | Exports                                                                                                                                                                                                               | Covers                                                                                                                                       |
| ---------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------- |
| `common.ts`            | `contentStatusSchema`, `difficultySchema`, `seoMetadataSchema`, `aiTutorContextSchema`, `versionHistoryEntrySchema`, `resourceRefSchema`, `slugSchema`, `isoDateSchema`, `durationMinutesSchema`, `taxonomyRefSchema` | Cross-cutting primitives every other schema builds on                                                                                        |
| `course.ts`            | `courseSchema`, `moduleSchema`, `learningObjectiveSchema`, `prerequisiteSchema`, `certificateSchema`, `reviewSchema`                                                                                                  | Course → Module hierarchy, instructor, prerequisites, certificate criteria                                                                   |
| `lesson.ts`            | `lessonSchema` (discriminated union on `type`)                                                                                                                                                                        | 11 lesson types: reading, video, interactive, code, flashcards, quiz, assignment, case-study, practice-lab, challenge, interview-preparation |
| `quiz.ts`              | `quizQuestionSchema` (discriminated union on `type`), `quizSchema`                                                                                                                                                    | 9 question types: single-choice, multiple-choice, true-false, fill-in-blank, matching, ordering, code-output, scenario-based, explain-why    |
| `flashcard.ts`         | `flashcardSchema`, `flashcardDeckSchema`                                                                                                                                                                              | Front/back flashcard pairs                                                                                                                   |
| `assessment.ts`        | `assessmentSchema`                                                                                                                                                                                                    | Course-level assessments (reuses `quizQuestionSchema`)                                                                                       |
| `project.ts`           | `projectSchema`                                                                                                                                                                                                       | Practice project briefs (MDX-bodied)                                                                                                         |
| `caseStudy.ts`         | `caseStudySchema`                                                                                                                                                                                                     | Standalone case studies (MDX-bodied)                                                                                                         |
| `interviewQuestion.ts` | `interviewQuestionSchema`, `interviewQuestionBankSchema`                                                                                                                                                              | Career-path-scoped interview prep questions                                                                                                  |
| `cheatSheet.ts`        | `cheatSheetSchema`                                                                                                                                                                                                    | Quick-reference sheets (MDX-bodied)                                                                                                          |
| `resource.ts`          | `standaloneResourceSchema`                                                                                                                                                                                            | Downloadable resources not tied to a specific course                                                                                         |
| `taxonomy.ts`          | `taxonomyEntrySchema`, `taxonomyFileSchema`                                                                                                                                                                           | Shape of `content/taxonomy/*.yaml` entries                                                                                                   |

All of the above are re-exported from `schema/index.ts` — import from
`@/lib/content/schema` rather than individual files.

## Extending the schema

Adding a new lesson type or quiz question type is additive: add a new
`z.object({ ...lessonBase, type: z.literal("your-new-type"), ... })` (or
the quiz equivalent) and include it in the relevant
`z.discriminatedUnion(...)` array in `lesson.ts`/`quiz.ts`. No changes
needed anywhere else in the schema layer. The loader and validator both
operate generically over whatever the union currently contains — only
a renderer (e.g. `QuizFlow.tsx`'s `normalizeQuestion`) needs a new case
if you also want the new type to actually render somewhere.
