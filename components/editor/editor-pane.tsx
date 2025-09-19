"use client";

import { deleteBlogPost as deleteFn } from "@/actions/blog";
import { blogCategories } from "@/constants/blog";
import { draftedPostOptions, publishedPostOptions } from "@/lib/query-options";
import type { newBlogSchema } from "@/schemas";
import { useMutation } from "@tanstack/react-query";
import { Loader, Plus, Save, Send, Trash, X } from "lucide-react";
import { memo, useRef, useState } from "react";
import { useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

function EditorPaneComponent() {
  const form = useFormContext<z.infer<typeof newBlogSchema>>();
  const [newTag, setNewTag] = useState("");
  const submitBtn = useRef<HTMLButtonElement>(null);

  const deleteMutation = useMutation({
    mutationFn: deleteFn,
    onMutate: (data) => {
      toast.loading(`Deleting "${form.getValues("title")}"`, {
        id: "id" in data ? data.id : data.slug,
        description: "",
      });
      return { isDraft: !form.getValues("published") };
    },
    onSuccess: async (_, data, ctx, { client }) => {
      toast.success(`Deleted successfully!`, {
        id: "id" in data ? data.id : data.slug,
        description: "",
      });
      form.reset();
      if (ctx) {
        const { queryKey } = ctx.isDraft
          ? draftedPostOptions
          : publishedPostOptions;
        client.setQueryData(queryKey, (posts) =>
          (posts ?? []).filter((post) => {
            if ("id" in data) {
              return post.id != data.id;
            } else {
              return post.slug != data.slug;
            }
          }),
        );
      }
    },
    onError: async (error, data) => {
      const item = form.getValues("published") ? "post" : "draft";
      console.error(`Error deleting ${item}`, error);
      toast.error(`Unable to delete ${item}`, {
        id: "id" in data ? data.id : data.slug,
        description: error.message,
      });
    },
  });

  const postId = useWatch({ control: form.control, name: "id" });

  const addTag = () => {
    const tag = newTag.trim();
    if (tag && !form.getValues("tags")?.includes(tag)) {
      form.setValue("tags", [...(form.getValues("tags") || []), tag]);
      setNewTag("");
    }
  };

  const removeTag = (tag: string) => {
    form.setValue(
      "tags",
      form.getValues("tags")?.filter((t) => t !== tag) || [],
    );
  };

  return (
    <fieldset
      className="space-y-6"
      disabled={deleteMutation.isPending || undefined}
    >
      <button hidden type="submit" ref={submitBtn} />
      {/* Publish card */}
      <Card>
        <CardHeader>
          <CardTitle>Publish</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            type="button"
            variant="outline"
            className="w-full"
            onClick={() => {
              form.setValue("published", false);
              submitBtn.current?.click();
            }}
          >
            <Save className="size-4 mr-2" />
            {postId ? "Convert to draft" : "Save as draft"}
          </Button>
          <Button
            type="button"
            className="w-full"
            onClick={() => {
              form.setValue("published", true);
              submitBtn.current?.click();
            }}
          >
            <Send className="size-4 mr-2" />
            {postId ? "Update" : "Publish"}
          </Button>
          {!postId && (
            <Button
              type="reset"
              className="w-full"
              variant="destructive"
              onClick={() => {
                form.reset();
              }}
            >
              <Loader className="size-4 mr-2" />
              Reset
            </Button>
          )}
          {postId && (
            <Button
              type="button"
              variant="destructive"
              className="w-full"
              onClick={() =>
                // TODO use a dialog to confirm post deletion
                deleteMutation.mutate({
                  id: postId,
                })
              }
            >
              <Trash className="size-4 mr-2" />
              Delete
            </Button>
          )}
        </CardContent>
      </Card>

      {/* Meta (Category + Tags) card */}
      <Card>
        <CardHeader>
          <CardTitle>Meta</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Category */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category *</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {blogCategories.map((cat) => (
                      <SelectItem key={cat} value={cat}>
                        {cat}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Tags */}
          <div>
            <FormLabel>Tags</FormLabel>
            <div className="flex gap-2 mt-2 mb-2">
              <Input
                placeholder="Add a tag"
                value={newTag}
                onChange={(e) => setNewTag(e.target.value)}
                onKeyDown={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addTag())
                }
              />
              <Button variant="outline" size="icon" onClick={addTag}>
                <Plus className="size-4" />
              </Button>
            </div>

            <div className="flex flex-wrap gap-2">
              {form.getValues("tags")?.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <button onClick={() => removeTag(tag)}>
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </fieldset>
  );
}

export const EditorPane = memo(EditorPaneComponent);
