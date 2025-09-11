import appliftLogo from "@/assets/images/applift-logo.png";
import { Link, linkOptions } from "@tanstack/react-router";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";

const links = linkOptions([
  {
    to: "/",
    label: "Home",
  },
  {
    to: "/work",
    label: "Work",
  },
  {
    to: "/company",
    label: "Company",
  },
  {
    to: "/blog",
    label: "Blog",
  },
]);

const Navbar = () => {
  return (
    <>
      <nav className="sticky top-4 /top-[41px] z-10">
        <div className="h-[97px] mt-[41px] mx-[80px] rounded-[10px] px-[32px] pt-[26px] pb-[27px] flex items-center justify-between border border-solid [border-image-source:linear-gradixent(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)] bg-background/80 backdrop-blur-xs">
          <div className="/bg-black/20 dark:bg-transparent p-1.5 rounded-xl">
            <Avatar className="w-[69.08px] h-[52px] rounded-none">
              <AvatarImage src={appliftLogo} draggable={false} />
              <AvatarFallback />
            </Avatar>
          </div>
          <div className="gap-[40px] items-center flex">
            {links.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                className=" text-[16px] leading-[20px]"
                activeProps={{
                  className: "text-primary-50-dark",
                }}
                inactiveProps={{
                  className: "dark:text-neutral-100",
                }}
              >
                {link.label}
              </Link>
            ))}
          </div>
          <div className="">
            <Button asChild>
              <a href="#" className="font-semibold text-[14px] leading-[18px]">
                Start a Project
              </a>
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
