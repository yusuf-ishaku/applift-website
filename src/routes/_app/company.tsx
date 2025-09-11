import companyMembers from "@/assets/images/company-members.png";
import Branding from "@/components/company/branding";
import CompanyHero from "@/components/company/company-hero";
import { HowWeWork } from "@/components/company/how-we-work";
import OurStructure from "@/components/company/our-structure";
import { Separator } from "@/components/ui/separator";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/company")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <>
      {/*<div>*/}
      <CompanyHero />
      <Branding />
      <section>
        <div className="mt-44 max-w-[1077px] mx-auto space-y-[48px]">
          <p className="text-[24px] leading-[30px] text-center text-[#E6E6E6]">
            We believe in collaboration, curiosity, and building with intent.
            Our people are problem-solvers, designers, and developers passionate
            about shaping better digital experiences
          </p>
          <Separator className="[background-image:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)] !w-[441px] mx-auto" />
        </div>
        <div className="mt-[78.69px]">
          <img
            src={companyMembers}
            className="w-[773.5px] h-[439.41px] mx-auto"
          />
        </div>
        <div className="mt-[61.59px] max-w-[691px] mx-auto space-y-[48px]">
          <p className="text-[24px] leading-[30px] text-center text-[#E6E6E6]">
            Our Mission & Vision is to Help organizations and founders ship
            useful technology that creates better opportunities for people & Be
            the trusted place clients turn to for practical, high-quality
            software and research-driven product thinking across Africa and
            beyond.
          </p>
          <Separator className="[background-image:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)] !w-[441px] mx-auto" />
        </div>
      </section>
      <HowWeWork />
      <OurStructure />
      {/*</div>*/}
    </>
  );
}
