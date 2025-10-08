import {
  getUsersDraftedPostsList,
  getUsersPublishedPostsList,
} from "@/actions/blog";
import { getPostComments } from "@/actions/comments";
import { queryOptions } from "@tanstack/react-query";
import type { Comment } from "@prisma-app/client";

// TODO CONVERT TO INFINITE QUERY

export const draftedPostOptions = queryOptions({
  queryKey: ["editor", "drafts"],
  queryFn: async () => getUsersDraftedPostsList(),
});

export const publishedPostOptions = queryOptions({
  queryKey: ["editor", "published"],
  queryFn: async () => getUsersPublishedPostsList(),
});

// --- Mock Data ---
const MOCK_COMMENTS: Comment[] = [
  {
    id: "c1",
    postId: "first-blog-post",
    content: "This is a great article! Very informative.",
    displayName: "Reader123",
    createdAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
    updatedAt: new Date(Date.now() - 86400000 * 2), // 2 days ago
  },
  {
    id: "c2",
    postId: "second-blog-post",
    content: "An excellent breakdown of the topic.",
    displayName: null, // Anonymous comment
    createdAt: new Date(Date.now() - 86400000 * 1.5),
    updatedAt: new Date(Date.now() - 86400000 * 1.5),
  },
  {
    id: "c3",
    postId: "first-blog-post",
    content: "I totally agree with the main point! Keep up the good work.",
    displayName: "HappyGuest",
    createdAt: new Date(Date.now() - 86400000 * 0.5),
    updatedAt: new Date(Date.now() - 86400000 * 0.5),
  },
  {
    id: "c4",
    postId: "first-blog-post",
    content: "Just dropping by to say thank you for the insights.",
    displayName: "SilentObserver",
    createdAt: new Date(), // Just now
    updatedAt: new Date(), // Just now
  },
];

export const commentOptionsFn = (slug: string) => {
  return queryOptions({
    queryKey: ["postComments", slug],
    queryFn: () => MOCK_COMMENTS || getPostComments(slug),
  });
};
