# M1 architecture decisions

Recorded per the founder's working-style rule: explain trade-offs before changing architecture. Two decisions here revise what M0's roadmap assumed for M1 — flagged explicitly rather than silently changed.

## Styling: CSS Modules, not Tailwind (revises the roadmap)

The original roadmap called for "Tailwind config mapped to tokens." Building the actual component library, hand-rolled CSS Modules turned out to be the better fit:

- Every design system component needs precise `:hover` / `:focus-visible` / `:disabled` / `[data-state]` handling (Radix primitives drive most of this via data attributes). CSS Modules express that directly; Tailwind would need arbitrary-value classes for nearly every token reference anyway, losing most of Tailwind's own value proposition.
- "Zero hardcoded colors, use only design tokens" is easier to guarantee and lint for when every value is `var(--token-name)` in real CSS, not a mix of Tailwind scale classes and arbitrary values.
- Tokens are already CSS custom properties (`src/styles/tokens/*.css`, ported verbatim from the design system). CSS Modules consume them with zero translation layer.

This doesn't block adding Tailwind later for page-level layout composition (grid/flex utilities) in M2+ — the two coexist fine in Next.js. It's excluded from M1 only because M1 explicitly doesn't build pages, so there's no layout-composition need yet.

## Accessibility: Radix UI primitives for interaction-heavy components

Modal, Drawer, Dropdown, Tooltip, Tabs, Accordion, Toast, Select, Checkbox, Radio, Switch, Avatar, and Progress are built on unstyled `@radix-ui/react-*` primitives, restyled entirely with our own tokens (zero Radix default CSS shipped).

Reasoning: focus trapping, portal management, roving tabindex, and correct ARIA wiring for these patterns are exactly the kind of thing that's easy to get subtly wrong by hand and expensive to debug later — a real technical-debt risk, not a shortcut. Radix is the de facto standard for unstyled accessible primitives in the React ecosystem, actively maintained, and adds no visual opinion we need to override. Simple, non-interactive-pattern components (Button, Input, Textarea, Badge, Avatar image handling, Card, Skeleton, Spinner, Alert, EmptyState/ErrorState/LoadingState, Breadcrumb, Pagination) are hand-built — they don't carry the same correctness risk and hand-building keeps the dependency surface proportional to actual need.

Other small, deliberate dependencies: `lucide-react` (icons — already the design system's specified icon set), `next-themes` (light/dark via `[data-theme]`, avoids hand-rolling FOUC-safe theme persistence), `cmdk` (command palette keyboard/filter logic), `clsx` (class composition).

## Storybook: not built for M1

The founder's brief left this as "if it provides long-term value." Call: not yet. With a single engineer and no parallel design/dev review workflow in place, Storybook's ongoing cost (a second build config, story files to maintain in lockstep with real components) doesn't have a consumer yet. The component inventory (`docs/component-inventory.md`) and this doc serve the same "what exists and how do I use it" purpose for now. Revisit once there's a team large enough that isolated visual QA earns its keep, or once a design handoff workflow needs it.

## Fonts: self-hosted, not CDN

The design system's source `tokens/fonts.css` loads Instrument Sans, Newsreader, and IBM Plex Mono from the Google Fonts CDN. We self-host via `next/font/google` instead (`src/app/fonts.ts`) — one less third-party request at runtime, no FOUT/layout shift, works offline in dev. Token names (`--font-primary`, `--font-secondary`, `--font-mono`) are unchanged, so nothing downstream needed to know this happened.
