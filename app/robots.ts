import { APP_URL } from "@/config";
import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        disallow: ["/editor", "/editor/*"],
      },
      {
        userAgent: "*",
        allow: ["/", "/work", "/blog", "/blog/*", "/company", "/company/*"],
      },
    ],
    sitemap: new URL("/sitemap.xml", APP_URL).href,
    host: APP_URL,
  };
}
