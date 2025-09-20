import HomeHero from "@/components/home/home-hero";
import Real from "@/components/home/real";
import TargetClients from "@/components/home/target-clients";
import WhatWeDo from "@/components/home/what-we-do";
import WhyApplift from "@/components/home/why-applift";
import { Logo1, Logo2, Logo3, Logo4 } from "@/components/svgs";
import Marquee from "react-fast-marquee";

// TODO CHECK IF SSR NEEDS TO BE TURNED OFF

export default function HomePage() {
  return (
    <>
      <HomeHero />
      <WhyApplift />
      <WhatWeDo />
      <TargetClients />
      <Real />
      <Marquee
        autoFill
        pauseOnHover
        speed={50}
        direction="left"
        className="[&_div:not(:first-child)]:ml-[77px] mt-[76px] [-webkit-mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)] [-webkit-mask-repeat:no-repeat] [-webkit-mask-size:100%_100%] [mask-image:linear-gradient(to_right,transparent,black_25%,black_75%,transparent)] [mask-repeat:no-repeat] [mask-size:100%_100%]"
      >
        <Logo1 />
        <Logo2 />
        <Logo3 />
        <Logo4 />
      </Marquee>
      <div className="mb-[250px]" />
    </>
  );
}
