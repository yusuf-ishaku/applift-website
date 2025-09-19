import clsx from "clsx";
import work1 from "@/assets/images/work1.png";
import work2 from "@/assets/images/work2.png";
import work3 from "@/assets/images/work3.png";
import work4 from "@/assets/images/work4.png";
import work5 from "@/assets/images/work5.png";
import { Button } from "../ui/button";
import type { StaticImageData } from "next/image";

type Slot = {
  img: StaticImageData;
  className?: string;
};

const slots: Slot[] = [
  {
    img: work1,
    className:
      "rotate-[-30.25deg] group-hover:rotate-[-20.05deg] group-hover:-translate-x-12 md:group-hover:-translate-x-[28rem] group-hover:translate-y-20 md:group-hover:translate-y-52",
  },
  {
    img: work2,
    className:
      "rotate-[-13.53deg] group-hover:rotate-[11.6deg] group-hover:-translate-x-10 max-md:group-hover:-translate-y-4 md:group-hover:-translate-x-86",
  },
  {
    img: work3,
    className:
      "rotate-[3.53deg] group-hover:rotate-[-20.24deg] max-md:group-hover:translate-y-10",
  },
  {
    img: work4,
    className:
      "rotate-[19.34deg] translate-y-2 group-hover:rotate-[15.74deg] group-hover:translate-x-10 max-md:group-hover:-translate-y-4 md:group-hover:translate-x-86",
  },
  {
    img: work5,
    className:
      "rotate-[27.56deg] group-hover:rotate-[23.48deg] translate-y-8 group-hover:translate-x-12 md:group-hover:translate-x-[28rem] group-hover:translate-y-20 md:group-hover:translate-y-52",
  },
];

const WorkHero = () => {
  return (
    <section className="mt-12 rounded-b-[60px] md:rounded-b-[100px] flex items-center hero pb-16 md:pb-24 px-4 max-md:overflow-x-hidden max-md:overflow-y-visible">
      <div className="flex flex-col gap-6 md:gap-8 max-w-5xl mx-auto">
        {/* Image Stack */}
        <div className="group mx-auto -space-x-8 sm:-space-x-12 md:-space-x-16 min-w-[180px] min-h-[180px] max-md:translate-y-4">
          {slots.map((slot, index) => (
            <div
              key={index}
              style={{
                backgroundImage: `url(${slot.img.src})`,
              }}
              className={clsx(
                "w-[80px] h-[100px] sm:w-[100px] sm:h-[120px] md:w-[119.53px] md:h-[147.56px] inline-block bg-center bg-cover bg-no-repeat rounded-xl transition-all duration-300",
                slot.className,
              )}
            />
          ))}
        </div>

        {/* Text */}
        <div className="flex flex-col justify-center items-center gap-6 text-center">
          <h2 className="font-medium text-2xl sm:text-3xl md:text-5xl leading-tight md:leading-[60px] text-[#FAFAFA] max-w-4xl">
            Bold ideas, thoughtfully brought to life
          </h2>
          <p className="text-base sm:text-lg md:text-[18px] leading-relaxed text-[#CFCFCF] max-w-2xl">
            A collection of client work, passion experiments, and explorations,
            crafted to solve problems and spark impact.
          </p>
        </div>

        {/* CTA */}
        <div className="flex items-center justify-center">
          <Button
            variant="outline"
            className="min-w-[150px] md:min-w-[182px] h-[40px] md:h-[44px] rounded-[10px] border-2 !border-[#0264B5] text-[#0264B5] text-sm md:text-[14px] !bg-transparent"
          >
            Start a Project
          </Button>
        </div>
      </div>
    </section>
  );
};

export default WorkHero;
