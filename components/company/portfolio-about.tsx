import { socialIconMap } from "@/constants/socials";
import type { TeamMemberDetails } from "@/loaders/company";
import Image from "next/image";
import { useMemo, type FC } from "react";
import z from "zod";
import { Button } from "../ui/button";
import { Separator } from "../ui/separator";

const SocialIcon = ({
  platform,
  url,
}: {
  platform: keyof typeof socialIconMap;
  url: string;
}) => {
  const Icon = socialIconMap[platform];
  return (
    <Button asChild key={platform}>
      <a
        target="_blank"
        href={url}
        className="!size-10 sm:!size-12 !p-0 !bg-[#FAFAFA] !rounded-full flex items-center justify-center"
      >
        <Icon className="!size-5 sm:!size-6 fill-[#575757]" />
      </a>
    </Button>
  );
};

const PortfolioAbout: FC<TeamMemberDetails> = ({
  image,
  name,
  work_role: role,
  bio,
  contact_url,
  facebook,
  linkedin,
  twitter,
}) => {
  const contact = useMemo(() => {
    if (z.email().safeParse(contact_url).success)
      return `mailto:${contact_url}`;
    else if (z.url().safeParse(contact_url).success) return contact_url!;
    else return `tel:${contact_url}`;
  }, [contact_url]);
  return (
    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 md:gap-10 mt-8 md:mt-12">
      {/* Image */}
      <div className="w-40 h-48 sm:w-56 sm:h-64 lg:w-[247px] lg:h-[299px] shrink-0">
        <Image
          quality={70}
          src={image!}
          alt={name}
          width={247}
          height={299}
          className="w-full h-full object-cover object-top rounded-lg mix-blend-luminosity"
        />
      </div>

      {/* Info */}
      <div className="flex flex-col gap-6 flex-1">
        {/* Name + socials */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex flex-col gap-2">
            <h4 className="font-medium text-2xl sm:text-3xl lg:text-[40px] leading-tight text-[#FAFAFA]">
              {name}
            </h4>
            <p className="text-base sm:text-lg lg:text-[20px] text-[#B7B7B7]">
              {role}
            </p>
          </div>

          {(facebook || twitter || linkedin) && (
            <div className="flex items-center gap-3">
              {facebook && (
                <SocialIcon
                  platform="facebook"
                  url={`https://fb.me/${facebook}`}
                />
              )}
              {linkedin && (
                <SocialIcon
                  platform="linkedIn"
                  url={`https://linked.in/in/${linkedin}`}
                />
              )}
              {twitter && (
                <SocialIcon
                  platform="twitter"
                  url={`https://x.com/${twitter}`}
                />
              )}
            </div>
          )}
        </div>

        {/* Separator */}
        <Separator className="h-[2px] !bg-[#012D51]/70 max-md:hidden" />

        {/* Bio */}
        <p className="text-base sm:text-lg lg:text-[20px] text-[#CFCFCF] leading-relaxed">
          {bio}
        </p>

        {/* Contact Button */}
        <a target="_blank" href={contact}>
          <Button
            variant="outline"
            className="px-4 sm:px-6 py-2 rounded-lg border-1 !border-[#0264B5] text-[#0264B5] text-sm sm:text-base !bg-transparent"
          >
            Contact
          </Button>
        </a>
      </div>
    </div>
  );
};

export default PortfolioAbout;
