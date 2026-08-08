"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import buttonStyles from "@/components/ui/Button.module.css";
import { cn } from "@/lib/cn";
import { enrollAction } from "@/lib/progress/actions";
import { useToast } from "@/components/shell/ToastHost";

/** Signed-out visitors go to signup. Signed-in, not-yet-enrolled visitors
 *  enroll via a real Server Action. Already-enrolled visitors get a
 *  "Continue" link straight into the lesson player at their resume
 *  point (first incomplete lesson, or the first lesson if none yet). */
export function EnrollCta({
  courseSlug,
  signedIn,
  enrolled,
  resumeHref,
}: {
  courseSlug: string;
  signedIn: boolean;
  enrolled: boolean;
  resumeHref: string;
}) {
  const [submitting, setSubmitting] = useState(false);
  const router = useRouter();
  const { notify } = useToast();

  if (!signedIn) {
    return (
      <Link
        href="/signup"
        className={cn(buttonStyles.button, buttonStyles.primary, buttonStyles.lg)}
      >
        Enroll — sign up free
      </Link>
    );
  }

  if (enrolled) {
    return (
      <Link
        href={resumeHref}
        className={cn(buttonStyles.button, buttonStyles.primary, buttonStyles.lg)}
      >
        Continue learning
      </Link>
    );
  }

  async function handleEnroll() {
    setSubmitting(true);
    const result = await enrollAction(courseSlug);
    setSubmitting(false);
    if (!result.ok) {
      notify({ title: "Couldn't enroll", description: result.error, tone: "error" });
      return;
    }
    router.push(resumeHref);
    router.refresh();
  }

  return (
    <Button size="lg" onClick={handleEnroll} loading={submitting}>
      Enroll now
    </Button>
  );
}
