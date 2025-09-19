import appliftLogo from "@/assets/images/logo-xl.png";
import { authClient } from "@/lib/auth-client";
import { Menu } from "lucide-react";
import { useState } from "react";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const links = [
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
];

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = authClient.useSession();
  const pathname = usePathname();
  return (
    <>
      <nav className="sticky top-4 z-50">
        <div className="h-[97px] mt-[41px] mx-[10px] lg:mx-[80px] rounded-[10px] px-[32px] pt-[26px] pb-[27px] flex items-center justify-between border border-solid [border-image-source:linear-gradixent(90.38deg,#00111E_18.59%,rgba(141,141,141,0)_105.12%)] bg-background/80 backdrop-blur-xs">
          <div className="dark:bg-transparent lg:p-1.5 rounded-xl">
            <Image
              className="w-[69.08px] -ml-3 -mb-3 rounded-none -translate-y-1 lg:translate-y-0 /[clip-path:inset(0_0_30%_0)] lg:[clip-path:none]"
              src={appliftLogo}
              alt="Applift Logo"
              draggable={false}
            />
          </div>
          <div className="gap-[40px] items-center hidden lg:flex">
            {links.map((link) => (
              <Link
                key={link.label}
                href={link.to}
                className={clsx(
                  "text-[16px] leading-[20px]",
                  pathname === link.to
                    ? "text-primary-50-dark"
                    : "dark:text-[#cfcfcf]",
                )}
              >
                {link.label}
              </Link>
            ))}
            {session && (
              <Link
                href="/editor/new"
                className="text-[16px] leading-[20px] dark:text-[#cfcfcf]"
              >
                Editor
              </Link>
            )}
          </div>
          <div className="">
            <Button asChild className="hidden lg:flex">
              <a href="#" className="font-semibold text-[14px] leading-[18px]">
                Start a Project
              </a>
            </Button>
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  size="icon"
                  variant="outline"
                  className="lg:hidden bg-transparent"
                >
                  <Menu />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <SheetHeader>
                  <SheetTitle className="text-left">Menu</SheetTitle>
                </SheetHeader>
                <div className="grid flex-1 auto-rows-min gap-6 px-4">
                  {links.map((link) => (
                    <Link
                      key={link.label}
                      href={link.to}
                      className={clsx(
                        "text-base font-medium",
                        pathname === link.to
                          ? "text-primary"
                          : "text-foreground hover:text-primary transition-colors",
                      )}
                      onClick={() => setIsOpen(false)}
                    >
                      {link.label}
                    </Link>
                  ))}
                  {session && (
                    <Link
                      href="/editor/new"
                      className="text-base font-medium text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Editor
                    </Link>
                  )}
                  <div className="pt-4 border-t">
                    <Button asChild className="w-full">
                      <Link
                        href="/contact"
                        className="font-semibold text-[14px] leading-[18px]"
                      >
                        Start a Project
                      </Link>
                    </Button>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
