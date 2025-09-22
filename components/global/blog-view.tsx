"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import type { BlogPost } from "@/types";
import { extractNameInitials } from "@/utils/client";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "next/image";

const BlogView = ({ post }: { post: BlogPost }) => {
  // Setup a read-only Tiptap editor
  const editor = useEditor({
    editable: false,
    extensions: [StarterKit],
    content: post.content,
    immediatelyRender: false,
  });
  const day = String((post.createdAt ?? new Date()).getDate()).padStart(2, "0");
  const month = String((post.createdAt ?? new Date()).getMonth() + 1).padStart(
    2,
    "0",
  ); // months are 0-indexed
  const year = String((post.createdAt ?? new Date()).getFullYear()).slice(-2); // last 2 digits
  const formattedDate = `${day}/${month}/${year}`;
  return (
    <>
      <div className="max-w-3xl mx-auto">
        <div className="flex flex-col items-start gap-[32px] ">
          <h1 className="font-medium text-[40px] leading-[50px]">
            {post.title}
          </h1>
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-[8px]">
              <Avatar className="size-[28px]">
                <AvatarImage asChild src={post.author.image ?? "#"}>
                  <Image
                    src={post.author.image ?? "#"}
                    draggable={false}
                    alt={post.author.name}
                    width={28}
                    height={28}
                  />
                </AvatarImage>
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
    </>
  );
};

export default BlogView;
