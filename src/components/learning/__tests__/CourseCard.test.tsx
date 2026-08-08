import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { CourseCard } from "../CourseCard";

describe("CourseCard", () => {
  it("shows a duration when the user isn't enrolled", () => {
    render(<CourseCard title="Systems Thinking" level="intermediate" durationLabel="4h 20m" />);
    expect(screen.getByText("4h 20m")).toBeInTheDocument();
    expect(screen.queryByText(/%$/)).not.toBeInTheDocument();
  });

  it("shows progress instead of duration once enrolled", () => {
    render(
      <CourseCard
        title="Systems Thinking"
        level="intermediate"
        durationLabel="4h 20m"
        progress={40}
      />,
    );
    expect(screen.getByText("40%")).toBeInTheDocument();
  });

  it("flags premium courses", () => {
    render(<CourseCard title="Advanced AI Tooling" level="advanced" durationLabel="6h" premium />);
    expect(screen.getByText("Premium")).toBeInTheDocument();
  });
});
