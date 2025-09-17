import Branding from "@/components/company/branding";
import CompanyHero from "@/components/company/company-hero";
import { HowWeWork } from "@/components/company/how-we-work";
import OurStructure from "@/components/company/our-structure";
import Team from "@/components/company/team";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/company")({
  head: () => ({
    title: "About Us | Applift",
    meta: [
      {
        name: "description",
        content:
          "Learn about Applift — our mission, our team, and how we work together to build innovative solutions.",
      },
      { property: "og:title", content: "About Us | Applift" },
      {
        property: "og:description",
        content:
          "Meet the people behind Applift and discover how we structure our company to deliver world-class digital products.",
      },
      { name: "twitter:title", content: "About Us | Applift" },
      {
        name: "twitter:description",
        content:
          "Meet the people behind Applift and discover how we structure our company to deliver world-class digital products.",
      },
    ],
  }),
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
