import authorImg from "@/assets/images/author.png";
import blogImg from "@/assets/images/blogimg.png";
import type { BlogPost } from "@/types";

export const blogPostMocks = Array.from({ length: 12 }).fill({
  author: {
    name: "Fortune Yusuf",
    image: authorImg,
  },
  // date: "21/08/25",
  coverImage: blogImg,
  title: "Why African SME’s must Embrace Digital Transformation in 2025",
  authorId: "33",
  category: "Company",
  content: "#",
  createdAt: new Date("21/08/25"),
  updatedAt: new Date("21/08/25"),
  excerpt: "Idk what this is man",
  id: "##",
  published: true,
  slug: "growing-with-alex",
  tags: ["Xsa"],
} as BlogPost) as BlogPost[];
