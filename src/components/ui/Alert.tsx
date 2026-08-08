import { AlertCircle, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import type { HTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Alert.module.css";

export type AlertTone = "neutral" | "success" | "warning" | "error" | "info";

const toneIcons: Record<AlertTone, typeof Info> = {
  neutral: Info,
  success: CheckCircle2,
  warning: AlertTriangle,
  error: AlertCircle,
  info: Info,
};

export interface AlertProps extends Omit<HTMLAttributes<HTMLDivElement>, "title"> {
  tone?: AlertTone;
  title?: ReactNode;
  description?: ReactNode;
}

export function Alert({
  tone = "neutral",
  title,
  description,
  className,
  children,
  ...props
}: AlertProps) {
  const Icon = toneIcons[tone];
  return (
    <div role="alert" className={cn(styles.alert, styles[tone], className)} {...props}>
      <span className={styles.icon}>
        <Icon size={18} aria-hidden="true" />
      </span>
      <div className={styles.body}>
        {title && <p className={styles.title}>{title}</p>}
        {description && <p className={styles.description}>{description}</p>}
        {children}
      </div>
    </div>
  );
}
