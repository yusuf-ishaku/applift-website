import WorkHero from "@/components/work/work-hero";
import WorkStats from "@/components/work/work-stats";
import WorkTabs from "@/components/work/work-tabs";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/work")({
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
