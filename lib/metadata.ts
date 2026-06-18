import type { Metadata } from "next";
import { absoluteUrl } from "./utils";
import { DEFAULT_LOCALE, SUPPORTED_LOCALES, type Locale } from "./i18n";

type PageMetadataOptions = {
  title: string;
  description: string;
  path: string;
  ogImage?: string;
  noIndex?: boolean;
  keywords?: string[];
  locale?: Locale;
  imageAlt?: string;
};

export function getLocalizedMetadataUrls(path: string, locale: Locale) {
  const normalizedPath = path === "/" ? "" : path;
  const canonical = absoluteUrl(`/${locale}${normalizedPath}`);
  const languages = Object.fromEntries(
    SUPPORTED_LOCALES.map((supportedLocale) => [
      supportedLocale,
      absoluteUrl(`/${supportedLocale}${normalizedPath}`),
    ]),
  ) as Record<Locale, string>;

  return {
    canonical,
    languages: {
      ...languages,
      "x-default": languages[DEFAULT_LOCALE],
    },
  };
}

/**
 * Generate consistent metadata for each page.
 * Follows SEO_BLUEPRINT.md requirements:
 * - Canonical URL on every page
 * - OG image with width/height
 * - Twitter card
 * - Optional noIndex for policy/admin pages
 */
export function generatePageMetadata({
  title,
  description,
  path,
  ogImage = "/images/branding/og-default.jpg",
  noIndex = false,
  keywords = [],
  locale = DEFAULT_LOCALE,
  imageAlt = title,
}: PageMetadataOptions): Metadata {
  const { canonical: url, languages } = getLocalizedMetadataUrls(path, locale);

  return {
    title,
    description,
    keywords: [
      "spa hoi an",
      "massage hoi an",
      "serena spa",
      ...keywords,
    ],
    alternates: {
      canonical: url,
      languages,
    },
    openGraph: {
      title,
      description,
      url,
      type: "website",
      locale: locale === "vi" ? "vi_VN" : locale === "ko" ? "ko_KR" : "en_US",
      images: [
        {
          url: absoluteUrl(ogImage),
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [absoluteUrl(ogImage)],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

/**
 * LocalBusiness + Spa JSON-LD schema
 * Per SEO_BLUEPRINT.md — inject in root layout or homepage
 */
export function getLocalBusinessSchema() {
  return {
    "@context": "https://schema.org",
    "@type": ["LocalBusiness", "HealthAndBeautyBusiness", "DaySpa"],
    name: "Serena Spa Hội An",
    description:
      "Premium wellness spa offering signature massages, holistic treatments, and luxury healing experiences in Hội An, Vietnam.",
    url: absoluteUrl("/"),
    telephone: "+84-935-011-151",
    email: "serenaspahoian@gmail.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "127 Nguyen Duy Hieu",
      addressLocality: "Hoi An Dong",
      addressRegion: "Da Nang",
      postalCode: "560000",
      addressCountry: "VN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 15.8794,   // TODO: fill in exact coordinates
      longitude: 108.3381,
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday", "Tuesday", "Wednesday", "Thursday",
          "Friday", "Saturday", "Sunday",
        ],
        opens: "09:00",
        closes: "22:00",
      },
    ],
    priceRange: "$$",
    currenciesAccepted: "VND, USD",
    paymentAccepted: "Cash, Credit Card",
    image: absoluteUrl("/images/branding/og-default.jpg"),
    sameAs: [
      // TODO: fill in real social URLs
      // "https://www.instagram.com/serenaspahoian",
      // "https://www.facebook.com/serenaspahoian",
    ],
  };
}
