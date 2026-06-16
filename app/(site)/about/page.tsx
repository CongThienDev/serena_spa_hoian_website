import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PromotionSpotlight from "@/components/sections/PromotionSpotlight";
import { type Locale, withLocalePath } from "@/lib/i18n";

export const metadata: Metadata = generatePageMetadata({
  title: "About Serena Spa Hội An",
  description:
    "Discover Serena Spa's story, philosophy, and commitment to premium wellness experiences in Hội An.",
  path: "/about",
});

const pillars = [
  "Skilled therapists with international training",
  "Botanical, skin-friendly products",
  "Private and calm treatment environment",
  "Consistent warm hospitality in every detail",
];

export default function AboutPage({ locale = "en" }: { locale?: Locale }) {
  const vi = locale === "vi";
  const localizedPillars = vi
    ? [
        "Kỹ thuật viên được đào tạo bài bản",
        "Sản phẩm thực vật thân thiện với da",
        "Không gian trị liệu riêng tư và yên tĩnh",
        "Sự hiếu khách ấm áp trong từng chi tiết",
      ]
    : pillars;
  return (
    <main>
      <section className="section-padding section-cream">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <AnimatedSection animation="slide-up-fade">
            <SectionHeading
              eyebrow={vi ? "Về Serena" : "About Serena"}
              title={vi ? "Nơi bạn toả sáng" : "A Place to Glow"}
              subtitle={vi
                ? "SERENA SPA ra đời với mong muốn tạo nên một không gian nơi vẻ đẹp không chỉ được chăm sóc bên ngoài mà còn được chữa lành từ bên trong. Với sự tận tâm trong từng trải nghiệm, Serena Spa luôn đặt cảm giác thư giãn, an yên và sự hài lòng của khách hàng lên hàng đầu."
                : "SERENA SPA was created as a sanctuary where beauty is not only cared for on the outside, but also healed from within. With dedication in every experience, Serena Spa always places relaxation, serenity, and customer satisfaction at the heart of every treatment."}
              titleAs="h1"
            />
            <p className="prose-spa mt-5">
              {vi
                ? "Mỗi liệu trình tại Serena không chỉ là chăm sóc da hay thư giãn cơ thể, mà còn là khoảng thời gian để tái tạo năng lượng và tìm lại sự cân bằng sau những áp lực thường nhật. Lấy cảm hứng từ vẻ đẹp tinh khiết của hoa sen và thiên nhiên chữa lành, Serena Spa theo đuổi phong cách nhẹ nhàng, tinh tế và bền vững, nơi vẻ đẹp được nuôi dưỡng từ bên trong để tự nhiên tỏa sáng."
                : "Each therapy at Serena is more than skincare or body relaxation - it is a moment to restore energy, regain balance, and escape from daily pressures. Inspired by the pure beauty of the lotus flower and the healing power of nature, Serena Spa embraces a gentle, refined, and sustainable approach, where true beauty is nurtured from within and naturally shines outward."}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={withLocalePath(locale, "/services")} className="btn btn-primary btn-sm">{vi ? "Khám phá dịch vụ" : "Explore Services"}</Link>
              <Link href={withLocalePath(locale, "/booking")} className="btn btn-outline btn-sm">{vi ? "Đặt lịch" : "Book Now"}</Link>
            </div>
          </AnimatedSection>

          <AnimatedSection animation="scale-fade" delay={0.08}>
            <div className="relative overflow-hidden rounded-[var(--radius-card)]" style={{ aspectRatio: "4/5" }}>
              <Image
                src="/images/serena_image/z7863130453148_866502f8f3e7b371f3f401114f363aa4.jpg"
                alt="Serena Spa reception with warm terracotta interior"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      <PromotionSpotlight locale={locale} />

      <section className="section-padding" style={{ backgroundColor: "var(--color-section-warm)" }}>
        <div className="container-site">
          <AnimatedSection animation="slide-up-fade">
            <SectionHeading
              eyebrow={vi ? "Lý do khách quay lại" : "Why Guests Return"}
              title={vi ? "Cam kết của Serena" : "Our Promise"}
              align="center"
              className="mb-10"
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {localizedPillars.map((item, i) => (
              <AnimatedSection key={item} animation="slide-up-fade" delay={i * 0.06}>
                <div className="card p-6 h-full">
                  <p className="font-sans text-[var(--color-espresso)]">{item}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
