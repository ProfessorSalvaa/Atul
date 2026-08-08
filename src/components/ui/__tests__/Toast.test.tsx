import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "@/test/a11y";
import { Toast, ToastProvider, ToastViewport } from "../Toast";

describe("Toast", () => {
  it("renders title and description with the right tone icon", () => {
    render(
      <ToastProvider>
        <Toast open title="Lesson complete" description="Nice — 3-day streak." tone="success" />
        <ToastViewport />
      </ToastProvider>,
    );
    expect(screen.getByText("Lesson complete")).toBeInTheDocument();
    expect(screen.getByText("Nice — 3-day streak.")).toBeInTheDocument();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(
      <ToastProvider>
        <Toast open title="Lesson complete" tone="success" />
        <ToastViewport />
      </ToastProvider>,
    );
    await expectNoA11yViolations(container);
  });
});
