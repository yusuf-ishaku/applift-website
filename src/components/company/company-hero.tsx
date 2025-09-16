import { Button } from "../ui/button";

const CompanyHero = () => {
  return (
    <section className="hero pb-16 md:pb-24 !mx-0 rounded-[60px] md:rounded-[100px]">
      <div className="flex flex-col items-center gap-8 md:gap-[40px] max-w-[881px] mx-auto mt-16 md:mt-[115px] px-2 text-center">
        <div className="flex flex-col items-center gap-6 md:gap-[28px]">
          <h2 className="font-medium text-3xl leading-[42px] md:text-[48px] md:leading-[60px] text-[#FAFAFA]">
            Building Products With You,
            <br />
            For the World
          </h2>
          <p className="text-base md:text-xl text-[#E6E6E6] md:max-w-[75%]">
            We’re a technology company helping organizations and founders turn
            ideas into practical, human-centered software
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-[16px] max-w-[380px] mx-auto w-full">
          <Button
            variant="outline"
            className="flex-1 border-box !border-[#0264B5] rounded-[10px] !bg-transparent"
          >
            <a
              href="#"
              className="font-medium text-[14px] leading-[18px] text-center text-[#0264B5]"
            >
              See Our Projects
            </a>
          </Button>
          <Button className="flex-1 border-box rounded-[10px]">
            <a
              href="#"
              className="font-medium text-[14px] leading-[18px] text-center"
            >
              Lets Work Together
            </a>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CompanyHero;
