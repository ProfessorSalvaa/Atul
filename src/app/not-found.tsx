import Link from "next/link";
import buttonStyles from "@/components/ui/Button.module.css";
import { cn } from "@/lib/cn";

/** On-brand 404 with navigation back to the catalog/dashboard, per P0
 *  §14 — not a generic Next.js not-found page. */
export default function NotFound() {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: "var(--space-4)",
        minHeight: "70vh",
        textAlign: "center",
        padding: "var(--space-6)",
      }}
    >
      <p
        style={{
          margin: 0,
          fontSize: "var(--font-size-display-lg)",
          fontWeight: 600,
          color: "var(--text-primary)",
        }}
      >
        404
      </p>
      <h1
        style={{ margin: 0, fontSize: "var(--font-size-heading-lg)", color: "var(--text-primary)" }}
      >
        We couldn&apos;t find that page
      </h1>
      <p
        style={{ margin: "0 0 var(--space-2)", color: "var(--text-secondary)", maxWidth: "440px" }}
      >
        The page you’re looking for doesn’t exist or may have moved.
      </p>
      <div style={{ display: "flex", gap: "var(--space-3)" }}>
        <Link href="/" className={cn(buttonStyles.button, buttonStyles.outline, buttonStyles.md)}>
          Go home
        </Link>
        <Link
          href="/courses"
          className={cn(buttonStyles.button, buttonStyles.primary, buttonStyles.md)}
        >
          Browse courses
        </Link>
      </div>
    </div>
  );
}
