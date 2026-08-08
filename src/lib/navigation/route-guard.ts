/**
 * Route protection (M3).
 *
 * `isProtectedRoute` is the same route-prefix data M2 shipped —
 * `requireAuth` is no longer a no-op. It's a Server Component/Server
 * Action helper: call it at the top of a protected layout or action,
 * and it either returns the signed-in user or redirects to /login
 * (preserving the intended destination via `?redirect=`), so a call
 * site never has to handle the "not authenticated" branch itself.
 */
import "server-only";
import { redirect } from "next/navigation";
import type { UserRow } from "@/lib/db/schema";
import { getCurrentUser } from "@/lib/auth/current-user";

/** Route prefixes that require a signed-in session. */
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

/** Redirects to /login (preserving `redirectTo` as a return-to param) if
 *  no session is present. Otherwise returns the signed-in user row. Call
 *  from a protected layout/page — never from middleware/edge, since it
 *  does a real database lookup. */
export async function requireAuth(redirectTo?: string): Promise<UserRow> {
  const user = await getCurrentUser();
  if (!user) {
    const target = redirectTo ? `/login?redirect=${encodeURIComponent(redirectTo)}` : "/login";
    redirect(target);
  }
  return user;
}

/** Same as requireAuth, but also requires the ADMIN role. Non-admins get
 *  redirected home rather than seeing a bare 403 — there's no public
 *  /admin surface yet (M3 scope), so this exists for the authorization
 *  helper itself to be ready when that surface ships. */
export async function requireAdmin(): Promise<UserRow> {
  const user = await requireAuth();
  if (user.role !== "admin") {
    redirect("/dashboard");
  }
  return user;
}
