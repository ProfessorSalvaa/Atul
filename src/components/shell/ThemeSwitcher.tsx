"use client";

import { Monitor, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { useHasMounted } from "@/hooks/use-has-mounted";
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger } from "@/components/ui/Dropdown";
import styles from "./ThemeSwitcher.module.css";

const OPTIONS = [
  { value: "light", label: "Light", icon: Sun },
  { value: "dark", label: "Dark", icon: Moon },
  { value: "system", label: "System", icon: Monitor },
] as const;

/** Composes the M1 Dropdown primitive — not a new design-system component,
 *  this is app-shell wiring on top of next-themes. */
export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  // Avoid a hydration mismatch: next-themes only knows the resolved theme
  // after mount (it reads localStorage/media query client-side).
  const mounted = useHasMounted();

  const current = OPTIONS.find((o) => o.value === theme) ?? OPTIONS[2];
  const Icon = current.icon;

  return (
    <Dropdown>
      <DropdownTrigger asChild>
        <button
          type="button"
          className={styles.trigger}
          aria-label={`Theme: ${current.label}. Change theme`}
        >
          {mounted ? (
            <Icon size={18} aria-hidden="true" />
          ) : (
            <span className={styles.placeholder} />
          )}
        </button>
      </DropdownTrigger>
      <DropdownContent align="end">
        {OPTIONS.map((option) => {
          const OptionIcon = option.icon;
          return (
            <DropdownItem
              key={option.value}
              onSelect={() => setTheme(option.value)}
              className={styles.item}
              data-selected={mounted && theme === option.value ? "" : undefined}
            >
              <OptionIcon size={15} aria-hidden="true" />
              {option.label}
            </DropdownItem>
          );
        })}
      </DropdownContent>
    </Dropdown>
  );
}
