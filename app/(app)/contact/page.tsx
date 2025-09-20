import HelpForm from "@/components/global/help-form";
import { Separator } from "@/components/ui/separator";
import { seo } from "@/utils/seo";
import type { Metadata } from "next";
import { FaPhone } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export const metadata: Metadata = seo({
  title: "Contact Us",
  description:
    "Get in touch with Applift. Have a project in mind? We're here to support your business growth and answer your questions.",
  pathname: "/contact",
});

const cardData = [
  {
    icon: MdEmail,
    content: "Have questions? We're here to help reach out!",
    footer: {
      content: "hello@applift.xyz",
      link: "mailto:hello@applift.xyz",
    },
  },
  {
    icon: FaPhone,
    content: "Need assistance? Ring us up, we're at your service.",
    footer: {
      content: "+234 5678 555 0922",
      link: "tel:+23456785550922",
    },
  },
];

export default function ContactPage() {
  return (
    <div className="grid md:grid-cols-2 items-start gap-[48px] mt-[89px]">
      <div className="flex flex-col items-start gap-8 px-4 sm:px-6 lg:px-12">
        {/* Heading + description */}
        <div className="flex flex-col items-start gap-4 max-w-2xl">
          <h2 className="font-medium text-3xl sm:text-4xl leading-snug">
            Let’s Talk About Your Next Big Move
          </h2>
          <p className="text-base sm:text-lg text-[#CFCFCF]">
            Have a project in mind? Need clarity on how we can support your
            business growth? Our team is ready to listen, share insights, and
            move things forward with you.
          </p>
          <Separator className="mt-4 bg-transparent !h-1 [background-image:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)]" />
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">
          {cardData.map((data, index) => (
            <div
              key={index}
              className="box-border [background-image:linear-gradient(270deg,rgba(0,11,20,0.2)_0%,rgba(1,73,132,0)_100%)] rounded-xl p-4 flex flex-col justify-between"
            >
              <div className="flex flex-col gap-6">
                <div className="flex flex-col gap-4">
                  <div className="bg-[#00111E] rounded-md size-10 flex items-center justify-center">
                    <data.icon className="size-5 text-[#B3D1E9]" />
                  </div>
                  <p className="text-sm sm:text-base">{data.content}</p>
                </div>
              </div>
              <a
                href={data.footer.link}
                className="mt-4 text-sm sm:text-base underline text-[#67A2D3]"
              >
                {data.footer.content}
              </a>
            </div>
          ))}
        </div>
      </div>
      <HelpForm className="md:-translate-y-6 lg:-translate-y-8" />
    </div>
  );
}
