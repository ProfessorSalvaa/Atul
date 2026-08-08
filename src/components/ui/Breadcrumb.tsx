import { ChevronRight } from "lucide-react";
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Breadcrumb.module.css";

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface BreadcrumbProps {
  items: BreadcrumbItem[];
  /** Renders an href as a link — defaults to a plain anchor. Pass Next's Link for client routing. */
  linkComponent?: (props: { href: string; children: ReactNode; className?: string }) => ReactNode;
  className?: string;
}

export function Breadcrumb({ items, linkComponent, className }: BreadcrumbProps) {
  const Link =
    linkComponent ??
    (({ href, children, className: c }) => (
      <a href={href} className={c}>
        {children}
      </a>
    ));

  return (
    <nav aria-label="Breadcrumb" className={className}>
      <ol className={styles.list}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li key={`${item.label}-${index}`} className={styles.item}>
              {item.href && !isLast ? (
                <Link href={item.href} className={styles.link}>
                  {item.label}
                </Link>
              ) : (
                <span
                  className={cn(isLast && styles.current)}
                  aria-current={isLast ? "page" : undefined}
                >
                  {item.label}
                </span>
              )}
              {!isLast && (
                <span className={styles.separator} aria-hidden="true">
                  <ChevronRight size={14} />
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
