import type { Metadata } from "next";
import { generatePageMetadata, getLocalBusinessSchema } from "@/lib/metadata";
import HeroSection from "@/components/sections/HeroSection";
import FeatureStrip from "@/components/sections/FeatureStrip";
import SignatureTreatments from "@/components/sections/SignatureTreatments";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import GalleryPreview from "@/components/sections/GalleryPreview";
import TestimonialsSection from "@/components/sections/TestimonialsSection";
import BlogPreview from "@/components/sections/BlogPreview";
import CTASection from "@/components/sections/CTASection";

export const metadata: Metadata = generatePageMetadata({
  title: "Serena Spa Hội An — Premium Wellness & Massage",
  description:
    "Discover premium wellness treatments, signature massages, and holistic healing at Serena Spa in Hội An. Book your sanctuary experience today.",
  path: "/",
  keywords: ["best spa in hoi an", "massage hoi an", "wellness sanctuary", "luxury spa hoian"],
});

export default function HomePage() {
  const schema = getLocalBusinessSchema();

  return (
    <>
      {/* LocalBusiness + Spa JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      {/* ── Hero ─── cinematic split: warm gradient text + real spa image */}
      <HeroSection />

      {/* ── Feature strip ─── 4 wellness pillars, rounded top, white bg */}
      <FeatureStrip />

      {/* ── Signature Treatments ─── service cards grid + dark booking card */}
      <SignatureTreatments />

      {/* ── Why Choose Us ─── 4 trust pillars, warm sand bg */}
      <WhyChooseUs />

      {/* ── Gallery ─── real spa interior photography masonry */}
      <GalleryPreview />

      {/* ── Testimonials ─── 3 guest reviews, warm bg */}
      <TestimonialsSection />

      {/* ── Blog preview ─── 3 wellness articles */}
      <BlogPreview />

      {/* ── Booking CTA ─── full-width espresso + spa image */}
      <CTASection />
    </>
  );
}
