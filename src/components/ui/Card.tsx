import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Card.module.css";

export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  raised?: boolean;
  interactive?: boolean;
}

export function Card({ raised, interactive, className, ...props }: CardProps) {
  return (
    <div
      className={cn(
        styles.card,
        raised && styles.raised,
        interactive && styles.interactive,
        className,
      )}
      {...props}
    />
  );
}

export function CardHeader({
  title,
  action,
  className,
}: {
  title: ReactNode;
  action?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(styles.header, className)}>
      <h3 className={styles.title}>{title}</h3>
      {action}
    </div>
  );
}

export function CardFooter({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(styles.footer, className)}>{children}</div>;
}
