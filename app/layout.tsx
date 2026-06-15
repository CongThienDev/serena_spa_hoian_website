import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { normalizeLocale } from "@/lib/i18n";

/* ── Fonts ──────────────────────────────────────────────────────────────────
   Cormorant Garamond — luxury serif for all headings
   Inter            — clean sans-serif for body/UI
─────────────────────────────────────────────────────────────────────────── */
const cormorant = Cormorant_Garamond({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

/* ── Root Metadata ──────────────────────────────────────────────────────────
   Each page overrides title/description via generateMetadata()
   These are fallback/default values
─────────────────────────────────────────────────────────────────────────── */
export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL ?? "https://serenaretreat.com"
  ),
  title: {
    default: "Serena Spa Hội An — Premium Wellness & Massage",
    template: "%s | Serena Spa Hội An",
  },
  description:
    "Discover premium wellness treatments, signature massages, and holistic healing at Serena Spa in Hội An. Book your sanctuary experience today.",
  keywords: [
    "spa hoi an",
    "massage hoi an",
    "best spa in hoi an",
    "couple massage hoi an",
    "wellness hoi an",
    "serena spa",
    "spa hoian",
  ],
  authors: [{ name: "Serena Spa Hội An" }],
  creator: "Serena Spa Hội An",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Serena Spa Hội An",
    title: "Serena Spa Hội An — Premium Wellness & Massage",
    description:
      "Discover premium wellness treatments, signature massages, and holistic healing at Serena Spa in Hội An.",
    images: [
      {
        url: "/images/branding/og-default.jpg",
        width: 1200,
        height: 630,
        alt: "Serena Spa Hội An — Luxury Wellness Experience",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Serena Spa Hội An — Premium Wellness & Massage",
    description:
      "Discover premium wellness treatments, signature massages, and holistic healing at Serena Spa in Hội An.",
    images: ["/images/branding/og-default.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
  alternates: {
    languages: {
      vi: "/vi",
      en: "/en",
      "x-default": "/en",
    },
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#FFF8F2",
};

/* ── Root Layout ────────────────────────────────────────────────────────────
   Wraps all routes. Font CSS variables available globally.
   Actual page chrome (header/footer) lives in (site)/layout.tsx
─────────────────────────────────────────────────────────────────────────── */
export default async function RootLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params?: Promise<{ locale?: string }>;
}>) {
  const routeParams = params ? await params : undefined;
  const locale = normalizeLocale(routeParams?.locale);

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">{children}</body>
    </html>
  );
}
