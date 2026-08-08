import { expect } from "vitest";
import { axe } from "vitest-axe";

/** Runs axe-core against a rendered container and fails with the violation
 *  list (not just a boolean) if anything is found. */
export async function expectNoA11yViolations(container: HTMLElement) {
  const results = await axe(container);
  expect(results.violations, JSON.stringify(results.violations, null, 2)).toHaveLength(0);
}
