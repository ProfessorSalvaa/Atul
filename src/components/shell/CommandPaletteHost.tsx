"use client";

import { BookOpen, LayoutDashboard, Search, Settings, Trophy } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchCommandPalette } from "@/components/learning/SearchCommandPalette";
import { useShell } from "./ShellProvider";

/**
 * Global Cmd+K palette (P0 §11: "primary interface... available everywhere
 * once authenticated"). M2 has no real search index yet, so the groups are
 * navigation shortcuts only — the `search.query` API and course/lesson
 * results arrive with the data layer (M5+). The palette component itself
 * (SearchCommandPalette) is unchanged from M1.
 */
export function CommandPaletteHost() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen } = useShell();

  const go = (href: string) => router.push(href);

  return (
    <SearchCommandPalette
      open={commandPaletteOpen}
      onOpenChange={setCommandPaletteOpen}
      placeholder="Search courses, lessons, or jump to a page…"
      groups={[
        {
          heading: "Navigate",
          items: [
            {
              id: "dashboard",
              label: "Go to Dashboard",
              icon: <LayoutDashboard size={15} aria-hidden="true" />,
              onSelect: () => go("/dashboard"),
            },
            {
              id: "learn",
              label: "Go to My Courses",
              icon: <BookOpen size={15} aria-hidden="true" />,
              onSelect: () => go("/learn"),
            },
            {
              id: "catalog",
              label: "Browse Course Catalog",
              icon: <Search size={15} aria-hidden="true" />,
              onSelect: () => go("/courses"),
            },
            {
              id: "achievements",
              label: "Go to Achievements",
              icon: <Trophy size={15} aria-hidden="true" />,
              onSelect: () => go("/achievements"),
            },
            {
              id: "settings",
              label: "Go to Settings",
              icon: <Settings size={15} aria-hidden="true" />,
              onSelect: () => go("/settings"),
            },
          ],
        },
      ]}
    />
  );
}
