import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "@/test/a11y";
import { Flashcard } from "../Flashcard";

describe("Flashcard", () => {
  it("flips on click, updating aria-pressed and the accessible label", () => {
    render(
      <Flashcard front="What is a closure?" back="A function bundled with its lexical scope." />,
    );
    const card = screen.getByRole("button");
    expect(card).toHaveAttribute("aria-pressed", "false");

    fireEvent.click(card);
    expect(card).toHaveAttribute("aria-pressed", "true");
    expect(card.getAttribute("aria-label")).toContain("A function bundled with its lexical scope.");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<Flashcard front="Q" back="A" />);
    await expectNoA11yViolations(container);
  });
});
