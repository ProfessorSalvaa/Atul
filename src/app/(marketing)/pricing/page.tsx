import { Check } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/Accordion";
import { Badge } from "@/components/ui/Badge";
import buttonStyles from "@/components/ui/Button.module.css";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/shell/Container";
import { cn } from "@/lib/cn";
import { PRICING_FAQ } from "@/lib/sample-data/content";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Pricing",
  description: "One straightforward premium plan. Every course opens its first module for free.",
  alternates: { canonical: "/pricing" },
};

const PREMIUM_FEATURES = [
  "Full access to every course, including advanced tracks",
  "Uncapped (fair-use) AI tutor on every lesson",
  "Cross-course progress tracking and achievements",
  "Course-completion certificates",
  "Priority support",
];

export default function PricingPage() {
  return (
    <Container className={styles.wrap}>
      <div className={styles.header}>
        <h1 className={styles.title}>Simple, honest pricing</h1>
        <p className={styles.subtitle}>
          One premium plan. Every course’s first module is free — enough to genuinely judge the
          teaching quality before you pay for anything.
        </p>
      </div>

      <div className={styles.plans}>
        <Card className={styles.planCard}>
          <p className={styles.planName}>Free</p>
          <p className={styles.planPrice}>$0</p>
          <p className={styles.planPeriod}>forever</p>
          <ul className={styles.featureList}>
            <li>
              <Check size={15} aria-hidden="true" /> First module of every course
            </li>
            <li>
              <Check size={15} aria-hidden="true" /> Basic progress tracking
            </li>
            <li>
              <Check size={15} aria-hidden="true" /> Limited AI tutor usage
            </li>
          </ul>
          <Link
            href="/signup"
            className={cn(
              buttonStyles.button,
              buttonStyles.outline,
              buttonStyles.md,
              styles.planCta,
            )}
          >
            Sign up free
          </Link>
        </Card>

        <Card raised className={cn(styles.planCard, styles.planCardFeatured)}>
          <Badge tone="brand" className={styles.featuredBadge}>
            Most popular
          </Badge>
          <p className={styles.planName}>Premium</p>
          <p className={styles.planPrice}>$19</p>
          <p className={styles.planPeriod}>per month</p>
          <ul className={styles.featureList}>
            {PREMIUM_FEATURES.map((feature) => (
              <li key={feature}>
                <Check size={15} aria-hidden="true" /> {feature}
              </li>
            ))}
          </ul>
          <Link
            href="/signup"
            className={cn(
              buttonStyles.button,
              buttonStyles.primary,
              buttonStyles.md,
              styles.planCta,
            )}
          >
            Start Premium
          </Link>
        </Card>
      </div>

      <div className={styles.faqSection}>
        <h2 className={styles.faqHeading}>Frequently asked questions</h2>
        <Accordion type="single" collapsible className={styles.faqList}>
          {PRICING_FAQ.map((item, i) => (
            <AccordionItem key={item.question} value={`item-${i}`}>
              <AccordionTrigger>{item.question}</AccordionTrigger>
              <AccordionContent>{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </Container>
  );
}
