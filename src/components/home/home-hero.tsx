import bentlight from "@/assets/images/bent-light.png";
import { Button } from "../ui/button";

const HomeHero = () => {
  return (
    <>
      <div>
        <div className="hero flex items-center relative overflow-y-hidden">
          <div className="flex flex-col items-center gap-[40px] max-w-4xl min-h-[218px] mx-auto">
            <div className="flex items-center flex-col gap-[28px]">
              <h2 className="font-medium text-[48px] leading-[60px] text-[#FAFAFA] text-center">
                Software Solutions That Drive Growth!
              </h2>
              <p className="text-[18px] leading-[23px] text-center text-[#E6E6E6]">
                From strategy to execution, we build digital products that solve
                real problems—for businesses, founders, and teams.
              </p>
            </div>
            <div className="box-border flex items-center justify-center gap-[10px]">
              <Button
                variant="outline"
                className="min-w-[182px] pb-3 min-h-[44px] rounded-[10px] border-2 !border-[#0264B5] text-[#0264B5] text-[14px] leading-[18px] !bg-transparent"
              >
                See Our Projects
              </Button>
            </div>
          </div>
          <div className="flex absolute bottom-0 w-full justify-end">
            <div
              className="basis-1/2 h-[659px] [background-size:100%] translate-y-[47%] bg-no-repeat"
              style={{
                backgroundImage: `url(${bentlight})`,
              }}
            />
            <div
              className="basis-1/2 h-[659px] [background-size:100%] translate-y-[47%] -scale-x-100 bg-no-repeat"
              style={{
                backgroundImage: `url(${bentlight})`,
              }}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeHero;
