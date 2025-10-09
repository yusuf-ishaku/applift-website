import {
  getUsersDraftedPostsList,
  getUsersPublishedPostsList,
  listUsersPublishBlogPosts,
} from "@/actions/blog";
import { getPostComments } from "@/actions/comments";
import { queryOptions } from "@tanstack/react-query";

// TODO CONVERT TO INFINITE QUERY

export const draftedPostOptions = queryOptions({
  queryKey: ["editor", "drafts"],
  queryFn: async () => getUsersDraftedPostsList(),
});

export const publishedPostOptions = queryOptions({
  queryKey: ["editor", "published"],
  queryFn: async () => getUsersPublishedPostsList(),
});

export const commentOptionsFn = (slug: string) => {
  return queryOptions({
    queryKey: ["postComments", slug],
    queryFn: () => getPostComments(slug),
  });
};

export const myBlogOptions = queryOptions({
  queryKey: ["my-blogs"],
  queryFn: () => listUsersPublishBlogPosts(),
});
