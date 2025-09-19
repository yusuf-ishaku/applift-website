import { auth } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { headers } from "next/headers";
import { redirect, unauthorized } from "next/navigation";

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

export async function authenticate() {
  return await auth.api.getSession({
    headers: await headers(),
  });
}

export async function redirectGuests() {
  const session = await authenticate();
  if (!session) redirect("/editor/login");
}

export async function authorize() {
  const session = await authenticate();
  if (!session) unauthorized();
  return session;
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
