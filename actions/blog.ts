"use server";

import { prisma } from "@/lib/prisma";
import { inquirySchema, newBlogSchema } from "@/schemas";
import type { PostPreview } from "@/types";
import { handleImageUpload } from "@/utils/server";
import { waitUntil } from "@vercel/functions";
import { revalidatePath } from "next/cache";
import z from "zod";
import { zfd } from "zod-form-data";
import { authorizeSession } from ".";

export async function getUsersDraftedPostsList() {
  const session = await authorizeSession();
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
  const session = await authorizeSession();
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
  const session = await authorizeSession();
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

  const session = await authorizeSession();
  const authorId = session.user.id;
  const coverImage = await handleImageUpload(update.coverImage, {
    folder: "blog",
    public_id: id,
    overwrite: true,
  });

  const { slug } = await prisma.blog.update({
    where: {
      id,
      authorId,
    },
    data: {
      ...update,
      authorId,
      coverImage: coverImage?.url,
      updatedAt: new Date(),
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);
}

export async function publishBlog(formData: FormData) {
  const data = zfd.formData(newBlogSchema).parse(formData);

  const session = await authorizeSession();
  const authorId = session.user.id;
  const coverImage = await handleImageUpload(data.coverImage, {
    folder: "blog",
  });

  const { id, slug } = await prisma.blog.create({
    data: {
      ...data,
      authorId,
      coverImage: coverImage?.url,
    },
  });

  revalidatePath("/blog");
  revalidatePath(`/blog/${slug}`);

  if (coverImage?.updateId) {
    waitUntil(coverImage.updateId(id));
  }

  return { id };
}

export async function getBlogPostById(postId: string) {
  const session = await authorizeSession();
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

export async function listUsersPublishBlogPosts(): Promise<PostPreview[]> {
  const session = await authorizeSession();
  const posts = await prisma.blog.findMany({
    where: {
      published: true,
      authorId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 9,
    select: {
      coverImage: true,
      title: true,
      createdAt: true,
      category: true,
      id: true,
      slug: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return posts;
}
