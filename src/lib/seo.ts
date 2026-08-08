/**
 * Central SEO constants — one source of truth for the canonical site origin
 * so metadataBase, sitemap.ts, robots.ts, and any generateMetadata() calls
 * can't drift out of sync with each other.
 *
 * Falls back to a placeholder production domain when NEXT_PUBLIC_APP_URL
 * isn't set (e.g. local dev without .env.local) — DEPLOYMENT.md documents
 * setting the real value once the domain is live (roadmap M4/M10).
 */
export const SITE_URL =
  process.env.NEXT_PUBLIC_APP_URL?.replace(/\/$/, "") ?? "https://curitiq.com";

/** Route prefixes excluded from indexing — matches P0 §18: everything
 *  under authenticated routes is noindex. */
export const NOINDEX_ROUTE_PREFIXES = [
  "/onboarding",
  "/dashboard",
  "/learn",
  "/progress",
  "/achievements",
  "/search",
  "/profile",
  "/settings",
] as const;
