#!/usr/bin/env node
/**
 * CLI wrapper around src/lib/content/validate.ts.
 * Usage: pnpm content:validate
 * Exits non-zero if any error-level issue is found (warnings don't fail
 * the build, but are printed) — safe to wire into CI as a required check.
 */
import path from "node:path";
import { validateContentTree } from "../src/lib/content/validate.ts";

const contentRoot = path.join(import.meta.dirname, "..", "content");
const issues = validateContentTree(contentRoot);

const errors = issues.filter((i) => i.level === "error");
const warnings = issues.filter((i) => i.level === "warning");

for (const issue of issues) {
  const tag = issue.level === "error" ? "ERROR" : "WARN ";
  console.log(`[${tag}] ${issue.file}: ${issue.message}`);
}

console.log("");
console.log(`content:validate — ${errors.length} error(s), ${warnings.length} warning(s)`);

if (errors.length > 0) {
  process.exit(1);
}
