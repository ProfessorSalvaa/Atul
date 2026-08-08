import type { Metadata } from "next";
import { PageHeader } from "@/components/shell/PageHeader";
import { requireAuth } from "@/lib/navigation/route-guard";
import { aggregateLearningStats, getEnrolledCourseSummaries } from "@/lib/progress/summary";
import { ProfileForm } from "./ProfileForm";

export const metadata: Metadata = {
  title: "Profile",
  robots: { index: false },
};

export default async function ProfilePage() {
  const user = await requireAuth("/profile");
  const summaries = await getEnrolledCourseSummaries(user.id);
  const stats = aggregateLearningStats(summaries);

  return (
    <>
      <PageHeader
        title="Profile"
        description="Internal identity only — no public profile page in V1."
      />
      <ProfileForm
        user={{ name: user.name, email: user.email, headline: user.headline ?? "" }}
        stats={{
          coursesCompleted: stats.coursesCompleted,
          hoursLearned: stats.hoursLearned,
          coursesInProgress: stats.coursesInProgress,
          coursesEnrolled: summaries.length,
        }}
      />
    </>
  );
}
