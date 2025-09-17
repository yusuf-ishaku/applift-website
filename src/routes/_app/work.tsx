import WorkHero from "@/components/work/work-hero";
import WorkStats from "@/components/work/work-stats";
import WorkTabs from "@/components/work/work-tabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/work")({
  head: () => ({
    title: "Our Work | Applift",
    meta: [
      {
        name: "description",
        content:
          "Explore Applift's portfolio — discover the impactful projects we've delivered and how we help brands succeed.",
      },
      { property: "og:title", content: "Our Work | Applift" },
      {
        property: "og:description",
        content:
          "Explore Applift's portfolio — discover the impactful projects we've delivered and how we help brands succeed.",
      },
      { name: "twitter:title", content: "Our Work | Applift" },
      {
        name: "twitter:description",
        content:
          "Explore Applift's portfolio — discover the impactful projects we've delivered and how we help brands succeed.",
      },
    ],
  }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <WorkHero />
      <WorkStats />
      <WorkTabs />
      <div className="mb-20" />
    </>
  );
}
