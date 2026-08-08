import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "@/test/a11y";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../Tabs";

function DemoTabs() {
  return (
    <Tabs defaultValue="overview">
      <TabsList aria-label="Course sections">
        <TabsTrigger value="overview">Overview</TabsTrigger>
        <TabsTrigger value="curriculum">Curriculum</TabsTrigger>
      </TabsList>
      <TabsContent value="overview">Overview content</TabsContent>
      <TabsContent value="curriculum">Curriculum content</TabsContent>
    </Tabs>
  );
}

describe("Tabs", () => {
  it("renders only the active panel's content, and switches on click", async () => {
    const user = userEvent.setup();
    render(<DemoTabs />);
    expect(screen.getByText("Overview content")).toBeVisible();
    expect(screen.queryByText("Curriculum content")).not.toBeInTheDocument();

    await user.click(screen.getByRole("tab", { name: "Curriculum" }));
    expect(screen.getByText("Curriculum content")).toBeVisible();
    expect(screen.queryByText("Overview content")).not.toBeInTheDocument();
  });

  it("supports arrow-key navigation between tabs", async () => {
    const user = userEvent.setup();
    render(<DemoTabs />);
    await user.tab();
    expect(screen.getByRole("tab", { name: "Overview" })).toHaveFocus();
    await user.keyboard("{ArrowRight}");
    expect(screen.getByRole("tab", { name: "Curriculum" })).toHaveFocus();
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<DemoTabs />);
    await expectNoA11yViolations(container);
  });
});
