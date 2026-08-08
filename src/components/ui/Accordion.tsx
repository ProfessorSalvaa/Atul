"use client";

import * as RadixAccordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Accordion.module.css";

export const Accordion = RadixAccordion.Root;

export function AccordionItem({ className, ...props }: RadixAccordion.AccordionItemProps) {
  return <RadixAccordion.Item className={cn(styles.item, className)} {...props} />;
}

export function AccordionTrigger({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <RadixAccordion.Header className={styles.header}>
      <RadixAccordion.Trigger className={cn(styles.trigger, className)}>
        {children}
        <ChevronDown size={16} className={styles.chevron} aria-hidden="true" />
      </RadixAccordion.Trigger>
    </RadixAccordion.Header>
  );
}

export function AccordionContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <RadixAccordion.Content className={cn(styles.content, className)}>
      <div className={styles.contentInner}>{children}</div>
    </RadixAccordion.Content>
  );
}
