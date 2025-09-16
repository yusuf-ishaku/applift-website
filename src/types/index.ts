import type { Blog, User } from "@prisma-app/client";

export type BlogPost = Omit<Blog, "tags"> & {
  author: Pick<User, "name" | "image">;
  tags: undefined | string[];
};
