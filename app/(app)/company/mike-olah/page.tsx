import PortfolioAbout from "@/components/company/portfolio-about";
import PortfolioBlogs from "@/components/company/portfolio-blogs";
import PortfolioProjects from "@/components/company/portfolio-projects";
import { mikeOlah } from "@/constants/team";
import { seo } from "@/utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = seo({
  title: {
    absolute: `${mikeOlah.name} | Portfolio at Applift Labs`,
  },
  description:
    mikeOlah.bio ||
    `${mikeOlah.name}'s portfolio, projects, and contributions at Applift Labs.`,
  openGraph: {
    type: "profile",
  },
  image: mikeOlah.image.src,
  twitter: {
    card: "summary_large_image",
  },
});

export default function Portfolio() {
  return (
    <>
      <PortfolioAbout {...mikeOlah} />
      <PortfolioProjects projects={mikeOlah.projects} />
      <PortfolioBlogs />
    </>
  );
}
