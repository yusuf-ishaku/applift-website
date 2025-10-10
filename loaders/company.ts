import { prisma } from "@/lib/prisma";
import { cache } from "react";

export const getAllCompanySlugs = cache(async () => {
  const results = await prisma.user.findMany({
    where: {
      publishedData: true,
      slug: {
        not: null,
      },
    },
    select: {
      slug: true,
      updatedAt: true,
    },
  });
  return results as {
    slug: string;
    updatedAt: Date;
  }[];
});

export async function getTeamMembersList() {
  return await prisma.user.findMany({
    where: {
      publishedData: true,
    },
    select: {
      image: true,
      name: true,
      slug: true,
      work_role: true,
    },
  });
}

export async function getTeamMemberDetails(slug: string) {
  return await prisma.user.findUnique({
    where: {
      publishedData: true,
      slug,
    },
    select: {
      image: true,
      name: true,
      contact_url: true,
      facebook: true,
      linkedin: true,
      twitter: true,
      bio: true,
      slug: true,
      work_role: true,
      blog: {
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
      },
    },
  });
}

export type TeamMemberDetails = NonNullable<
  Awaited<ReturnType<typeof getTeamMemberDetails>>
>;
