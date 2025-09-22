import HomeHero from "@/components/home/home-hero";
import Real from "@/components/home/real";
import TargetClients from "@/components/home/target-clients";
import Testimonials from "@/components/home/testimonials";
import WhatWeDo from "@/components/home/what-we-do";
import WhyApplift from "@/components/home/why-applift";

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WhyApplift />
      <WhatWeDo />
      <TargetClients />
      <Real />
      <Testimonials />
      {/*<div className="mb-[250px]" />*/}
    </>
  );
}
