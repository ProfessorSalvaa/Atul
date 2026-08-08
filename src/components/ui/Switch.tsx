"use client";

import * as RadixSwitch from "@radix-ui/react-switch";
import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Switch.module.css";

export interface SwitchProps extends RadixSwitch.SwitchProps {
  label?: ReactNode;
}

export function Switch({ label, className, id, ...props }: SwitchProps) {
  const autoId = useId();
  const switchId = id ?? autoId;

  const control = (
    <RadixSwitch.Root id={switchId} className={cn(styles.root, className)} {...props}>
      <RadixSwitch.Thumb className={styles.thumb} />
    </RadixSwitch.Root>
  );

  if (!label) return control;

  return (
    <label htmlFor={switchId} className={styles.label}>
      {control}
      {label}
    </label>
  );
}
