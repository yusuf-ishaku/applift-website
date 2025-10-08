"use server";

import { prisma } from "@/lib/prisma"; // Assuming you have a prisma client instance at this path
import { newCommentSchema } from "@/schemas";
import { revalidatePath } from "next/cache";
import { z } from "zod";

export async function createNewComment(
  values: z.infer<typeof newCommentSchema>,
) {
  try {
    const validatedData = newCommentSchema.parse(values);
    const newComment = await prisma.comment.create({
      data: validatedData,
      include: {
        blog: {
          select: { slug: true },
        },
      },
    });
    revalidatePath(`/blog/${newComment.blog.slug}`);
    return newComment;
  } catch (error) {
    console.error("Error creating new comment:", error);
    if (error instanceof z.ZodError) {
      throw new Error("Invalid comment data.");
    }
    throw new Error("Failed to submit comment. Please try again.");
  }
}

export async function getPostComments(slug: string) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId: slug },
      orderBy: { createdAt: "desc" }, // Show oldest first
    });
    return comments;
  } catch (error) {
    console.error(`Error fetching comments for post ${slug}:`, error);
    throw new Error("Failed to load comments.");
  }
}
