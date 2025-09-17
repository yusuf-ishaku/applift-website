import { BlogOgPreview } from "@/components/editor/blog-og-preview"; // ✅ import
import { ContentEditorCard } from "@/components/editor/content-editor-card";
import { EditorPane } from "@/components/editor/editor-pane";
import { PostDetailsCard } from "@/components/editor/post-details-card";
import { Form } from "@/components/ui/form";
import { publishBlog, updateBlog } from "@/functions/blog";
import { newBlogSchema, type BlogForm } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { createFileRoute, useRouterState } from "@tanstack/react-router";
import { useServerFn } from "@tanstack/react-start";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { zfd } from "zod-form-data";

export const Route = createFileRoute("/editor/_auth/new")({
  component: BlogEditor,
});

const toastId = "PUBLISH-TOAST";

function BlogEditor() {
  const draft = useRouterState({
    select: (s) => s.location.state.draft,
  });
  const form = useForm<
    z.input<typeof newBlogSchema>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    z.output<typeof newBlogSchema>
  >({
    resolver: zodResolver(newBlogSchema),
    defaultValues: {
      id: draft?.id,
      title: draft?.title ?? "",
      slug: draft?.slug ?? "",
      excerpt: draft?.excerpt ?? "",
      // @ts-expect-error typescript can be annoying
      category: draft?.category ?? "Company",
      content: draft?.content ?? "",
      tags: draft?.tags ?? [],
      coverImage: draft?.coverImage ?? undefined,
      published: draft?.published ?? false,
    },
  });
  const publishFn = useServerFn(publishBlog);
  const updateFn = useServerFn(updateBlog);

  const publishMutation = useMutation({
    mutationFn: async ({ tags, ...values }: BlogForm) => {
      const formData = new FormData();
      for (const key in values) {
        const value = values[key as keyof typeof values];
        if (!value) continue;
        formData.append(
          key,
          typeof value === "boolean" ? String(value) : value,
        );
      }
      tags?.forEach((tag) => formData.append("tags", tag));
      zfd.formData(newBlogSchema).parse(formData);
      if (values.id) {
        await updateFn({
          data: formData,
        });
      } else {
        await publishFn({
          data: formData,
        });
      }
    },
    onMutate: ({ published, id }) => {
      const action = id ? "Updating" : "Creating";
      const item = published ? "post" : "draft";
      toast.loading(`${action} ${item}`, {
        id: toastId,
        description: "",
      });
    },
    onSuccess: (_, { published, id }) => {
      const action = id ? "updated" : "created";
      const item = published ? "Post" : "Draft";
      toast.success(`${item} ${action}`, {
        id: toastId,
        description: "",
      });
    },
    onError: (error, { published, id }) => {
      const action = id ? "update" : "create";
      const item = published ? "post" : "draft";
      const msg = `Failed to ${action} ${item}`;
      console.error(error, error);
      toast.error(msg, {
        id: toastId,
        description: error.message,
      });
    },
  });

  return (
    <div className="max-w-7xl mx-auto py-6">
      <h1 className="text-3xl font-bold mb-6">Blog Editor</h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit((values) =>
            publishMutation.mutate(values),
          )}
        >
          <fieldset
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
            disabled={publishMutation.isPending}
          >
            {/* Main content */}
            <div className="lg:col-span-2 space-y-6">
              <PostDetailsCard />
              <ContentEditorCard />
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <EditorPane />
              {/* ✅ OG Preview */}
              <BlogOgPreview />
            </div>
          </fieldset>
        </form>
      </Form>
    </div>
  );
}
