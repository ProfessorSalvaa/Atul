import { Loader2 } from "lucide-react";
import { cn } from "@/lib/cn";
import styles from "./Spinner.module.css";

export interface SpinnerProps {
  size?: number;
  brand?: boolean;
  label?: string;
  className?: string;
}

export function Spinner({ size = 20, brand = false, label = "Loading", className }: SpinnerProps) {
  return (
    <span role="status" aria-label={label}>
      <Loader2 size={size} className={cn(styles.spinner, brand && styles.brand, className)} />
    </span>
  );
}
