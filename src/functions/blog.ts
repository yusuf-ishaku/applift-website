import { prisma } from "@/lib/prisma";
import { authMiddleware } from "@/middlewares";
import { newBlogSchema } from "@/schemas";
import { blobToDataURL, serializablePost } from "@/utils/server";
import { redirect } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { zodValidator } from "@tanstack/zod-adapter";
import z from "zod";
import { zfd } from "zod-form-data";

export const publishBlog = createServerFn({ method: "POST" })
  .validator(zodValidator(zfd.formData(newBlogSchema)))
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const authorId = context.session.user.id;
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
    throw redirect({
      to: "/blog/$slug",
      params: {
        slug,
      },
    });
  });

export const updateBlog = createServerFn({ method: "POST" })
  .validator(
    zodValidator(
      zfd.formData(
        newBlogSchema.in.extend({
          // require post id
          id: newBlogSchema.in.shape.id.unwrap(),
        }),
      ),
    ),
  )
  .middleware([authMiddleware])
  .handler(async ({ data: { id, ...update }, context }) => {
    const authorId = context.session.user.id;
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

export const getBlogPostBySlug = createServerFn({ method: "POST" })
  .validator(
    zodValidator(
      z.object({
        slug: z.string(),
      }),
    ),
  )
  .handler(async ({ data }) => {
    const post = await prisma.blog.findUniqueOrThrow({
      where: {
        slug: data.slug,
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
    return serializablePost(post);
  });

export const getPostRecommendations = createServerFn({ method: "GET" })
  .validator(
    zodValidator(
      z.object({
        slug: z.string(),
      }),
    ),
  )
  .handler(async ({ data }) => {
    return await prisma.blog.findMany({
      where: {
        NOT: {
          slug: data.slug,
        },
        published: true,
      },
      orderBy: {
        createdAt: "desc",
      },
      take: 3,
      select: {
        coverImage: true,
        title: true,
        createdAt: true,
        category: true,
        id: true,
        slug: true,
        tags: false,
        author: {
          select: {
            name: true,
            image: true,
          },
        },
      },
    });
  });

export const getBlogPostById = createServerFn({ method: "POST" })
  .validator(
    zodValidator(
      z.object({
        id: z.uuid(),
      }),
    ),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const post = await prisma.blog.findUniqueOrThrow({
      where: {
        id: data.id,
        authorId: context.session.user.id,
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
    return serializablePost(post);
  });

export const getUsersPosts = createServerFn({ method: "GET" })
  .middleware([authMiddleware])
  .handler(async ({ context }) => {
    const authorId = context.session.user.id;
    // TODO fetch published, drafted and paginate
    const posts = await prisma.blog.findMany({
      where: {
        authorId,
      },
    });
    return posts.map(serializablePost);
  });

export const deleteBlogPost = createServerFn({ method: "POST" })
  .validator(
    zodValidator(
      z
        .object({
          id: z.uuid(),
        })
        .or(
          z.object({
            slug: z.string(),
          }),
        ),
    ),
  )
  .middleware([authMiddleware])
  .handler(async ({ data, context }) => {
    const authorId = context.session.user.id;
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
