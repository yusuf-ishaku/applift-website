import bentlight from "@/assets/images/bent-light.png";
import { Button } from "../ui/button";

const HomeHero = () => {
  return (
    <>
      <div>
        <div className="hero flex items-center relative overflow-y-hidden">
          <div className="flex flex-col items-center gap-[40px] max-w-4xl lg:min-h-[218px] mx-auto px-2">
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

              <Button
                variant="outline"
                className="px-6 py-3 rounded-[10px] border-2 !border-[#0264B5] text-[#0264B5] text-sm sm:text-base !bg-transparent"
              >
                See Our Projects
              </Button>
            </div>
          </div>
          <div className="flex h-full absolute lg:bottom-0 w-full justify-end">
            <div
              className="basis-1/2 [background-size:100%] bg-center translate-y-[47%] bg-no-repeat"
              style={{
                backgroundImage: `url(${bentlight.src})`,
              }}
            />
            <div
              className="basis-1/2 [background-size:100%] bg-center translate-y-[47%] -scale-x-100 bg-no-repeat"
              style={{
                backgroundImage: `url(${bentlight.src})`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHero;
