import BlogCard from "@/components/blog/blog-card";
import BlogView from "@/components/global/blog-view";
import {
  getAllPublishedPostSlugs,
  getPostBySlug,
  getPostRecommendations,
} from "@/loaders/blogs";
import { seo } from "@/utils/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cache, Suspense } from "react";

const cachedGetPostBySlug = cache(
  async (...args: Parameters<typeof getPostBySlug>) => {
    const post = await getPostBySlug(...args);
    if (!post) notFound();
    return post;
  },
);

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  const posts = await getAllPublishedPostSlugs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await cachedGetPostBySlug(slug);
  return seo({
    title: {
      absolute: `${post.title} | Applift Blog`,
    },
    description: post.excerpt || post.content.slice(0, 160),
    authors: [
      {
        name: post.author.name,
        // TODO AUTHOR URL
      },
    ],
    pathname: `/blog/${post.slug}`,
    ...(post.coverImage
      ? {
          image: post.coverImage,
          twitter: {
            card: "summary_large_image",
          },
        }
      : {}),
    ...(post.tags
      ? {
          keywords: post.tags as string[],
        }
      : {}),
  });
}

async function Recommendations(
  ...args: Parameters<typeof getPostRecommendations>
) {
  const recommendations = await getPostRecommendations(...args);
  if (!recommendations.length) return null;
  return (
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
  );
}

export default async function BlogSlugPage({ params }: Props) {
  const { slug } = await params;
  const post = await cachedGetPostBySlug(slug);
  return (
    <div className="mb-4">
      <BlogView post={post} />
      <Suspense key={`blog-${slug}`}>
        <Recommendations slug={slug} authorId={post.authorId} />
      </Suspense>
      {/*<section
        id="comments-section"
        className="mt-12 max-w-3xl mx-auto max-md:px-4"
      >
        <fieldset className="bg-[linear-gradient(270deg,rgba(0,11,20,0.2)_0%,rgba(1,73,132,0)_100%)] rounded-lg w-full">
          <div className="flex flex-col gap-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-[#FAFAFA]">
              Leave a Comment
            </h2>

            <div className="flex flex-col gap-4">
              <CommentForm postId={post.id} />
            </div>

            <div className="h-px bg-gray-700/50" />

            <div className="flex flex-col gap-6">
              <CommentList />
            </div>
          </div>
        </fieldset>
      </section>*/}
    </div>
  );
}
