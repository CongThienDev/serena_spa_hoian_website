import Image from "next/image";
import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { generateLocalizedRouteMetadata } from "@/lib/route-metadata";
import { normalizeLocale, withLocalePath } from "@/lib/i18n";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateLocalizedRouteMetadata(locale, "/about");
}

export default async function LocalizedAboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  const vi = locale === "vi";
  const pillars = vi
    ? [
        "Kỹ thuật viên được đào tạo bài bản",
        "Sản phẩm thực vật an toàn cho da",
        "Không gian trị liệu riêng tư, yên tĩnh",
        "Trải nghiệm hiếu khách ấm áp và nhất quán",
      ]
    : [
        "Skilled therapists with international training",
        "Botanical, skin-friendly products",
        "Private and calm treatment environment",
        "Consistent warm hospitality in every detail",
      ];

  return (
    <main>
      <section className="section-padding section-cream">
        <div className="container-site grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <AnimatedSection animation="slide-up-fade">
            <SectionHeading
              eyebrow={vi ? "Về Serena" : "About Serena"}
              title={vi ? "Nơi bạn toả sáng" : "A Place to Glow"}
              subtitle={
                vi
                  ? "Serena Spa được tạo nên như một chốn an yên giữa lòng Hội An, nơi các nghi thức trị liệu giúp bạn trở về trạng thái cân bằng."
                  : "Serena Spa was created as a calm sanctuary in the heart of Hội An, where thoughtful rituals, refined spaces, and caring hands help you return to balance."
              }
              titleAs="h1"
            />
            <p className="prose-spa mt-5">
              {vi
                ? "Chúng tôi kết hợp tinh hoa trị liệu Việt Nam với tiêu chuẩn wellness hiện đại để tạo nên trải nghiệm phục hồi sâu và đáng nhớ."
                : "We blend Vietnamese healing traditions with modern wellness standards to create treatments that are both deeply restorative and beautifully memorable."}
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
                alt={vi ? "Khu vực lễ tân Serena Spa" : "Serena Spa reception with warm terracotta interior"}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 48vw"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

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
            {pillars.map((item, i) => (
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
