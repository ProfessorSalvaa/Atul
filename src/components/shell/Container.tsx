import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import styles from "./Container.module.css";

/** Shared max-width content container for marketing/blog pages. */
export function Container({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return <div className={cn(styles.container, className)} {...props} />;
}
