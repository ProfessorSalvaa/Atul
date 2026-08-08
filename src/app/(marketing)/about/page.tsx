import type { Metadata } from "next";
import { Container } from "@/components/shell/Container";
import styles from "../legal.module.css";

export const metadata: Metadata = {
  title: "About",
  description: "Why Curitiq exists and what it deliberately refuses to be.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <Container className={styles.wrap}>
      <h1 className={styles.title}>About Curitiq</h1>
      <div className={styles.prose}>
        <p>
          Curitiq exists for a simple reason: most learning apps optimize for engagement metrics,
          not actual competence. We think that’s backwards, so we built something that optimizes for
          the second thing and trusts that the first one follows.
        </p>
        <p>
          That shows up in small decisions everywhere — a streak counter that’s a number and a flame
          icon, not a full-width banner shaming you for missing a day. An AI tutor that nudges you
          toward understanding instead of handing over quiz answers. Five flagship courses instead
          of five hundred shallow ones.
        </p>
        <h2>Who it’s for</h2>
        <p>
          People who want real depth in a specific skill — career pivoters building credibility,
          working professionals going deeper on one thing, and self-taught learners who want to see
          mastery accumulate without the noise of leaderboards and social comparison.
        </p>
        <h2>What we’re building toward</h2>
        <p>
          A small number of genuinely excellent courses, a trustworthy AI tutor, and a product that
          respects your evening. That’s the whole plan.
        </p>
      </div>
    </Container>
  );
}
