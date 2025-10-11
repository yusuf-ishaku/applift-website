import type { ComponentProps } from "react";
import BlogCard from "../blog/blog-card";
import { Separator } from "../ui/separator";

type FeaturedPost = ComponentProps<typeof BlogCard>["post"];

const PortfolioBlogs = ({ featured }: { featured: FeaturedPost[] }) => {
  if (!featured.length) return null;
  return (
    <>
      <div className="mt-12 md:mt-20 flex flex-col gap-8 md:gap-10">
        {/* Heading */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
          <h2 className="font-medium text-2xl sm:text-3xl lg:text-[40px] leading-tight text-white shrink-0">
            Featured Blogs
          </h2>
          <Separator className="flex-1 [background-image:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)]" />
        </div>
        <div className="grid md:grid-cols-3 items-start gap-y-[48px] gap-x-[40px]">
          {featured.map((post, index) => (
            <BlogCard post={post} key={index} />
          ))}
        </div>
      </div>
    </>
  );
};

export default PortfolioBlogs;
