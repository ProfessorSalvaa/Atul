"use client";

import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import { useToast } from "@/components/shell/ToastHost";
import type { UserPlan } from "@/lib/db/schema";
import styles from "./page.module.css";

const INVOICES = [
  { id: "inv_1", date: "Jul 8, 2026", amount: "$19.00", status: "Paid" },
  { id: "inv_2", date: "Jun 8, 2026", amount: "$19.00", status: "Paid" },
  { id: "inv_3", date: "May 8, 2026", amount: "$19.00", status: "Paid" },
  { id: "inv_4", date: "Apr 8, 2026", amount: "$19.00", status: "Paid" },
];

/** `plan` is the real subscription state from the database (M3). No
 *  payment provider is integrated yet — invoice history and the payment
 *  method card below stay illustrative placeholders (labeled as such)
 *  until Stripe wiring ships in a later milestone; the plan badge and
 *  which cards render are real. */
export function SettingsBillingActions({ plan }: { plan: UserPlan }) {
  const { notify } = useToast();

  function notPreview(feature: string) {
    notify({
      title: `${feature} isn't wired up yet`,
      description: "Billing (Stripe) ships in a later milestone.",
      tone: "info",
    });
  }

  if (plan === "free") {
    return (
      <div className={styles.stack}>
        <Card className={styles.card}>
          <CardHeader title="Current plan" action={<Badge tone="neutral">Free</Badge>} />
          <p className={styles.planDetail}>
            You have access to the first module of every premium course, plus full access to all
            free courses.
          </p>
          <div className={styles.actions}>
            <Button variant="outline" size="sm" onClick={() => notPreview("Upgrading")}>
              Upgrade to Premium
            </Button>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className={styles.stack}>
      <Card className={styles.card}>
        <CardHeader title="Current plan" action={<Badge tone="brand">Premium</Badge>} />
        <p className={styles.planDetail}>Full course access, AI Tutor, and certificates.</p>
        <div className={styles.actions}>
          <Button variant="outline" size="sm" onClick={() => notPreview("Plan changes")}>
            Change plan
          </Button>
          <Button variant="ghost" size="sm" onClick={() => notPreview("Cancellation")}>
            Cancel subscription
          </Button>
        </div>
      </Card>

      <Card className={styles.card}>
        <CardHeader title="Payment method" />
        <p className={styles.planDetail}>Preview data — no payment provider connected yet.</p>
        <Button variant="outline" size="sm" onClick={() => notPreview("Payment updates")}>
          Update payment method
        </Button>
      </Card>

      <Card className={styles.card}>
        <CardHeader title="Invoice history" />
        <p className={styles.planDetail}>Preview data — no payment provider connected yet.</p>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {INVOICES.map((inv) => (
              <tr key={inv.id}>
                <td>{inv.date}</td>
                <td>{inv.amount}</td>
                <td>
                  <Badge tone="success">{inv.status}</Badge>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
