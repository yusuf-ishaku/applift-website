import appliftLogo from "@/assets/images/logo-xl.png";

import { LoginForm } from "@/components/login-form";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/editor/login")({
  component: LoginPage,
});

function LoginPage() {
  return (
    <div className="/bg-muted flex min-h-svh flex-col items-center justify-center gap-6 py-6">
      <div className="flex w-full max-w-sm flex-col">
        <a
          href="#"
          className="flex items-center self-center -space-x-2 font-medium"
        >
          <div className="/bg-primary text-primary-foreground flex size-16 items-center justify-center rounded-md">
            <img
              src={appliftLogo}
              className="[clip-path:inset(0_0_30%_0)] translate-y-[15%]"
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
