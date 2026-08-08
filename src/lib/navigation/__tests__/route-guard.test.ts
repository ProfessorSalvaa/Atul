import { describe, expect, it } from "vitest";
import { isProtectedRoute } from "../route-guard";

// requireAuth/requireAdmin are exercised in src/lib/auth/__tests__ against
// a real (PGlite) database + session cookie, not here — this file stays
// scoped to the pure route-prefix logic that has no I/O.
describe("isProtectedRoute", () => {
  it("matches an exact protected route", () => {
    expect(isProtectedRoute("/dashboard")).toBe(true);
  });

  it("matches a nested path under a protected prefix", () => {
    expect(isProtectedRoute("/settings/billing")).toBe(true);
  });

  it("does not match a public route", () => {
    expect(isProtectedRoute("/courses")).toBe(false);
  });

  it("does not match a public route that merely shares a prefix substring", () => {
    // /learning would be a false positive if the check used startsWith("/learn")
    // without the trailing-slash boundary check.
    expect(isProtectedRoute("/learning")).toBe(false);
  });
});
