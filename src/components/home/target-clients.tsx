import torusknot from "@/assets/images/torus-knot.png";
import type { ReactNode } from "react";
import { AfricanSMEs, ClientAmbitions, Founders, Teams } from "../svgs";

type Client = {
  icon: () => ReactNode;
  title: string;
  description: string;
};

const clients: Client[] = [
  // TODO fetch icons for clients
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
      <div className="mt-[100px] hidden lg:block">
        <div className="grid grid-cols-2">
          <div
            className="bg-center bg-no-repeat bg-contain size-[496px]"
            style={{
              backgroundImage: `url(${torusknot})`,
            }}
          />
          <div className="flex flex-col items-start gap-[24px]">
            <h3 className="font-medium text-[40px] leading-[50px] text-[#9AC1E1]">
              Our Target Clients
            </h3>
            <div className="flex flex-col item-start gap-[24px]">
              {clients.map((client, index) => (
                <div
                  key={index}
                  className="border-t border-solid border-[#012D51] flex items-start gap-[16px] pt-[24px]"
                >
                  <client.icon />
                  <div className="flex flex-col items-start gap-[16px]">
                    <h4 className="font-medium text-[24px] leading-[30px] text-white">
                      {client.title}
                    </h4>
                    <p className="text-[20px] leading-[25px] text-[#CFCFCF]">
                      {client.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default TargetClients;
