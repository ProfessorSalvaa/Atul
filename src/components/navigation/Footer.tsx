import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import styles from "./Footer.module.css";

export interface FooterColumn {
  title: string;
  links: { label: string; href: string }[];
}

export interface FooterProps {
  columns: FooterColumn[];
  bottomLeft?: ReactNode;
  bottomRight?: ReactNode;
  className?: string;
}

export function Footer({ columns, bottomLeft, bottomRight, className }: FooterProps) {
  return (
    <footer className={cn(styles.footer, className)}>
      <div className={styles.grid}>
        {columns.map((column) => (
          <div key={column.title}>
            <p className={styles.columnTitle}>{column.title}</p>
            <ul className={styles.linkList}>
              {column.links.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className={styles.link}>
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className={styles.bottom}>
        <span>{bottomLeft ?? `© ${new Date().getFullYear()} Curitiq`}</span>
        <span>{bottomRight}</span>
      </div>
    </footer>
  );
}
