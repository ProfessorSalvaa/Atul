"use client";

import * as RadixRadioGroup from "@radix-ui/react-radio-group";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Radio.module.css";

export const RadioGroup = RadixRadioGroup.Root;

export interface RadioItemProps extends RadixRadioGroup.RadioGroupItemProps {
  label?: ReactNode;
}

export function RadioItem({ label, className, id, ...props }: RadioItemProps) {
  const autoId = useId();
  const itemId = id ?? autoId;

  const control = (
    <RadixRadioGroup.Item id={itemId} className={cn(styles.item, className)} {...props}>
      <RadixRadioGroup.Indicator className={styles.indicator} />
    </RadixRadioGroup.Item>
  );

  if (!label) return control;

  return (
    <label htmlFor={itemId} className={styles.label}>
      {control}
      {label}
    </label>
  );
}
