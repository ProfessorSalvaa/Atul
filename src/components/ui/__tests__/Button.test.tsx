import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "@/test/a11y";
import { Button } from "../Button";

describe("Button", () => {
  it("renders its label and responds to click", () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Continue</Button>);
    const button = screen.getByRole("button", { name: "Continue" });
    fireEvent.click(button);
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled and non-interactive while loading", () => {
    const onClick = vi.fn();
    render(
      <Button loading onClick={onClick}>
        Save
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Save" });
    expect(button).toBeDisabled();
    expect(button).toHaveAttribute("aria-busy", "true");
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Button variant="primary">Enroll now</Button>);
    await expectNoA11yViolations(container);
  });
});
