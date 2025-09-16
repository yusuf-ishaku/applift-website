import { HowWeWorkVector } from "../svgs";

type Content = {
  title: string;
  content: string;
};

const item: Content[] = [
  {
    title: "Data and judgement",
    content:
      "Decisions use data when we have it and good judgment when we don’t.",
  },
  {
    title: "Iterate Fast",
    content: "Small experiments, quick learnings, and continual improvements.",
  },
  {
    title: "Outcome First",
    content: "We design around the problem, not the tech.",
  },
  {
    title: "Clear communication",
    content: "Proactive updates and aligned expectations reduce surprises.",
  },
];

export const HowWeWork = () => {
  return (
    <div className="mt-16 md:mt-[80.69px] px-4">
      <h2 className="font-medium text-2xl md:text-[40px] md:leading-[50px] text-center text-white">
        How We Work
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 md:gap-[24px] mt-8 place-items-center">
        {item.map((item, index) => (
          <div
            key={index}
            className="relative overflow-hidden rounded-md flex items-center bg-gradient-to-l from-[rgba(0,11,20,0.2)] to-[rgba(1,73,132,0)] w-full max-w-[379px] h-auto md:min-h-[200px] py-8 px-6"
          >
            <HowWeWorkVector className="size-full absolute -top-4 left-0" />

            <div className="flex flex-col items-start gap-3 relative z-10">
              <h4 className="font-medium text-lg md:text-[24px] md:leading-[30px] text-[#FAFAFA]">
                {item.title}
              </h4>
              <p className="text-sm md:text-[20px] md:leading-[25px] text-[#CFCFCF]">
                {item.content}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
