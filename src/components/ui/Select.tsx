"use client";

import * as RadixSelect from "@radix-ui/react-select";
import { Check, ChevronDown } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Select.module.css";

export interface SelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface SelectProps {
  options: SelectOption[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  "aria-label"?: string;
  className?: string;
}

export function Select({
  options,
  value,
  defaultValue,
  onValueChange,
  placeholder = "Select…",
  disabled,
  name,
  className,
  ...aria
}: SelectProps) {
  return (
    <RadixSelect.Root
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      disabled={disabled}
      name={name}
    >
      <RadixSelect.Trigger
        className={cn(styles.trigger, className)}
        aria-label={aria["aria-label"]}
      >
        <RadixSelect.Value placeholder={placeholder} />
        <RadixSelect.Icon className={styles.icon}>
          <ChevronDown size={16} />
        </RadixSelect.Icon>
      </RadixSelect.Trigger>
      <RadixSelect.Portal>
        <RadixSelect.Content className={styles.content} position="popper" sideOffset={4}>
          <RadixSelect.Viewport className={styles.viewport}>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </SelectItem>
            ))}
          </RadixSelect.Viewport>
        </RadixSelect.Content>
      </RadixSelect.Portal>
    </RadixSelect.Root>
  );
}

function SelectItem({
  value,
  disabled,
  children,
}: {
  value: string;
  disabled?: boolean;
  children: ReactNode;
}) {
  return (
    <RadixSelect.Item value={value} disabled={disabled} className={styles.item}>
      <RadixSelect.ItemText>{children}</RadixSelect.ItemText>
      <RadixSelect.ItemIndicator className={styles.itemIndicator}>
        <Check size={14} />
      </RadixSelect.ItemIndicator>
    </RadixSelect.Item>
  );
}
