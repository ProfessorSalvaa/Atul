"use server";

import { revalidatePath } from "next/cache";
import { getDb } from "@/lib/db/client";
import { requireAuth } from "@/lib/navigation/route-guard";
import { setPreference, type PreferenceKey } from "./service";

export type ActionState = { ok: true } | { ok: false; error: string };

export async function updatePreferenceAction(
  key: PreferenceKey,
  value: boolean,
): Promise<ActionState> {
  const user = await requireAuth("/settings/notifications");
  const db = getDb();
  await setPreference(db, user.id, key, value);
  revalidatePath("/settings/notifications");
  return { ok: true };
}
