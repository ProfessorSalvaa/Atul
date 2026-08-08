import { forwardRef, useId, type InputHTMLAttributes, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Input.module.css";

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, "size"> {
  label?: string;
  helperText?: string;
  invalid?: boolean;
  leadingIcon?: ReactNode;
  trailingIcon?: ReactNode;
  wrapperClassName?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(function Input(
  {
    label,
    helperText,
    invalid = false,
    leadingIcon,
    trailingIcon,
    disabled,
    className,
    wrapperClassName,
    id,
    ...props
  },
  ref,
) {
  const autoId = useId();
  const inputId = id ?? autoId;
  const helperId = helperText ? `${inputId}-helper` : undefined;

  return (
    <div className={styles.field}>
      {label && (
        <label htmlFor={inputId} className={styles.label}>
          {label}
        </label>
      )}
      <div
        className={cn(styles.wrapper, wrapperClassName)}
        data-invalid={invalid || undefined}
        data-disabled={disabled || undefined}
      >
        {leadingIcon && <span className={styles.icon}>{leadingIcon}</span>}
        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          aria-invalid={invalid || undefined}
          aria-describedby={helperId}
          className={cn(styles.input, className)}
          {...props}
        />
        {trailingIcon && <span className={styles.icon}>{trailingIcon}</span>}
      </div>
      {helperText && (
        <span id={helperId} className={styles.helperText} data-invalid={invalid || undefined}>
          {helperText}
        </span>
      )}
    </div>
  );
});
