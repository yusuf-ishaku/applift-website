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

async function Recommendations({ slug }: { slug: string }) {
  const recommendations = await getPostRecommendations(slug);
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
    <div className="mb-[190px]">
      <BlogView post={post} />
      <Suspense key={`blog-${slug}`}>
        <Recommendations slug={slug} />
      </Suspense>
    </div>
  );
}
