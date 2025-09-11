import logoxl from "@/assets/images/logo-xl.png";
import { socials } from "@/constants/socials";
import { Link, linkOptions } from "@tanstack/react-router";
import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Separator } from "../ui/separator";

function SlantedBox({
  className,
  height,
}: {
  className: string;
  height: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");

    const width = 64;
    const height = 110;

    canvas.width = width;
    canvas.height = height;

    if (!ctx) return;

    ctx.clearRect(0, 0, width, height);
    ctx.strokeStyle = "#014883"; // your color
    ctx.lineWidth = 1;

    // Slanted lines (45° style)
    const spacing = 12; // adjust for density
    for (let y = -height; y < width; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(y, 0);
      ctx.lineTo(y + height, height);
      ctx.stroke();
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={clsx("block absolute bottom-0 w-16", className)}
      style={{ height: `${height - 1}px` }}
    />
  );
}

const links = linkOptions([
  {
    to: "/blog",
    label: "Blog",
  },
  {
    to: "/services" as never,
    label: "Our Services",
  },
  {
    to: "/about" as never,
    label: "About Us",
  },
  {
    to: "/privacy-policy" as never,
    label: "Privacy Policy",
  },
  {
    to: "/contact",
    label: "Contact",
  },
]);

const Footer = () => {
  const canvasSeparatorRef = useRef<HTMLDivElement>(null);
  const secondSeparatorRef = useRef<HTMLDivElement>(null);
  const thirdSeparatorRef = useRef<HTMLDivElement>(null);
  const fifthSeparatorRef = useRef<HTMLDivElement>(null);

  const [distances, setDistances] = useState<{
    canvas?: number;
    second?: number;
    third?: number;
    fifth?: number;
  }>({});

  useLayoutEffect(() => {
    function calcDistance(el: HTMLDivElement | null) {
      if (!el) return null;
      const separatorBottom =
        el.getBoundingClientRect().bottom + window.scrollY;
      const pageHeight = document.documentElement.scrollHeight;
      return pageHeight - separatorBottom;
    }

    function update() {
      setDistances({
        canvas: calcDistance(canvasSeparatorRef.current) ?? undefined,
        second: calcDistance(secondSeparatorRef.current) ?? undefined,
        third: calcDistance(thirdSeparatorRef.current) ?? undefined,
        fifth: calcDistance(fifthSeparatorRef.current) ?? undefined,
      });
    }

    update(); // initial

    const controller = new AbortController();

    window.addEventListener("resize", update, {
      signal: controller.signal,
    });
    window.addEventListener("scroll", update, {
      signal: controller.signal,
    });

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <>
      <footer className="dark:bg-[#00060A] relative hidden lg:flex flex-col gap-[27px] mt-[150px] items-center py-5">
        <Separator className="bg-[#014883]" />
        <h4 className="font-bold text-[20px] leading-[25px] tracking-[0.79em] uppercase text-[#878787] text-center">
          Turning ideas into real software
        </h4>
        <Separator ref={secondSeparatorRef} className="bg-[#014883]" />
        <img src={logoxl} draggable={false} className="w-[142.14px]" />
        <Separator className="bg-[#014883]" ref={thirdSeparatorRef} />
        <div className="flex items-center gap-[96px]">
          {links.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[20px] leading-[25px] text-[#1A1A1A] dark:text-[#E6E6E6]"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Separator ref={canvasSeparatorRef} className="bg-[#014883]" />
        <div className="flex items-center gap-[96px]">
          {socials.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              className="text-[20px] leading-[25px] text-[#1A1A1A] dark:text-[#E6E6E6]"
            >
              {link.label}
            </Link>
          ))}
        </div>
        <Separator
          ref={fifthSeparatorRef}
          className="bg-[#014883] !w-[calc(100%-theme(spacing.80))]"
        />
        <p className="text-[14px] leading-[18px] text-[#878787]">
          © 2025 Applift Labs
        </p>

        {/* SECTION CANVASES  */}
        {distances.canvas && (
          <>
            <SlantedBox className="left-0" height={distances.canvas} />
            <SlantedBox className="right-0" height={distances.canvas} />
          </>
        )}

        {/* SECTION SECOND SEPARATOR BARS */}
        {distances.second && (
          <>
            <div
              className="bg-[#014883] absolute w-[1px] bottom-0 left-16"
              style={{ height: `${distances.second}px` }}
            />
            <div
              className="bg-[#014883] absolute w-[1px] bottom-0 right-16"
              style={{ height: `${distances.second}px` }}
            />
          </>
        )}

        {/* SECTION THIRD SEPARATOR BARS */}
        {distances.third && (
          <>
            <div
              className="bg-[#014883] absolute w-[1px] bottom-0 left-40"
              style={{ height: `${distances.third + 0.25}px` }}
            />
            <div
              className="bg-[#014883] absolute w-[1px] bottom-0 right-40"
              style={{ height: `${distances.third + 0.25}px` }}
            />
          </>
        )}

        {/* SECTION FIFTH SEPARATOR BARS */}
        {distances.fifth && (
          <>
            <div
              className="bg-[#014883] absolute w-[1px] bottom-0 left-80"
              style={{ height: `${distances.fifth + 0.25}px` }}
            />
            <div
              className="bg-[#014883] absolute w-[1px] bottom-0 right-80"
              style={{ height: `${distances.fifth + 0.25}px` }}
            />
          </>
        )}
      </footer>
    </>
  );
};

export default Footer;
