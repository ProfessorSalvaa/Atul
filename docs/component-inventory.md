# Component inventory — M1

40 components. All: TypeScript, token-driven (zero hardcoded colors), dark/light via `[data-theme]`, `className` pass-through for composition. None wired to real data, routing, auth, or the AI/DB layer — that's explicitly out of scope for M1.

## Core — Form (7)

| Component          | Path                             | Notes                                                   |
| ------------------ | -------------------------------- | ------------------------------------------------------- |
| Button             | `src/components/ui/Button.tsx`   | 5 variants × 3 sizes, loading state, forwardRef         |
| Input              | `src/components/ui/Input.tsx`    | label/helper/invalid state, leading/trailing icon slots |
| Textarea           | `src/components/ui/Textarea.tsx` | invalid state                                           |
| Select             | `src/components/ui/Select.tsx`   | Radix Select — full keyboard nav, typeahead             |
| Checkbox           | `src/components/ui/Checkbox.tsx` | Radix Checkbox — supports indeterminate                 |
| Radio / RadioGroup | `src/components/ui/Radio.tsx`    | Radix Radio Group — roving tabindex                     |
| Switch             | `src/components/ui/Switch.tsx`   | Radix Switch                                            |

## Core — Display (5)

| Component                      | Path                               | Notes                                                   |
| ------------------------------ | ---------------------------------- | ------------------------------------------------------- |
| Badge                          | `src/components/ui/Badge.tsx`      | 6 tones                                                 |
| Avatar                         | `src/components/ui/Avatar.tsx`     | Radix Avatar — image w/ fallback initials, 4 sizes      |
| Card / CardHeader / CardFooter | `src/components/ui/Card.tsx`       | flat + raised + interactive variants                    |
| Breadcrumb                     | `src/components/ui/Breadcrumb.tsx` | accepts a `linkComponent` for client-side routing later |
| Pagination                     | `src/components/ui/Pagination.tsx` | windowed page numbers with ellipsis                     |

## Core — Overlay (6)

| Component                                                    | Path                              | Notes                                 |
| ------------------------------------------------------------ | --------------------------------- | ------------------------------------- |
| Modal                                                        | `src/components/ui/Modal.tsx`     | Radix Dialog — centered               |
| Drawer                                                       | `src/components/ui/Drawer.tsx`    | Radix Dialog — side-sheet, left/right |
| Tooltip (+ TooltipProvider)                                  | `src/components/ui/Tooltip.tsx`   | Radix Tooltip                         |
| Tabs / TabsList / TabsTrigger / TabsContent                  | `src/components/ui/Tabs.tsx`      | Radix Tabs                            |
| Accordion / AccordionItem / …Trigger / …Content              | `src/components/ui/Accordion.tsx` | Radix Accordion, animated height      |
| Dropdown / …Trigger / …Content / …Item / …Separator / …Label | `src/components/ui/Dropdown.tsx`  | Radix Dropdown Menu                   |

## Core — Feedback & state (8)

| Component                              | Path                                 | Notes                                    |
| -------------------------------------- | ------------------------------------ | ---------------------------------------- |
| Toast (+ ToastProvider, ToastViewport) | `src/components/ui/Toast.tsx`        | Radix Toast, 5 tones                     |
| Alert                                  | `src/components/ui/Alert.tsx`        | inline banner, `role="alert"`, 5 tones   |
| Skeleton                               | `src/components/ui/Skeleton.tsx`     | shimmer, respects reduced-motion         |
| Progress                               | `src/components/ui/Progress.tsx`     | Radix Progress, optional label/value     |
| Spinner                                | `src/components/ui/Spinner.tsx`      | `role="status"`                          |
| EmptyState                             | `src/components/ui/EmptyState.tsx`   | icon + title + description + action slot |
| ErrorState                             | `src/components/ui/ErrorState.tsx`   | shares EmptyState layout, `role="alert"` |
| LoadingState                           | `src/components/ui/LoadingState.tsx` | full-region loading placeholder          |

## Learning (10)

| Component            | Path                                               | Notes                                                                                                         |
| -------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| CourseCard           | `src/components/learning/CourseCard.tsx`           | level badge, premium lock, progress OR duration                                                               |
| LessonCard           | `src/components/learning/LessonCard.tsx`           | concept/code/flashcard type icon, completed/locked states                                                     |
| ModuleCard           | `src/components/learning/ModuleCard.tsx`           | wraps LessonCards, shows completion count                                                                     |
| QuizCard             | `src/components/learning/QuizCard.tsx`             | pass/fail result, retake CTA                                                                                  |
| AchievementBadge     | `src/components/learning/AchievementBadge.tsx`     | earned (brand gradient) vs locked state                                                                       |
| ProgressTimeline     | `src/components/learning/ProgressTimeline.tsx`     | done/current/upcoming milestone list                                                                          |
| Flashcard            | `src/components/learning/Flashcard.tsx`            | 3D flip, respects reduced-motion                                                                              |
| CodeBlock            | `src/components/learning/CodeBlock.tsx`            | copy-to-clipboard, line numbers; no syntax highlighter wired yet (see decisions doc)                          |
| AITutorPanel         | `src/components/learning/AITutorPanel.tsx`         | presentational chat shell only — no model wiring (locked AI Tutor scope enforced at the data layer, not here) |
| SearchCommandPalette | `src/components/learning/SearchCommandPalette.tsx` | built on `cmdk`, grouped results                                                                              |

## Navigation (4)

| Component        | Path                                             | Notes                                                |
| ---------------- | ------------------------------------------------ | ---------------------------------------------------- |
| Sidebar          | `src/components/navigation/Sidebar.tsx`          | collapsible, active-state aware                      |
| TopNavigation    | `src/components/navigation/TopNavigation.tsx`    | search trigger (⌘K), notification bell, actions slot |
| MobileNavigation | `src/components/navigation/MobileNavigation.tsx` | bottom tab bar, capped at 5 items                    |
| Footer           | `src/components/navigation/Footer.tsx`           | link columns + bottom bar                            |

## Theming infrastructure

| File                                          | Purpose                                                                  |
| --------------------------------------------- | ------------------------------------------------------------------------ |
| `src/styles/tokens/*.css`                     | Every token category, ported verbatim from the approved design system    |
| `src/app/fonts.ts`                            | Self-hosted Instrument Sans / Newsreader / IBM Plex Mono via `next/font` |
| `src/components/providers/theme-provider.tsx` | `next-themes` wired to `[data-theme]`                                    |
| `src/lib/cn.ts`                               | `clsx`-based class composer used throughout                              |
