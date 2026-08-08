"use client";

import { useState } from "react";
import { AITutorPanel, type AITutorMessage } from "@/components/learning/AITutorPanel";
import { Drawer } from "@/components/ui/Drawer";
import { useShell } from "./ShellProvider";

const PLACEHOLDER_MESSAGES: AITutorMessage[] = [
  {
    id: "welcome",
    role: "assistant",
    content:
      "I'll be able to answer questions about whatever lesson you're on once the AI layer ships (M6). For now this panel is UI only.",
  },
];

/**
 * Slide-over host for AITutorPanel (P0 §10: "persistent slide-over panel,
 * not a dedicated full page"). UI-only per M2 scope — no model wiring, no
 * persistence, input is inert. Built on the existing Drawer primitive so
 * focus trapping / Escape-to-close / overlay come from Radix for free.
 */
export function AITutorHost() {
  const { aiTutorOpen, setAiTutorOpen } = useShell();
  const [inputValue, setInputValue] = useState("");

  return (
    <Drawer open={aiTutorOpen} onOpenChange={setAiTutorOpen} title="AI Tutor" side="right">
      <AITutorPanel
        messages={PLACEHOLDER_MESSAGES}
        inputValue={inputValue}
        onInputChange={setInputValue}
        usageLabel="AI tutor usage caps and real responses ship with M6."
      />
    </Drawer>
  );
}
