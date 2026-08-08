import { beforeEach, describe, expect, it } from "vitest";
import type { Database } from "@/lib/db/client";
import { createTestDb } from "@/test/db";
import * as authService from "@/lib/auth/service";
import { DEFAULT_PREFERENCES, getPreferences, setPreference } from "../service";

describe("preferences/service", () => {
  let db: Database;

  beforeEach(async () => {
    db = await createTestDb();
  });

  it("returns defaults for a user with no preferences row yet", async () => {
    const reg = await authService.registerUser(db, {
      name: "Prefs Person",
      email: "prefs@example.com",
      password: "a-strong-password",
    });
    if (!reg.ok) throw new Error("setup failed");

    const prefs = await getPreferences(db, reg.value.user.id);
    expect(prefs).toEqual(DEFAULT_PREFERENCES);
  });

  it("creates the row lazily on first write and persists just that field", async () => {
    const reg = await authService.registerUser(db, {
      name: "Prefs Person 2",
      email: "prefs2@example.com",
      password: "a-strong-password",
    });
    if (!reg.ok) throw new Error("setup failed");

    await setPreference(db, reg.value.user.id, "notifyAchievement", false);
    const prefs = await getPreferences(db, reg.value.user.id);
    expect(prefs.notifyAchievement).toBe(false);
    // Untouched fields keep their defaults.
    expect(prefs.emailBilling).toBe(true);

    await setPreference(db, reg.value.user.id, "emailBilling", false);
    const updated = await getPreferences(db, reg.value.user.id);
    expect(updated.notifyAchievement).toBe(false);
    expect(updated.emailBilling).toBe(false);
  });
});
