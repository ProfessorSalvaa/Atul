import type { Metadata } from "next";
import { Container } from "@/components/shell/Container";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Curitiq's terms of service.",
  alternates: { canonical: "/terms" },
};

export default function TermsPage() {
  return (
    <Container className={styles.wrap}>
      <h1 className={styles.title}>Terms of Service</h1>
      <div className={styles.prose}>
        <p>
          This is placeholder legal copy for the M2 application shell milestone — final terms will
          be drafted with counsel before launch (roadmap M12, launch readiness). The structure below
          reflects what a real terms page will cover.
        </p>
        <h2>1. Accounts</h2>
        <p>
          You’re responsible for maintaining the security of your account and for all activity under
          it.
        </p>
        <h2>2. Subscriptions and billing</h2>
        <p>Premium subscriptions renew automatically until canceled from Settings → Billing.</p>
        <h2>3. Content usage</h2>
        <p>
          Course content is licensed for your personal, non-commercial use. Redistribution isn’t
          permitted.
        </p>
        <h2>4. Termination</h2>
        <p>
          We may suspend accounts that violate these terms; you may delete your account anytime from
          Settings.
        </p>
      </div>
    </Container>
  );
}
