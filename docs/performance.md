# Performance — M2.5 addendum

## What's true today

- **82/82 routes are statically generated** (`○ Static` / `● SSG` in the
  build output) — every page ships as pre-rendered HTML with no
  server-side render on request. Local `next start` smoke tests show
  2–30ms TTFB and 38–62KB uncompressed HTML per page (`/`, `/courses`,
  `/courses/[slug]`, `/dashboard`, `/blog`).
- **Fonts are self-hosted via `next/font`** (Instrument Sans, Newsreader,
  IBM Plex Mono) — no external font requests, no render-blocking `<link>`
  to Google Fonts, no font-swap layout shift.
- **No images yet** — every visual treatment (course covers, hero
  backgrounds) is a CSS gradient from the design tokens, so there's
  nothing to optimize on that front yet. `next/image` adoption is a
  concern for whenever real course/author imagery ships.
- **`experimental.optimizePackageImports: ["lucide-react"]`** added to
  `next.config.ts` — resolves each of the ~40 icons used app-wide to its
  own module rather than the barrel file.
- Total client JS across all route chunks is ~980KB uncompressed,
  automatically code-split per route by Next/Turbopack — no page loads
  that whole figure, only what it references.

## What we could not verify here

A full Lighthouse run (performance/accessibility/best-practices/SEO
scores) requires a real Chrome binary. This sandbox is `aarch64`
(ARM64) and every Chrome/Chromium build available through
`npx puppeteer browsers install` (`chrome`, `chrome-headless-shell`) is
an `x86-64` binary — it fails immediately with `Exec format error`, and
there's no root access in this sandbox to install a native ARM64
system Chromium via `apt`. Emulation (`qemu-x86_64`/`box64`) isn't
available either.

**Recommendation:** run `npx lighthouse` against the Vercel preview URL
once deployed (any real machine or CI runner works — this is purely a
constraint of the sandboxed build environment, not the app), or add a
Lighthouse CI step to `.github/workflows/ci.yml` targeting the preview
deployment. Given the static-generation baseline above, we'd expect
strong Performance/SEO/Best-Practices scores by default; Accessibility
should also score well given the M1 a11y test coverage, but an
automated audit is the only way to confirm it rather than assume it.
