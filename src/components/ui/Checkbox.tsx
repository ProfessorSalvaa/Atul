"use client";

import * as RadixCheckbox from "@radix-ui/react-checkbox";
import { Check, Minus } from "lucide-react";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Checkbox.module.css";

export interface CheckboxProps extends RadixCheckbox.CheckboxProps {
  label?: ReactNode;
}

export function Checkbox({ label, className, id, ...props }: CheckboxProps) {
  const autoId = useId();
  const checkboxId = id ?? autoId;

  const control = (
    <RadixCheckbox.Root id={checkboxId} className={cn(styles.root, className)} {...props}>
      <RadixCheckbox.Indicator className={styles.indicator}>
        {props.checked === "indeterminate" ? <Minus size={13} /> : <Check size={13} />}
      </RadixCheckbox.Indicator>
    </RadixCheckbox.Root>
  );

  if (!label) return control;

  return (
    <label htmlFor={checkboxId} className={styles.label}>
      {control}
      {label}
    </label>
  );
}
