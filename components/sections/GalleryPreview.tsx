import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { localize, type Locale, withLocalePath } from "@/lib/i18n";

/**
 * GalleryPreview — asymmetric masonry using real Serena Spa interior photography.
 * Desktop: 3-column CSS grid, first image spans 2 rows (cinematic anchor).
 * Mobile: 2-column uniform grid.
 */
export default function GalleryPreview({ locale = "en" }: { locale?: Locale }) {
  const eyebrow = localize(locale, { en: "Our Space", vi: "Không gian Serena", ko: "세레나의 공간" });
  const title = localize(locale, { en: "Inside Serena", vi: "Bên trong Serena", ko: "세레나 내부" });
  const buttonLabel = localize(locale, { en: "View Full Gallery", vi: "Xem toàn bộ thư viện", ko: "전체 갤러리 보기" });
  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--color-cream)" }}
      aria-labelledby="gallery-heading"
    >
      <div className="container-site">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
          <AnimatedSection animation="slide-up-fade">
              <SectionHeading
              eyebrow={eyebrow}
              title={title}
              titleAs="h2"
            />
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={0.2}>
            <Link href={withLocalePath(locale, "/gallery")} className="btn btn-outline btn-sm flex-shrink-0 self-start md:self-auto">
              {buttonLabel}
            </Link>
          </AnimatedSection>
        </div>

        {/* Asymmetric grid */}
        <div
          className="grid gap-3 md:gap-4"
          style={{
            gridTemplateColumns: "repeat(2, 1fr)",
            gridTemplateRows: "auto",
          }}
        >
          {/* ── Large anchor image — spans 2 cols × 2 rows on desktop ─── */}
          <AnimatedSection
            animation="scale-fade"
            delay={0}
            className="col-span-2 md:col-span-1 md:row-span-2 [grid-row:1/span_2]"
          >
            <div
              className="relative overflow-hidden rounded-[var(--radius-card)] group cursor-pointer w-full"
              style={{ height: "clamp(280px, 50vw, 560px)" }}
            >
              <Image
                src="/images/serena_image/z7863130038022_12382ee51f7d6893a8ced778096e42b8.jpg"
                alt="Serena Spa lobby — warm arch doorways, terracotta walls and lush indoor plants"
                fill
                className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div
                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: "rgba(61,31,15,0.2)" }}
                aria-hidden="true"
              />
            </div>
          </AnimatedSection>

          {/* ── 4 smaller images in a 2×2 grid on the right ─────────── */}
          {[
            {
              src: "/images/serena_image/z7863130080318_bd46759e1d082e30adb7e1b0a0e90bd0.jpg",
              alt: "Pedicure station beneath three arched alcoves with warm accent lighting",
            },
            {
              src: "/images/serena_image/z7863130399936_a16c4518ce69d94cc60728eb569ee3ae.jpg",
              alt: "Group treatment room with five massage beds and curved ceiling details",
            },
            {
              src: "/images/serena_image/z7863130088386_7d60eb6e84b43d3b681c23083715d7c8.jpg",
              alt: "Arched walnut doors with round porthole windows lining the corridor",
            },
            {
              src: "/images/serena_image/z7863130225920_fcbb5881c13f6f51fd437554d30283e4.jpg",
              alt: "VIP treatment suite with mirrored ceiling and terracotta accent wall",
            },
          ].map((img, i) => (
            <AnimatedSection key={img.src} animation="scale-fade" delay={0.06 + i * 0.06}>
              <div
                className="relative overflow-hidden rounded-[var(--radius-card)] group cursor-pointer"
                style={{ aspectRatio: "4/3" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{ background: "rgba(61,31,15,0.2)" }}
                  aria-hidden="true"
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
