import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import clsx from "clsx";
import { Eye, EyeOff, Github } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(6),
});
type Login = z.infer<typeof loginSchema>;
const registerSchema = loginSchema.extend({
  name: z.string(),
});
type Register = z.infer<typeof registerSchema>;

const toastId = "auth-toast";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const [route, setRoute] = useState<"login" | "register">("login");
  const [showPassword, setShowPassword] = useState(false);
  const loginForm = useForm<Login>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const registerForm = useForm<Register>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: "",
      password: "",
      name: "",
    },
  });
  const form = route === "login" ? loginForm : registerForm;
  const navigate = useNavigate({ from: "/editor/login" });
  const { mutate: githubMutate, isPending: isGithubPending } = useMutation({
    mutationFn: async () => {
      const { error } = await authClient.signIn.social({
        provider: "github",
      });
      if (error) throw error;
    },
    onMutate() {
      toast.loading("Logging in", {
        id: toastId,
        description: "",
      });
    },
    onSuccess() {
      toast.loading("Logged in", {
        id: toastId,
        description: "",
      });
      navigate({
        to: "/editor/new",
      });
    },
    onError(error) {
      console.error("Error loggin in with GitHub", error);
      toast.loading("Oops. Something went wrong.", {
        id: toastId,
        description: error.message,
      });
    },
  });
  const { mutate: emailMutate, isPending: isPendingEmailAuth } = useMutation({
    mutationFn: async (input: Login | Register) => {
      if ("name" in input) {
        const { error, data } = await authClient.signUp.email(input);
        if (error) throw error;
        return data.user;
      } else {
        const { error, data } = await authClient.signIn.email({
          ...input,
          rememberMe: true,
        });
        if (error) throw error;
        return data.user;
      }
    },
    onMutate(data) {
      const register = "name" in data;
      toast.loading(register ? "Creating account" : "Logging in", {
        id: toastId,
        description: "",
      });
    },
    onSuccess(user, data) {
      const register = "name" in data;
      toast.loading(
        clsx(
          "Welcome",
          register ? "aboard" : "back",
          user.name.split(" ").shift(),
        ),
        {
          id: toastId,
          description: "",
        },
      );
      navigate({
        to: "/editor/new",
      });
    },
    onError(error) {
      console.error("Error during authentication", error);
      toast.loading("Oops. Something went wrong.", {
        id: toastId,
        description: error.message,
      });
    },
  });
  return (
    <div className={cn("flex flex-col gap-2", className)} {...props}>
      <Card>
        <CardHeader className="text-center">
          <CardTitle className="text-xl">Welcome back</CardTitle>
          <CardDescription>Login with GitHub</CardDescription>
        </CardHeader>
        <CardContent>
          {/* @ts-expect-error ... */}
          <Form {...form}>
            <form onSubmit={form.handleSubmit((data) => emailMutate(data))}>
              <fieldset
                className="grid gap-6"
                disabled={isPendingEmailAuth || isGithubPending}
              >
                <div className="flex flex-col gap-4">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full"
                    onClick={() => githubMutate()}
                  >
                    <Github />
                    Login with GitHub
                  </Button>
                </div>
                <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                  <span className="bg-card text-muted-foreground relative z-10 px-2">
                    Or continue with
                  </span>
                </div>
                <div className="grid gap-6">
                  {route === "register" && (
                    <FormField
                      // @ts-expect-error ...
                      control={form.control}
                      // @ts-expect-error ...
                      name="name"
                      render={({ field }) => (
                        <FormItem className="grid gap-3">
                          <FormLabel htmlFor="email">Name</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              placeholder="John Doe"
                              className="!bg-transparent"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  <FormField
                    // @ts-expect-error ...
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="grid gap-3">
                        <FormLabel htmlFor="email">Email</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            type="email"
                            placeholder="m@example.com"
                            className="!bg-transparent"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    // @ts-expect-error ...
                    form={form.control}
                    name="password"
                    render={() => (
                      <FormItem className="grid gap-3">
                        <div className="flex items-center">
                          <FormLabel htmlFor="password">Password</FormLabel>
                          <a
                            href="#"
                            className="ml-auto text-sm underline-offset-4 hover:underline"
                          >
                            Forgot your password?
                          </a>
                        </div>
                        <FormControl>
                          <div className="relative">
                            <Input
                              id="password"
                              type={showPassword ? "text" : "password"}
                              required
                              placeholder="At least six characters"
                              className="!bg-transparent pr-10"
                            />
                            <Button
                              size="icon"
                              variant="outline"
                              className="absolute right-0 top-0 scale-90"
                              type="button"
                              onClick={() => setShowPassword((v) => !v)}
                            >
                              {showPassword ? <EyeOff /> : <Eye />}
                            </Button>
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    {route === "login" ? "Sign In" : "Sign Up"}
                  </Button>
                </div>
                <div className="text-center text-sm">
                  Don&apos;t have an account?{" "}
                  <button
                    type="button"
                    onClick={() =>
                      setRoute((v) => (v === "login" ? "register" : "login"))
                    }
                    className="underline underline-offset-4"
                  >
                    {route === "login" ? "Sign up" : "Sign in"}
                  </button>
                </div>
              </fieldset>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="text-muted-foreground *:[a]:hover:text-primary text-center text-xs text-balance *:[a]:underline *:[a]:underline-offset-4">
        By clicking continue, you agree to our <a href="#">Terms of Service</a>{" "}
        and <a href="#">Privacy Policy</a>.
      </div>
    </div>
  );
}
