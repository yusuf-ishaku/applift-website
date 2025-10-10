import type { MetadataRoute } from "next";
import { getAllCompanySlugs } from "@/loaders/company";
import { getAllPublishedPostSlugs } from "@/loaders/blogs";
import { APP_URL } from "@/config";

export const revalidate = 3600; // optional: re-generate sitemap every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [blogs, companies] = await Promise.all([
    getAllPublishedPostSlugs(), // [{ slug, updatedAt }]
    getAllCompanySlugs(), // [{ slug, updatedAt }]
  ]);

  const now = new Date();

  // helper to compute the newest updatedAt (fallback to now)
  const newestDate = (items: Array<{ updatedAt: Date }>) => {
    if (!items || items.length === 0) return now;
    const maxTs = Math.max(...items.map((i) => i.updatedAt.getTime()));
    return new Date(maxTs);
  };

  const blogLastMod = newestDate(blogs);
  const companyLastMod = newestDate(companies);

  // Static + section index routes
  const staticRoutes: MetadataRoute.Sitemap = [
    { url: new URL("/", APP_URL).href, lastModified: now },
    { url: new URL("/work", APP_URL).href, lastModified: now },
    // include the collection index pages and mark them with the latest update time
    { url: new URL("/blog", APP_URL).href, lastModified: blogLastMod },
    { url: new URL("/company", APP_URL).href, lastModified: companyLastMod },
  ];

  // individual blog routes
  const blogRoutes: MetadataRoute.Sitemap = blogs.map((b) => ({
    url: new URL(`/blog/${b.slug}`, APP_URL).href,
    lastModified: b.updatedAt,
  }));

  // individual company routes
  const companyRoutes: MetadataRoute.Sitemap = companies.map((c) => ({
    url: new URL(`/company/${c.slug}`, APP_URL).href,
    lastModified: c.updatedAt,
  }));

  return [...staticRoutes, ...blogRoutes, ...companyRoutes];
}
