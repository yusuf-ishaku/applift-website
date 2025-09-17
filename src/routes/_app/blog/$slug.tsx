import BlogCard from "@/components/blog/blog-card";
import BlogView from "@/components/global/blog-view";
import { APP_URL } from "@/config";
import { getBlogPostBySlug, getPostRecommendations } from "@/functions/blog";
import { blogPostMocks } from "@/mocks/blog-posts";
import {
  Await,
  createFileRoute,
  notFound,
  type AnyRouteMatch,
} from "@tanstack/react-router";
import { cache } from "react";

const cachedFetch = cache(getBlogPostBySlug);

export const Route = createFileRoute("/_app/blog/$slug")({
  component: RouteComponent,
  beforeLoad: async ({ params }) => {
    const post = await cachedFetch({
      data: params,
    });
    if (!post.published) throw notFound();
  },
  loader: async ({ params }) => {
    return {
      post: await cachedFetch({
        data: params,
      }),
      recommendationsPromise: getPostRecommendations({
        data: params,
      }),
    };
  },
  head: ({ loaderData }) => {
    if (!loaderData?.post) return {};
    const { post } = loaderData;
    const optionalMeta: AnyRouteMatch["meta"] = [];
    if (post.coverImage) {
      optionalMeta.push(
        {
          name: "og:image",
          content: post.coverImage,
        },
        {
          name: "twitter:image",
          content: post.coverImage,
        },
      );
    }
    if (post.tags) {
      optionalMeta.push(
        {
          name: "article:tag",
          content: post.tags.join(", "),
        },
        {
          name: "keywords",
          content: post.tags.join(", "),
        },
      );
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
  const { post, recommendationsPromise } = Route.useLoaderData();
  return (
    <div className="mb-[190px]">
      <BlogView post={post} />
      <Await promise={recommendationsPromise}>
        {(recommendations) =>
          recommendations.length > 0 && (
            <div className="mt-[69px] flex flex-col items-start gap-[24px]">
              <h2 className="font-medium text-[24px] leading-[30px] dark:text-[#E6F0F8]">
                Explore other Stories
              </h2>
              <div className="grid md:grid-cols-3 items-start gap-y-[48px] gap-x-[40px] w-full">
                {recommendations.map((post) => (
                  <BlogCard key={post.id} post={post} />
                ))}
              </div>
            </div>
          )
        }
      </Await>
    </div>
  );
}
