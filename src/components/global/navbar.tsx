import appliftLogo from "@/assets/images/logo-xl.png";
import { Link, linkOptions } from "@tanstack/react-router";
import { Button } from "../ui/button";
import { Menu } from "lucide-react";

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

// TODO add sheet for navbar

const Navbar = () => {
  return (
    <>
      <nav className="sticky top-4 z-10">
        <div className="h-[97px] mt-[41px] mx-[10px] lg:mx-[80px] rounded-[10px] px-[32px] pt-[26px] pb-[27px] flex items-center justify-between border border-solid [border-image-source:linear-gradixent(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)] bg-background/80 backdrop-blur-xs">
          <div className="dark:bg-transparent lg:p-1.5 rounded-xl">
            <img
              className="w-[69.08px] -ml-3 -mb-3 rounded-none -translate-y-1 lg:translate-y-0 /[clip-path:inset(0_0_30%_0)] lg:[clip-path:none]"
              src={appliftLogo}
              draggable={false}
            />
          </div>
          <div className="gap-[40px] items-center hidden lg:flex">
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
            <Button asChild className="hidden lg:flex">
              <a href="#" className="font-semibold text-[14px] leading-[18px]">
                Start a Project
              </a>
            </Button>
            <Button size="icon" variant="outline">
              <Menu />
            </Button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
