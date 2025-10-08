"use client";

import { commentOptionsFn } from "@/lib/query-options";
import type { Comment } from "@prisma-app/client";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { Loader2 } from "lucide-react"; // Example icon for loading
import { useParams } from "next/navigation";
import { useMemo } from "react";

const CommentItem = ({ comment }: { comment: Comment }) => {
  return (
    <div className="py-4">
      <div className="flex justify-between items-start">
        <p className="font-medium text-[#FAFAFA]">
          {comment.displayName || "Anonymous"}
        </p>
        <time className="text-sm text-gray-400">
          {format(new Date(comment.createdAt), "MMM dd, yyyy")}
        </time>
      </div>
      <p className="mt-2 text-gray-300 whitespace-pre-line">
        {comment.content}
      </p>
    </div>
  );
};

export default function CommentList() {
  const { slug } = useParams<{ slug: string }>();
  const commentOptions = useMemo(() => commentOptionsFn(slug), [slug]);
  const {
    data: comments,
    isLoading,
    isError,
    error,
  } = useQuery(commentOptions);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center p-6">
        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
        Loading comments...
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center text-red-500 p-6">
        Error loading comments: {error.message}
      </div>
    );
  }

  if (!comments?.length) return null;

  return (
    <div className="space-y-6">
      <h3 className="text-xl sm:text-2xl font-semibold text-[#FAFAFA] border-b border-gray-600/40 pb-2">
        Comments ({comments?.length || 0})
      </h3>
      <div className="divide-y divide-gray-600/40">
        {comments.map((comment) => (
          <CommentItem key={comment.id} comment={comment} />
        ))}
      </div>
    </div>
  );
}
