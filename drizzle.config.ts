import { defineConfig } from "drizzle-kit";

// Loaded by `drizzle-kit generate` / `drizzle-kit migrate` (pnpm db:generate /
// pnpm db:migrate) — never imported by the app itself. Reads DATABASE_URL
// directly from process.env (no getEnv() here — drizzle-kit is a standalone
// CLI, not a Next.js request) and fails loudly if it's missing, which is
// the correct behavior for a migration tool.
if (!process.env.DATABASE_URL) {
  throw new Error(
    "DATABASE_URL is required to run drizzle-kit. Set it in .env.local (see .env.example).",
  );
}

export default defineConfig({
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL,
  },
  strict: true,
  verbose: true,
});
