import { relations, sql } from "drizzle-orm";
import {
  boolean,
  integer,
  jsonb,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
} from "drizzle-orm/pg-core";

/**
 * M3 database schema — Drizzle ORM, Postgres (Neon).
 *
 * Scope boundary (see docs/database.md for the full writeup): this
 * database stores LEARNER / APPLICATION state only — accounts, sessions,
 * enrollment, progress, attempts, preferences. It does NOT store authored
 * course content (courses/modules/lessons/quizzes) — that remains the
 * Content Engine's job (`content/`, `src/lib/content/`), read from the
 * filesystem at request time. Tables here reference course/lesson content
 * by slug (plain `text`, no foreign key) precisely because the content
 * they point at doesn't live in this database.
 */

// ---------------------------------------------------------------------
// Users
// ---------------------------------------------------------------------

export const userRoleValues = ["user", "admin"] as const;
export type UserRole = (typeof userRoleValues)[number];

export const userPlanValues = ["free", "premium"] as const;
export type UserPlan = (typeof userPlanValues)[number];

export const users = pgTable(
  "users",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    name: text("name").notNull(),
    // Always stored lowercased/trimmed by the auth layer (see
    // src/lib/auth/*) — the unique index below is a plain btree index,
    // not case-insensitive, so normalization happens in application code,
    // not the database.
    email: text("email").notNull(),
    passwordHash: text("password_hash").notNull(),
    emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),
    avatarUrl: text("avatar_url"),
    headline: text("headline"), // "What are you learning?" — profile page field
    role: text("role", { enum: userRoleValues }).notNull().default("user"),
    plan: text("plan", { enum: userPlanValues }).notNull().default("free"),
    createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("users_email_idx").on(table.email)],
);

export type UserRow = typeof users.$inferSelect;
export type NewUserRow = typeof users.$inferInsert;

// ---------------------------------------------------------------------
// Sessions — DB-backed (not JWT), so logout/revocation and cascading
// account deletion are exact, not "wait for token expiry."
// ---------------------------------------------------------------------

export const sessions = pgTable("sessions", {
  // Primary key is the SHA-256 hash of the raw session token that lives
  // in the httpOnly cookie. The raw token is never stored — a DB read
  // alone can't be replayed as a session, only a matching cookie can.
  id: text("id").primaryKey(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type SessionRow = typeof sessions.$inferSelect;

// ---------------------------------------------------------------------
// Email verification + password reset tokens (same shape, separate
// tables so a leaked/expired reset token can never verify an email and
// vice versa).
// ---------------------------------------------------------------------

export const emailVerificationTokens = pgTable("email_verification_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  consumedAt: timestamp("consumed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const passwordResetTokens = pgTable("password_reset_tokens", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  tokenHash: text("token_hash").notNull(),
  expiresAt: timestamp("expires_at", { withTimezone: true }).notNull(),
  consumedAt: timestamp("consumed_at", { withTimezone: true }),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------
// Enrollment + progress (Content Engine boundary: courseSlug/lessonSlug
// are plain text, resolved against content/ at read time — never FKs).
// ---------------------------------------------------------------------

export const enrollments = pgTable(
  "enrollments",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseSlug: text("course_slug").notNull(),
    enrolledAt: timestamp("enrolled_at", { withTimezone: true }).notNull().defaultNow(),
    lastAccessedAt: timestamp("last_accessed_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("enrollments_user_course_idx").on(table.userId, table.courseSlug)],
);

export const lessonProgress = pgTable(
  "lesson_progress",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseSlug: text("course_slug").notNull(),
    lessonSlug: text("lesson_slug").notNull(),
    startedAt: timestamp("started_at", { withTimezone: true }).notNull().defaultNow(),
    completedAt: timestamp("completed_at", { withTimezone: true }),
  },
  (table) => [
    uniqueIndex("lesson_progress_user_course_lesson_idx").on(
      table.userId,
      table.courseSlug,
      table.lessonSlug,
    ),
  ],
);

export const quizAttempts = pgTable("quiz_attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseSlug: text("course_slug").notNull(),
  lessonSlug: text("lesson_slug").notNull(),
  scorePercent: integer("score_percent").notNull(),
  passed: boolean("passed").notNull(),
  answers: jsonb("answers")
    .notNull()
    .default(sql`'{}'::jsonb`),
  attemptedAt: timestamp("attempted_at", { withTimezone: true }).notNull().defaultNow(),
});

/** Course-level final assessments (`src/lib/content/schema/assessment.ts`)
 *  aren't populated in any of the 108 launch courses yet — this table
 *  exists so attempt-tracking is ready the moment one is authored,
 *  without a later schema migration. Same shape as quiz_attempts. */
export const assessmentAttempts = pgTable("assessment_attempts", {
  id: uuid("id").primaryKey().defaultRandom(),
  userId: uuid("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  courseSlug: text("course_slug").notNull(),
  assessmentSlug: text("assessment_slug").notNull(),
  scorePercent: integer("score_percent").notNull(),
  passed: boolean("passed").notNull(),
  answers: jsonb("answers")
    .notNull()
    .default(sql`'{}'::jsonb`),
  attemptedAt: timestamp("attempted_at", { withTimezone: true }).notNull().defaultNow(),
});

export const savedCourses = pgTable(
  "saved_courses",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    userId: uuid("user_id")
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    courseSlug: text("course_slug").notNull(),
    savedAt: timestamp("saved_at", { withTimezone: true }).notNull().defaultNow(),
  },
  (table) => [uniqueIndex("saved_courses_user_course_idx").on(table.userId, table.courseSlug)],
);

// ---------------------------------------------------------------------
// User preferences — one row per user, columns match the notification
// toggles the Settings > Notifications screen already ships (M2.5 UI).
// ---------------------------------------------------------------------

export const userPreferences = pgTable("user_preferences", {
  userId: uuid("user_id")
    .primaryKey()
    .references(() => users.id, { onDelete: "cascade" }),
  notifyAchievement: boolean("notify_achievement").notNull().default(true),
  notifyStreakRisk: boolean("notify_streak_risk").notNull().default(true),
  notifyContentUpdated: boolean("notify_content_updated").notNull().default(false),
  emailWeeklyDigest: boolean("email_weekly_digest").notNull().default(true),
  emailStreakReminder: boolean("email_streak_reminder").notNull().default(true),
  emailBilling: boolean("email_billing").notNull().default(true),
  updatedAt: timestamp("updated_at", { withTimezone: true }).notNull().defaultNow(),
});

// ---------------------------------------------------------------------
// Relations (for query ergonomics — `db.query.users.findFirst({ with: ... })`)
// ---------------------------------------------------------------------

export const usersRelations = relations(users, ({ many, one }) => ({
  sessions: many(sessions),
  enrollments: many(enrollments),
  lessonProgress: many(lessonProgress),
  quizAttempts: many(quizAttempts),
  assessmentAttempts: many(assessmentAttempts),
  savedCourses: many(savedCourses),
  preferences: one(userPreferences, {
    fields: [users.id],
    references: [userPreferences.userId],
  }),
}));

export const sessionsRelations = relations(sessions, ({ one }) => ({
  user: one(users, { fields: [sessions.userId], references: [users.id] }),
}));
