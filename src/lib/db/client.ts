import "server-only";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { getEnv } from "@/lib/env";
import * as schema from "./schema";

export type Database = ReturnType<typeof drizzle<typeof schema>>;

let cached: Database | undefined;

/**
 * Lazily-constructed Drizzle client over Neon's HTTP driver.
 *
 * Neon's HTTP driver (`@neondatabase/serverless` + `drizzle-orm/neon-http`)
 * issues each query as a single fetch() call — no persistent TCP
 * connection, no pool to exhaust across serverless invocations. That's
 * what makes it safe to call `getDb()` fresh in every route
 * handler/server action on Vercel without connection-limit issues, and
 * it's why construction here is cheap enough to lazily cache rather than
 * needing a singleton-at-module-load pattern.
 *
 * Deliberately NOT constructed at module load time: importing this file
 * must never throw just because DATABASE_URL isn't set yet (e.g. during
 * `next build`, which imports route modules without executing dynamic
 * ones). The error only surfaces when a request actually tries to touch
 * the database.
 */
export function getDb(): Database {
  if (cached) return cached;
  const { DATABASE_URL } = getEnv();
  const sql = neon(DATABASE_URL);
  cached = drizzle(sql, { schema });
  return cached;
}

export { schema };
