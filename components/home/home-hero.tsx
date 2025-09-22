import bentlight from "@/assets/images/bent-light.png";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";

const HomeHero = () => {
  return (
    <>
      <div>
        <div className="hero flex items-center relative overflow-y-hidden">
          <div className="flex flex-col items-center gap-[40px] max-w-4xl lg:min-h-[218px] mx-auto px-2 relative z-10">
            <div className="flex items-center flex-col gap-[28px]">
              <div className="flex flex-col gap-6 sm:gap-7">
                <h2 className="font-medium text-3xl sm:text-4xl md:text-5xl text-[#FAFAFA] text-center">
                  Software Solutions That Drive Growth.
                </h2>
                <p className="text-base sm:text-lg leading-relaxed text-[#E6E6E6] text-center">
                  From strategy to execution, we build digital products that
                  solve real problems—for businesses, founders, and teams.
                </p>
              </div>

              <Link href="/contact">
                <Button
                  variant="outline"
                  className="px-4 sm:px-6 py-2 rounded-lg border-1 !border-[#0264B5] text-[#0264B5] text-sm sm:text-base !bg-transparent"
                >
                  See Our Projects
                </Button>
              </Link>
            </div>
          </div>
          <div className="flex h-full overflow-hidden absolute lg:bottom-0 w-full justify-end z-0">
            <Image
              src={bentlight}
              alt=""
              draggable={false}
              className="basis-1/2 object-cover max-md:translate-x-1/2 object-center translate-y-[45%]"
            />
            <Image
              src={bentlight}
              alt=""
              draggable={false}
              className="basis-1/2 object-cover max-md:translate-x-1/2 object-center translate-y-[45%] -scale-x-100"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHero;
