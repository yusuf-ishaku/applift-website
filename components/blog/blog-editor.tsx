"use client";

import { BlogOgPreview } from "@/components/editor/blog-og-preview"; // ✅ import
import { ContentEditorCard } from "@/components/editor/content-editor-card";
import { EditorPane } from "@/components/editor/editor-pane";
import { PostDetailsCard } from "@/components/editor/post-details-card";
import BlogView from "@/components/global/blog-view";
import { Form } from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  publishBlog as publishFn,
  updateBlog as updateFn,
} from "@/actions/blog";
import { authClient } from "@/lib/auth-client";
import { newBlogSchema, type BlogForm } from "@/schemas";
import type { BlogPost } from "@/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm, useFormContext, useWatch } from "react-hook-form";
import { toast } from "sonner";
import type z from "zod";
import { zfd } from "zod-form-data";
import { useParams } from "next/navigation";
import { useRouter } from "nextjs-toploader/app";
import {
  draftedPostOptions,
  myBlogOptions,
  publishedPostOptions,
} from "@/lib/query-options";
import { useCallback } from "react";

const toastId = "PUBLISH-TOAST";

function QuickPreview() {
  const { data: session } = authClient.useSession();
  const form = useFormContext<BlogForm>();
  const slug = useWatch({ control: form.control, name: "slug" });
  const title = useWatch({ control: form.control, name: "title" });
  const excerpt = useWatch({ control: form.control, name: "excerpt" });
  const coverImage = useWatch({ control: form.control, name: "coverImage" });
  const category = useWatch({ control: form.control, name: "category" });
  const id = useWatch({ control: form.control, name: "id" });
  const published = useWatch({ control: form.control, name: "published" });
  const content = useWatch({ control: form.control, name: "content" });
  const tags = useWatch({ control: form.control, name: "tags" });
  const now = new Date();
  return (
    <>
      <BlogView
        post={{
          author: {
            image: session?.user.image ?? null,
            name: session?.user.name ?? "<Author/>",
          },
          authorId: session?.user.id ?? "ID",
          category,
          content,
          coverImage:
            coverImage instanceof Blob
              ? URL.createObjectURL(coverImage)
              : (coverImage ?? null),
          createdAt: now,
          excerpt: excerpt ?? "",
          id: id ?? "",
          published,
          slug,
          title,
          updatedAt: now,
          tags,
        }}
      />
    </>
  );
}

export const BlogEditor = ({ postToEdit }: { postToEdit?: BlogPost }) => {
  const form = useForm<
    z.input<typeof newBlogSchema>,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    any,
    z.output<typeof newBlogSchema>
  >({
    resolver: zodResolver(newBlogSchema),
    defaultValues: {
      id: postToEdit?.id,
      title: postToEdit?.title ?? "",
      slug: postToEdit?.slug ?? "",
      excerpt: postToEdit?.excerpt ?? "",
      // @ts-expect-error typescript can be annoying
      category: postToEdit?.category ?? "",
      content: postToEdit?.content ?? "",
      tags: postToEdit?.tags ?? [],
      coverImage: postToEdit?.coverImage ?? undefined,
      published: postToEdit?.published ?? false,
    },
  });
  const router = useRouter();
  const params = useParams<{
    postId: string;
  }>();
  const queryClient = useQueryClient();

  const movePost = useCallback(
    (
      { id: postId, title }: { id: string; title: string },
      direction: "drafts-to-published" | "published-to-drafts",
    ) => {
      const fromOptions =
        direction === "drafts-to-published"
          ? draftedPostOptions
          : publishedPostOptions;

      const toOptions =
        direction === "drafts-to-published"
          ? publishedPostOptions
          : draftedPostOptions;

      // remove from source
      queryClient.setQueryData(fromOptions.queryKey, (posts) =>
        posts ? posts.filter((post) => post.id !== postId) : [],
      );

      // add/update in destination
      queryClient.setQueryData(toOptions.queryKey, (posts) => {
        const newPosts = posts ? [...posts] : [];
        const existing = newPosts.find((post) => post.id === postId);

        if (existing) {
          existing.title = title;
        } else {
          newPosts.push({ id: postId, title });
        }

        return newPosts;
      });

      queryClient.invalidateQueries(myBlogOptions);
    },
    [queryClient],
  );

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
        const postId = values.id;
        await updateFn(formData);
        movePost(
          {
            id: postId,
            title: values.title,
          },
          values.published ? "drafts-to-published" : "published-to-drafts",
        );
      } else {
        const { id } = await publishFn(formData);
        movePost(
          {
            id,
            title: values.title,
          },
          "drafts-to-published",
        );
        if (id !== params?.postId) {
          router.replace(`/editor/${id}/edit`);
        }
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

  const content = useWatch({ control: form.control, name: "content" });
  const title = useWatch({ control: form.control, name: "title" });
  const postId = useWatch({ control: form.control, name: "id" });

  const TabListNode = (
    <TabsList className="mx-auto max-md:w-full">
      <TabsTrigger value="editor" className="md:min-w-xs">
        Editor
      </TabsTrigger>
      <TabsTrigger
        value="preview"
        className="md:min-w-xs"
        disabled={!content || !title}
      >
        Preview
      </TabsTrigger>
    </TabsList>
  );

  return (
    <div className="max-w-7xl mx-auto py-6">
      {/*<h1 className="text-3xl font-bold mb-6">Applift Blog Editor</h1>*/}
      <Form {...form}>
        <Tabs defaultValue={postId ? "preview" : "editor"}>
          {TabListNode}
          <TabsContent value="preview" className="pt-4 space-y-6">
            <QuickPreview />
          </TabsContent>
          <TabsContent value="editor">
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
          </TabsContent>
          <div className="md:hidden mt-4">{TabListNode}</div>
        </Tabs>
      </Form>
    </div>
  );
};
