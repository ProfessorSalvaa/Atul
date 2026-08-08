"use client";

import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";

interface ShellContextValue {
  commandPaletteOpen: boolean;
  setCommandPaletteOpen: (open: boolean) => void;
  aiTutorOpen: boolean;
  setAiTutorOpen: (open: boolean) => void;
  notificationsOpen: boolean;
  setNotificationsOpen: (open: boolean) => void;
}

const ShellContext = createContext<ShellContextValue | null>(null);

/**
 * Holds open/closed state for the three global overlay surfaces (command
 * palette, AI tutor, notification panel) and owns the app-wide keyboard
 * shortcut that toggles the command palette. Mounted once in the root
 * layout so any layout/page can open these without prop-drilling.
 */
export function ShellProvider({ children }: { children: ReactNode }) {
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);
  const [aiTutorOpen, setAiTutorOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      const isMeta = event.metaKey || event.ctrlKey;
      if (isMeta && event.key.toLowerCase() === "k") {
        event.preventDefault();
        setCommandPaletteOpen((open) => !open);
      }
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const value = useMemo<ShellContextValue>(
    () => ({
      commandPaletteOpen,
      setCommandPaletteOpen,
      aiTutorOpen,
      setAiTutorOpen,
      notificationsOpen,
      setNotificationsOpen,
    }),
    [commandPaletteOpen, aiTutorOpen, notificationsOpen],
  );

  return <ShellContext.Provider value={value}>{children}</ShellContext.Provider>;
}

export function useShell(): ShellContextValue {
  const ctx = useContext(ShellContext);
  if (!ctx) throw new Error("useShell must be used within a ShellProvider");
  return ctx;
}

/** Closes a single overlay on Escape. Used by components that manage their
 *  own open state instead of going through ShellContext (e.g. Radix
 *  Dialog/Drawer already handle Escape internally, so this is for the
 *  non-Radix overlays like the command palette). */
export function useCloseOnEscape(open: boolean, onClose: () => void) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, onClose]);
}
