"use client";

import { Command } from "cmdk";
import { Search } from "lucide-react";
import type { ReactNode } from "react";
import styles from "./SearchCommandPalette.module.css";

export interface CommandPaletteGroup {
  heading: string;
  items: { id: string; label: string; icon?: ReactNode; onSelect: () => void }[];
}

export interface SearchCommandPaletteProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  groups: CommandPaletteGroup[];
  placeholder?: string;
}

export function SearchCommandPalette({
  open,
  onOpenChange,
  groups,
  placeholder = "Search courses, lessons…",
}: SearchCommandPaletteProps) {
  if (!open) return null;

  return (
    <>
      <div className={styles.overlay} onClick={() => onOpenChange(false)} />
      <div className={styles.content}>
        <Command className={styles.command} label="Search Curitiq" shouldFilter>
          <div className={styles.inputRow}>
            <Search size={16} className={styles.inputIcon} aria-hidden="true" />
            <Command.Input autoFocus placeholder={placeholder} className={styles.input} />
          </div>
          <Command.List className={styles.list}>
            <Command.Empty className={styles.empty}>No results found.</Command.Empty>
            {groups.map((group) => (
              <Command.Group key={group.heading} heading={group.heading} className={styles.group}>
                {group.items.map((item) => (
                  <Command.Item
                    key={item.id}
                    className={styles.item}
                    onSelect={() => {
                      item.onSelect();
                      onOpenChange(false);
                    }}
                  >
                    {item.icon}
                    {item.label}
                  </Command.Item>
                ))}
              </Command.Group>
            ))}
          </Command.List>
        </Command>
      </div>
    </>
  );
}
