import { getBlogPostById } from "@/actions/blog";
import { BlogEditor } from "@/components/blog/blog-editor";
import { seo } from "@/utils/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache } from "react";

type Props = {
  params: Promise<{ postId: string }>;
};

const cachedGetBlogPostById = cache(
  async (...args: Parameters<typeof getBlogPostById>) => {
    const post = await getBlogPostById(...args);
    if (!post) notFound();
    return post;
  },
);

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { postId } = await params;
  const post = await cachedGetBlogPostById(postId);
  return seo({
    title: `Editing: ${post.title} — MySite`,
    description: post.excerpt ?? `Editing your blog post: ${post.title}`,
    robots: { index: false, follow: false },
    // TODO add a trailing /edit to this route
    pathname: `/editor/${post.id}/edit`,
  });
}

export default async function EditPostPage({ params }: Props) {
  const { postId } = await params;
  const post = await cachedGetBlogPostById(postId);
  return <BlogEditor postToEdit={post} />;
}
