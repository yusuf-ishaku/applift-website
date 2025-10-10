"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Skeleton } from "@/components/ui/skeleton";
import type { blogCategories } from "@/constants/blog";
import { myBlogOptions } from "@/lib/query-options";
import { cn } from "@/lib/utils";
import type { PostPreview as Post } from "@/types";
import { extractNameInitials, formatDate } from "@/utils/client";
import { useQuery } from "@tanstack/react-query";
import uniqBy from "lodash.uniqby";
import { Check } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";

export default function MyBlogs() {
  // keep hooks at the top level — do not conditionally call hooks
  const query = useQuery(myBlogOptions);
  const { data, isLoading, isError, refetch } = query;

  // Defensive: ensure posts is always an array so downstream code can assume array methods
  const posts = useMemo(() => data ?? [], [data]);

  // --- Categories & filtering (memoized)
  const categories = useMemo(() => {
    const tabs = uniqBy(posts, (post) => post.category).map(
      (post) => post.category,
    ) as Readonly<string[]> as typeof blogCategories;
    return ["All", ...tabs] as const;
  }, [posts]);

  const [filter, setFilter] = useState<string>("All");

  const filtered = useMemo(() => {
    if (filter === "All") return posts;
    return posts.filter((p) => (p.category ?? "Uncategorized") === filter);
  }, [filter, posts]);

  // --- Loading / Error UI (early returns allowed after hooks)
  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-6 py-24">
        <Skeleton className="h-8 w-40" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl px-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-[360px] rounded-xl" />
          ))}
        </div>
      </div>
    );
  }

  if (isError || !posts) {
    return (
      <div className="flex flex-col items-center justify-center py-24 gap-4">
        <p className="text-muted-foreground text-center">
          Failed to load blogs. Please try again.
        </p>
        <Button onClick={() => refetch()}>Retry</Button>
      </div>
    );
  }

  return (
    <section className="flex flex-col items-center py-12 px-4 sm:px-8 md:px-12 lg:px-20">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-center mb-8">
        My Published Blogs
      </h1>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-5 mb-10">
        {categories.map((cat) => (
          <Button
            key={cat}
            onClick={() => setFilter(cat)}
            className={cn(
              "flex items-center gap-2 px-5 py-2 sm:px-8 sm:py-3 border border-border rounded-3xl text-sm sm:text-base transition-all",
              filter === cat && "bg-primary/10 border-primary text-primary",
            )}
          >
            <span>{cat}</span>
            {filter === cat && <Check className="w-4 h-4" />}
          </Button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-muted-foreground text-center mt-16">
          No blogs found for this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-8 w-full max-w-7xl">
          {filtered.map((post) => (
            <MyBlogCard key={post.id ?? post.slug} post={post} />
          ))}
        </div>
      )}
    </section>
  );
}

const MyBlogCard = ({ post }: { post: Post }) => {
  return (
    <Card className="flex flex-col overflow-hidden hover:shadow-md transition-shadow duration-300 rounded-2xl border-border">
      <Link href={`/blog/${post.slug}`} className="block group relative">
        <div className="relative w-full h-[220px] sm:h-[260px] bg-muted">
          {post.coverImage ? (
            // Only render next/image when we have a valid src — avoids runtime errors
            <Image
              src={post.coverImage}
              alt={post.title ?? "Blog cover"}
              fill
              className="object-cover group-hover:scale-[1.03] transition-transform duration-300"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
              No image
            </div>
          )}
        </div>
      </Link>

      <CardHeader className="pb-2 pt-4 px-5">
        <CardTitle className="text-base sm:text-lg md:text-xl font-medium line-clamp-2">
          {post.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-5 pb-4">
        <Separator className="my-3" />
        <div className="flex items-center justify-between w-full">
          {post.author?.name ? (
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                {/* Only render AvatarImage when there's a real image URL */}
                <AvatarImage
                  src={post.author?.image ?? "#"}
                  alt={post.author?.name}
                />
                <AvatarFallback>
                  {extractNameInitials(post.author?.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm sm:text-base text-muted-foreground">
                {post.author?.name}
              </span>
            </div>
          ) : null}

          <span className="text-sm sm:text-base text-muted-foreground">
            {formatDate(post.createdAt)}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};
