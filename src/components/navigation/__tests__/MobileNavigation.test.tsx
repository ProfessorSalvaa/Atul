import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { expectNoA11yViolations } from "@/test/a11y";
import { Home, Search, Sparkles, User, BookOpen, Settings } from "lucide-react";
import { MobileNavigation, type MobileNavItem } from "../MobileNavigation";

const items: MobileNavItem[] = [
  { id: "home", label: "Home", icon: <Home size={20} />, active: true },
  { id: "learn", label: "Learn", icon: <BookOpen size={20} /> },
  { id: "search", label: "Search", icon: <Search size={20} /> },
  { id: "tutor", label: "Tutor", icon: <Sparkles size={20} /> },
  { id: "profile", label: "Profile", icon: <User size={20} /> },
  { id: "settings", label: "Settings", icon: <Settings size={20} /> },
];

describe("MobileNavigation", () => {
  it("caps rendered items at 5 even when given more", () => {
    render(<MobileNavigation items={items} />);
    expect(screen.getAllByRole("button")).toHaveLength(5);
    expect(screen.queryByText("Settings")).not.toBeInTheDocument();
  });

  it("marks the active item with aria-current", () => {
    render(<MobileNavigation items={items} />);
    expect(screen.getByRole("button", { name: "Home" })).toHaveAttribute("aria-current", "page");
  });

  it("has no accessibility violations", async () => {
    const { container } = render(<MobileNavigation items={items.slice(0, 4)} />);
    await expectNoA11yViolations(container);
  });
});
