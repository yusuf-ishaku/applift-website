import BlogGrid from "@/components/blog/blog-grid";
import { listPublishBlogPosts } from "@/loaders/blogs";
import { seo } from "@/utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = seo({
  title: "Blogs",
  description:
    "Read the latest blog posts from Applift — insights, tutorials, and stories about building and scaling modern web applications.",
});

export default async function BlogPage() {
  const posts = await listPublishBlogPosts();
  return (
    <div className="mb-[228px]">
      <h2 className="text-[48px] leading-[60px] font-medium text-white">
        Blogs
      </h2>
      <BlogGrid posts={posts} />
    </div>
  );
}
