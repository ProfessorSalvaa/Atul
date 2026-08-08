import type { Metadata } from "next";
import { PageHeader } from "@/components/shell/PageHeader";
import { ProfileForm } from "./ProfileForm";

export const metadata: Metadata = {
  title: "Profile",
  robots: { index: false },
};

export default function ProfilePage() {
  return (
    <>
      <PageHeader
        title="Profile"
        description="Internal identity only — no public profile page in V1."
      />
      <ProfileForm />
    </>
  );
}
