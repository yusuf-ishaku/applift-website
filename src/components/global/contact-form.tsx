import gradientGlass from "@/assets/images/gradient-glass.png";
import HelpForm from "./help-form";
import { ContactFormEclipse } from "../svgs";

const ContactForm = () => {
  return (
    <>
      <div>
        <div className="grid grid-cols-2 items-start gap-[41px]">
          <div className="flex flex-col items-start gap-[64px] relative">
            <ContactFormEclipse className="absolute -top-[45%] -left-1/4 animate-pulse duration-1000" />
            <img
              src={gradientGlass}
              className="w-[217px] h-[232.98px]"
              draggable={false}
            />
            <div className="flex flex-col items-start gap-[24px]">
              <h4 className="font-medium text-[48px] leading-[60px]">
                Have something in mind?
                <br />
                Let’s bring it to life.
              </h4>
              <p className="text-[20px] leading-[25px] text-[#4F4F4F] dark:text-[#CFCFCF]">
                We’d love to hear what you’re building. Whether you’re early or
                ready to launch, reach out
              </p>
            </div>
          </div>
          <HelpForm />
        </div>
      </div>
    </>
  );
};

export default ContactForm;
