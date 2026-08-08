import type { Metadata } from "next";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { Card, CardHeader } from "@/components/ui/Card";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Billing Settings",
  robots: { index: false },
};

const INVOICES = [
  { id: "inv_1", date: "Jul 8, 2026", amount: "$19.00", status: "Paid" },
  { id: "inv_2", date: "Jun 8, 2026", amount: "$19.00", status: "Paid" },
  { id: "inv_3", date: "May 8, 2026", amount: "$19.00", status: "Paid" },
];

/** UI only — no `billing.getSubscription`/`billing.createPortalSession`
 *  calls yet (Stripe wiring is a later milestone). */
export default function SettingsBillingPage() {
  return (
    <div className={styles.stack}>
      <Card className={styles.card}>
        <CardHeader title="Current plan" action={<Badge tone="brand">Premium</Badge>} />
        <p className={styles.planDetail}>$19/month · renews Sep 8, 2026</p>
        <div className={styles.actions}>
          <Button variant="outline" size="sm">
            Change plan
          </Button>
          <Button variant="ghost" size="sm">
            Cancel subscription
          </Button>
        </div>
      </Card>

      <Card className={styles.card}>
        <CardHeader title="Payment method" />
        <p className={styles.planDetail}>Visa ending in 4242 · expires 08/28</p>
        <Button variant="outline" size="sm">
          Update payment method
        </Button>
      </Card>

      <Card className={styles.card}>
        <CardHeader title="Invoice history" />
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
