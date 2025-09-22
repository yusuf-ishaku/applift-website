import type { Blog, User } from "@prisma-app/client";
import type { ReactNode } from "react";

export type BlogPost = Omit<Blog, "tags"> & {
  author: Pick<User, "name" | "image">;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  tags?: any;
};

export type PostPreview = Pick<
  BlogPost,
  "coverImage" | "title" | "createdAt" | "category" | "id"
> &
  Partial<Pick<BlogPost, "slug" | "author">>;

export type ParentProps = {
  children: ReactNode;
};
