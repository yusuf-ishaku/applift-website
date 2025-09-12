import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";

const FormSection = ({
  options,
  title,
}: {
  title: string;
  options: string[];
}) => {
  return (
    <div className="flex flex-col items-start gap-4">
      <h5 className="text-base sm:text-[18px] leading-relaxed text-[#FAFAFA]">
        {title}
      </h5>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {options.map((option) => (
          <Button
            variant="outline"
            key={option}
            className="rounded-lg border border-[#012D51] !bg-transparent text-sm sm:text-[16px] text-[#4F4F4F] dark:text-[#CFCFCF] px-3 py-2"
          >
            {option}
          </Button>
        ))}
      </div>
    </div>
  );
};

const HelpForm = () => {
  return (
    <div className="bg-[linear-gradient(270deg,rgba(0,11,20,0.2)_0%,rgba(1,73,132,0)_100%)] rounded-lg w-full max-w-md sm:max-w-lg lg:max-w-[594px] p-4 sm:p-6 lg:p-8 mx-auto">
      <div className="flex flex-col items-center gap-6 sm:gap-8">
        <div className="flex flex-col items-start gap-6 sm:gap-8 w-full">
          <FormSection
            title="I'm looking for help with:"
            options={[
              "MVP Build",
              "App Design",
              "Web Platform",
              "AI Integration",
              "Software Development",
              "UI/UX Audit",
              "Product Management",
              "Business Development",
            ]}
          />

          <FormSection
            title="I'm budgeting around:"
            options={["Under $5K", "$5K-10K", "$10K-30K", "$30K+"]}
          />

          <div className="flex flex-col items-start gap-4 sm:gap-6 w-full">
            <h5 className="text-base sm:text-[18px] text-[#060606] dark:text-[#FAFAFA]">
              Contact Us:
            </h5>
            <div className="flex flex-col sm:flex-row sm:gap-4 w-full">
              <Input
                placeholder="Name"
                className="!bg-transparent rounded-lg flex-1"
              />
              <Input
                placeholder="Email"
                type="email"
                className="!bg-transparent rounded-lg flex-1 mt-2 sm:mt-0"
              />
            </div>
            <Textarea
              placeholder="Project Overview"
              className="w-full !bg-transparent mt-2 appearance-none"
            />
          </div>
        </div>

        <Button className="mt-2 w-full sm:w-auto h-11 sm:h-[44px] rounded-lg">
          Send Message
        </Button>
      </div>
    </div>
  );
};

export default HelpForm;
