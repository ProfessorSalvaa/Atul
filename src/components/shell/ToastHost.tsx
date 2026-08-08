"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import { Toast, ToastProvider, ToastViewport, type ToastTone } from "@/components/ui/Toast";

interface ToastEntry {
  id: number;
  title: string;
  description?: string;
  tone: ToastTone;
}

interface ToastContextValue {
  notify: (input: { title: string; description?: string; tone?: ToastTone }) => void;
}

const ToastContext = createContext<ToastContextValue | null>(null);

let nextId = 1;

/**
 * App-wide imperative toast host — mounted once in the root layout.
 * Wraps M1's Toast primitives (Provider/Viewport/Toast) with a small
 * queue so any client component can call `useToast().notify(...)`
 * instead of managing its own Radix Toast root. M2.5 addition; the
 * primitives themselves are unmodified M1 components.
 */
export function ToastHost({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<ToastEntry[]>([]);

  const notify = useCallback(
    ({
      title,
      description,
      tone = "neutral",
    }: {
      title: string;
      description?: string;
      tone?: ToastTone;
    }) => {
      const id = nextId++;
      setToasts((prev) => [...prev, { id, title, description, tone }]);
    },
    [],
  );

  const value = useMemo(() => ({ notify }), [notify]);

  return (
    <ToastContext.Provider value={value}>
      <ToastProvider swipeDirection="right" duration={4000}>
        {children}
        {toasts.map((t) => (
          <Toast
            key={t.id}
            title={t.title}
            description={t.description}
            tone={t.tone}
            onOpenChange={(open) => {
              if (!open) {
                setToasts((prev) => prev.filter((item) => item.id !== t.id));
              }
            }}
          />
        ))}
        <ToastViewport />
      </ToastProvider>
    </ToastContext.Provider>
  );
}

export function useToast(): ToastContextValue {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within a ToastHost");
  return ctx;
}
