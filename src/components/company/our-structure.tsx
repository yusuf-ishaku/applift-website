import type { ReactNode } from "react";
import {
  OperationsAndPeople,
  ProductTeam,
  ServicesTeam,
  UXAndResearchTeam,
} from "../svgs";
import clsx from "clsx";

type Grid = {
  svg: () => ReactNode;
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
    <>
      <div>
        <div className="flex flex-col items-center gap-[40px] max-w-[1280px] mx-auto mt-14 mb-[213px]">
          <div className="p-[16px_33px] max-w-[202px] mx-auto bg-[#00060A] rounded-[30px] border border-solid [border-image-source:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)]">
            <h3 className="text-center font-medium text-[20px] leading-[25px] text-[#B3D1E9]">
              Our Structure
            </h3>
          </div>
          <div className="grid grid-cols-2 grid-rows-2 items-start">
            {grids.map((grid, index) => (
              <div
                key={index}
                className={clsx(
                  "box-border border-y-[2px] border-x-[2px] nth-[3]:border-t-[0px] nth-[4]:border-t-[0px] even:border-l-[0px] border-solid border-[#012D51] grow-0 pt-[28px] pb-[32px] pl-[19px] pr-[26px]",
                  index === 0 && "rounded-tl-[20px]",
                  index === 1 && "rounded-tr-[20px]",
                  index === 2 && "rounded-bl-[20px]",
                  index === 3 && "rounded-br-[20px]",
                )}
              >
                <grid.svg />
                <div className="flex mt-4 flex-col items-start gap-[15px]">
                  <h4 className="font-medium text-[24px] leading-[30px] text-[#FAFAFA]">
                    {grid.title}
                  </h4>
                  <p className="text-[20px] leading-[25px] text-[#CFCFCF]">
                    {grid.content}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default OurStructure;
