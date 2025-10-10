"use server";

import { prisma } from "@/lib/prisma";
import { profileFormSchema, type ProfileFormValues } from "@/schemas";
import { handleImageUpload } from "@/utils/server";
import { authorizeSession } from ".";
import { revalidatePath } from "next/cache";
import { makeSlug } from "@/utils/client";

export async function updateUserDetails(data: ProfileFormValues) {
  const { firstName, lastName, image, ...parsed } =
    profileFormSchema.parse(data);
  const name = `${firstName} ${lastName}`.trim();
  const slug = makeSlug(name);
  const session = await authorizeSession();
  const imageUpload = await handleImageUpload(image ?? undefined, {
    folder: "users",
    public_id: session.user.id,
    overwrite: true,
  });
  const { blog } = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      ...parsed,
      name,
      slug,
      image: imageUpload?.url,
    },
    include: {
      blog: {
        where: {
          published: true,
        },
        select: {
          slug: true,
        },
      },
    },
  });
  revalidatePath("/sitemap.xml");
  revalidatePath(`/company`);
  revalidatePath(`/company/${slug}`);
  if (!blog.length) return;
  revalidatePath("/blog");
  blog.forEach(({ slug }) => revalidatePath(`/blog/${slug}`));
}
