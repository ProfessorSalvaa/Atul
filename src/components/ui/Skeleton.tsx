import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import styles from "./Skeleton.module.css";

export interface SkeletonProps extends HTMLAttributes<HTMLDivElement> {
  width?: number | string;
  height?: number | string;
  circle?: boolean;
}

export function Skeleton({
  width,
  height = 16,
  circle,
  className,
  style,
  ...props
}: SkeletonProps) {
  return (
    <div
      aria-hidden="true"
      className={cn(styles.skeleton, className)}
      style={{
        width,
        height,
        borderRadius: circle ? "var(--radius-full)" : undefined,
        ...style,
      }}
      {...props}
    />
  );
}
