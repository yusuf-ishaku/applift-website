import appliftLogo from "@/assets/images/logo-xl.png";

import { LoginForm } from "@/components/login-form";
import { seo } from "@/utils/seo";
import type { Metadata } from "next";
import Image from "next/image";

export const metadata: Metadata = seo({
  title: "Login – Applift",
  description:
    "Sign in to your Applift account to access your dashboard and tools.",
  pathname: "/login",
  robots: {
    index: false,
    follow: false,
  },
});

export default function LoginPage() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-6 py-6">
      <div className="flex w-full max-w-sm flex-col">
        <a
          href="#"
          className="flex items-center self-center -space-x-2 font-medium"
        >
          <div className="text-primary-foreground flex size-16 items-center justify-center rounded-md">
            <Image
              quality={70}
              src={appliftLogo}
              className="[clip-path:inset(0_0_30%_0)] translate-y-[15%]"
              alt="Applift Logo"
            />
          </div>
          <span className="font-extrabold text-xl uppercase tracking-wider font-inter">
            Applift
          </span>
        </a>
        <LoginForm />
      </div>
    </div>
  );
}
