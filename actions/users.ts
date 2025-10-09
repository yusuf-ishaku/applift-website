"use server";

import { profileFormSchema, type ProfileFormValues } from "@/schemas";
import { authorizeSession } from ".";
import { prisma } from "@/lib/prisma";
import { uploadImageToCloudinary } from "@/utils/server";

export async function updateUserDetails(data: ProfileFormValues) {
  const { firstName, lastName, image, ...parsed } =
    profileFormSchema.parse(data);
  const session = await authorizeSession();
  await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      ...parsed,
      image: image?.startsWith("data:")
        ? await uploadImageToCloudinary(image)
        : image,
      name: `${firstName} ${lastName}`.trim(),
    },
  });
}
