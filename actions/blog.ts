"use server";

import { prisma } from "@/lib/prisma";
import { authenticate, authorize } from "@/loaders/blogs";
import { newBlogSchema } from "@/schemas";
import { blobToDataURL } from "@/utils/server";
import { redirect, unauthorized } from "next/navigation";
import z from "zod";
import { zfd } from "zod-form-data";

export async function getUsersDraftedPosts() {
  const session = await authenticate();
  if (!session) unauthorized();
  return await prisma.blog.findMany({
    where: {
      authorId: session.user.id,
      published: false,
    },
  });
}

export async function getUsersPublishedPosts() {
  const session = await authenticate();
  if (!session) unauthorized();
  return await prisma.blog.findMany({
    where: {
      authorId: session.user.id,
      published: true,
    },
  });
}

export const deleteBlogPost = z
  .function({
    input: [
      z
        .object({
          id: z.uuid(),
        })
        .or(
          z.object({
            slug: z.string(),
          }),
        ),
    ],
  })
  .implementAsync(async (data) => {
    const session = await authorize();
    const authorId = session.user.id;
    if ("id" in data) {
      await prisma.blog.delete({
        where: {
          id: data.id,
          authorId,
        },
      });
    } else {
      await prisma.blog.delete({
        where: {
          slug: data.slug,
          authorId,
        },
      });
    }
  });

const updateBlogFn = z
  .function({
    input: [
      zfd.formData(
        newBlogSchema.in.extend({
          // require post id
          id: newBlogSchema.in.shape.id.unwrap(),
        }),
      ),
    ],
  })
  .implementAsync(async ({ id, ...update }): Promise<void> => {
    const session = await authorize();
    const authorId = session.user.id;
    await prisma.blog.update({
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
              ? await blobToDataURL(update.coverImage)
              : undefined,
        updatedAt: new Date(),
      },
    });
  });

export async function updateBlog(...args: Parameters<typeof updateBlogFn>) {
  return await updateBlogFn(...args);
}

const publishBlogFn = z
  .function({
    input: [zfd.formData(newBlogSchema)],
  })
  .implementAsync(async (data) => {
    const session = await authorize();
    const authorId = session.user.id;
    const { slug } = await prisma.blog.create({
      data: {
        ...data,
        authorId,
        coverImage:
          typeof data.coverImage === "string"
            ? data.coverImage
            : data.coverImage
              ? await blobToDataURL(data.coverImage)
              : undefined,
      },
    });
    redirect(`/blog/${slug}`);
  });

export async function publishBlog(...args: Parameters<typeof publishBlogFn>) {
  return await publishBlogFn(...args);
}
