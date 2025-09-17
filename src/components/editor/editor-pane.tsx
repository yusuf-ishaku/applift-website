import { blogCategories } from "@/constants/blog";
import type { newBlogSchema } from "@/schemas";
import { Plus, Save, Send, Trash, X } from "lucide-react";
import { memo, useRef, useState } from "react";
import { useFormContext } from "react-hook-form";
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
import { useServerFn } from "@tanstack/react-start";
import { deleteBlogPost } from "@/functions/blog";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";
import { useRouter } from "@tanstack/react-router";

function EditorPaneComponent() {
  const form = useFormContext<z.infer<typeof newBlogSchema>>();
  const [newTag, setNewTag] = useState("");
  const submitBtn = useRef<HTMLButtonElement>(null);
  const deleteFn = useServerFn(deleteBlogPost);
  const router = useRouter();

  const deleteMutation = useMutation({
    mutationFn: deleteFn,
    onMutate: ({ data }) => {
      toast.loading(`Deleting "${form.getValues("title")}"`, {
        id: "id" in data ? data.id : data.slug,
        description: "",
      });
    },
    onSuccess: async (_, { data }) => {
      toast.success(`Deleted successfully!`, {
        id: "id" in data ? data.id : data.slug,
        description: "",
      });
      form.reset();
      await router.invalidate();
    },
    onError: async (error, { data }) => {
      const item = form.getValues("published") ? "post" : "draft";
      console.error(`Error deleting ${item}`, error);
      toast.error(`Unable to delete ${item}`, {
        id: "id" in data ? data.id : data.slug,
        description: error.message,
      });
    },
  });

  const postId = form.getValues("id");

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
            Save Draft
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
            Publish
          </Button>
          {postId && (
            <Button
              type="button"
              variant="destructive"
              onClick={() =>
                // TODO use a dialog to confirm post deletion
                deleteMutation.mutate({
                  data: {
                    id: postId,
                  },
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
