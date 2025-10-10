import PortfolioAbout from "@/components/company/portfolio-about";
import PortfolioBlogs from "@/components/company/portfolio-blogs";
import { getAllCompanySlugs, getTeamMemberDetails } from "@/loaders/company";
import { seo } from "@/utils/seo";
import type { Metadata } from "next";
import { notFound } from "next/navigation";

export const revalidate = 3600;

type Params = { member: string };

type Props = {
  params: Promise<Params>;
};

export async function generateStaticParams(): Promise<Params[]> {
  const members = await getAllCompanySlugs();
  return members.map((m) => ({
    member: m.slug,
  }));
}

async function notFoundHandler(slug: string) {
  const data = await getTeamMemberDetails(slug);
  if (!data) notFound();
  return data;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { member } = await params;
  const person = await notFoundHandler(member);
  return seo({
    title: {
      absolute: `${person.name} | Portfolio at Applift Labs`,
    },
    description: person.bio!,
    openGraph: {
      type: "profile",
    },
    image: person.image!,
    twitter: {
      card: "summary_large_image",
    },
    pathname: `/company/${member}`,
  });
}

export default async function Portfolio({ params }: Props) {
  const { member } = await params;
  const person = await notFoundHandler(member);
  return (
    <>
      <PortfolioAbout {...person} />
      {/*<PortfolioProjects projects={mikeOlah.projects} />*/}
      <PortfolioBlogs featured={person.blog} />
    </>
  );
}
