import { describe, expect, it } from "vitest";
import { isProtectedRoute, requireAuth } from "../route-guard";

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

describe("requireAuth", () => {
  it("is a documented no-op in M2 — always resolves authenticated", async () => {
    await expect(requireAuth()).resolves.toEqual({ authenticated: true });
  });
});
