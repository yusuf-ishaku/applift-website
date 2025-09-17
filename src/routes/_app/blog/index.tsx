import BlogGrid from "@/components/blog/blog-grid";
import { prisma } from "@/lib/prisma";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";

const pageLoader = createServerFn({ method: "GET" }).handler(async () => {
  const posts = await prisma.blog.findMany({
    where: {
      published: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 9,
    select: {
      coverImage: true,
      title: true,
      createdAt: true,
      category: true,
      id: true,
      slug: true,
      author: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });
  return posts;
});

export const Route = createFileRoute("/_app/blog/")({
  loader: () => pageLoader(),
  head: () => ({
    title: "Blogs | Applift",
    meta: [
      {
        name: "description",
        content:
          "Read the latest blog posts from Applift — insights, tutorials, and stories about building and scaling modern web applications.",
      },
      { property: "og:title", content: "Blogs | Applift" },
      {
        property: "og:description",
        content:
          "Read the latest blog posts from Applift — insights, tutorials, and stories about building and scaling modern web applications.",
      },
      { name: "twitter:title", content: "Blogs | Applift" },
      {
        name: "twitter:description",
        content:
          "Read the latest blog posts from Applift — insights, tutorials, and stories about building and scaling modern web applications.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="mb-[228px]">
      <h2 className="text-[48px] leading-[60px] font-medium text-white">
        Blogs
      </h2>
      <BlogGrid />
    </div>
  );
}
