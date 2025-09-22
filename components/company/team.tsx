import { Separator } from "@/components/ui/separator";
import { ScrollArea, ScrollBar } from "../ui/scroll-area";
import { teamMembers } from "@/constants/team";
import Image from "next/image";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

const Team = () => {
  return (
    <section className="px-4">
      {/* Mission + Vision */}
      <div className="mt-16 md:mt-32 max-w-5xl mx-auto space-y-6 md:space-y-12">
        <p className="text-sm md:text-xl leading-relaxed text-center text-[#E6E6E6]">
          Our Mission & Vision is to Help organizations and founders ship useful
          technology that creates better opportunities for people & Be the
          trusted place clients turn to for practical, high-quality software and
          research-driven product thinking across Africa and beyond.
        </p>
        <Separator className="[background-image:linear-gradient(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)] w-full max-w-sm mx-auto" />
      </div>

      {/* Team Section */}
      <div className="space-y-12 md:space-y-16">
        <div className="flex flex-col items-center gap-6 max-w-2xl mx-auto text-center">
          <div className="flex items-center justify-center min-h-[50px] px-6 bg-[#00060A] rounded-full">
            <h3 className="text-lg md:text-xl font-medium text-[#B3D1E9]">
              Our Team
            </h3>
          </div>
          <p className="text-lg md:text-2xl leading-snug text-white">
            At Applift, our strength lies in the people behind the work.
          </p>
        </div>

        {/* Scrollable Team Cards */}
        <ScrollArea className="w-full whitespace-nowrap">
          <div className="flex w-max space-x-4 py-4">
            {teamMembers.map((member) => (
              <figure
                key={member.name}
                className="shrink-0 flex flex-col even:flex-col-reverse gap-6 items-center w-[250px] sm:w-[280px] md:w-[320px] lg:w-[338px] h-auto group"
              >
                {/* Image */}
                <div className="overflow-hidden rounded-xl w-full aspect-[338/359] relative">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover rounded-xl size-full mix-blend-luminosity object-center"
                  />
                  <div className="absolute bottom-5 inset-x-0">
                    <Link
                      href={member.slug ? `/company/${member.slug}` : "#"}
                      className="size-14 sm:size-16 mx-auto block"
                    >
                      <Button
                        className="!bg-[#00060A] border-[#CFCFCF] size-full rounded-full"
                        variant="outline"
                      >
                        <ArrowRight className="!size-5 sm:size-6" />
                      </Button>
                    </Link>
                  </div>
                </div>

                {/* Caption */}
                <figcaption className="flex flex-col gap-2 items-center">
                  <h4 className="font-medium text-lg md:text-xl text-center text-[#CFCFCF]">
                    {member.name}
                  </h4>
                  <p className="text-sm md:text-base text-[#B7B7B7] text-center leading-snug">
                    {member.role}
                  </p>
                </figcaption>
              </figure>
            ))}
          </div>
          <ScrollBar orientation="horizontal" />
        </ScrollArea>
      </div>
    </section>
  );
};

export default Team;
