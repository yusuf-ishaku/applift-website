import { Button } from "../ui/button";

const CompanyHero = () => {
  return (
    <>
      <section className="hero pb-24 !mx-0 rounded-[100px]">
        <div className="flex flex-col items-center gap-[40px] max-w-[881px] mx-auto mt-[115px]">
          <div className="flex flex-col items-center gap-[28px]">
            <h2 className="font-medium leading-[60px] text-[48px] text-center text-[#FAFAFA]">
              Building Products With You, For the World
            </h2>
            <p className="text-[18px] leading-[23px] text-center text-[#E6E6E6]">
              We’re a technology company helping organizations and founders turn
              ideas into practical, human-centered software
            </p>
          </div>
          <div className="flex items-center gap-[16px] max-w-[380px] mx-auto">
            <Button
              variant="outline"
              className="border-box !border-[#0264B5] rounded-[10px] !bg-transparent"
            >
              <a
                href="#"
                className="font-medium text-[14px] leading-[18px] text-center text-[#0264B5]"
              >
                See Our Projects
              </a>
            </Button>
            <Button className="border-box rounded-[10px]">
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
    </>
  );
};

export default CompanyHero;
