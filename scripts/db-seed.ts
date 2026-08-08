/**
 * Development database seed.
 *
 * Run with `pnpm db:seed` (loads .env.local, then runs this file
 * directly via Node's native TS support — see the `db:seed` script in
 * package.json). Requires DATABASE_URL to be set, same as the app.
 *
 * This script deliberately does NOT import from src/lib/auth/*,
 * src/lib/db/client.ts, src/lib/env.ts, or src/lib/content/loader.ts —
 * all of those are marked `import "server-only"`, which throws
 * unconditionally outside Next.js's actual server bundler (it only
 * no-ops under the "react-server" resolution condition Next sets). A
 * plain Node script doesn't have that condition, so this file talks to
 * the database and content/ directly instead of reusing app-layer
 * service functions — the schema (src/lib/db/schema.ts) has no such
 * guard and is safe to import.
 *
 * Boundary rule (same as the rest of M3): this script seeds only
 * learner/application state — demo users, enrollments, progress, a quiz
 * attempt, a saved course, preferences. It does NOT create or modify any
 * of the 108 authored courses in content/ — those come from the
 * Content Engine, untouched. It only *reads* two real course slugs from
 * content/courses so the demo enrollments point at lessons that
 * actually exist, discovered at seed-time rather than hardcoded.
 */
import fs from "node:fs";
import path from "node:path";
import bcrypt from "bcryptjs";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import YAML from "yaml";
import * as schema from "../src/lib/db/schema.ts";

const DATABASE_URL = process.env.DATABASE_URL;
if (!DATABASE_URL) {
  console.error(
    "DATABASE_URL is not set. Add it to .env.local (see .env.example) before running `pnpm db:seed`.",
  );
  process.exit(1);
}

const db = drizzle(neon(DATABASE_URL), { schema });

const CONTENT_ROOT = path.join(process.cwd(), "content", "courses");

interface DiscoveredLesson {
  courseSlug: string;
  moduleSlug: string;
  lessonSlug: string;
}

/** Minimal, standalone re-read of course.yaml/module.yaml — intentionally
 *  not the real loader (see file header for why). Only extracts what the
 *  seed needs: a course slug and its first module's first two lessons. */
function discoverLessons(courseSlug: string): DiscoveredLesson[] {
  const courseFile = path.join(CONTENT_ROOT, courseSlug, "course.yaml");
  const course = YAML.parse(fs.readFileSync(courseFile, "utf-8")) as {
    modules: { slug: string; order: number }[];
  };
  const firstModule = course.modules.slice().sort((a, b) => a.order - b.order)[0];
  if (!firstModule) return [];

  const moduleFile = path.join(
    CONTENT_ROOT,
    courseSlug,
    "modules",
    firstModule.slug,
    "module.yaml",
  );
  const mod = YAML.parse(fs.readFileSync(moduleFile, "utf-8")) as {
    lessons: { slug: string; order: number }[];
  };
  return mod.lessons
    .slice()
    .sort((a, b) => a.order - b.order)
    .map((l) => ({ courseSlug, moduleSlug: firstModule.slug, lessonSlug: l.slug }));
}

function discoverCourseSlugs(count: number): string[] {
  if (!fs.existsSync(CONTENT_ROOT)) return [];
  return fs
    .readdirSync(CONTENT_ROOT)
    .filter((entry) => fs.existsSync(path.join(CONTENT_ROOT, entry, "course.yaml")))
    .sort()
    .slice(0, count);
}

async function main() {
  console.log("Seeding development database...");

  const [demoSlugA, demoSlugB] = discoverCourseSlugs(2);
  if (!demoSlugA) {
    console.warn(
      "No courses found under content/courses — seeding users only, no demo enrollments.",
    );
  }

  const passwordHash = await bcrypt.hash("password123", 12);

  const [admin] = await db
    .insert(schema.users)
    .values({
      name: "Curitiq Admin",
      email: "admin@curitiq.dev",
      passwordHash,
      role: "admin",
      plan: "premium",
      emailVerifiedAt: new Date(),
    })
    .onConflictDoNothing({ target: schema.users.email })
    .returning();

  const [learner] = await db
    .insert(schema.users)
    .values({
      name: "Demo Learner",
      email: "learner@curitiq.dev",
      passwordHash,
      role: "user",
      plan: "free",
      headline: "Learning full-stack AI product development",
      emailVerifiedAt: new Date(),
    })
    .onConflictDoNothing({ target: schema.users.email })
    .returning();

  for (const user of [admin, learner].filter((u): u is schema.UserRow => Boolean(u))) {
    await db.insert(schema.userPreferences).values({ userId: user.id }).onConflictDoNothing();
  }

  if (learner && demoSlugA) {
    await db
      .insert(schema.enrollments)
      .values({ userId: learner.id, courseSlug: demoSlugA })
      .onConflictDoNothing();

    const lessons = discoverLessons(demoSlugA);
    if (lessons[0]) {
      await db
        .insert(schema.lessonProgress)
        .values({
          userId: learner.id,
          courseSlug: lessons[0].courseSlug,
          lessonSlug: lessons[0].lessonSlug,
          completedAt: new Date(),
        })
        .onConflictDoNothing();
    }
    if (lessons[1]) {
      await db
        .insert(schema.lessonProgress)
        .values({
          userId: learner.id,
          courseSlug: lessons[1].courseSlug,
          lessonSlug: lessons[1].lessonSlug,
          // Started, not completed — gives the seeded account a
          // realistic "in progress" lesson to resume.
        })
        .onConflictDoNothing();
    }
    if (lessons[0]) {
      await db
        .insert(schema.quizAttempts)
        .values({
          userId: learner.id,
          courseSlug: lessons[0].courseSlug,
          lessonSlug: lessons[0].lessonSlug,
          scorePercent: 100,
          passed: true,
          answers: { demo: "seeded" },
        })
        .onConflictDoNothing();
    }
  }

  if (learner && demoSlugB) {
    await db
      .insert(schema.savedCourses)
      .values({ userId: learner.id, courseSlug: demoSlugB })
      .onConflictDoNothing();
  }

  console.log("Seed complete.");
  console.log("  Admin login:   admin@curitiq.dev / password123");
  console.log("  Learner login: learner@curitiq.dev / password123");
  if (demoSlugA) console.log(`  Demo enrollment: ${demoSlugA}`);
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.error("Seed failed:", err);
    process.exit(1);
  });
