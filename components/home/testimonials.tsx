"use client";

import thumbnail from "@/assets/images/testimonial-thumbnail.png";
import ceo from "@/assets/images/testimonial.png";
import clsx from "clsx";
import Autoplay from "embla-carousel-autoplay";
import type { StaticImageData } from "next/image";
import { useEffect, useState } from "react";
import { AutoplayVideo } from "../global/autoplay-video";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "../ui/carousel";
import ceo2 from "@/assets/images/testimonial-1.png";
import thumbnail2 from "@/assets/images/thumbnail2.png";

type Testimonial = {
  author: {
    image: StaticImageData;
    name: string;
    bio: string;
  };
  content: string;
  bgVideo: string;
  poster: StaticImageData;
};

const testimonials: Testimonial[] = [
  {
    author: {
      bio: "CEO, SwiftRides",
      image: ceo,
      name: "David Mensah",
    },
    bgVideo: "/videos/testimonial.mp4",
    content:
      "They didn’t just build what we asked for, they built what we actually needed",
    poster: thumbnail,
  },
  {
    author: {
      bio: "Product Manager, Retail360",
      image: ceo2,
      name: "Amaka Udo",
    },
    bgVideo: "/videos/testimonial-1.mp4",
    content:
      "Applift translated our idea into a working MVP in weeks, not months",
    poster: thumbnail2,
  },
  {
    author: {
      bio: "CEO, SwiftRides",
      image: ceo,
      name: "David Mensah",
    },
    bgVideo: "/videos/testimonial.mp4",
    content:
      "They didn’t just build what we asked for, they built what we actually needed",
    poster: thumbnail,
  },
  {
    author: {
      bio: "Product Manager, Retail360",
      image: ceo2,
      name: "Amaka Udo",
    },
    bgVideo: "/videos/testimonial-1.mp4",
    content:
      "Applift translated our idea into a working MVP in weeks, not months",
    poster: thumbnail2,
  },
];

const Testimonials = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const barWidth = 100 / (testimonials.length + 3);

  return (
    <Carousel
      setApi={setApi}
      className="!px-0"
      opts={{ align: "start", loop: true }}
      plugins={[Autoplay({ delay: 6000 })]}
    >
      {/* Section title */}
      <div className="absolute top-6 left-4 md:top-[52px] md:left-[80px] flex items-center gap-2 rounded-full border border-[#E6F0F8] bg-black/20 px-4 md:px-8 py-2">
        <p className="text-sm md:text-lg lg:text-xl font-medium text-white">
          Testimonials
        </p>
      </div>

      <CarouselContent>
        {testimonials.map((item, index) => (
          <CarouselItem key={index} className="basis-full">
            <AutoplayVideo
              src={item.bgVideo}
              poster={item.poster}
              className="-z-50 after:content-[''] after:absolute after:z-10 after:bg-black/40 after:size-full"
            />
            <div className="relative h-[400px] md:h-[500px] lg:h-[677px]">
              <div className="absolute inset-x-4 bottom-6 md:inset-x-[80px] md:bottom-[60px] flex flex-col lg:flex-row items-center lg:items-stretch justify-between gap-6 lg:gap-12">
                {/* Content */}
                <div className="flex flex-col items-start pb-10 gap-6 md:gap-10 max-w-full lg:max-w-[752px] text-center lg:text-left">
                  <h4 className="text-lg md:text-2xl lg:text-4xl font-medium leading-snug text-white">
                    {item.content}
                  </h4>
                </div>

                {/* Author card */}
                <div className="flex items-center gap-4 md:gap-6 rounded-[10px] border border-white/10 bg-white/5 backdrop-blur-xs px-4 md:px-6 py-3 md:py-4 min-w-[250px] md:min-w-[300px] lg:min-w-[375px]">
                  <Avatar className="size-[60px] md:size-[80px] lg:size-[100px]">
                    <AvatarImage src={item.author.image.src} />
                    <AvatarFallback>
                      {item.author.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start gap-1 md:gap-2">
                    <h4 className="text-base md:text-lg lg:text-2xl font-medium text-white">
                      {item.author.name}
                    </h4>
                    <p className="text-sm md:text-base lg:text-lg text-[#B7B7B7]">
                      {item.author.bio}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>

      {/* Progress indicators */}
      <div className="absolute translate-x-1 inset-x-4 bottom-2 md:inset-x-[80px] md:bottom-[60px]">
        <div className="w-full max-w-[169px] flex items-center gap-1 max-md:mx-auto">
          {Array.from({ length: testimonials.length }).map((_, tileIndex) => {
            const active = current === tileIndex + 1;
            const width = active ? barWidth * 3 : barWidth;
            return (
              <span
                key={tileIndex}
                onClick={() => api?.scrollTo(tileIndex)}
                className={clsx(
                  "inline-block h-1.5 rounded-sm transition-[flex-basis,background-color] duration-500",
                  active ? "bg-[#0264B5]" : "bg-[#9F9F9F]",
                )}
                style={{ flexBasis: `${width}%` }}
              />
            );
          })}
        </div>
      </div>

      {/* Arrows */}
      <CarouselPrevious className="left-2 md:left-[80px] size-12 md:size-[60px] lg:size-[81px] !bg-transparent !border-[#CFCFCF] opacity-70 [&_svg]:!size-5 md:[&_svg]:!size-6 lg:[&_svg]:!size-8 [&_svg]:text-[#E6E6E6] max-md:top-1/4" />
      <CarouselNext className="right-2 md:right-[80px] size-12 md:size-[60px] lg:size-[81px] !bg-transparent !border-[#CFCFCF] opacity-70 [&_svg]:!size-5 md:[&_svg]:!size-6 lg:[&_svg]:!size-8 [&_svg]:text-[#E6E6E6] max-md:top-1/4" />
    </Carousel>
  );
};

export default Testimonials;
