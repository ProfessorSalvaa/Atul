/**
 * Test-only database factory — a real, in-process Postgres (PGlite,
 * WASM-compiled) with the actual schema applied via the real Drizzle
 * migration in drizzle/. This lets auth/progress tests exercise genuine
 * SQL behavior (unique constraints, cascades, defaults) instead of
 * mocking the query builder, without needing a live Neon connection in
 * CI. Each call returns a fresh, isolated database and registers its
 * own cleanup (`onTestFinished`) so PGlite's WASM memory is released
 * after every test — without this, a test file that creates many
 * instances in sequence (one per `beforeEach`) can accumulate enough
 * unreleased WASM memory to crash the test worker.
 *
 * Cast to `Database` (the neon-http-backed type used everywhere in app
 * code) rather than re-typing every service function generically: the
 * subset of the query builder actually used (select/insert/update/
 * delete/where/returning/limit/orderBy, no `.transaction()`) is
 * structurally identical across Drizzle's Postgres drivers, and this
 * cast is the standard way to test Drizzle code against PGlite.
 */
import { PGlite } from "@electric-sql/pglite";
import { drizzle } from "drizzle-orm/pglite";
import { migrate } from "drizzle-orm/pglite/migrator";
import path from "node:path";
import { onTestFinished } from "vitest";
import * as schema from "@/lib/db/schema";
import type { Database } from "@/lib/db/client";

export async function createTestDb(): Promise<Database> {
  const client = new PGlite();
  onTestFinished(async () => {
    await client.close();
  });
  const db = drizzle(client, { schema });
  await migrate(db, { migrationsFolder: path.resolve(process.cwd(), "drizzle") });
  return db as unknown as Database;
}
