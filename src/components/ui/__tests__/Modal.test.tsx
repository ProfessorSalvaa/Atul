import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "@/test/a11y";
import { Button } from "../Button";
import { Modal } from "../Modal";

describe("Modal", () => {
  it("opens from its trigger and exposes an accessible title", () => {
    render(
      <Modal
        trigger={<Button>Open</Button>}
        title="Delete lesson?"
        description="This can't be undone."
      >
        <p>Are you sure?</p>
      </Modal>,
    );
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    const dialog = screen.getByRole("dialog", { name: "Delete lesson?" });
    expect(dialog).toBeInTheDocument();
  });

  it("closes via its close button", () => {
    render(
      <Modal trigger={<Button>Open</Button>} title="Delete lesson?">
        <p>Are you sure?</p>
      </Modal>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Open" }));
    fireEvent.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("has no accessibility violations while open", async () => {
    const { container } = render(
      <Modal open title="Delete lesson?" description="This can't be undone.">
        <p>Are you sure?</p>
      </Modal>,
    );
    await expectNoA11yViolations(container);
  });
});
