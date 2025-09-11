import clsx from "clsx";
import work1 from "@/assets/images/work1.png";
import work2 from "@/assets/images/work2.png";
import work3 from "@/assets/images/work3.png";
import work4 from "@/assets/images/work4.png";
import work5 from "@/assets/images/work5.png";
import { Button } from "../ui/button";

type Slot = {
  img: string;
  className?: string;
};

const slots: Slot[] = [
  {
    img: work1,
    className:
      "rotate-[-30.25deg] group-hover:rotate-[-20.05deg] group-hover:-translate-x-[28rem] group-hover:translate-y-52",
  },
  {
    img: work2,
    className:
      "rotate-[-13.53deg] group-hover:rotate-[11.6deg] group-hover:-translate-x-86",
  },
  {
    img: work3,
    className: "rotate-[3.53deg] group-hover:rotate-[-20.24deg]",
  },
  {
    img: work4,
    className:
      "rotate-[19.34deg] translate-y-2 group-hover:rotate-[15.74deg] group-hover:translate-x-86",
  },
  {
    img: work5,
    className:
      "rotate-[27.56deg] translate-y-8 group-hover:translate-x-[28rem] group-hover:translate-y-52 group-hover:rotate-[23.48deg]",
  },
];

const WorkHero = () => {
  return (
    <>
      <div className="mt-[64px] rounded-b-[100px] flex items-center hero pb-24">
        <div className="flex flex-col gap-[24px] max-w-[877px] mx-auto">
          <div className="group mx-auto -space-x-16 min-w-[221.53px] min-h-[211.67px]">
            {slots.map((slot, index) => (
              <div
                key={index}
                // src={slot.img}
                style={{
                  backgroundImage: `url(${slot.img})`,
                }}
                className={clsx(
                  "w-[119.53px] bg-center bg-cover bg-no-repeat h-[147.56px] inline-block rounded-[12.3655px] transition-all duration-300",
                  slot.className,
                )}
              />
            ))}
          </div>
          <div className="flex flex-col justify-center items-center gap-[28px]">
            <h2 className="max-w-[877px] font-medium text-[48px] leading-[60px] text-center text-[#FAFAFA]">
              Bold ideas, thoughtfully brought to life
            </h2>
            <p className="max-w-[560px] text-[18px] leading-[23px] text-center text-[#CFCFCF]">
              A collection of client work, passion experiments, and
              explorations, crafted to solve problems and spark impact.
            </p>
          </div>
          <div className="box-border flex items-center justify-center gap-[10px]">
            <Button
              variant="outline"
              className="min-w-[182px] pb-3 min-h-[44px] rounded-[10px] border-2 !border-[#0264B5] text-[#0264B5] text-[14px] leading-[18px] !bg-transparent"
            >
              Start a Project
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default WorkHero;
