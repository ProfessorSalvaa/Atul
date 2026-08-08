"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/cn";
import styles from "./CodeBlock.module.css";

export interface CodeBlockProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
  className?: string;
}

/** Presentational code display. No syntax highlighter wired yet — plug one
 *  in (e.g. Shiki) when content pipeline (M4/M5) needs it; the token
 *  contract (monospace font, colors) is already in place either way. */
export function CodeBlock({ code, language, showLineNumbers = true, className }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const lines = code.replace(/\n$/, "").split("\n");

  async function handleCopy() {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  }

  return (
    <div className={cn(styles.wrapper, className)}>
      <div className={styles.header}>
        <span className={styles.lang}>{language ?? "code"}</span>
        <button type="button" className={styles.copyButton} onClick={handleCopy}>
          {copied ? <Check size={13} aria-hidden="true" /> : <Copy size={13} aria-hidden="true" />}
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className={styles.pre}>
        <code style={{ display: "table" }}>
          {lines.map((line, i) => (
            <span className={styles.line} key={i}>
              {showLineNumbers && <span className={styles.lineNumber}>{i + 1}</span>}
              <span className={styles.lineContent}>{line || " "}</span>
            </span>
          ))}
        </code>
      </pre>
    </div>
  );
}
