import type { ComponentProps } from "react";
import { Separator } from "../ui/separator";
import BlogCard from "../blog/blog-card";
import featured1 from "@/assets/images/featured-1.png";
import featured2 from "@/assets/images/featured-2.png";
import featured3 from "@/assets/images/featured-3.png";

type FeaturedPost = ComponentProps<typeof BlogCard>["post"];

const featured: FeaturedPost[] = [
  {
    coverImage: featured1.src,
    createdAt: new Date("05/11/25"),
    title: "Harnessing AI in Product Development: Opportunities and Challenges",
  },
  {
    coverImage: featured2.src,
    createdAt: new Date("08/21/25"),
    title: "From Idea to MVP: A Founder’s Guide to Building Fast",
  },
  {
    coverImage: featured3.src,
    createdAt: new Date("08/21/25"),
    title: "From Idea to MVP: A Founder’s Guide to Building Fast",
  },
];

const PortfolioBlogs = () => {
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
