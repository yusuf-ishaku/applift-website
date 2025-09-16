import companyMembers from "@/assets/images/company-members.png";
import { Separator } from "@/components/ui/separator";

const Team = () => {
  return (
    <section className="px-4">
      <div className="mt-20 md:mt-44 max-w-[1077px] mx-auto space-y-8 md:space-y-[48px]">
        <p className="text-base leading-[22px] md:text-[24px] md:leading-[30px] text-center text-[#E6E6E6]">
          We believe in collaboration, curiosity, and building with intent. Our
          people are problem-solvers, designers, and developers passionate about
          shaping better digital experiences
        </p>
        <Separator className="[background-image:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)] w-full max-w-[441px] mx-auto" />
      </div>

      <div className="mt-12 md:mt-[78.69px]">
        <img
          src={companyMembers}
          alt="Company team members"
          className="w-full max-w-[773.5px] h-auto mx-auto"
        />
      </div>

      <div className="mt-12 md:mt-[61.59px] max-w-[691px] mx-auto space-y-8 md:space-y-[48px]">
        <p className="text-base leading-[22px] md:text-[24px] md:leading-[30px] text-center text-[#E6E6E6]">
          Our Mission & Vision is to Help organizations and founders ship useful
          technology that creates better opportunities for people & Be the
          trusted place clients turn to for practical, high-quality software and
          research-driven product thinking across Africa and beyond.
        </p>
        <Separator className="[background-image:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)] w-full max-w-[441px] mx-auto" />
      </div>
    </section>
  );
};

export default Team;
