"use server";

import { prisma } from "@/lib/prisma";
import { profileFormSchema, type ProfileFormValues } from "@/schemas";
import { handleImageUpload } from "@/utils/server";
import { authorizeSession } from ".";

export async function updateUserDetails(data: ProfileFormValues) {
  const { firstName, lastName, image, ...parsed } =
    profileFormSchema.parse(data);
  const session = await authorizeSession();
  const imageUpload = await handleImageUpload(image ?? undefined, {
    folder: "users",
    public_id: session.user.id,
    overwrite: true,
  });
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      ...parsed,
      image: imageUpload?.url,
      name: `${firstName} ${lastName}`.trim(),
    },
  });
}
