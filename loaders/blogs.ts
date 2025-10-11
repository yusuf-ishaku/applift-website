import { prisma } from "@/lib/prisma";
import type { PostPreview } from "@/types";
import { cache } from "react";

export const getPostBySlug = cache(async (slug: string) => {
  return await prisma.blog.findUnique({
    where: {
      slug,
      published: true,
    },
    include: {
      author: {
        select: {
          name: true,
          image: true,
          slug: true,
        },
      },
    },
  });
});

export async function getPostRecommendations({
  authorId,
  slug,
}: {
  slug: string;
  authorId: string;
}) {
  return await prisma.blog.findMany({
    where: {
      NOT: {
        slug,
      },
      published: true,
      authorId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 3,
    include: {
      author: {
        select: {
          image: true,
          name: true,
        },
      },
    },
  });
}

export const getAllPublishedPostSlugs = cache(async function () {
  return await prisma.blog.findMany({
    where: {
      published: true,
    },
    select: {
      slug: true,
      createdAt: true,
      updatedAt: true,
    },
  });
});

export async function listPublishBlogPosts(): Promise<PostPreview[]> {
  const posts = await prisma.blog.findMany({
    where: {
      published: true,
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
