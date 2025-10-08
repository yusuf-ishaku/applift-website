import project1 from "@/assets/images/project1.png";
import project2 from "@/assets/images/project2.png";
import project3 from "@/assets/images/project3.png";
import project4 from "@/assets/images/project4.png";
import clsx from "clsx";
import type { Product } from "../global/product-tile";
import ProductTile from "../global/product-tile";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "../ui/carousel";
import { Separator } from "../ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../ui/tabs";

const tabs = [
  "Featured Projects",
  "Web Applications",
  "Mobile Applications",
  "Strategy & Research",
] as const;

const products: Product[] = [
  {
    title: "Destorah E-commerce",
    tags: ["SaaS", "B2B", "Artificial Intelligence"],
    timeToMVP: "4 wks",
    industry: "Health & Wellness",
    platform1: "iOS & Web",
    platform2: "Web & Mobile",
    raised: "$1M",
    url: "#",
    image: project1.src,
    satisfaction: "95%",
  },
  {
    title: "Super Vibes Records",
    tags: ["SaaS", "B2B", "Artificial Intelligence"],
    timeToMVP: "4 wks",
    industry: "Health & Wellness",
    platform1: "iOS & Web",
    platform2: "Web & Mobile",
    raised: "$1M",
    url: "#",
    image: project2.src,
    satisfaction: "95%",
  },
  {
    title: "Lune coin",
    tags: ["SaaS", "B2B", "Artificial Intelligence"],
    timeToMVP: "4 wks",
    industry: "Health & Wellness",
    platform1: "iOS & Web",
    platform2: "Web & Mobile",
    raised: "$1M",
    url: "#",
    image: project3.src,
    satisfaction: "95%",
  },
  {
    title: "Loop Journal",
    tags: ["SaaS", "B2B", "Artificial Intelligence"],
    timeToMVP: "4 wks",
    industry: "Health & Wellness",
    platform1: "iOS & Web",
    platform2: "Web & Mobile",
    raised: "$1M",
    url: "#",
    image: project4.src,
    satisfaction: "95%",
  },
];

const WorkTabs = () => {
  return (
    <>
      <div className="mt-[64px] border-t-2 border-solid border-[#012D51] rounded-t-[100px] !mx-0 pt-20 md:pt-[42px]">
        <Tabs defaultValue={tabs[0]} className="flex flex-col gap-[40px]">
          <div className="flex flex-col items-center gap-y-24 md:gap-y-16 max-w-[843px] mx-auto">
            <TabsList asChild>
              <div className="!grid !grid-cols-2 md:!grid-cols-4 /flex items-center gap-[20px] bg-transparent">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab}
                    value={tab}
                    className={clsx(
                      // Layout & spacing
                      "box-border flex items-center justify-center gap-2 rounded-[16px] sm:rounded-[20px]",
                      "px-2.5 py-2 sm:px-3 sm:py-4", // smaller padding on mobile
                      // Typography
                      "text-sm sm:text-base md:text-[18px] leading-[20px] sm:leading-[23px] font-medium text-center",
                      // Colors
                      "!text-[#B3D1E9] data-[state=active]:!text-[#00060A]",
                      "data-[state=active]:!bg-[#E6F0F8]",
                      // Border
                      "border border-solid [border-image-source:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)]",
                    )}
                  >
                    {tab}
                  </TabsTrigger>
                ))}
              </div>
            </TabsList>
            <Separator className="rounded-[100px] md:!w-[637px] h-[2px] !bg-[#012D51]" />
          </div>
          {tabs.map((tab) => (
            <TabsContent value={tab} key={tab}>
              <Carousel>
                <CarouselContent className="md:flex-col md:!transform-none md:gap-y-[64px] mx-auto -ml-4">
                  {products.map((product, index) => (
                    <CarouselItem
                      key={index}
                      className="md:gap-y-[64px] md:flex md:flex-col"
                    >
                      <ProductTile product={product} />
                      {index != products.length - 1 && (
                        <Separator className="hidden md:block !h-[2px] [background-image:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)] max-w-[744px] mx-auto" />
                      )}
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious
                  variant="default"
                  className="left-0 md:!hidden"
                />
                <CarouselNext
                  variant="default"
                  className="right-0 md:!hidden"
                />
              </Carousel>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </>
  );
};

export default WorkTabs;
