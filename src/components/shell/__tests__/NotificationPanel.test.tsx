import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { NotificationPanel } from "../NotificationPanel";

describe("NotificationPanel", () => {
  it("shows the P0 §13 empty-state copy when there are no notifications", () => {
    render(<NotificationPanel items={[]} open />);
    expect(screen.getByText("Nothing yet.")).toBeInTheDocument();
  });

  it("renders each notification's title and description when open", () => {
    render(
      <NotificationPanel
        open
        items={[{ id: "n1", title: "Achievement unlocked", description: "You earned a badge." }]}
      />,
    );
    expect(screen.getByText("Achievement unlocked")).toBeInTheDocument();
    expect(screen.getByText("You earned a badge.")).toBeInTheDocument();
  });

  it("shows an unread count badge only when there are unread items", () => {
    const { rerender } = render(
      <NotificationPanel items={[{ id: "n1", title: "A", description: "B", read: false }]} />,
    );
    expect(screen.getByText("1")).toBeInTheDocument();

    rerender(
      <NotificationPanel items={[{ id: "n1", title: "A", description: "B", read: true }]} />,
    );
    expect(screen.queryByText("1")).not.toBeInTheDocument();
  });
});
