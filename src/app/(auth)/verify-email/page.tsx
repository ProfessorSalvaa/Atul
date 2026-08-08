import type { Metadata } from "next";
import { Suspense } from "react";
import { VerifyEmailStatus } from "./VerifyEmailStatus";

export const metadata: Metadata = {
  title: "Verify Email",
  description: "Confirm your Curitiq account email address.",
  robots: { index: false },
};

export default function VerifyEmailPage() {
  return (
    <Suspense>
      <VerifyEmailStatus />
    </Suspense>
  );
}
