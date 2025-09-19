import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { BlogPost } from "@/types";
import { extractNameInitials, formatDate } from "@/utils/client";
import Link from "next/link";

const BlogCard = ({ post }: { post: BlogPost }) => {
  return (
    <>
      <Link
        href={`/blog/${post.slug}`}
        className="flex flex-col items-center justify-center gap-4 min-h-[402px]"
      >
        <div
          className="w-full h-[284px] rounded-[18.32px] !bg-center !bg-cover !bg-no-repeat !bg-muted"
          style={{ background: `url(${post.coverImage})` }}
        />

        <div className="flex flex-col items-start gap-3 w-full">
          <h3 className="font-medium text-lg sm:text-xl md:text-2xl leading-snug">
            {post.title}
          </h3>

          <Separator />

          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Avatar className="size-8">
                <AvatarImage src={post.author.image ?? "#"} draggable={false} />
                <AvatarFallback>
                  {extractNameInitials(post.author.name)}
                </AvatarFallback>
              </Avatar>
              <span className="text-sm sm:text-base md:text-lg leading-snug dark:text-[#B7B7B7]">
                {post.author.name}
              </span>
            </div>
            <span className="text-sm sm:text-base md:text-lg leading-snug dark:text-[#B7B7B7]">
              {formatDate(post.createdAt)}
            </span>
          </div>
        </div>
      </Link>
    </>
  );
};

export default BlogCard;
