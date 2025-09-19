import clsx from "clsx";
import type { ComponentProps, FC } from "react";
import {
  OperationsAndPeople,
  ProductTeam,
  ServicesTeam,
  UXAndResearchTeam,
} from "../svgs";

type Grid = {
  svg: FC<ComponentProps<"svg">>;
  title: string;
  content: string;
};

const grids: Grid[] = [
  {
    svg: ServicesTeam,
    title: "Services Team",
    content: "Handles client projects: scoping, delivery, QA, deployment.",
  },
  {
    svg: ProductTeam,
    title: "Product Team",
    content: "Incubates and ships Applift products and prototypes.",
  },
  {
    svg: UXAndResearchTeam,
    title: "UX & Research Team",
    content: "Conducts audits, user research, and compiles Applift Reports.",
  },
  {
    svg: OperationsAndPeople,
    title: "Operations & People",
    content: "Keeps the company running and supports team development.",
  },
];

const OurStructure = () => {
  return (
    <div className="flex flex-col items-center gap-10 max-w-[1280px] mx-auto mt-14 mb-20 px-4">
      <div className="p-[16px_33px] max-w-[202px] mx-auto bg-[#00060A] rounded-[30px] border border-solid [border-image-source:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)]">
        <h3 className="text-center font-medium text-base sm:text-lg md:text-xl leading-tight text-[#B3D1E9]">
          Our Structure
        </h3>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 items-start w-full">
        {grids.map((grid, index) => (
          <div
            key={index}
            className={clsx(
              "box-border border-y-[2px] border-x-[2px] border-none md:border-solid border-[#012D51] grow-0 pt-[28px] pb-[32px] pl-[19px] pr-[26px]",
              "nth-[1]:rounded-tl-[20px] nth-[2]:rounded-tr-[20px] nth-[3]:rounded-bl-[20px] nth-[4]:rounded-br-[20px]",
            )}
          >
            <grid.svg className="w-full h-auto" />
            <div className="flex mt-4 flex-col items-start gap-3">
              <h4 className="font-medium text-lg sm:text-xl md:text-2xl leading-snug text-[#FAFAFA]">
                {grid.title}
              </h4>
              <p className="text-sm sm:text-base md:text-lg leading-relaxed text-[#CFCFCF]">
                {grid.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OurStructure;
