import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "https://integrityman.network";

  const staticPages = [
    "",
    "/about",
    "/channels",
    "/events",
    "/store",
    "/blog",
    "/contact",
    "/donate",
    "/join",
    "/community",
  ];

  return staticPages.map((path) => ({
    url: `${baseUrl}${path}`,
    lastModified: new Date(),
    changeFrequency: path === "" ? "weekly" : "monthly",
    priority: path === "" ? 1 : path === "/about" ? 0.9 : 0.8,
  }));
}
