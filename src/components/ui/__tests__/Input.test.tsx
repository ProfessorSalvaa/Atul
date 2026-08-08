import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "@/test/a11y";
import { Input } from "../Input";

describe("Input", () => {
  it("associates its label via htmlFor/id", () => {
    render(<Input label="Email" placeholder="you@example.com" />);
    const input = screen.getByLabelText("Email");
    expect(input).toBeInstanceOf(HTMLInputElement);
  });

  it("marks itself invalid and describes the helper text for assistive tech", () => {
    render(<Input label="Email" invalid helperText="That doesn't look like an email." />);
    const input = screen.getByLabelText("Email");
    expect(input).toHaveAttribute("aria-invalid", "true");
    expect(input).toHaveAccessibleDescription("That doesn't look like an email.");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Input label="Email" helperText="We'll never share it." />);
    await expectNoA11yViolations(container);
  });
});
