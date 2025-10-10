import { inquiryBudget, inquiryHelpWith } from "@/constants";
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
    category: z.enum(blogCategories, {
      error: "Category is required",
    }),
    content: z.string().min(1, "Content is required"),
    tags: z
      .string()
      .array()
      .optional()
      .or(
        z
          .string()
          .transform((str) => [str])
          .optional(),
      ),
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

export const blogSlugFn = z.function({
  input: [
    z.object({
      blogSlug: z.string(),
    }),
  ],
});

export const inquirySchema = z.object({
  helpWith: z
    .enum(inquiryHelpWith)
    .array()
    .min(1, "Please select at least one option"),
  budget: z.enum(inquiryBudget),
  name: z.string().min(1, "Name is required").max(100),
  email: z.email("Invalid email address"),
  overview: z
    .string()
    .min(10, "Project overview should be at least 10 characters"),
});

export const newCommentSchema = z.object({
  postId: z.uuid("Invalid Post ID format."),
  content: z.string().min(3, "Comment must be at least 3 characters long."),
  displayName: z
    .string()
    .trim()
    .max(50)
    .optional()
    .nullable()
    .transform((v) => v ?? null),
});

const baseProfileFields = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  facebook: z.string().nullish(),
  twitter: z.string().nullish(),
  linkedin: z.string().nullish(),
  contact_url: z
    .string()
    .refine(
      (val) =>
        !val ||
        /^\+?\d{1,3}?[-.\s]?\(?\d{2,4}\)?[-.\s]?\d{3,4}[-.\s]?\d{3,4}$/.test(
          val,
        ) ||
        z.url().safeParse(val).success ||
        z.email().safeParse(val).success,
      "Must be a valid phone number, email, or URL",
    )
    .nullish(),
  image: z.url().nullish(),
  bio: z.string().max(2000).nullish(),
  work_role: z.string().min(1, "Role is required"),
});

const noPublishProfile = baseProfileFields.extend({
  publishData: z.literal(false).nullish(),
});
const publishProfile = baseProfileFields
  .extend({
    publishData: z.literal(true),
    contact_url: baseProfileFields.shape.contact_url.unwrap().unwrap(),
    image: baseProfileFields.shape.image.unwrap().unwrap(),
    bio: baseProfileFields.shape.bio.unwrap().unwrap(),
  })
  .refine((data) => !!(data.facebook || data.twitter || data.linkedin), {
    message:
      "To publish your profile, you must include at least one social link.",
    path: ["publishedData"],
  });

export const profileFormSchema = z.discriminatedUnion("publishedData", [
  publishProfile,
  noPublishProfile,
]);

export type ProfileFormValues = z.infer<typeof profileFormSchema>;
