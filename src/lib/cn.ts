import clsx, { type ClassValue } from "clsx";

/** Class name composer used across the component library. */
export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}
