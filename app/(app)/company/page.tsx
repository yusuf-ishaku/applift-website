import Branding from "@/components/company/branding";
import CompanyHero from "@/components/company/company-hero";
import { HowWeWork } from "@/components/company/how-we-work";
import OurStructure from "@/components/company/our-structure";
import Team from "@/components/company/team";
import { seo } from "@/utils/seo";
import type { Metadata } from "next";

export const metadata: Metadata = seo({
  title: "About Us",
  description:
    "Learn about Applift — our mission, our team, and how we work together to build innovative solutions.",
  pathname: "/company",
});

export default function CompanyPage() {
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
