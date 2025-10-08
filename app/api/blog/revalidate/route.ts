import { prisma } from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export async function POST() {
  const slugs = await prisma.blog.findMany({
    where: {
      published: true,
    },
    select: {
      slug: true,
    },
  });
  revalidatePath("/blog");
  slugs.forEach(({ slug }) => {
    revalidatePath(`/blog/${slug}`);
  });
  return Response.json({
    message: "All blog posts have been scheduled for revalidation",
  });
}
