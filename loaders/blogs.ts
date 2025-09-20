import { prisma } from "@/lib/prisma";

export async function getPostBySlug(slug: string) {
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
        },
      },
    },
  });
}

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

export async function getAllPublishedPostSlugs() {
  return await prisma.blog.findMany({
    where: {
      published: true,
    },
    select: {
      slug: true,
    },
  });
}

export async function listPublishBlogPosts() {
  const posts = await prisma.blog.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 9,
    include: {
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
