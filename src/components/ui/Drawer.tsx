"use client";

import * as RadixDialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Drawer.module.css";

export interface DrawerProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger?: ReactNode;
  title: string;
  side?: "left" | "right";
  children?: ReactNode;
  className?: string;
}

export function Drawer({
  open,
  onOpenChange,
  trigger,
  title,
  side = "right",
  children,
  className,
}: DrawerProps) {
  return (
    <RadixDialog.Root open={open} onOpenChange={onOpenChange}>
      {trigger && <RadixDialog.Trigger asChild>{trigger}</RadixDialog.Trigger>}
      <RadixDialog.Portal>
        <RadixDialog.Overlay className={styles.overlay} />
        <RadixDialog.Content data-side={side} className={cn(styles.content, className)}>
          <div className={styles.header}>
            <RadixDialog.Title className={styles.title}>{title}</RadixDialog.Title>
            <RadixDialog.Close asChild>
              <button type="button" className={styles.close} aria-label="Close">
                <X size={16} />
              </button>
            </RadixDialog.Close>
          </div>
          <div className={styles.body}>{children}</div>
        </RadixDialog.Content>
      </RadixDialog.Portal>
    </RadixDialog.Root>
  );
}
