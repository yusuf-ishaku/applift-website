import PortfolioAbout from "@/components/company/portfolio-about";
import PortfolioBlogs from "@/components/company/portfolio-blogs";
import PortfolioProjects from "@/components/company/portfolio-projects";
import { mikeOlah } from "@/constants/team";

// TODO SEO

export default function Portfolio() {
  return (
    <>
      <PortfolioAbout {...mikeOlah} />
      <PortfolioProjects projects={mikeOlah.projects} />
      <PortfolioBlogs />
    </>
  );
}
