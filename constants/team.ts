import type { StaticImageData } from "next/image";
import type { socialIconMap } from "./socials";
import fortuneIshaku from "@/assets/images/fortune-ishaku.png";
import victoryMartin from "@/assets/images/victory-martin.png";
import mikeOlah from "@/assets/images/mike-olah.png";
import victorJones from "@/assets/images/victor-jones.png";

export const team: {
  image: StaticImageData;
  name: string;
  role: string;
  bio?: string;
  slug?: string;
  socials?: Record<keyof typeof socialIconMap, string>;
  contact?: string;
  project?: {
    image: StaticImageData;
    title: string;
    url?: string;
  }[];
}[] = [
  {
    name: "Fortune Ishaku",
    role: "Founder & CEO",
    image: fortuneIshaku,
  },
  {
    name: "Victory Martin",
    role: "Co-Founder/ Software Engineer",
    image: victoryMartin,
  },
  {
    name: "Mike Olah",
    slug: "mike-olah",
    role: "UI/UX Designer",
    image: mikeOlah,
    bio: "Mike is a UI/UX Designer with over 3 years of experience creating clean, intuitive, and engaging digital products. His work combines a sharp eye for visuals with a deep understanding of user needs, ensuring every product is both functional and delightful to use. At Applift, he leads design direction across client projects and internal ventures.",
    socials: {
      facebook: "#",
      linkedIn: "#",
      twitter: "#",
    },
    contact: "#",
    // TODO ADD FEATURED PROJECTS
  },
  {
    name: "Victor Jones",
    role: "Software Developer",
    image: victorJones,
  },
];
