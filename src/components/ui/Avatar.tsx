import * as RadixAvatar from "@radix-ui/react-avatar";
import { cn } from "@/lib/cn";
import styles from "./Avatar.module.css";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface AvatarProps {
  src?: string;
  alt?: string;
  /** Shown while the image loads or if it's missing — typically initials. */
  fallback: string;
  size?: AvatarSize;
  className?: string;
}

export function Avatar({ src, alt = "", fallback, size = "md", className }: AvatarProps) {
  return (
    <RadixAvatar.Root className={cn(styles.root, styles[size], className)}>
      {src && <RadixAvatar.Image src={src} alt={alt} className={styles.image} />}
      <RadixAvatar.Fallback delayMs={src ? 400 : 0}>{fallback}</RadixAvatar.Fallback>
    </RadixAvatar.Root>
  );
}
