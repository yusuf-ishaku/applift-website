"use client";

import { blogCategories } from "@/constants/blog";
import type { BlogPost } from "@/types";
import uniqBy from "lodash.uniqby";
import { Check } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "../ui/button";
import BlogCard from "./blog-card";

const BlogGrid = ({ posts }: { posts: BlogPost[] }) => {
  const existingTabs = useMemo(() => {
    const tabs = uniqBy(posts, (post) => post.category).map(
      (post) => post.category,
    ) as Readonly<string[]> as typeof blogCategories;
    return ["All", ...tabs] as const;
  }, [posts]);

  const [filter, setFilter] = useState<(typeof existingTabs)[number]>("All");

  const filteredPosts = useMemo(
    () =>
      filter === "All"
        ? posts
        : posts.filter((post) => post.category === filter),
    [filter, posts],
  );

  return (
    <>
      <div className="mt-8 flex flex-wrap items-center max-md:justify-center gap-3 sm:gap-6">
        {existingTabs.length > 2 &&
          existingTabs.map((tab) => (
            <Button
              key={tab}
              onClick={() => setFilter(tab)}
              className="flex items-center gap-2 px-4 sm:px-8 py-2 sm:py-4 text-sm sm:text-base [background:linear-gradient(270deg,rgba(0,11,20,0.2)_0%,rgba(1,73,132,0)_100%)] border border-solid border-[#272727] rounded-[30px]"
            >
              <span>{tab}</span>
              {tab === filter && (
                <Check className="text-[#0264B5] size-4 sm:size-5" />
              )}
            </Button>
          ))}
      </div>

      <div className="mt-[59px] grid md:grid-cols-3 items-start gap-y-[48px] gap-x-[40px]">
        {filteredPosts.map((post) => (
          <BlogCard key={post.id} post={post} />
        ))}
      </div>
    </>
  );
};

export default BlogGrid;
