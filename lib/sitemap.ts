import fs from "node:fs";
import path from "node:path";
import type { MetadataRoute } from "next";
import { BLOG_POSTS } from "@/data/blog";
import { SERVICES } from "@/data/services";
import { SITE } from "@/data/site";
import {
  DEFAULT_LOCALE,
  SUPPORTED_LOCALES,
  type Locale,
  withLocalePath,
} from "@/lib/i18n";

const STATIC_ROUTES = [
  "/",
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
] as const;

const APP_FILE_MTIME_TARGETS = {
  "/": [
    "app/(site)/page.tsx",
    "app/[locale]/(site)/page.tsx",
    "data/blog.ts",
    "data/content-home.ts",
    "data/services.ts",
    "data/site.ts",
    "data/testimonials.ts",
  ],
  "/about": ["app/(site)/about/page.tsx", "app/[locale]/(site)/about/page.tsx"],
  "/services": [
    "app/(site)/services/page.tsx",
    "app/[locale]/(site)/services/page.tsx",
    "data/services.ts",
  ],
  "/wellness": ["app/(site)/wellness/page.tsx", "app/[locale]/(site)/wellness/page.tsx"],
  "/gallery": ["app/(site)/gallery/page.tsx", "app/[locale]/(site)/gallery/page.tsx"],
  "/blog": ["app/(site)/blog/page.tsx", "app/[locale]/(site)/blog/page.tsx", "data/blog.ts"],
  "/booking": [
    "app/(site)/booking/page.tsx",
    "app/[locale]/(site)/booking/page.tsx",
    "data/services.ts",
  ],
  "/contact": [
    "app/(site)/contact/page.tsx",
    "app/[locale]/(site)/contact/page.tsx",
    "data/site.ts",
  ],
  "/faq": ["app/(site)/faq/page.tsx", "app/[locale]/(site)/faq/page.tsx"],
  "/privacy-policy": [
    "app/(site)/privacy-policy/page.tsx",
    "app/[locale]/(site)/privacy-policy/page.tsx",
  ],
  "/terms": ["app/(site)/terms/page.tsx", "app/[locale]/(site)/terms/page.tsx"],
} satisfies Record<(typeof STATIC_ROUTES)[number], string[]>;

const PUBLIC_DIR = path.join(process.cwd(), "public");
const IMAGE_EXTENSIONS = new Set([
  ".avif",
  ".gif",
  ".ico",
  ".jpeg",
  ".jpg",
  ".png",
  ".svg",
  ".webp",
]);

type SitemapEntry = MetadataRoute.Sitemap[number];

function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE.url).toString();
}

function getLatestModified(relativePaths: string[], fallback?: string | Date) {
  const modifiedTimes = relativePaths
    .map((relativePath) => path.join(process.cwd(), relativePath))
    .filter((absolutePath) => fs.existsSync(absolutePath))
    .map((absolutePath) => fs.statSync(absolutePath).mtime);

  if (modifiedTimes.length === 0) {
    return fallback;
  }

  return new Date(
    Math.max(...modifiedTimes.map((modifiedTime) => modifiedTime.getTime())),
  );
}

function localeRoute(locale: Locale, route: string) {
  return withLocalePath(locale, route);
}

function alternateLanguages(route: string) {
  return {
    languages: Object.fromEntries(
      SUPPORTED_LOCALES.map((locale) => [locale, absoluteUrl(localeRoute(locale, route))]),
    ),
  };
}

function addImages(
  map: Map<string, Set<string>>,
  pagePath: string,
  images: Array<string | undefined>,
) {
  const nextImages = images.filter((image): image is string => Boolean(image));
  if (nextImages.length === 0) return;

  const current = map.get(pagePath) ?? new Set<string>();
  for (const image of nextImages) {
    current.add(image);
  }
  map.set(pagePath, current);
}

function getStaticPageImageMap(locale: Locale) {
  const map = new Map<string, Set<string>>();

  addImages(map, localeRoute(locale, "/"), [
    "/android-chrome-512x512.png",
    "/apple-touch-icon.png",
    "/images/logo/Serena-logo.webp",
    "/images/logo/Serena-logo.png",
    "/images/contact-logo/Icon_of_Zalo.svg.png",
    "/images/branding/serena-spa-reference.png",
    "/images/serena_image/z7863130216608_73332d9cd639070a514abcd33a5d3c1f.jpg",
    "/images/serena_image/z7863130063966_02bca12b005872be63d6ed4054b0cad4.jpg",
    "/images/serena_image/z7863130038022_12382ee51f7d6893a8ced778096e42b8.jpg",
    "/images/serena_image/z7863130080318_bd46759e1d082e30adb7e1b0a0e90bd0.jpg",
    "/images/serena_image/z7863130399936_a16c4518ce69d94cc60728eb569ee3ae.jpg",
    "/images/serena_image/z7863130088386_7d60eb6e84b43d3b681c23083715d7c8.jpg",
    "/images/serena_image/z7863130225920_fcbb5881c13f6f51fd437554d30283e4.jpg",
  ]);

  addImages(map, localeRoute(locale, "/about"), [
    "/images/serena_image/z7863130453148_866502f8f3e7b371f3f401114f363aa4.jpg",
  ]);

  addImages(map, localeRoute(locale, "/services"), [
    "/images/serena_image/z7863130216608_73332d9cd639070a514abcd33a5d3c1f.jpg",
  ]);

  addImages(map, localeRoute(locale, "/wellness"), [
    "/images/serena_image/z7863130216608_73332d9cd639070a514abcd33a5d3c1f.jpg",
    "/images/serena_image/z7863130169696_bef89068f64117b9f9f5e674010e0775.jpg",
    "/images/serena_image/z7863130453148_866502f8f3e7b371f3f401114f363aa4.jpg",
    "/images/serena_image/z7863130176379_c5ca367025c871384fcc1d77b7468dc8.jpg",
    "/images/serena_image/z7863130054870_104b2ec8bb7461a68a2bc1b51c3d7d19.jpg",
    "/images/serena_image/z7863130109467_a7e314ed3fec777a4084932b16477b2e.jpg",
    "/images/serena_image/z7863130256078_8fa272cfe79d9ecb0518735720b5bfda.jpg",
    "/images/serena_image/z7863130095713_b817eeade5199ad502efe90d9949c59d.jpg",
    "/images/serena_image/z7863130038022_12382ee51f7d6893a8ced778096e42b8.jpg",
  ]);

  addImages(
    map,
    localeRoute(locale, "/gallery"),
    [
      "/images/serena_image/z7863130078807_7f590ddcf81f53ef6a81848cf6a70c8c.jpg",
      "/images/serena_image/z7863130169696_bef89068f64117b9f9f5e674010e0775.jpg",
      "/images/serena_image/z7863130176379_c5ca367025c871384fcc1d77b7468dc8.jpg",
      "/images/serena_image/z7863130176630_cfaef3e73c138c4cd37c3470ca672111.jpg",
      "/images/serena_image/z7863130216608_73332d9cd639070a514abcd33a5d3c1f.jpg",
      "/images/serena_image/z7863130239116_ea7adc34ac7622f1e5915a9528a3996a.jpg",
      "/images/serena_image/z7863130274945_10d9118585cdf7d3112ab4ef49c500d6.jpg",
      "/images/serena_image/z7863130373074_bd43471af11ebd6a27da4edc71b541b6.jpg",
      "/images/serena_image/z7863130384618_87340f638b52687ad588fcab65067fef.jpg",
      "/images/serena_image/z7863130390725_5b38f0adc29b0df33be0f3c9bad181b7.jpg",
      "/images/serena_image/z7863130399936_a16c4518ce69d94cc60728eb569ee3ae.jpg",
      "/images/serena_image/z7863130404136_d595f67689784a0fe0389dbd593186a3.jpg",
      "/images/serena_image/z7863130441448_1b33c51358f0b6d00fce5f880a3eab4c.jpg",
      "/images/serena_image/z7863130444643_7f6fd94c341efae6f8b26efbd0e9d69f.jpg",
      "/images/serena_image/z7863130478508_10e235315af4fa700c9d72721e87923d.jpg",
      "/images/serena_image/z7863130203764_6bc950cfa0128b88f9da0f0e14fc8264.jpg",
      "/images/serena_image/z7863130038022_12382ee51f7d6893a8ced778096e42b8.jpg",
      "/images/serena_image/z7863130054870_104b2ec8bb7461a68a2bc1b51c3d7d19.jpg",
      "/images/serena_image/z7863130059917_c86d918d9a520b97459a877454ca782c.jpg",
      "/images/serena_image/z7863130063966_02bca12b005872be63d6ed4054b0cad4.jpg",
      "/images/serena_image/z7863130095713_b817eeade5199ad502efe90d9949c59d.jpg",
      "/images/serena_image/z7863130109467_a7e314ed3fec777a4084932b16477b2e.jpg",
      "/images/serena_image/z7863130117766_994c6b03e33be4dc0c8efadeeea66c47.jpg",
      "/images/serena_image/z7863130120648_cda4269be7bd3cc476c216c0162986b3.jpg",
      "/images/serena_image/z7863130453148_866502f8f3e7b371f3f401114f363aa4.jpg",
      "/images/serena_image/z7863130455427_9f4dc2733c14cd2a665e6e394dd77dd4.jpg",
      "/images/serena_image/z7863130256078_8fa272cfe79d9ecb0518735720b5bfda.jpg",
      "/images/serena_image/z7863130061315_91691cc30708ca20bb81a66f81a0c638.jpg",
      "/images/serena_image/z7863130080318_bd46759e1d082e30adb7e1b0a0e90bd0.jpg",
      "/images/serena_image/z7863130088386_7d60eb6e84b43d3b681c23083715d7c8.jpg",
      "/images/serena_image/z7863130112733_8de29526d8c724cbefe4667d844e5199.jpg",
      "/images/serena_image/z7863130221255_12020b2f20957e67745bf1a521d58121.jpg",
      "/images/serena_image/z7863130225920_fcbb5881c13f6f51fd437554d30283e4.jpg",
      "/images/serena_image/z7863130416969_1e48e9b99297eaf38184f8a90b4ac330.jpg",
    ],
  );

  addImages(
    map,
    localeRoute(locale, "/blog"),
    BLOG_POSTS.map((post) => post.coverImage),
  );

  addImages(map, localeRoute(locale, "/booking"), [
    "/images/serena_image/z7863130063966_02bca12b005872be63d6ed4054b0cad4.jpg",
  ]);

  addImages(map, localeRoute(locale, "/contact"), [
    "/images/contact-logo/Icon_of_Zalo.svg.png",
    "/images/serena_image/z7863130054870_104b2ec8bb7461a68a2bc1b51c3d7d19.jpg",
    "/images/serena_image/z7863130109467_a7e314ed3fec777a4084932b16477b2e.jpg",
    "/images/serena_image/z7863130256078_8fa272cfe79d9ecb0518735720b5bfda.jpg",
  ]);

  return map;
}

function collectPublicImagePaths(dir = PUBLIC_DIR, basePath = ""): string[] {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const imagePaths: string[] = [];

  for (const entry of entries) {
    const relativePath = path.posix.join(basePath, entry.name);
    const absolutePath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      imagePaths.push(...collectPublicImagePaths(absolutePath, relativePath));
      continue;
    }

    const extension = path.extname(entry.name).toLowerCase();
    if (IMAGE_EXTENSIONS.has(extension)) {
      imagePaths.push(`/${relativePath}`);
    }
  }

  return imagePaths.sort();
}

function buildImageAssignments(locale: Locale) {
  const map = getStaticPageImageMap(locale);

  for (const service of SERVICES) {
    addImages(map, localeRoute(locale, `/services/${service.slug}`), [
      service.image,
      ...(service.gallery ?? []),
    ]);
  }

  for (const post of BLOG_POSTS) {
    addImages(map, localeRoute(locale, `/blog/${post.slug}`), [post.coverImage]);
  }

  const assignedImages = new Set(
    Array.from(map.values()).flatMap((images) => Array.from(images)),
  );

  for (const imagePath of collectPublicImagePaths()) {
    if (!assignedImages.has(imagePath)) {
      addImages(map, localeRoute(locale, "/"), [imagePath]);
    }
  }

  return map;
}

function toSitemapEntry(
  route: string,
  locale: Locale,
  options: {
    changeFrequency: SitemapEntry["changeFrequency"];
    images?: string[];
    lastModified?: Date | string;
    priority: number;
  },
): SitemapEntry {
  return {
    url: absoluteUrl(localeRoute(locale, route)),
    lastModified: options.lastModified,
    changeFrequency: options.changeFrequency,
    priority: options.priority,
    alternates: alternateLanguages(route),
    images: options.images?.map((image) => absoluteUrl(image)),
  };
}

export function getSitemapEntries(): MetadataRoute.Sitemap {
  return SUPPORTED_LOCALES.flatMap((locale) => {
    const imageMap = buildImageAssignments(locale);
    const staticEntries = STATIC_ROUTES.map((route) =>
      toSitemapEntry(route, locale, {
        lastModified: getLatestModified(APP_FILE_MTIME_TARGETS[route]),
        changeFrequency: route === "/" ? "daily" : "weekly",
        priority: route === "/" ? 1 : 0.8,
        images: Array.from(imageMap.get(localeRoute(locale, route)) ?? []),
      }),
    );

    const serviceEntries = SERVICES.map((service) =>
      toSitemapEntry(`/services/${service.slug}`, locale, {
        lastModified: getLatestModified([
          "data/services.ts",
          "app/(site)/services/[slug]/page.tsx",
          "app/[locale]/(site)/services/[slug]/page.tsx",
        ]),
        changeFrequency: "weekly",
        priority: 0.7,
        images: Array.from(imageMap.get(localeRoute(locale, `/services/${service.slug}`)) ?? []),
      }),
    );

    const blogEntries = BLOG_POSTS.map((post) =>
      toSitemapEntry(`/blog/${post.slug}`, locale, {
        lastModified: getLatestModified(
          [
            "data/blog.ts",
            "app/(site)/blog/[slug]/page.tsx",
            "app/[locale]/(site)/blog/[slug]/page.tsx",
          ],
          post.publishedAt,
        ),
        changeFrequency: "monthly",
        priority: 0.7,
        images: Array.from(imageMap.get(localeRoute(locale, `/blog/${post.slug}`)) ?? []),
      }),
    );

    return [...staticEntries, ...serviceEntries, ...blogEntries];
  });
}

export function getImageSitemapEntries() {
  const imageMap = buildImageAssignments(DEFAULT_LOCALE);

  return Array.from(imageMap.entries())
    .map(([pagePath, images]) => ({
      pageUrl: absoluteUrl(pagePath),
      imageUrls: Array.from(images).map((image) => absoluteUrl(image)),
    }))
    .filter((entry) => entry.imageUrls.length > 0);
}
