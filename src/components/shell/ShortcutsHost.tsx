"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Modal } from "@/components/ui/Modal";
import { useShell } from "./ShellProvider";
import styles from "./ShortcutsHost.module.css";

const GO_TO: Record<string, { path: string; label: string }> = {
  d: { path: "/dashboard", label: "Dashboard" },
  l: { path: "/learn", label: "My Learning" },
  p: { path: "/progress", label: "Progress" },
  a: { path: "/achievements", label: "Achievements" },
  s: { path: "/settings", label: "Settings" },
  h: { path: "/", label: "Home" },
};

function isTypingTarget(target: EventTarget | null): boolean {
  if (!(target instanceof HTMLElement)) return false;
  const tag = target.tagName;
  return tag === "INPUT" || tag === "TEXTAREA" || target.isContentEditable;
}

/**
 * Global keyboard-shortcut layer, mounted once in the root layout.
 * - `?` opens a reference overlay of every shortcut.
 * - `g` then a letter jumps to a top-level section (Gmail/Linear-style
 *   chord), skipped entirely while typing in a field or when another
 *   overlay (command palette, modal) already owns keyboard focus.
 * M2.5 addition — UI/navigation only, no data dependency.
 */
export function ShortcutsHost() {
  const [helpOpen, setHelpOpen] = useState(false);
  const { commandPaletteOpen, aiTutorOpen } = useShell();
  const router = useRouter();
  const pendingG = useRef(false);
  const pendingTimeout = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (isTypingTarget(event.target)) return;
      if (commandPaletteOpen || aiTutorOpen) return;
      if (event.metaKey || event.ctrlKey || event.altKey) return;

      if (pendingG.current) {
        pendingG.current = false;
        clearTimeout(pendingTimeout.current);
        const target = GO_TO[event.key.toLowerCase()];
        if (target) {
          event.preventDefault();
          router.push(target.path);
        }
        return;
      }

      if (event.key.toLowerCase() === "g") {
        pendingG.current = true;
        pendingTimeout.current = setTimeout(() => {
          pendingG.current = false;
        }, 600);
        return;
      }

      if (event.key === "?") {
        event.preventDefault();
        setHelpOpen((open) => !open);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      clearTimeout(pendingTimeout.current);
    };
  }, [commandPaletteOpen, aiTutorOpen, router]);

  return (
    <Modal
      open={helpOpen}
      onOpenChange={setHelpOpen}
      title="Keyboard shortcuts"
      description="Curitiq is fully navigable without a mouse."
    >
      <dl className={styles.list}>
        <div className={styles.row}>
          <dt className={styles.keys}>
            <kbd className={styles.kbd}>⌘</kbd>
            <kbd className={styles.kbd}>K</kbd>
          </dt>
          <dd className={styles.desc}>Open search / command palette</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.keys}>
            <kbd className={styles.kbd}>?</kbd>
          </dt>
          <dd className={styles.desc}>Show this shortcuts panel</dd>
        </div>
        <div className={styles.row}>
          <dt className={styles.keys}>
            <kbd className={styles.kbd}>Esc</kbd>
          </dt>
          <dd className={styles.desc}>Close any open overlay</dd>
        </div>
        {Object.entries(GO_TO).map(([key, { label }]) => (
          <div className={styles.row} key={key}>
            <dt className={styles.keys}>
              <kbd className={styles.kbd}>G</kbd>
              <kbd className={styles.kbd}>{key.toUpperCase()}</kbd>
            </dt>
            <dd className={styles.desc}>Go to {label}</dd>
          </div>
        ))}
      </dl>
    </Modal>
  );
}
