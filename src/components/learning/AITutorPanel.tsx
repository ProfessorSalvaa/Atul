import { Send, Sparkles } from "lucide-react";
import type { ReactNode } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { cn } from "@/lib/cn";
import styles from "./AITutorPanel.module.css";

export interface AITutorMessage {
  id: string;
  role: "assistant" | "user";
  content: ReactNode;
}

export interface AITutorPanelProps {
  messages: AITutorMessage[];
  inputValue?: string;
  onInputChange?: (value: string) => void;
  onSend?: () => void;
  usageLabel?: string;
  className?: string;
}

/** Presentational shell only — per M1 scope, no model wiring, no
 *  persistence. Per the locked AI Tutor decision, the eventual data layer
 *  should pass this component only current-lesson content, the previous
 *  lesson summary, and course metadata — never the full knowledge base. */
export function AITutorPanel({
  messages,
  inputValue = "",
  onInputChange,
  onSend,
  usageLabel,
  className,
}: AITutorPanelProps) {
  return (
    <div className={cn(styles.panel, className)}>
      <div className={styles.header}>
        <Sparkles size={16} className={styles.headerIcon} aria-hidden="true" />
        <h3 className={styles.headerTitle}>AI Tutor</h3>
      </div>

      <div className={styles.messages} role="log" aria-live="polite">
        {messages.map((m) => (
          <div key={m.id} className={cn(styles.message, styles[m.role])}>
            {m.content}
          </div>
        ))}
      </div>

      {usageLabel && <p className={styles.usageNote}>{usageLabel}</p>}

      <form
        className={styles.footer}
        onSubmit={(e) => {
          e.preventDefault();
          onSend?.();
        }}
      >
        <Input
          aria-label="Ask the AI tutor"
          placeholder="Ask about this lesson…"
          value={inputValue}
          onChange={(e) => onInputChange?.(e.target.value)}
        />
        <Button type="submit" size="md" aria-label="Send message">
          <Send size={16} aria-hidden="true" />
        </Button>
      </form>
    </div>
  );
}
