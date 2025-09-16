import BlogCard from "@/components/blog/blog-card";
import { ThemeToggle } from "@/components/theme-toggle";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { APP_URL } from "@/config";
import { getBlogPostBySlug } from "@/functions/blog";
import { blogPostMocks } from "@/mocks/blog-posts";
import { extractNameInitials } from "@/utils/client";
import { createFileRoute, type AnyRouteMatch } from "@tanstack/react-router";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

export const Route = createFileRoute("/_app/blog/$slug")({
  component: RouteComponent,
  loader: ({ params }) =>
    getBlogPostBySlug({
      data: params,
    }),
  head: ({ loaderData: post }) => {
    if (!post) return {};
    const optionalMeta: AnyRouteMatch["meta"] = [];
    if (post.coverImage) {
      optionalMeta.push({
        name: "og:image",
        content: post.coverImage,
      });
      optionalMeta.push({
        name: "twitter:image",
        content: post.coverImage,
      });
    }
    if (post.tags) {
      optionalMeta.push({
        name: "article:tag",
        content: post.tags.join(", "),
      });
    }
    if (post.author.image) {
      optionalMeta.push({
        name: "twitter:creator",
        content: post.author.name,
      });
    }
    const title = `${post.title} | Applift Blog`;
    const description = post.excerpt || post.content.slice(0, 160);
    return {
      meta: [
        ...optionalMeta,
        {
          title,
        },
        {
          name: "description",
          content: description,
        },
        {
          name: "og:title",
          content: title,
        },
        {
          name: "og:description",
          content: post.excerpt || post.content.slice(0, 160),
        },
        {
          name: "article:author",
          content: post.author.name,
        },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:title", content: title },
        { name: "twitter:description", content: description },
        {
          property: "og:url",
          content: `${APP_URL}/blog/${post.slug}`,
        },
      ],
    };
  },
});

function RouteComponent() {
  const post = Route.useLoaderData();
  const day = String((post.createdAt ?? new Date()).getDate()).padStart(2, "0");
  const month = String((post.createdAt ?? new Date()).getMonth() + 1).padStart(
    2,
    "0",
  ); // months are 0-indexed
  const year = String((post.createdAt ?? new Date()).getFullYear()).slice(-2); // last 2 digits
  const formattedDate = `${day}/${month}/${year}`;
  // Setup a read-only Tiptap editor
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content: post.content,
    immediatelyRender: false,
  });

  return (
    <div className="mb-[190px]">
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-start gap-[32px] ">
          <h1 className="font-medium text-[40px] leading-[50px]">
            {post.title}
          </h1>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-[8px]">
              <Avatar className="size-[28px]">
                <AvatarImage
                  src={post.author.image ?? "#"}
                  draggable={false}
                  alt={post.author.name}
                />
                <AvatarFallback>
                  {extractNameInitials(post.author.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-[16px] leading-[20px] dark:text-[#B7B7B7]">
                {post.author.name}
              </span>
              <span className="text-[16px] leading-[20px] text-[#6F6F6F]">
                {formattedDate}
              </span>
            </div>
            {/*<ThemeToggle />*/}
          </div>
        </div>
        <div className="mt-[32px]">
          {post.coverImage && (
            <div
              className="rounded-lg mb-8 mx-auto h-96 w-full bg-no-repeat bg-center bg-cover"
              style={{ backgroundImage: `url(${post.coverImage})` }}
            />
          )}
          <EditorContent editor={editor} />
        </div>
      </div>
      <div className="mt-[69px] flex flex-col items-start gap-[24px]">
        <h2 className="font-medium text-[24px] leading-[30px] dark:text-[#E6F0F8]">
          Explore other Stories
        </h2>
        <div className="grid md:grid-cols-3 items-start gap-y-[48px] gap-x-[40px] w-full">
          {blogPostMocks.slice(0, 3).map((post) => (
            <BlogCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
