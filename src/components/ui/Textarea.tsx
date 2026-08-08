import { forwardRef, type TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";
import styles from "./Textarea.module.css";

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  invalid?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(function Textarea(
  { invalid, className, ...props },
  ref,
) {
  return (
    <textarea
      ref={ref}
      aria-invalid={invalid || undefined}
      className={cn(styles.textarea, className)}
      {...props}
    />
  );
});
