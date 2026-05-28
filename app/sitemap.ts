import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES } from "@/lib/i18n";
import { SITE } from "@/data/site";

const ROUTES = [
  "",
  "/about",
  "/services",
  "/wellness",
  "/gallery",
  "/blog",
  "/booking",
  "/contact",
  "/faq",
  "/privacy-policy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  return SUPPORTED_LOCALES.flatMap((locale) =>
    ROUTES.map((route) => ({
      url: `${SITE.url}/${locale}${route}`,
      lastModified: now,
      changeFrequency: route === "" ? "daily" : "weekly",
      priority: route === "" ? 1 : 0.8,
    })),
  );
}
