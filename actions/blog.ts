"use server";

import { prisma } from "@/lib/prisma";
import { inquirySchema, newBlogSchema } from "@/schemas";
import { uploadImageToCloudinary } from "@/utils/server";
import z from "zod";
import { zfd } from "zod-form-data";
import { authorize } from ".";
import { revalidatePath } from "next/cache";

export async function getUsersDraftedPostsList() {
  const session = await authorize();
  return await prisma.blog.findMany({
    where: {
      authorId: session.user.id,
      published: false,
    },
    select: {
      id: true,
      title: true,
    },
  });
}

export async function getUsersPublishedPostsList() {
  const session = await authorize();
  return await prisma.blog.findMany({
    where: {
      authorId: session.user.id,
      published: true,
    },
    select: {
      id: true,
      title: true,
    },
  });
}

const deletePostSchema = z.object({
  id: z.uuid({
    error: "Invalid post id",
  }),
});

export async function deleteBlogPost(postId: z.infer<typeof deletePostSchema>) {
  deletePostSchema.parse(postId);
  const session = await authorize();
  const authorId = session.user.id;
  const { slug } = await prisma.blog.delete({
    where: {
      id: postId.id,
      authorId,
    },
  });
  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

const updateBlogSchema = zfd.formData(
  newBlogSchema.in.extend({
    id: newBlogSchema.in.shape.id.unwrap(), // require post id
  }),
);

export async function updateBlog(formData: FormData) {
  const { id, ...update } = updateBlogSchema.parse(formData);

  const session = await authorize();
  const authorId = session.user.id;

  const { slug } = await prisma.blog.update({
    where: {
      id,
      authorId,
    },
    data: {
      ...update,
      authorId,
      coverImage:
        typeof update.coverImage === "string"
          ? update.coverImage
          : update.coverImage
            ? await uploadImageToCloudinary(update.coverImage)
            : undefined,
      updatedAt: new Date(),
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

export async function publishBlog(formData: FormData) {
  const data = zfd.formData(newBlogSchema).parse(formData);

  const session = await authorize();
  const authorId = session.user.id;

  const { id, slug } = await prisma.blog.create({
    data: {
      ...data,
      authorId,
      coverImage:
        typeof data.coverImage === "string"
          ? data.coverImage
          : data.coverImage
            ? await uploadImageToCloudinary(data.coverImage)
            : undefined,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  return { id };
}

export async function getBlogPostById(postId: string) {
  const session = await authorize();
  return await prisma.blog.findUnique({
    where: {
      id: postId,
      authorId: session.user.id,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
}

export async function makeNewEnquiry(data: z.infer<typeof inquirySchema>) {
  inquirySchema.parse(data);
  await prisma.inquiry.create({
    data: { ...data, help_with: data.helpWith },
  });
}
