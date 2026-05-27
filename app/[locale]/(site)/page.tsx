import { generateLocalizedRouteMetadata } from "@/lib/route-metadata";
import HeroSection from "@/components/sections/HeroSection";
import FeatureStrip from "@/components/sections/FeatureStrip";
import SignatureTreatments from "@/components/sections/SignatureTreatments";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import GalleryPreview from "@/components/sections/GalleryPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogPreview from "@/components/sections/BlogPreview";
import CTASection from "@/components/sections/CTASection";
import { normalizeLocale } from "@/lib/i18n";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateLocalizedRouteMetadata(locale, "/");
}

export default async function LocalizedHomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: localeInput } = await params;
  const locale = normalizeLocale(localeInput);

  return (
    <>
      <HeroSection locale={locale} />
      <FeatureStrip locale={locale} />
      <SignatureTreatments locale={locale} />
      <WhyChooseUs locale={locale} />
      <GalleryPreview locale={locale} />
      <TestimonialsSection locale={locale} />
      <BlogPreview locale={locale} />
      <CTASection locale={locale} />
    </>
  );
}
