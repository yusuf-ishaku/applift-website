import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import type { BlogPost } from "@/types";
import { extractNameInitials, formatDate } from "@/utils/client";
import Image from "next/image";
import Link from "next/link";

const BlogCard = ({
  post,
}: {
  post: Pick<BlogPost, "coverImage" | "title" | "createdAt"> &
    Partial<Pick<BlogPost, "slug" | "author">>;
}) => {
  return (
    <>
      <Link
        href={post.slug ? `/blog/${post.slug}` : "#"}
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
            {post.author && (
              <div className="flex items-center gap-2">
                <Avatar className="size-8">
                  <AvatarImage asChild src={post.author.image ?? "#"}>
                    <Image
                      src={post.author.image ?? "#"}
                      draggable={false}
                      alt={post.author.name}
                      width={32}
                      height={32}
                    />
                  </AvatarImage>
                  <AvatarFallback>
                    {extractNameInitials(post.author.name)}
                  </AvatarFallback>
                </Avatar>
                <span className="text-sm sm:text-base md:text-lg leading-snug dark:text-[#B7B7B7]">
                  {post.author.name}
                </span>
              </div>
            )}
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
