"use client";

import { useEffect } from "react";
import { ErrorState } from "@/components/ui/ErrorState";
import { Button } from "@/components/ui/Button";

/** Root-level error boundary — must be a Client Component per Next.js
 *  convention. Matches P0 §14: a retry action, not a full-page crash. */
export default function RootError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{ display: "flex", minHeight: "60vh", alignItems: "center", justifyContent: "center" }}
    >
      <ErrorState
        title="Something went wrong"
        description="That didn't load. Try again in a moment."
        action={<Button onClick={reset}>Try again</Button>}
      />
    </div>
  );
}
