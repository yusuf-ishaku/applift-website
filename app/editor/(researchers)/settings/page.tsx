import { ProfileEditForm } from "@/components/profile/profile-edit-form";
import { getUsersDetails } from "@/loaders/user";
import { seo } from "@/utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = seo({
  title: "Edit Profile",
  description:
    "Update your profile information, contact details, and social links on Comm.",
});

export default async function UserSettings() {
  const user = await getUsersDetails();
  return (
    <main className="bg-background py-12 px-4">
      <div className="mx-auto max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-foreground">
            Edit Profile
          </h1>
          <p className="mt-2 text-muted-foreground">
            Update your personal information and social links
          </p>
        </div>
        <ProfileEditForm init={user} />
      </div>
    </main>
  );
}
