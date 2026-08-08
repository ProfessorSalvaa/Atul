import { beforeEach, describe, expect, it } from "vitest";
import type { Database } from "@/lib/db/client";
import { createTestDb } from "@/test/db";
import * as service from "../service";
import { hashToken } from "../tokens";
import { emailVerificationTokens, passwordResetTokens, users } from "@/lib/db/schema";
import { eq } from "drizzle-orm";

describe("auth/service", () => {
  let db: Database;

  beforeEach(async () => {
    db = await createTestDb();
  });

  describe("registerUser", () => {
    it("creates a user with a hashed password and a verification token", async () => {
      const result = await service.registerUser(db, {
        name: "  Ada Lovelace  ",
        email: "Ada@Example.com",
        password: "correct-horse-battery",
      });
      expect(result.ok).toBe(true);
      if (!result.ok) return;

      expect(result.value.user.name).toBe("Ada Lovelace");
      expect(result.value.user.email).toBe("ada@example.com"); // normalized
      expect(result.value.user.passwordHash).not.toBe("correct-horse-battery");
      expect(result.value.user.role).toBe("user");
      expect(result.value.user.plan).toBe("free");
      expect(result.value.user.emailVerifiedAt).toBeNull();
      expect(result.value.verificationToken).toBeTruthy();

      const [tokenRow] = await db
        .select()
        .from(emailVerificationTokens)
        .where(eq(emailVerificationTokens.userId, result.value.user.id));
      expect(tokenRow.tokenHash).toBe(hashToken(result.value.verificationToken));
    });

    it("rejects duplicate emails (case-insensitively)", async () => {
      await service.registerUser(db, {
        name: "First",
        email: "dup@example.com",
        password: "a-strong-password",
      });
      const second = await service.registerUser(db, {
        name: "Second",
        email: "DUP@example.com",
        password: "another-strong-password",
      });
      expect(second.ok).toBe(false);
      if (second.ok) return;
      expect(second.error).toMatch(/already exists/i);
    });

    it("rejects a weak password", async () => {
      const result = await service.registerUser(db, {
        name: "Weak",
        email: "weak@example.com",
        password: "short",
      });
      expect(result.ok).toBe(false);
    });

    it("rejects an invalid email", async () => {
      const result = await service.registerUser(db, {
        name: "Bad Email",
        email: "not-an-email",
        password: "a-strong-password",
      });
      expect(result.ok).toBe(false);
    });
  });

  describe("verifyPasswordForLogin", () => {
    it("succeeds with correct credentials", async () => {
      await service.registerUser(db, {
        name: "Grace Hopper",
        email: "grace@example.com",
        password: "compile-the-code",
      });
      const result = await service.verifyPasswordForLogin(
        db,
        "grace@example.com",
        "compile-the-code",
      );
      expect(result.ok).toBe(true);
    });

    it("fails with the wrong password", async () => {
      await service.registerUser(db, {
        name: "Grace Hopper",
        email: "grace2@example.com",
        password: "compile-the-code",
      });
      const result = await service.verifyPasswordForLogin(
        db,
        "grace2@example.com",
        "wrong-password",
      );
      expect(result.ok).toBe(false);
    });

    it("fails for a nonexistent email without revealing that distinction", async () => {
      const result = await service.verifyPasswordForLogin(
        db,
        "nobody@example.com",
        "whatever-password",
      );
      expect(result.ok).toBe(false);
      if (result.ok) return;
      expect(result.error).toBe("Incorrect email or password.");
    });
  });

  describe("email verification", () => {
    it("marks the user verified and consumes the token", async () => {
      const reg = await service.registerUser(db, {
        name: "Verify Me",
        email: "verify@example.com",
        password: "a-strong-password",
      });
      if (!reg.ok) throw new Error("setup failed");

      const result = await service.verifyEmailToken(db, reg.value.verificationToken);
      expect(result.ok).toBe(true);

      const [user] = await db.select().from(users).where(eq(users.id, reg.value.user.id));
      expect(user.emailVerifiedAt).not.toBeNull();

      // Reusing the same (now-consumed) token must fail.
      const reused = await service.verifyEmailToken(db, reg.value.verificationToken);
      expect(reused.ok).toBe(false);
    });

    it("rejects a bogus token", async () => {
      const result = await service.verifyEmailToken(db, "not-a-real-token");
      expect(result.ok).toBe(false);
    });
  });

  describe("password reset", () => {
    it("resets the password with a valid token and consumes it", async () => {
      await service.registerUser(db, {
        name: "Reset Me",
        email: "reset@example.com",
        password: "original-password",
      });
      const token = await service.createPasswordResetToken(db, "reset@example.com");
      expect(token).toBeTruthy();

      const result = await service.resetPasswordWithToken(
        db,
        token as string,
        "brand-new-password",
      );
      expect(result.ok).toBe(true);

      const login = await service.verifyPasswordForLogin(
        db,
        "reset@example.com",
        "brand-new-password",
      );
      expect(login.ok).toBe(true);

      const oldLogin = await service.verifyPasswordForLogin(
        db,
        "reset@example.com",
        "original-password",
      );
      expect(oldLogin.ok).toBe(false);

      // Token can't be reused.
      const reused = await service.resetPasswordWithToken(db, token as string, "another-password");
      expect(reused.ok).toBe(false);
    });

    it("returns null (not an error) for an unknown email — anti-enumeration", async () => {
      const token = await service.createPasswordResetToken(db, "unknown@example.com");
      expect(token).toBeNull();
      const [row] = await db.select().from(passwordResetTokens);
      expect(row).toBeUndefined();
    });
  });

  describe("changePassword", () => {
    it("requires the correct current password", async () => {
      const reg = await service.registerUser(db, {
        name: "Change Me",
        email: "change@example.com",
        password: "current-password",
      });
      if (!reg.ok) throw new Error("setup failed");

      const wrong = await service.changePassword(
        db,
        reg.value.user.id,
        "not-current",
        "new-password-1",
      );
      expect(wrong.ok).toBe(false);

      const right = await service.changePassword(
        db,
        reg.value.user.id,
        "current-password",
        "new-password-1",
      );
      expect(right.ok).toBe(true);

      const login = await service.verifyPasswordForLogin(
        db,
        "change@example.com",
        "new-password-1",
      );
      expect(login.ok).toBe(true);
    });
  });

  describe("updateProfile", () => {
    it("updates name/headline without touching verification when email is unchanged", async () => {
      const reg = await service.registerUser(db, {
        name: "Profile Person",
        email: "profile@example.com",
        password: "a-strong-password",
      });
      if (!reg.ok) throw new Error("setup failed");
      await service.verifyEmailToken(db, reg.value.verificationToken);

      const result = await service.updateProfile(db, reg.value.user.id, {
        name: "New Name",
        email: "profile@example.com",
        headline: "Learning things",
      });
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value.emailChanged).toBe(false);
      expect(result.value.user.emailVerifiedAt).not.toBeNull();
    });

    it("resets verification and issues a new token when email changes", async () => {
      const reg = await service.registerUser(db, {
        name: "Email Changer",
        email: "before@example.com",
        password: "a-strong-password",
      });
      if (!reg.ok) throw new Error("setup failed");
      await service.verifyEmailToken(db, reg.value.verificationToken);

      const result = await service.updateProfile(db, reg.value.user.id, {
        name: "Email Changer",
        email: "after@example.com",
      });
      expect(result.ok).toBe(true);
      if (!result.ok) return;
      expect(result.value.emailChanged).toBe(true);
      expect(result.value.user.emailVerifiedAt).toBeNull();
      expect(result.value.verificationToken).toBeTruthy();
    });

    it("rejects an email already used by another account", async () => {
      await service.registerUser(db, {
        name: "Existing",
        email: "taken@example.com",
        password: "a-strong-password",
      });
      const reg = await service.registerUser(db, {
        name: "Wants Taken Email",
        email: "wants@example.com",
        password: "a-strong-password",
      });
      if (!reg.ok) throw new Error("setup failed");

      const result = await service.updateProfile(db, reg.value.user.id, {
        name: "Wants Taken Email",
        email: "taken@example.com",
      });
      expect(result.ok).toBe(false);
    });
  });

  describe("deleteAccount", () => {
    it("requires the correct password and removes the user", async () => {
      const reg = await service.registerUser(db, {
        name: "Delete Me",
        email: "delete@example.com",
        password: "a-strong-password",
      });
      if (!reg.ok) throw new Error("setup failed");

      const wrong = await service.deleteAccount(db, reg.value.user.id, "not-the-password");
      expect(wrong.ok).toBe(false);

      const right = await service.deleteAccount(db, reg.value.user.id, "a-strong-password");
      expect(right.ok).toBe(true);

      const found = await service.findUserById(db, reg.value.user.id);
      expect(found).toBeUndefined();
    });
  });
});
