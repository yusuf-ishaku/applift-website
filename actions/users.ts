"use server";

import { prisma } from "@/lib/prisma";
import { profileSchema, type ProfileFormValues } from "@/schemas";
import { handleImageUpload } from "@/utils/server";
import { authorizeSession } from ".";
import { revalidatePath } from "next/cache";
import { makeSlug } from "@/utils/client";

export async function updateUserDetails(data: ProfileFormValues) {
  const { firstName, lastName, image, ...parsed } = profileSchema.parse(data);
  const name = `${firstName} ${lastName}`.trim();
  const slug = parsed.publishData ? makeSlug(name) : null;
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
    select: {
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
  if (!blog.length) {
    revalidatePath("/blog");
    blog.forEach(({ slug }) => revalidatePath(`/blog/${slug}`));
  }
  if (slug) {
    return {
      slug,
    };
  }
}
