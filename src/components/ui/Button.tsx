import { Loader2 } from "lucide-react";
import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Button.module.css";

export type ButtonVariant = "primary" | "secondary" | "outline" | "ghost" | "danger";
export type ButtonSize = "sm" | "md" | "lg";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  /** Icon or element rendered before the label. */
  leadingIcon?: ReactNode;
  /** Icon or element rendered after the label. */
  trailingIcon?: ReactNode;
  /** Shows a spinner and disables the button, without shifting layout. */
  loading?: boolean;
  fullWidth?: boolean;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  {
    variant = "primary",
    size = "md",
    leadingIcon,
    trailingIcon,
    loading = false,
    fullWidth = false,
    disabled,
    className,
    children,
    type = "button",
    ...props
  },
  ref,
) {
  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      aria-busy={loading || undefined}
      className={cn(
        styles.button,
        styles[variant],
        styles[size],
        fullWidth && styles.fullWidth,
        className,
      )}
      {...props}
    >
      {loading ? (
        <Loader2 size={size === "sm" ? 14 : 16} className={styles.spinner} aria-hidden="true" />
      ) : (
        leadingIcon
      )}
      {children}
      {!loading && trailingIcon}
    </button>
  );
});
