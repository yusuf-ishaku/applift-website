// TODO MAKE THIS RESPONSIVE FOR MOBILE IF POSSIBLE
"use client";

import clsx from "clsx";
import { useLayoutEffect, useRef, useState, type FC } from "react";
import { BrandingSvg } from "../svgs";

type BlockT = {
  text: string;
  badge: string;
};

const blocks: BlockT[] = [
  {
    text: "AP",
    badge: "💯 User-Centered",
  },
  {
    text: "PLI",
    badge: "🌏️ Built for a Global Stage",
  },
  {
    text: "FT",
    badge: "💡 Market-Smart",
  },
];

const Block: FC<{ block: BlockT; index: number }> = ({ block, index }) => {
  const odd = (index & 1) === 0;
  //   const [distance, setDistance] = useState<number | null>(null);
  const [size, setSize] = useState<{
    width?: number;
    height?: number;
  }>({});
  const ref = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    setSize({
      height: el.offsetHeight,
      width: el.offsetWidth,
    });
    // setDistance(el.offsetHeight * (odd ? 0.75 : 0.5));
  }, [index]);

  return (
    <div
      className="relative"
      style={{
        width: size.width ? `${size.width}px` : "auto",
        height: size.height ? `${size.height}px` : "auto",
      }}
    >
      <h4
        ref={ref}
        className="font-inter text-[286.806px] leading-[347px] [background:linear-gradient(36.35deg,rgba(78,147,203,0.1)_13.74%,rgba(141,141,141,0)_109.64%)] bg-clip-text ![-webkit-background-clip:text] ![-webkit-text-fill-color:transparent] [text-fill-color:transparent] tracking-widest"
      >
        {block.text}
      </h4>
      <div
        className={clsx(
          "absolute left-1/4 right-1/4",
          odd ? "top-3/4" : "top-1/2",
        )}
      >
        <div
          className={clsx(
            "flex items-center",
            index === 1 && "justify-center",
            index === 2 && "justify-end",
          )}
        >
          <BrandingSvg />
        </div>
        <div
          className={clsx(
            "w-full flex",
            index === 0 && "justify-start",
            index === 1 && "justify-center",
            index === 2 && "justify-end",
          )}
        >
          <div
            className={clsx(
              "box-border inline-flex items-center justify-center p-[10px] bg-[#00111E] rounded-[10px] mt-14",
              index === 0 && "rotate-[13.95deg] -translate-x-1/2",
              index === 2 && "-rotate-[13.95deg] translate-x-1/2",
            )}
          >
            {block.badge}
          </div>
        </div>
      </div>
    </div>
  );
};

const Branding = () => {
  return (
    <>
      <div className="hidden md:flex justify-center items-center gap-[5px] w-[1159px] h-[347px] mt-[132px] mx-auto">
        {blocks.map((block, index) => (
          <Block block={block} index={index} key={index} />
        ))}
      </div>
    </>
  );
};

export default Branding;
