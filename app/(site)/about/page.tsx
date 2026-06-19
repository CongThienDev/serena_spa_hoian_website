import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import PromotionSpotlight from "@/components/sections/PromotionSpotlight";
import { localize, type Locale, withLocalePath } from "@/lib/i18n";

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
  const t = <T,>(v: Record<Locale, T>): T => localize(locale, v);
  const localizedPillars = t({
    en: pillars,
    vi: [
      "Kỹ thuật viên được đào tạo bài bản",
      "Sản phẩm thực vật thân thiện với da",
      "Không gian trị liệu riêng tư và yên tĩnh",
      "Sự hiếu khách ấm áp trong từng chi tiết",
    ],
    ko: [
      "국제적으로 교육받은 숙련된 테라피스트",
      "피부에 순한 식물성 제품",
      "프라이빗하고 평온한 트리트먼트 공간",
      "디테일마다 변함없는 따뜻한 환대",
    ],
  });
  return (
    <main>
      <section className="section-padding section-cream">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <AnimatedSection animation="slide-up-fade">
            <SectionHeading
              eyebrow={t({ en: "About Serena", vi: "Về Serena", ko: "세레나 소개" })}
              title={t({ en: "A Place to Glow", vi: "Nơi bạn toả sáng", ko: "당신이 빛나는 공간" })}
              subtitle={t({
                en: "SERENA SPA was created as a sanctuary where beauty is not only cared for on the outside, but also healed from within. With dedication in every experience, Serena Spa always places relaxation, serenity, and customer satisfaction at the heart of every treatment.",
                vi: "SERENA SPA ra đời với mong muốn tạo nên một không gian nơi vẻ đẹp không chỉ được chăm sóc bên ngoài mà còn được chữa lành từ bên trong. Với sự tận tâm trong từng trải nghiệm, Serena Spa luôn đặt cảm giác thư giãn, an yên và sự hài lòng của khách hàng lên hàng đầu.",
                ko: "SERENA SPA는 아름다움을 외면뿐 아니라 내면에서부터 치유하는 안식처로 탄생했습니다. 모든 경험에 정성을 담아 세레나 스파는 언제나 이완, 평온, 고객 만족을 모든 트리트먼트의 중심에 둡니다.",
              })}
              titleAs="h1"
            />
            <p className="prose-spa mt-5">
              {t({
                en: "Each therapy at Serena is more than skincare or body relaxation - it is a moment to restore energy, regain balance, and escape from daily pressures. Inspired by the pure beauty of the lotus flower and the healing power of nature, Serena Spa embraces a gentle, refined, and sustainable approach, where true beauty is nurtured from within and naturally shines outward.",
                vi: "Mỗi liệu trình tại Serena không chỉ là chăm sóc da hay thư giãn cơ thể, mà còn là khoảng thời gian để tái tạo năng lượng và tìm lại sự cân bằng sau những áp lực thường nhật. Lấy cảm hứng từ vẻ đẹp tinh khiết của hoa sen và thiên nhiên chữa lành, Serena Spa theo đuổi phong cách nhẹ nhàng, tinh tế và bền vững, nơi vẻ đẹp được nuôi dưỡng từ bên trong để tự nhiên tỏa sáng.",
                ko: "세레나의 모든 트리트먼트는 단순한 스킨케어나 신체 이완을 넘어, 에너지를 되찾고 균형을 회복하며 일상의 압박에서 벗어나는 시간입니다. 연꽃의 순수한 아름다움과 자연의 치유력에서 영감을 받아, 세레나 스파는 부드럽고 정제되며 지속가능한 방식을 추구하며 진정한 아름다움이 내면에서 길러져 자연스럽게 빛나도록 합니다.",
              })}
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link href={withLocalePath(locale, "/services")} className="btn btn-primary btn-sm">{t({ en: "Explore Services", vi: "Khám phá dịch vụ", ko: "서비스 둘러보기" })}</Link>
              <Link href={withLocalePath(locale, "/booking")} className="btn btn-outline btn-sm">{t({ en: "Book Now", vi: "Đặt lịch", ko: "예약하기" })}</Link>
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
              eyebrow={t({ en: "Why Guests Return", vi: "Lý do khách quay lại", ko: "고객이 다시 찾는 이유" })}
              title={t({ en: "Our Promise", vi: "Cam kết của Serena", ko: "세레나의 약속" })}
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
