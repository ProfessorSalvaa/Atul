import type { Metadata } from "next";
import { Container } from "@/components/shell/Container";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Curitiq's privacy policy.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <Container className={styles.wrap}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <div className={styles.prose}>
        <p>
          This is placeholder legal copy for the M2 application shell milestone — a final privacy
          policy will be drafted with counsel before launch, once the real data layer (M5+)
          determines exactly what’s collected.
        </p>
        <h2>What we collect</h2>
        <p>
          Account details you provide (name, email), learning progress, and standard product
          analytics. We don’t sell personal data.
        </p>
        <h2>AI tutor conversations</h2>
        <p>
          Scoped to lesson content per your session; retention and usage policy will be finalized
          alongside the AI layer (roadmap M6).
        </p>
        <h2>Your rights</h2>
        <p>You can export or delete your data anytime from Settings.</p>
      </div>
    </Container>
  );
}
