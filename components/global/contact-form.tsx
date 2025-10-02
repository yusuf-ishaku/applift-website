"use client";

import gradientGlass from "@/assets/images/gradient-glass.png";
import { contactFormEclipeDataUrl } from "@/constants";
import Image from "next/image";
import InquiryForm from "./inquiry-form";
import { usePathname } from "next/navigation";

const ContactForm = () => {
  const pathname = usePathname();
  if (pathname === "/contact") return null;
  return (
    <section
      className="bg-no-repeat bg-top md:bg-left"
      style={{
        backgroundImage: `url(${contactFormEclipeDataUrl})`,
      }}
    >
      <section className="px-4 sm:px-6 lg:px-0 py-12 sm:py-16 lg:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 items-start gap-8 sm:gap-10 lg:gap-[41px]">
          {/* Left side */}
          <div className="flex flex-col items-start gap-16">
            <Image
              quality={70}
              src={gradientGlass}
              className="w-48 h-56 sm:w-56 sm:h-64 lg:w-[217px] lg:h-[233px]"
              draggable={false}
              alt="Glass Image"
            />

            <div className="flex flex-col items-start gap-6 sm:gap-8">
              <h4 className="font-medium text-2xl sm:text-3xl lg:text-[48px] lg:leading-[60px]">
                Have something in mind?
                <br />
                Let’s bring it to life.
              </h4>
              <p className="text-base sm:text-lg lg:text-[20px] lg:leading-[25px] text-[#4F4F4F] dark:text-[#CFCFCF]">
                We’d love to hear what you’re building. Whether you’re early or
                ready to launch, reach out
              </p>
            </div>
          </div>

          {/* Right side form */}
          <InquiryForm />
        </div>
      </section>
    </section>
  );
};

export default ContactForm;
