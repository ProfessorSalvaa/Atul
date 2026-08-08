/**
 * User notification preferences — framework-agnostic DB logic, same
 * split as auth/service.ts and progress/service.ts. One row per user
 * (userPreferences.userId is the PK), created lazily on first write —
 * a signed-up user who never visits Settings > Notifications simply has
 * no row yet, and reads fall back to the schema's column defaults.
 */
import { eq } from "drizzle-orm";
import type { Database } from "@/lib/db/client";
import { userPreferences } from "@/lib/db/schema";

export const preferenceKeys = [
  "notifyAchievement",
  "notifyStreakRisk",
  "notifyContentUpdated",
  "emailWeeklyDigest",
  "emailStreakReminder",
  "emailBilling",
] as const;
export type PreferenceKey = (typeof preferenceKeys)[number];

export const DEFAULT_PREFERENCES: Record<PreferenceKey, boolean> = {
  notifyAchievement: true,
  notifyStreakRisk: true,
  notifyContentUpdated: false,
  emailWeeklyDigest: true,
  emailStreakReminder: true,
  emailBilling: true,
};

export async function getPreferences(
  db: Database,
  userId: string,
): Promise<Record<PreferenceKey, boolean>> {
  const [row] = await db
    .select()
    .from(userPreferences)
    .where(eq(userPreferences.userId, userId))
    .limit(1);
  if (!row) return DEFAULT_PREFERENCES;
  return {
    notifyAchievement: row.notifyAchievement,
    notifyStreakRisk: row.notifyStreakRisk,
    notifyContentUpdated: row.notifyContentUpdated,
    emailWeeklyDigest: row.emailWeeklyDigest,
    emailStreakReminder: row.emailStreakReminder,
    emailBilling: row.emailBilling,
  };
}

export async function setPreference(
  db: Database,
  userId: string,
  key: PreferenceKey,
  value: boolean,
) {
  const existing = await db
    .select({ userId: userPreferences.userId })
    .from(userPreferences)
    .where(eq(userPreferences.userId, userId))
    .limit(1);

  if (existing.length === 0) {
    await db.insert(userPreferences).values({
      userId,
      ...DEFAULT_PREFERENCES,
      [key]: value,
      updatedAt: new Date(),
    });
    return;
  }

  await db
    .update(userPreferences)
    .set({ [key]: value, updatedAt: new Date() })
    .where(eq(userPreferences.userId, userId));
}
