import type { Metadata } from "next";
import { ResetPasswordForm } from "./ResetPasswordForm";

export const metadata: Metadata = {
  title: "Reset Password",
  description: "Set a new password for your Curitiq account.",
  robots: { index: false },
};

export default function ResetPasswordPage() {
  return <ResetPasswordForm />;
}
