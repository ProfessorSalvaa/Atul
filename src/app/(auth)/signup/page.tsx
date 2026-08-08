import type { Metadata } from "next";
import { SignupForm } from "./SignupForm";

export const metadata: Metadata = {
  title: "Sign Up",
  description: "Create your Curitiq account and start learning for free.",
  robots: { index: false },
};

export default function SignupPage() {
  return <SignupForm />;
}
