# Design tokens — M1

Source of truth for values is the code, not this file: `src/styles/tokens/*.css`, ported verbatim from the approved Curitiq design system. This doc explains what each category means and how to use it correctly — update it if usage guidance changes, but never hand-edit a token value here without updating the CSS first.

Every component in the library references these tokens exclusively via `var(--token-name)`. There should be zero hardcoded hex/px/ms values in component CSS — if you find one, it's a bug.

## Color (`colors.css`)

Two brand hues carry the emotional logic: **Spark** (`--spark-*`, orange, `#f77a31` at 500) for curiosity/CTAs, **Ink** (`--ink-*`, deep indigo, `#1d144a` at 900) for trust/brand-dark surfaces. **Growth** (`--growth-*`/`--green-*`) is reserved for progress/streaks/mastery — never decorative.

Don't reach for `--spark-500` or `--ink-900` directly in components. Use the semantic layer instead: `--accent-primary`, `--accent-secondary`, `--text-primary` / `--text-secondary` / `--text-tertiary` / `--text-brand`, `--bg-canvas` / `--bg-surface` / `--bg-surface-raised` / `--bg-sunken`, `--border-subtle` / `--border-default` / `--border-strong` / `--border-focus`, and the semantic status set (`--success-*`, `--warning-*`, `--error-*`, `--info-*`, each with `-bg` / `-fg` / `-border`). These are the tokens that actually flip between light and dark theme — the raw brand/gray scales mostly don't.

`--gradient-brand` (the mark's conic gradient) is reserved for the logo and rare hero/reward moments — never a default UI surface treatment.

## Typography (`typography.css`, `fonts.css`)

Three families: `--font-primary` (Instrument Sans — UI/body/most headings), `--font-secondary` (Newsreader — sparingly, for large editorial statements), `--font-mono` (IBM Plex Mono — code, data, shortcuts). Self-hosted via `next/font`; see the architecture-decisions doc.

Size/line-height pairs are named by role, not by scale number: `--font-size-display-{2xl,xl,lg,md,sm}` for hero text, `--font-size-heading-{lg,md,sm}` for section headings, `--font-size-body-{lg,md,sm}` for copy, `--font-size-caption` for the smallest UI text, `--font-size-mono-{md,sm}` for code. Always pair a size with its matching `--line-height-*`.

## Spacing (`spacing.css`)

Strict 4px grid: `--space-0` through `--space-32` (0–128px), but only the defined steps (0,1,2,3,4,5,6,8,10,12,16,20,24,32) — there is no `--space-7` or `--space-9`. If a gap doesn't fit the scale, that's a signal to reconsider the layout, not to hardcode a pixel value.

## Radius (`radius.css`)

`--radius-xs` (4px, inputs/chips) → `--radius-2xl` (24px, large cards/sheets), plus `--radius-full` for pills/avatars/dots. Moderate throughout by design — nothing should look bubbly/cartoonish.

## Elevation (`elevation.css`)

Mostly flat + a 1px hairline border (`--border-subtle`/`--border-default`) is the default resting state. Shadows (`--shadow-xs` … `--shadow-xl`) are reserved for things that float above content — menus, dialogs, popovers, toasts — not resting cards. `--shadow-focus-ring` is the single focus-visible treatment used everywhere; don't invent another one. `--glass-bg`/`--blur-*` back the command palette and dialog scrims only.

## Motion (`motion.css`)

`--duration-fast` (150ms) for routine hover/press, `--duration-base`/`--duration-slow` for entrances, `--duration-slower` for spinners. `--ease-standard` is the default easing; `--ease-spring` is reserved for reward moments (used once, e.g. the Flashcard flip) — not routine UI. Every animated component respects `prefers-reduced-motion` (enforced globally in `globals.css`, plus explicitly in Skeleton/Flashcard/Spinner where the global rule alone isn't enough).

## Borders (`borders.css`)

`--border-width-hairline` (1px, default), `--border-width-thick` (1.5px, form controls like Checkbox/Radio), `--border-width-heavy` (2px). Opacity tokens (`--opacity-disabled`, `--opacity-hover-overlay`, `--opacity-press-overlay`, `--opacity-backdrop`) standardize interactive-state opacity instead of ad hoc values per component.

## Layout (`layout.css`)

Breakpoints `--bp-sm` (480px) → `--bp-2xl` (1536px) for future responsive page work. Z-index scale `--z-base` → `--z-tooltip` — every overlay component in this library already uses the correct layer (dropdown < sticky < overlay < modal < popover < toast < tooltip); don't invent new z-index values downstream.

## Theming

Every semantic token is redefined under `[data-theme="dark"]` in the same file it's defined in light mode — there's no separate dark-mode-only file to keep in sync. `next-themes` toggles the attribute on `<html>`; components never check the theme directly, they just reference the semantic token and the CSS cascade handles it.
