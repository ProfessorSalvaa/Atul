"use client";

import * as RadixTabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/cn";
import styles from "./Tabs.module.css";

export const Tabs = RadixTabs.Root;

export function TabsList({ className, ...props }: RadixTabs.TabsListProps) {
  return <RadixTabs.List className={cn(styles.list, className)} {...props} />;
}

export function TabsTrigger({ className, ...props }: RadixTabs.TabsTriggerProps) {
  return <RadixTabs.Trigger className={cn(styles.trigger, className)} {...props} />;
}

export function TabsContent({ className, ...props }: RadixTabs.TabsContentProps) {
  return <RadixTabs.Content className={cn(styles.content, className)} {...props} />;
}
