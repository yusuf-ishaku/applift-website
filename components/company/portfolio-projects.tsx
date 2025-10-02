import type { FC } from "react";
import { Separator } from "../ui/separator";
import type { TeamMember } from "@/constants/team";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

const PortfolioProjects: FC<Required<Pick<TeamMember, "projects">>> = ({
  projects,
}) => {
  if (!projects.length) return null;

  return (
    <div className="mt-12 md:mt-20 flex flex-col gap-8 md:gap-10">
      {/* Heading */}
      <div className="flex flex-col sm:flex-row sm:items-center gap-4 sm:gap-10">
        <h2 className="font-medium text-2xl sm:text-3xl lg:text-[40px] leading-tight text-white shrink-0">
          Featured Projects
        </h2>
        <Separator className="flex-1 [background-image:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)]" />
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-10">
        {projects.slice(0, 9).map((project, index) => (
          <div key={index} className="flex flex-col items-start gap-4">
            <div className="w-full aspect-[4/3]">
              <Image
                quality={70}
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover object-center rounded-md"
              />
            </div>
            <div className="flex justify-between items-center w-full">
              <p className="max-w-[90%] truncate font-medium text-lg sm:text-xl lg:text-2xl text-[#CFCFCF]">
                {project.title}
              </p>
              <ArrowRight className="size-5 sm:size-6 text-[#E6E6E6]" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PortfolioProjects;
