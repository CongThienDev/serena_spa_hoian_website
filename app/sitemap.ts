import type { MetadataRoute } from "next";
import { absoluteUrl } from "@/lib/utils";
import { SUPPORTED_LOCALES } from "@/lib/i18n";

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
      url: absoluteUrl(`/${locale}${route}`),
      lastModified: now,
      changeFrequency: route === "" ? "daily" : "weekly",
      priority: route === "" ? 1 : 0.8,
    })),
  );
}
