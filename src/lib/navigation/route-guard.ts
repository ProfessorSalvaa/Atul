/**
 * Navigation guard placeholder — M2 scope.
 *
 * M2 explicitly excludes authentication ("Do NOT implement authentication").
 * This file exists so the shell has one documented, obvious place for real
 * route protection to plug into once M3 (auth) lands, instead of that logic
 * getting scattered across individual page components later.
 *
 * Today `isProtectedRoute` is data (not a security boundary — nothing calls
 * it to actually block anything), and `requireAuth` is a deliberate no-op.
 * M3 should replace `requireAuth`'s body with a real session check
 * (redirect to /login, preserve the intended destination) and this file's
 * job is done — no other file should need to change.
 */

/** Route prefixes that will require a signed-in session once M3 ships. */
export const PROTECTED_ROUTE_PREFIXES = [
  "/onboarding",
  "/dashboard",
  "/learn",
  "/progress",
  "/achievements",
  "/search",
  "/profile",
  "/settings",
] as const;

export function isProtectedRoute(pathname: string): boolean {
  return PROTECTED_ROUTE_PREFIXES.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`),
  );
}

/**
 * No-op today by design — see file header. Kept async so the eventual real
 * implementation (a server-side session lookup) is a drop-in replacement
 * with no call-site changes.
 */
export async function requireAuth(): Promise<{ authenticated: true } | never> {
  return { authenticated: true };
}
