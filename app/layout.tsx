import { APP_URL } from "@/config";
import { seo } from "@/utils/seo";
import clsx from "clsx";
import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import NextTopLoader from "nextjs-toploader";
import ogcardImg from "@/assets/images/og-card.jpg";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
// @ts-expect-error I'll handle this later
import "./globals.css";
import Providers from "./providers";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = seo({
  title: {
    default: "Engineering For Humans - Applift Labs",
    template: "%s | Applift Labs",
  },
  description:
    "Explore the Applift Blog for expert insights on digital transformation, bespoke software solutions, web & mobile development, UI/UX design, blockchain innovation, and more. Stay informed, inspired, and ahead in the digital landscape with Applift.",
  keywords: [
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
  ],
  openGraph: {
    siteName: "Applift",
    url: APP_URL,
  },
  image: ogcardImg.src,
  twitter: {
    card: "summary",
  },
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <body
        suppressHydrationWarning
        className={clsx("antialiased", inter.variable, jakartaSans.variable)}
      >
        <Providers>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            <NextTopLoader showSpinner={false} />
            {children}
            <Toaster />
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
