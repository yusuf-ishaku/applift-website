import torusknot from "@/assets/images/torus-knot.png";
import { Fragment, type ReactNode } from "react";
import { AfricanSMEs, ClientAmbitions, Founders, Teams } from "../svgs";
import { Separator } from "../ui/separator";
import Image from "next/image";

type Client = {
  icon: () => ReactNode;
  title: string;
  description: string;
};

const clients: Client[] = [
  {
    icon: AfricanSMEs,
    title: "African SMEs & Established Businesses",
    description:
      "Driving digital transformation with solutions built to modernize operations and boost growth.",
  },
  {
    icon: Founders,
    title: "Founders & Early-Stage Products",
    description:
      "From MVP to launch, we help turn bold ideas into usable, market-ready products.",
  },
  {
    icon: Teams,
    title: "Teams Needing Product Audits",
    description:
      "Clear UX reviews that improve usability, refine flows, and lift engagement metrics.",
  },
  {
    icon: ClientAmbitions,
    title: "Clients with Global Ambitions",
    description:
      "Lean, high-quality engineering tailored for businesses scaling across borders.",
  },
];

const TargetClients = () => {
  return (
    <>
      <div className="mt-[100px]">
        <div className="grid lg:grid-cols-2 gap-y-6">
          <Image
            src={torusknot}
            alt="Knot"
            draggable={false}
            className="object-contain object-center size-72 mx-auto lg:mx-0 lg:size-[496px]"
          />
          <div className="flex flex-col items-start gap-6 sm:gap-8">
            <h3 className="font-medium text-2xl w-full text-center md:text-left sm:text-3xl lg:text-[40px] lg:leading-[50px] text-[#9AC1E1]">
              Our Target Clients
            </h3>

            <div className="flex flex-col items-start gap-6 sm:gap-8 w-full">
              {clients.map((client, index) => (
                <Fragment key={index}>
                  <Separator className="border-t border-[#012D51] first:max-w-full max-md:max-w-3/4 mx-auto" />
                  <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 w-full">
                    <client.icon />
                    <div className="flex mx-1 md:mx-0 flex-col items-start gap-4 sm:gap-4">
                      <h4 className="font-medium text-center md:text-left text-xl sm:text-2xl lg:text-[24px] lg:leading-[30px] text-white">
                        {client.title}
                      </h4>
                      <p className="text-base text-center md:text-left sm:text-lg lg:text-[20px] lg:leading-[25px] text-[#CFCFCF]">
                        {client.description}
                      </p>
                    </div>
                  </div>
                </Fragment>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TargetClients;
