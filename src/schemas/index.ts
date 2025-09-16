import { blogCategories } from "@/constants/blog";
import { makeSlug } from "@/utils/client";
import z from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB

export const newBlogSchema = z
  .object({
    id: z.uuid().optional(),
    title: z.string().min(1, "Title is required"),
    slug: z.string(),
    excerpt: z.string().max(160).optional(),
    category: z
      .enum(blogCategories, {
        error: "Category is required",
      })
      .catch("Company"),
    content: z.string().min(1, "Content is required"),
    tags: z.string().array().optional(),
    published: z.coerce.boolean<boolean | "true" | "false">(),
    coverImage: z.url().or(
      z
        .instanceof(File)
        .or(z.instanceof(Blob))
        .optional()
        .refine(
          (file) => !file || file.size <= MAX_FILE_SIZE,
          "Image must be less than 5MB",
        )
        .refine(
          (file) => !file || file.type.startsWith("image/"),
          "Only images are supported",
        ),
    ),
  })
  .transform((blog) => ({
    ...blog,
    slug: blog.slug || makeSlug(blog.title),
  }));
export type BlogForm = z.infer<typeof newBlogSchema>;
