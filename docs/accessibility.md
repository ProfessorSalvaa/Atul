# Accessibility report — M1

## What was actually verified (not just claimed)

8 of the 40 components have automated axe-core checks (via `vitest-axe`) running against real rendered output, plus interaction tests using `@testing-library/user-event` (which simulates real pointer/keyboard event sequences, not just synthetic clicks). As of this milestone: **31 tests, 0 failures, 0 axe violations**, across:

- Button (loading/disabled state, click handling, axe)
- Input (label association, `aria-invalid`, `aria-describedby` wiring, axe)
- Checkbox (checked-state toggling, axe)
- Modal (open/close via trigger and close button, accessible dialog title, axe while open)
- Tabs (click + arrow-key navigation between tabs, correct panel mount/unmount, axe)
- Toast (title/description rendering, axe)
- Flashcard (flip state reflected in `aria-pressed` and a dynamic `aria-label`, axe)
- MobileNavigation (5-item cap enforced, `aria-current` on the active item, axe)

Run it yourself: `pnpm test`.

## What that leaves unverified

The other 32 components (Textarea, Select, Radio, Switch, Badge, Avatar, Card, Breadcrumb, Pagination, Drawer, Tooltip, Accordion, Dropdown, Alert, Skeleton, Progress, Spinner, EmptyState/ErrorState/LoadingState, CourseCard's interactive path, LessonCard, ModuleCard, QuizCard, AchievementBadge, ProgressTimeline, CodeBlock, AITutorPanel, SearchCommandPalette, Sidebar, TopNavigation, Footer) have no automated test yet. They follow the same patterns as the tested ones (native semantics or Radix primitives, token-driven focus rings, `aria-*` wired by hand where there's no primitive to lean on) but that's a design intent claim, not a verified one. Treat "40 components built" and "8 components verified" as two different, both-true statements — don't round the first up to the second.

## Manual review notes (by category, not automated)

**Color contrast.** Every semantic text/background pairing (`--text-primary` on `--bg-canvas`/`--bg-surface`, `--success-fg` on `--success-bg`, etc.) is inherited directly from the design system's own tokens, which the design system's README states were built to clear 4.5:1 in both themes. Not independently re-verified with a contrast checker in this milestone — worth a dedicated pass once real content (not lorem ipsum) is in place.

**Keyboard navigation.** Verified directly for Tabs (arrow keys) and Modal (trigger → dialog → close). Not yet verified: Dropdown/Select typeahead, Accordion arrow-key nav, RadioGroup arrow-key nav, SearchCommandPalette keyboard flow — these are exactly the patterns Radix is supposed to get right by default, but "supposed to" isn't the same as "tested here."

**Focus management.** Modal and Drawer rely on Radix Dialog's built-in focus trap and return-focus-on-close behavior — not reimplemented, not independently tested beyond confirming the dialog opens/closes correctly.

**Reduced motion.** Enforced globally (`prefers-reduced-motion: reduce` in `globals.css` collapses all animations/transitions to ~0), plus explicit handling in Skeleton and Flashcard. Not tested (jsdom doesn't evaluate media queries meaningfully) — worth a manual OS-level check.

**Semantic HTML / ARIA by component:**

- Form controls (Input, Textarea, Select, Checkbox, Radio, Switch) all support a `label` prop that produces a real `<label>`/`htmlFor` (or Radix's built-in association).
- Alert and ErrorState use `role="alert"`. Spinner uses `role="status"`. AITutorPanel's message list uses `role="log"` + `aria-live="polite"`.
- Icon-only buttons (close buttons, pagination arrows, mobile nav) all carry `aria-label`; decorative icons carry `aria-hidden="true"`.
- Sidebar/TopNavigation/MobileNavigation mark the active item with `aria-current="page"`, not color alone.

## Known gaps / not addressed in M1

- No screen-reader manual pass (VoiceOver/NVDA) — automated axe checks catch a meaningful subset of issues, not everything a manual pass would.
- No visual regression testing.
- Color contrast not independently re-measured (see above).
- CodeBlock has no syntax highlighting yet, so no concern there re: color-only signaling — revisit if/when one is added (ensure token colors, not a hardcoded highlighter theme).

## Recommendation for M2+

Expand the axe+interaction test pattern to the remaining 32 components incrementally as they get used in real pages, rather than retrofitting all of them speculatively now — mirrors the same "don't build ahead of real usage" principle applied elsewhere in this project.

---

## M2 addendum: application shell & navigation

### What was added

- **Skip link** (`SkipLink`) — first focusable element on every page,
  jumps to `#main-content`. Every layout's `<main>` carries that id and
  `tabIndex={-1}` so it's a valid focus target even though it's not
  normally interactive.
- **Focus management on route change** (`ScrollManager`) — moves focus to
  the main landmark after a navigation, so screen readers announce new
  page content. Next's App Router doesn't do this by default. Skips the
  very first render (no navigation has happened yet).
- **`aria-current="page"`** is used consistently across every new nav
  surface that wasn't already covered in M1: `PublicHeader`'s nav links,
  `SettingsSubNav`'s tabs, and the Learning breadcrumb's current item.
- **Landmark roles**: every layout has exactly one `<main>`; `PublicHeader`
  and `AppTopBar`/`AppSidebar` use `<header>`/`<nav aria-label="Primary">`
  (inherited from M1's Sidebar/MobileNavigation/TopNavigation, unchanged).
- **Keyboard shortcuts**: Cmd/Ctrl+K toggles the command palette from
  anywhere (`ShellProvider`); Escape closes it. Radix-based overlays
  (Drawer, Dropdown) already handle Escape internally per M1.
- **Reduced motion**: `PageTransition`'s fade/slide relies on the same
  global `prefers-reduced-motion` rule from M1 (animation-duration forced
  to ~0) — no separate handling needed.

### What was newly tested

18 new tests this milestone (`pnpm test`: 49 total, 0 failures): pure-logic
coverage for `humanizeSlug`, `isProtectedRoute`/`requireAuth`
(`route-guard.ts`), and the sample-data lookup helpers
(`getCourseBySlug`/`getLessonBySlug`), plus a component test for
`NotificationPanel` (empty-state copy, rendering unread items, badge
count) — the one new shell component built on a Radix primitive (Dropdown)
in the same pattern M1's tested components already used.

### What's still unverified

The rest of the new shell — `AppSidebar`, `AppTopBar`, `AppMobileNav`,
`LearningTopBar`, `PublicHeader`, `SettingsSubNav`, `AuthChrome`,
`CommandPaletteHost`, `AITutorHost`, `ThemeSwitcher`, `ScrollManager`,
`PageTransition` — has no automated test. Most of these are thin
composition over next/navigation (`usePathname`, `useRouter`), which M1's
test setup has no mocking convention for yet; adding one is real, scoped
work (a `next/navigation` mock + a router-aware render helper) rather than
something to bolt on quickly here. Same "don't round up" caveat as M1:
"navigation works" (manually verified via `next build`'s static-generation
pass across all 24 routes, and via the founder's own click-through) and
"navigation is test-covered" are different claims.

None of the 24 routes' pages have automated axe checks yet either — same
reasoning as M1's remaining 32 components: expand coverage as pages get
real usage, not speculatively.

### Recommendation for M3+

Add a `next/navigation` test-mocking convention (even a small
`test/router.tsx` helper) before the shell component count grows further —
right now testing `AppSidebar`'s active-route highlighting or
`ScrollManager`'s focus behavior isn't blocked by anything except that
convention not existing yet.
