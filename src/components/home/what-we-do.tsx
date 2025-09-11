import appliftlogo from "@/assets/images/applift-logo.png";
import clsx from "clsx";
import { Circle } from "lucide-react";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";

type Card = {
  title: string;
  items: string[];
};

const cards: Card[] = [
  {
    title: "Software & Solutions",
    items: [
      "Business-critical tools (ERPs, CRMs, internal apps)",
      "Product discovery & validation",
      "Founder MVPs & startup launches",
    ],
  },
  {
    title: "UX Audits & Improvements.",
    items: [
      "Full UX/UI audits & usability reports",
      "Actionable fixes for retention & conversion",
      "Evidence-based improvements",
    ],
  },
  {
    title: "In-House Products",
    items: [
      "Whisperads (ad tech experiment)",
      "Catura (mobility platform)",
      "Applift Labs: testing & scaling new ideas",
    ],
  },
  {
    title: "Research & Insights",
    items: [
      "Applift Reports on African markets",
      "POS, CRM & digital adoption insights",
      "Sector briefs for strategy & product decisions",
    ],
  },
];

const WhatWeDo = () => {
  const refA = useRef<HTMLDivElement>(null);
  const refB = useRef<HTMLDivElement>(null);
  const [distance, setDistance] = useState<number | null>(null);

  useLayoutEffect(() => {
    const calculateDistance = () => {
      if (refA.current && refB.current) {
        const rectA = refA.current.getBoundingClientRect();
        const rectB = refB.current.getBoundingClientRect();

        // Distance from top of A to bottom of B
        const dist = rectB.bottom - rectA.top;
        setDistance(dist);
      }
    };

    calculateDistance();
    const controller = new AbortController();
    window.addEventListener("resize", calculateDistance, {
      signal: controller.signal,
    }); // recalc on resize

    return () => controller.abort();
  }, []);

  const [step, setStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="mt-[80px] hidden lg:block">
        <div>
          <div className="box-borer flex items-center justify-center py-[16px] px-[33px] gap-[10px] w-[202px] mx-auto rounded-[30px] bg-[#00060A]">
            <h4 className="font-medium text-[20px] leading-[25px] text-center text-[#B3D1E9]">
              What We Do
            </h4>
          </div>
          <div className="min-h-[689px] mt-[36px] relative">
            <div className="absolute size-full -bottom-2">
              {distance && (
                <div
                  className="mx-auto hidden lg:block rounded-full scale-110 bg-background flex items-center justify-center"
                  style={{
                    height: `${distance}px`,
                    width: `${distance}px`,
                  }}
                >
                  <div className="rounded-full size-[73%] border-border border-solid border flex items-center justify-center">
                    <div
                      className={clsx(
                        "rounded-full size-[202px] flex items-center justify-center transition-colors duration-500",
                        step >= 4 && "bg-[rgba(1,72,131,0.2)]",
                      )}
                    >
                      <div
                        className={clsx(
                          "rounded-full size-[175px] flex items-center justify-center transition-colors duration-500",
                          step >= 3 && "bg-[rgba(53,131,196,0.2)]",
                        )}
                      >
                        <div
                          className={clsx(
                            "rounded-full size-[137px] flex items-center justify-center transition-colors duration-500",
                            step >= 2 && "bg-[rgba(78,147,203,0.2)]",
                          )}
                        >
                          <div
                            className={clsx(
                              "rounded-full size-[100px] flex items-center justify-center transition-colors duration-500",
                              step >= 1 && "bg-[rgba(103,162,211,0.2)]",
                            )}
                          >
                            <img
                              src={appliftlogo}
                              draggable={false}
                              className="[clip-path:inset(0_0_30%_0)] mt-4 scale-100"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <Separator className="absolute top-[47.8%]" />
              <Separator
                className="absolute left-[calc(50%)] h-full z-10 top-0"
                orientation="vertical"
              />
            </div>
            <div className="h-full grid grid-cols-2 grid-rows-2 gap-y-[66.5px] gap-x-[220.5px]">
              {cards.map((card, index) => (
                <div
                  key={index}
                  ref={
                    index === 0
                      ? refA
                      : index === cards.length - 1
                        ? refB
                        : undefined
                  }
                  className="group flex even:items-end flex-col gap-y-[36px]"
                >
                  <h5 className="font-medium text-[32px] leading-[40px] text-white">
                    {card.title}
                  </h5>
                  <div
                    className={clsx(
                      "w-[500.63px] bg-[#00111E] flex group-even:justify-end group-[&:nth-child(-n+2)]:items-start group-[&:nth-child(n+3):nth-child(-n+4)]:items-end",
                      "group-odd:pr-0 group-even:pl-0 p-[24px] group-[&:nth-child(-n+2)]:pb-[53.5px] group-[&:nth-child(n+3)]:pt-[28px]",
                      // "group-[&:nth-child(1)]:[clip-path:path('M0_0H418H500.626C445.5_8_315.507_138.985_327.5_250.5H0V0Z')]",
                      // "group-[&:nth-child(2)]:[clip-path:path('M501.5_0H83.5003H0.874023C56_8_184.994_138.985_173_250.5H501.5V0Z')]",
                      // "group-[&:nth-child(3)]:[clip-path:path('M0_234H365H529.5C329.5_156.5_329.5_0_329.5_0H0V234Z')]",
                      // "group-[&:nth-child(4)]:[clip-path:path('M529.5_234H164.5H0C189_137_190.5_0_190.5_0H529.5V234Z')]",
                    )}
                  >
                    <div className="w-[307px] flex flex-col items-start gap-[24px]">
                      {card.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex group-even:flex-row-reverse items-start gap-[16px] w-full"
                        >
                          <Circle className="size-[12px] fill-[#67A2D3] stroke-[#67A2D3] translate-y-1.5" />
                          <div className="group-even:text-right">{item}</div>
                        </div>
                      ))}
                    </div>
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

export default WhatWeDo;
