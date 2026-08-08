"use client";

import * as RadixDropdown from "@radix-ui/react-dropdown-menu";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Dropdown.module.css";

export const Dropdown = RadixDropdown.Root;
export const DropdownTrigger = RadixDropdown.Trigger;
export const DropdownSeparator = () => <RadixDropdown.Separator className={styles.separator} />;
export const DropdownLabel = ({ children }: { children: ReactNode }) => (
  <RadixDropdown.Label className={styles.label}>{children}</RadixDropdown.Label>
);

export function DropdownContent({ className, ...props }: RadixDropdown.DropdownMenuContentProps) {
  return (
    <RadixDropdown.Portal>
      <RadixDropdown.Content
        className={cn(styles.content, className)}
        sideOffset={6}
        align="start"
        {...props}
      />
    </RadixDropdown.Portal>
  );
}

export interface DropdownItemProps extends RadixDropdown.DropdownMenuItemProps {
  destructive?: boolean;
}

export function DropdownItem({ destructive, className, ...props }: DropdownItemProps) {
  return (
    <RadixDropdown.Item
      className={cn(styles.item, destructive && styles.destructive, className)}
      {...props}
    />
  );
}
