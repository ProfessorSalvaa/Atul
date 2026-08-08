import type { Metadata } from "next";
import { OnboardingFlow } from "./OnboardingFlow";

export const metadata: Metadata = {
  title: "Get Started",
  description: "Tell us what you're here to learn.",
  robots: { index: false },
};

export default function OnboardingPage() {
  return <OnboardingFlow />;
}
