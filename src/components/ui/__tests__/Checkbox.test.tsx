import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import { expectNoA11yViolations } from "@/test/a11y";
import { Checkbox } from "../Checkbox";

describe("Checkbox", () => {
  it("toggles checked state and calls onCheckedChange", () => {
    const onCheckedChange = vi.fn();
    render(<Checkbox label="Send me updates" onCheckedChange={onCheckedChange} />);
    const checkbox = screen.getByRole("checkbox", { name: "Send me updates" });
    expect(checkbox).toHaveAttribute("aria-checked", "false");
    fireEvent.click(checkbox);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Checkbox label="Accept terms" />);
    await expectNoA11yViolations(container);
  });
});
