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
    <div className="grid grid-cols-2 items-start gap-[48px] mt-[89px]">
      <div className="flex flex-col items-start gap-[32px]">
        <div className="flex flex-col items-start gap-[16px]">
          <h2 className="font-medium text-[40px] leading-[50px]">
            Let’s Talk About Your Next Big Move
          </h2>
          <p className="text-[20px] leading-[25px] text-[#CFCFCF]">
            Have a project in mind? Need clarity on how we can support your
            business growth? Our team is ready to listen, share insights, and
            move things forward with you.
          </p>
          <Separator className="mt-[16px] /border-2 /border-solid bg-transparent !h-1 [background-image:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)]" />
        </div>
        <div className="grid grid-cols-2 items-center gap-[24px]">
          {cardData.map((data, index) => (
            <div
              key={index}
              className="box-border [background-image:linear-gradient(270deg,rgba(0,11,20,0.2)_0%,rgba(1,73,132,0)_100%)] rounded-[15px] w-[263px] py-[16px] pl-[16px]"
            >
              <div className="flex flex-col items-start gap-[42px] w-[183px]">
                <div className="flex flex-col items-start gap-[16px]">
                  <div className="bg-[#00111E] rounded-[7.70833px] size-[40px] flex items-center justify-center">
                    <data.icon className="size-[20px] text-[#B3D1E9]" />
                  </div>
                  <p className="text-[14px] leading-[18px]">{data.content}</p>
                </div>
                <a
                  href={data.footer.link}
                  className="text-[14px] leading-[18px] underline text-[#67A2D3]"
                >
                  {data.footer.content}
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
