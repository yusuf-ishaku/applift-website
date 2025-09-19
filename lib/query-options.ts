import { getUsersDraftedPosts, getUsersPublishedPosts } from "@/actions/blog";
import { queryOptions } from "@tanstack/react-query";

// TODO CONVERT TO INFINITE QUERY

export const draftedPostOptions = queryOptions({
  queryKey: ["editor", "drafts"],
  queryFn: async () => getUsersDraftedPosts(),
});

export const publishedPostOptions = queryOptions({
  queryKey: ["editor", "published"],
  queryFn: async () => getUsersPublishedPosts(),
});
