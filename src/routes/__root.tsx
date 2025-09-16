import appliftLogo from "@/assets/images/applift-logo.png";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { APP_URL } from "@/config";
import { getThemeServerFn } from "@/lib/theme";
import type { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRouteWithContext,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import appCss from "../styles.css?url";

interface MyRouterContext {
  queryClient: QueryClient;
}

export const Route = createRootRouteWithContext<MyRouterContext>()({
  // TODO add a pending component
  loader: async () => await getThemeServerFn(),
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "Applift",
      },
      {
        name: "keywords",
        content: [
          "Applift",
          "Applift blog",
          "Applift software solutions",
          "Applift digital agency",
          "Applift development company",
          "digital transformation services",
          "bespoke software development",
          "custom web application development",
          "mobile app development agency",
          "enterprise software solutions",
          "software consulting services",
          "UI UX design agency",
          "user experience design services",
          "user interface design best practices",
          "design systems and prototyping",
          "responsive web design",
          "blockchain app development",
          "Web3 development services",
          "AI-powered applications",
          "cloud-native app development",
          "SaaS product development",
          "tech industry insights",
          "web development trends",
          "UI UX design trends",
          "blockchain industry insights",
          "digital innovation strategies",
          "startup technology advice",
        ].join(", "),
      },
      {
        property: "og:site_name",
        content: "Applift",
      },
      {
        property: "og:url",
        content: APP_URL,
      },
      {
        property: "description",
        content:
          "Explore the Applift Blog for expert insights on digital transformation, bespoke software solutions, web & mobile development, UI/UX design, blockchain innovation, and more. Stay informed, inspired, and ahead in the digital landscape with Applift.",
      },
      {
        property: "og:description",
        content:
          "Explore the Applift Blog for expert insights on digital transformation, bespoke software solutions, web & mobile development, UI/UX design, blockchain innovation, and more. Stay informed, inspired, and ahead in the digital landscape with Applift.",
      },
      {
        property: "twitter:description",
        content:
          "Explore the Applift Blog for expert insights on digital transformation, bespoke software solutions, web & mobile development, UI/UX design, blockchain innovation, and more. Stay informed, inspired, and ahead in the digital landscape with Applift.",
      },
      {
        property: "og:title",
        content: "Applift",
      },
      {
        property: "twitter:title",
        content: "Applift",
      },
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
      {
        rel: "preconnect",
        href: "https://fonts.googleapis.com",
      },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "anonymous",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&family=Plus+Jakarta+Sans:ital,wght@0,200..800;1,200..800&display=swap",
      },
      {
        rel: "icon",
        href: appliftLogo,
      },
    ],
  }),
  // shellComponent
  shellComponent: RootComponent,
});

function RootComponent() {
  // const data = Route.useLoaderData();
  return (
    <ThemeProvider theme={"dark"}>
      <RootDocument>
        <Outlet />
        <TanStackRouterDevtools />
        <ReactQueryDevtools buttonPosition="bottom-right" />
        <Toaster />
      </RootDocument>
    </ThemeProvider>
  );
}

function RootDocument({ children }: { children: React.ReactNode }) {
  // const theme = Route.useLoaderData();
  return (
    <html lang="en" className={"dark"} suppressHydrationWarning>
      <head>
        <HeadContent />
      </head>
      <body suppressHydrationWarning>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
