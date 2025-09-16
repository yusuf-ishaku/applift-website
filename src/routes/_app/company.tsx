import Branding from "@/components/company/branding";
import CompanyHero from "@/components/company/company-hero";
import { HowWeWork } from "@/components/company/how-we-work";
import OurStructure from "@/components/company/our-structure";
import Team from "@/components/company/team";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/company")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      <CompanyHero />
      <Branding />
      <Team />
      <HowWeWork />
      <OurStructure />
    </>
  );
}
