import { BlogEditor } from "@/components/blog/blog-editor";
import { seo } from "@/utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = seo({
  title: "Blog Editor",
  description:
    "Write and publish blog posts effortlessly with the built-in Blog Editor.",
  pathname: "/editor/new",
  robots: {
    index: false, // Optional: if you DON'T want this editor indexed
    follow: false,
  },
});

export default BlogEditor;
