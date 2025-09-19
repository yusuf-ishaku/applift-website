import WorkHero from "@/components/work/work-hero";
import WorkStats from "@/components/work/work-stats";
import WorkTabs from "@/components/work/work-tabs";
import { seo } from "@/utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = seo({
  title: "Our Work",
  description:
    "Explore Applift's portfolio — discover the impactful projects we've delivered and how we help brands succeed.",
  pathname: "/work",
});

export default function WorkPage() {
  return (
    <>
      <WorkHero />
      <WorkStats />
      <WorkTabs />
      <div className="mb-20" />
    </>
  );
}
