"use client";

import clsx from "clsx";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Separator } from "@/components/ui/separator";
import logoxl from "@/assets/images/logo-xl.png";
import Image from "next/image";

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
      className={clsx("absolute bottom-0 w-16", className)}
      style={{ height: `${height - 1.9}px` }}
    />
  );
}

const links = [
  {
    href: "/blog",
    label: "Blog",
  },
  {
    href: "/services",
    label: "Our Services",
  },
  {
    href: "/about",
    label: "About Us",
  },
  {
    href: "/privacy-policy",
    label: "Privacy Policy",
  },
  {
    href: "/contact",
    label: "Contact",
  },
];

const socials = [
  {
    label: "Twitter",
    href: "https://twitter.com",
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com",
  },
  {
    label: "GitHub",
    href: "https://github.com",
  },
];

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
      <footer className="dark:bg-[#00060A] relative flex flex-col gap-y-4 lg:gap-[27px] mt-[150px] items-center py-5">
        <Separator className="bg-[#014883]" />
        <h4 className="font-bold text-sm sm:text-base lg:text-[20px] leading-[25px] tracking-[0.2em] sm:tracking-[0.4em] lg:tracking-[0.79em] uppercase text-[#878787] text-center px-4">
          Turning ideas into real software
        </h4>
        <Separator ref={secondSeparatorRef} className="bg-[#014883]" />
        <Image
          src={logoxl}
          draggable={false}
          className="w-24 sm:w-32 lg:w-[142.14px]"
          alt="Applift Logo"
        />
        <Separator className="bg-[#014883]" ref={thirdSeparatorRef} />
        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8 lg:gap-[96px] px-4">
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-sm sm:text-base lg:text-[20px] leading-[25px] text-[#1A1A1A] dark:text-[#E6E6E6] text-center hover:opacity-80 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>
        <Separator ref={canvasSeparatorRef} className="bg-[#014883]" />
        <div className="flex items-center justify-center flex-wrap gap-4 sm:gap-8 lg:gap-[96px] px-4">
          {socials.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm sm:text-base lg:text-[20px] leading-[25px] text-[#1A1A1A] dark:text-[#E6E6E6] text-center hover:opacity-80 transition-opacity"
            >
              {link.label}
            </a>
          ))}
        </div>
        <Separator
          ref={fifthSeparatorRef}
          className="bg-[#014883] !w-[calc(100%-theme(spacing.80))]"
        />
        <p className="text-xs sm:text-sm lg:text-[14px] leading-[18px] text-[#878787] text-center">
          © 2025 Applift Labs
        </p>

        {/* SECTION CANVASES */}
        {distances.canvas && (
          <>
            <SlantedBox
              className="left-0 sm:left-4 lg:left-0 hidden lg:block"
              height={distances.canvas}
            />
            <SlantedBox
              className="right-0 sm:right-4 lg:right-0 hidden lg:block"
              height={distances.canvas}
            />
          </>
        )}

        {/* SECTION SECOND SEPARATOR BARS */}
        {distances.second && (
          <>
            <div
              className="hidden lg:block bg-[#014883] absolute w-[1px] bottom-0 left-4 sm:left-8 lg:left-16"
              style={{ height: `${distances.second}px` }}
            />
            <div
              className="hidden lg:block bg-[#014883] absolute w-[1px] bottom-0 right-4 sm:right-8 lg:right-16"
              style={{ height: `${distances.second}px` }}
            />
          </>
        )}

        {/* SECTION THIRD SEPARATOR BARS */}
        {distances.third && (
          <>
            <div
              className="hidden lg:block bg-[#014883] absolute w-[1px] bottom-0 left-8 sm:left-16 lg:left-40"
              style={{ height: `${distances.third + 0.25}px` }}
            />
            <div
              className="hidden lg:block bg-[#014883] absolute w-[1px] bottom-0 right-8 sm:right-16 lg:right-40"
              style={{ height: `${distances.third + 0.25}px` }}
            />
          </>
        )}

        {/* SECTION FIFTH SEPARATOR BARS */}
        {distances.fifth && (
          <>
            <div
              className="hidden lg:block bg-[#014883] absolute w-[1px] bottom-0 left-12 sm:left-24 lg:left-80"
              style={{ height: `${distances.fifth + 0.25}px` }}
            />
            <div
              className="hidden lg:block bg-[#014883] absolute w-[1px] bottom-0 right-12 sm:right-24 lg:right-80"
              style={{ height: `${distances.fifth + 0.25}px` }}
            />
          </>
        )}
      </footer>
    </>
  );
};

export default Footer;
