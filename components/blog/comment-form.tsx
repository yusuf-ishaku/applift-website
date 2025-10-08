"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createNewComment } from "@/actions/comments";
import { Button } from "../ui/button"; // ShadCN Button
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"; // ShadCN Form components
import { Textarea } from "../ui/textarea"; // ShadCN Textarea
import { Input } from "../ui/input"; // ShadCN Input
import { newCommentSchema } from "@/schemas";
import { useParams } from "next/navigation";
import { commentOptionsFn } from "@/lib/query-options";
import { useMemo } from "react";
import type { Comment } from "@prisma-app/client";

const toastId = "comment-form-toast";

export default function CommentForm({ postId }: { postId: string }) {
  const queryClient = useQueryClient();
  const form = useForm<
    z.input<typeof newCommentSchema>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    z.output<typeof newCommentSchema>
  >({
    resolver: zodResolver(newCommentSchema),
    defaultValues: {
      postId,
      content: "",
      displayName: "",
    },
  });

  const { slug } = useParams<{ slug: string }>();
  const commentOptions = useMemo(() => commentOptionsFn(slug), [slug]);

  const { mutate, isPending } = useMutation({
    mutationFn: createNewComment,

    onMutate: async (newComment: z.output<typeof newCommentSchema>) => {
      await queryClient.cancelQueries({ queryKey: commentOptions.queryKey });

      const previousComments = queryClient.getQueryData(
        commentOptions.queryKey,
      );

      const now = new Date();
      const tempId = now.toString(); // Use a temp ID for the optimistic item
      const newOptimisticComment: Comment = {
        id: tempId,
        postId: newComment.postId,
        content: newComment.content,
        displayName: newComment.displayName || "Anonymous",
        createdAt: now,
        updatedAt: now,
      };

      if (previousComments) {
        queryClient.setQueryData(commentOptions.queryKey, (old) => [
          newOptimisticComment,
          ...(old || []), // Assuming you want new comments at the top
        ]);
      }
      toast.loading("Submitting comment...", { id: toastId });
      return { previousComments, newOptimisticComment };
    },

    onError: (error, _variables, context) => {
      if (context?.previousComments) {
        queryClient.setQueryData(
          commentOptions.queryKey,
          context.previousComments,
        );
      } else {
        queryClient.setQueryData(commentOptions.queryKey, (old) =>
          old?.filter((c) => c.id !== context?.newOptimisticComment.id),
        );
      }

      toast.error(error.message || "Failed to post comment. Try again.", {
        id: toastId,
      });
      console.error("Error submitting comment", error);
    },

    onSuccess: (data, _variables, context) => {
      queryClient.setQueryData(commentOptions.queryKey, (old) => {
        const oldList = old || [];
        const listWithoutTemp = oldList.filter(
          (c) => c.id !== context?.newOptimisticComment.id,
        );
        return [
          data, // The new, real comment from the server
          ...listWithoutTemp,
        ];
      });

      form.reset();
      toast.success("Comment posted! Thank you.", { id: toastId });
    },
  });
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit((values) => mutate(values))}
        className="space-y-4"
      >
        <fieldset disabled={isPending}>
          <div className="flex flex-col gap-4">
            {/* Display Name (Optional for Anonymous) */}
            <FormField
              control={form.control}
              name="postId"
              render={() => (
                <FormItem>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="displayName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Display Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Display Name (Optional, defaults to 'Anonymous')"
                      {...field}
                      value={field.value || ""} // Ensure controlled component works with optional/null
                      className="rounded-lg"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            {/* Comment Content (Main Field) */}
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Your Comment</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Share your thoughts..."
                      rows={4}
                      {...field}
                      className="w-full rounded-lg resize-y"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <Button type="submit" className="mt-4 w-full" disabled={isPending}>
            {isPending ? "Posting..." : "Post Comment"}
          </Button>
        </fieldset>
      </form>
    </Form>
  );
}
