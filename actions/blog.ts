"use server";

import { prisma } from "@/lib/prisma";
import { inquirySchema, newBlogSchema } from "@/schemas";
import { blobToDataURL } from "@/utils/server";
import z from "zod";
import { zfd } from "zod-form-data";
import { authorize } from ".";

export async function getUsersDraftedPosts() {
  const session = await authorize();
  return await prisma.blog.findMany({
    where: {
      authorId: session.user.id,
      published: false,
    },
  });
}

export async function getUsersPublishedPosts() {
  const session = await authorize();
  return await prisma.blog.findMany({
    where: {
      authorId: session.user.id,
      published: true,
    },
  });
}

export const deleteBlogPostFn = z
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

export async function deleteBlogPost(
  args: Parameters<typeof deleteBlogPostFn>[0],
) {
  return await deleteBlogPostFn(args);
}

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

export async function updateBlog(args: Parameters<typeof updateBlogFn>[0]) {
  return await updateBlogFn(args);
}

const publishBlogFn = z
  .function({
    input: [zfd.formData(newBlogSchema)],
    output: z.custom<{ id: string }>(),
  })
  .implementAsync(async (data) => {
    const session = await authorize();
    const authorId = session.user.id;
    const { id } = await prisma.blog.create({
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
    return { id };
  });

export async function publishBlog(
  args: Parameters<typeof publishBlogFn>[0],
): Promise<ReturnType<typeof publishBlogFn>> {
  return await publishBlogFn(args);
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

const newInquiryFn = z
  .function({
    input: [inquirySchema],
  })
  .implementAsync(async ({helpWith, ...inquiry}) => {
    await prisma.inquiry.create({
      data: { ...inquiry, help_with: helpWith },
    });
  });

export async function makeNewEnquiry(
  args: Parameters<typeof newInquiryFn>[0],
): Promise<ReturnType<typeof newInquiryFn>> {
  return await newInquiryFn(args);
}
