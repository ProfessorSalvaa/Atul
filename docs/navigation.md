# Navigation & application shell — M2

This documents the route structure, layout architecture, and the
non-obvious decisions made while turning the P0 blueprint's information
architecture into an actual Next.js App Router tree. No business logic,
auth, or database calls exist yet — every route renders realistic sample
content (`src/lib/sample-data/`) composed from the M1 design system.

## Layout tree

Seven layouts, all nested under the root layout (`src/app/layout.tsx`,
which owns fonts, theming, and the global overlay hosts):

| Layout    | Route group      | Routes                                                                      | Chrome                                      |
| --------- | ---------------- | --------------------------------------------------------------------------- | ------------------------------------------- |
| Home      | `(home)`         | `/`                                                                         | `PublicShell` (public header + footer)      |
| Marketing | `(marketing)`    | `/pricing`, `/courses`, `/courses/[slug]`, `/about`, `/terms`, `/privacy`   | `PublicShell`                               |
| Blog      | `(blog)`         | `/blog`, `/blog/[slug]`                                                     | `PublicShell narrow` (reading-width column) |
| Auth      | `(auth)`         | `/login`, `/signup`, `/forgot-password`, `/reset-password`, `/onboarding`   | `AuthChrome` (centered card, no nav)        |
| Learning  | `(learning)`     | `/courses/[slug]/[lesson]`, `/courses/[slug]/[lesson]/quiz`                 | `LearningShell` (slim top bar, no sidebar)  |
| Dashboard | `(app)`          | `/dashboard`, `/learn`, `/progress`, `/achievements`, `/search`, `/profile` | `AppShell` (sidebar + top bar + mobile nav) |
| Settings  | `(app)/settings` | `/settings`, `/settings/billing`, `/settings/notifications`                 | `SettingsShell`, nested inside `AppShell`   |

Home, Marketing, and Blog all wrap the same `PublicShell` component but
keep separate `layout.tsx` files (per M2's deliverable list) so each can
diverge later — e.g. Home wanting a full-bleed hero — without touching the
others.

## Decisions worth flagging

**`/courses/[slug]/[lesson]` doesn't branch by auth state.** P0 §1 lists
this exact path under both the public IA (free preview) and the
authenticated IA (full lesson player) — the same URL, two different
experiences depending on enrollment. M2 has no auth, so there's nothing to
branch on yet. Rather than invent a routing scheme now that a real
auth/enrollment check would have to unwind later, the Learning Layout
applies to this route unconditionally, for anonymous and enrolled users
alike. When M3 (auth) and M5 (enrollment data) land, the page component
gains a server-side enrollment check and renders richer state (progress,
resume position) within this same layout — the layout itself shouldn't
need to change.

**Onboarding lives under the Auth Layout, not the Dashboard Layout.** P0
places `/onboarding` in the authenticated section of the IA, but a
first-run user hasn't earned the full sidebar/topnav chrome yet — showing
it during a single-task stepper flow is more distraction than orientation.
Auth's "centered card, no nav" treatment fits the same need onboarding has.

**Settings is a nested layout, not a sibling of Dashboard.** `SettingsShell`
renders inside `AppShell`'s `<main>`, adding only the Account/Billing/
Notifications tab strip — so Settings pages keep the sidebar and top bar
rather than duplicating that chrome.

**Two distinct headers, on purpose.** `PublicHeader` (logged-out marketing
chrome — nav links, login/signup CTAs) and `TopNavigation` (M1's
authenticated app-shell bar — search trigger, notifications, profile) are
different components because they serve different users with different
available actions. Conflating them into one "smart" header that
conditionally renders both states would be harder to reason about than two
small components.

**Sidebar/MobileNavigation weren't modified for routing, except where a
real bug forced it.** M1's `Sidebar` and `MobileNavigation` render plain
`<a>`/`<button>` elements with an `onClick?: () => void` contract — no DOM
event, deliberately framework-agnostic. Rather than reopen the "don't
modify the approved design system" line for a UX nicety, the app-shell
integration layer (`src/hooks/use-nav-link-click.ts`) builds click handlers
that call `router.push` and preserve modifier-key semantics (ctrl/cmd/
middle-click still opens a new tab) entirely from the outside — see that
file's header comment for the one small, documented type cast this
requires against Sidebar's narrower `onClick` type.

**One real bug was found and fixed: `CourseCard` and `LessonCard` needed
`"use client"`.** Both render `role="button"` elements with an inline
`onKeyDown` handler defined unconditionally in their own JSX — invisible
in M1 because Storybook/tests render everything client-side, but a hard
build failure once real Server Component pages (`/dashboard`, `/courses`,
course detail) tried to render them: Next.js can't serialize an
event-handler closure across the Server/Client Component boundary. This is
the one legitimate "critical bug" exception to the M1 freeze — see
`docs/design-system-decisions.md` for the full note.

**Navigation guards are a documented no-op, not implemented.** M2
explicitly excludes auth. `src/lib/navigation/route-guard.ts` defines which
route prefixes will require a session (`PROTECTED_ROUTE_PREFIXES`) and a
`requireAuth()` stub that always resolves authenticated — so M3 has one
obvious place to wire in a real check instead of that logic getting
scattered across pages later.

## Global overlays

Mounted once in the root layout, available from anywhere: the Cmd+K
command palette (`CommandPaletteHost`), the AI Tutor slide-over
(`AITutorHost`), and `ScrollManager` (resets the app shell's independently
scrolling content region and moves focus to the main landmark on route
change — Next's built-in scroll-to-top targets window scroll, which isn't
what needed resetting in a fixed-sidebar layout). `ShellProvider` owns
their open/closed state and the Cmd+K keyboard shortcut.

## Page transitions

No animation library — `PageTransition` remounts its child (keyed by
pathname) to re-trigger a CSS fade/slide-in defined with the motion
tokens. `prefers-reduced-motion` is already handled globally in
`globals.css`, so this needed no separate reduced-motion branch.

## SEO

`src/lib/seo.ts` centralizes the site origin (`SITE_URL`) and the noindex
route list, consumed by root `metadataBase`, `robots.ts`, and `sitemap.ts`
so they can't drift apart. Every route exports its own `metadata` (or
`generateMetadata` for dynamic routes); authenticated routes are marked
`robots: { index: false }` per P0 §18. `sitemap.ts` includes static routes
plus one entry per sample course/blog post — swapping in real content data
later is a data-source change, not a sitemap rewrite.

## What's intentionally not done in M2

- No real page-transition library (Framer Motion etc.) — CSS only, per the
  "no new dependencies without a reason" default.
- Keyboard shortcuts are Cmd+K and Escape only — a fuller shortcut palette
  (per P0's "?" help overlay idea) is a reasonable M3+ addition, not core
  to the shell.
- Search is client-side filtering over static sample data — `search.query`
  (Postgres full-text) replaces it in M5+.
- No e2e/navigation-flow tests yet (Playwright or similar) — component and
  unit tests cover the new shell pieces; full click-through navigation
  testing is a reasonable ask for a later milestone once routes carry real
  data worth navigating between.

## M2.5 addendum: Founder Demo Build

M2.5 turned the M2 shell into a polished, explorable demo without adding
any real backend. What changed, by category:

- **Demo data**: `sample-data/courses.ts` grew from 5 to 8 courses, each
  now carrying `instructor`, `rating`, `reviewCount`, `enrolledCount`, and
  `reviews`. `sample-data/content.ts` added `SITE_STATS`,
  `USER_PROFILE`, richer `NOTIFICATIONS`/`ACHIEVEMENTS` (categories,
  progress, earned dates), and two more `BLOG_POSTS` with author/tag
  metadata. The app now reads like a product with an install base instead
  of three placeholder items per list.
- **Toasts**: `components/shell/ToastHost.tsx` is a new imperative
  `useToast()` wrapping M1's unmodified Toast primitives — used for lesson
  completion, quiz results, form saves, notification toggles, and
  "not wired up yet" disclosures on auth/billing actions that have no
  backend (M3/M8).
- **Keyboard shortcuts**: `components/shell/ShortcutsHost.tsx` adds a
  `?`-triggered reference overlay and Gmail/Linear-style `g`-then-letter
  navigation (`g d` → dashboard, `g a` → achievements, etc.), on top of
  M2's Cmd+K. This supersedes the "Keyboard shortcuts are Cmd+K and Escape
  only" line in M2's "not done" list below.
- **State coverage**: lesson "Mark complete", quiz pass/fail, profile and
  settings forms, notification toggles, and all four auth forms
  (login/signup/forgot-password/reset-password) now have real loading,
  validation-error, and success states instead of a bare
  `e.preventDefault()`. Search gained a debounced skeleton-loading state.
- **Design-system freeze held**: every addition above composes M1
  components (`Toast`, `Modal`, `Progress`, `AchievementBadge`, `Switch`,
  etc.) rather than editing them. The one new pattern —
  `components/shell/AchievementCard.tsx` — wraps `AchievementBadge` to add
  progress/earned-date detail without touching the frozen component.
- **Performance**: see `docs/performance.md` for the bundle/TTFB findings
  and why a full Lighthouse run couldn't be executed in this sandbox.

This supersedes the M2-era note above about a minimal shortcut set.

## M2.75 addendum: Content Engine

M2.75 replaced the courses/lessons half of `sample-data` with a
schema-validated content engine — the application no longer hardcodes
course data. See `docs/content/architecture.md` for the full design
rationale; summary of what changed in the app itself:

- **Course/lesson/quiz pages now read from `src/lib/content/loader.ts`**
  instead of `sample-data/courses.ts`: the courses catalog, course
  detail, lesson player, quiz flow, dashboard, learn, progress, search,
  home (featured courses), and `sitemap.ts` all switched over. `getAllCourseSlugs`
  replaces `SAMPLE_COURSES.map(c => c.slug)` for `generateStaticParams`
  throughout — adding a course to `content/courses/` is now sufficient
  to add its routes, with zero page-component changes.
- **Lesson content is real MDX**, compiled server-side via
  `next-mdx-remote/rsc` (`src/lib/content/mdx.tsx`). `LessonContent.tsx`
  was split into a Server Component (resolves prev/next, compiles MDX)
  and a new `LessonInteractive.tsx` Client Component (mark-complete,
  toasts, pager) — MDX compilation only works in a Server Component,
  which is why the split exists.
- **Quiz questions are content-driven**: `QuizFlow.tsx` now takes a
  `questions: QuizQuestion[]` prop loaded from each lesson's
  `quiz.json` instead of a hardcoded 3-question array. Two of the
  schema's nine question types (single-choice, true-false) render
  today; the rest validate and load correctly and are documented as
  schema-ready-not-yet-rendered in the component itself.
- **`sample-data/content.ts` is unchanged and still in use** — blog
  posts, achievements, notifications, testimonials, site stats, and the
  user profile were out of scope for this migration (courses/lessons/
  quizzes only, per the M2.75 brief). `sample-data/courses.ts` itself
  is now only referenced by its own test file and by
  `scripts/migrate-sample-data.mts` (kept as a migration record, not
  meant to be re-run).
- **Design-system freeze held**: `LessonCard`'s frozen 3-value `type`
  prop (concept/code/flashcard) didn't grow to match the new 11-value
  `Lesson["type"]` union — `src/lib/content/lessonCardAdapter.ts` maps
  down to the closest icon instead, same compose-don't-modify pattern
  as M2.5.
