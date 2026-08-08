"use client";

import * as RadixToast from "@radix-ui/react-toast";
import { AlertCircle, CheckCircle2, Info, X, AlertTriangle } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Toast.module.css";

export const ToastProvider = RadixToast.Provider;

export function ToastViewport() {
  return <RadixToast.Viewport className={styles.viewport} />;
}

export type ToastTone = "neutral" | "success" | "error" | "warning" | "info";

const toneIcons: Record<ToastTone, typeof Info | null> = {
  neutral: null,
  success: CheckCircle2,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

export interface ToastProps extends RadixToast.ToastProps {
  title: string;
  description?: ReactNode;
  tone?: ToastTone;
}

export function Toast({ title, description, tone = "neutral", className, ...props }: ToastProps) {
  const Icon = toneIcons[tone];
  return (
    <RadixToast.Root className={cn(styles.root, className)} {...props}>
      {Icon && (
        <span className={cn(styles.icon, styles[tone])}>
          <Icon size={18} aria-hidden="true" />
        </span>
      )}
      <div className={styles.body}>
        <RadixToast.Title className={styles.title}>{title}</RadixToast.Title>
        {description && (
          <RadixToast.Description className={styles.description}>
            {description}
          </RadixToast.Description>
        )}
      </div>
      <RadixToast.Close className={styles.close} aria-label="Dismiss">
        <X size={16} />
      </RadixToast.Close>
    </RadixToast.Root>
  );
}
