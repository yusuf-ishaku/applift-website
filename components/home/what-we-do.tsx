"use client";

import appliftlogo from "@/assets/images/applift-logo.png";
import clsx from "clsx";
import { Circle } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";
import Image from "next/image";

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

  const [step, setStep] = useState(0);

  useEffect(() => {
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
    window.addEventListener("load", calculateDistance, {
      signal: controller.signal,
    });

    return () => controller.abort();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setStep((prev) => (prev + 1) % 5);
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <div className="mt-[80px]">
        <div>
          <div className="box-borer flex items-center justify-center py-[16px] px-[33px] gap-[10px] w-[202px] mx-auto rounded-[30px] bg-[#00060A]">
            <h4 className="font-medium text-[20px] leading-[25px] text-center text-[#B3D1E9]">
              What We Do
            </h4>
          </div>
          <div className="min-h-[689px] mt-[36px] relative">
            <div className="absolute -z-10 lg:z-10 opacity-30 lg:opacity-100 size-full bottom-0 flex items-center">
              {distance && (
                <div
                  className="mx-auto rounded-full h-full lg:scale-[115%] lg:bg-background flex items-center justify-center translate-y-1"
                  style={{
                    height: `${distance}px`,
                    width: `${distance}px`,
                  }}
                >
                  <div className="rounded-full size-[73%] border-border border-solid lg:border flex items-center justify-center">
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
                            <Image
                              src={appliftlogo}
                              draggable={false}
                              className="[clip-path:inset(0_0_30%_0)] mt-4 scale-100"
                              alt="Applift Logo"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <Separator className="absolute top-[50%] hidden lg:block" />
              <Separator
                className="absolute left-[calc(50%)] h-full z-10 top-0 hidden lg:block"
                orientation="vertical"
              />
            </div>
            <div className="h-full grid lg:grid-cols-2 gap-y-10 lg:gap-y-[66.5px] lg:gap-x-[220.5px]">
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
                  className="group flex lg:even:items-end flex-col gap-y-4 lg:gap-y-[36px]"
                >
                  <h5 className="font-medium text-2xl sm:text-3xl md:text-[32px] leading-snug sm:leading-normal md:leading-[40px] text-white">
                    {card.title}
                  </h5>
                  <div
                    className={clsx(
                      "lg:w-[500.63px] lg:bg-[#00111E] h-full flex lg:group-even:justify-end group-[&:nth-child(-n+2)]:items-start lg:group-[&:nth-child(n+3):nth-child(-n+4)]:items-end",
                      "lg:group-odd:pr-0 lg:group-even:pl-0 md:p-[24px] lg:group-[&:nth-child(-n+2)]:pb-[53.5px] lg:group-[&:nth-child(n+3)]:pt-[28px]",
                    )}
                  >
                    <div className="lg:w-[307px] flex flex-col items-start gap-[24px]">
                      {card.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex lg:group-even:flex-row-reverse items-start gap-[16px] w-full"
                        >
                          <Circle className="size-[12px] fill-[#67A2D3] stroke-[#67A2D3] translate-y-1.5" />
                          <div className="lg:group-even:text-right">{item}</div>
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
