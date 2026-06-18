import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import SectionHeading from "@/components/ui/SectionHeading";
import { localize, type Locale, withLocalePath } from "@/lib/i18n";

export default function PromotionSpotlight({ locale = "en" }: { locale?: Locale }) {
  const t = <T,>(variants: Record<Locale, T>): T => localize(locale, variants);

  return (
    <section className="section-padding" style={{ backgroundColor: "var(--color-cream)" }}>
      <div className="container-site">
        <AnimatedSection animation="slide-up-fade">
          <SectionHeading
            eyebrow={t({ en: "Grand Opening Offer", vi: "Ưu đãi grand opening", ko: "그랜드 오프닝 혜택" })}
            title={t({ en: "Current Serena Spa promotions", vi: "Ưu đãi hiện tại tại Serena Spa", ko: "세레나 스파 현재 프로모션" })}
            align="center"
            className="mb-8"
          />

          <div className="overflow-hidden rounded-[var(--radius-card)] border border-[var(--color-sand)] bg-[var(--color-warm-white)] shadow-[0_18px_48px_rgba(61,31,15,0.08)]">
            <div className="relative">
              <Image
                src="/images/promotion/z7944111973213_480356e7de5aafbee22cbbe4b21b364f.jpg"
                alt={t({ en: "Serena Spa Hoi An grand opening promotion poster", vi: "Poster ưu đãi grand opening của Serena Spa Hội An", ko: "세레나 스파 호이안 그랜드 오프닝 프로모션 포스터" })}
                width={1600}
                height={900}
                className="h-auto w-full"
                sizes="100vw"
              />
            </div>

            <div className="border-t border-[var(--color-sand)] p-5 md:p-7">
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="rounded-[1.5rem] border border-[var(--color-sand)] bg-[var(--color-cream-dark)] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-terracotta-dark)]">
                    {t({ en: "Code SAVE35", vi: "Mã SAVE35", ko: "코드 SAVE35" })}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl text-[var(--color-espresso)]">35% OFF</h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-espresso-mid)]">
                    {t({
                      en: "35% off all treatments. Valid from June 15, 2026 to July 15, 2026, between 10:00 and 19:00.",
                      vi: "Giảm 35% cho tất cả treatment. Áp dụng từ 15/06/2026 đến 15/07/2026, trong khung giờ 10:00 đến 19:00.",
                      ko: "모든 트리트먼트 35% 할인. 2026년 6월 15일부터 7월 15일까지 10:00~19:00 적용.",
                    })}
                  </p>
                </div>

                <div className="rounded-[1.5rem] border border-[var(--color-sand)] bg-[var(--color-warm-white)] p-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-terracotta-dark)]">
                    {t({ en: "Code BUY2PAY1", vi: "Mã BUY2PAY1", ko: "코드 BUY2PAY1" })}
                  </p>
                  <h3 className="mt-2 font-serif text-3xl text-[var(--color-espresso)]">
                    {t({ en: "Buy 2 Pay 1", vi: "Mua 2 trả 1", ko: "2개 구매 1개 결제" })}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--color-espresso-mid)]">
                    {t({
                      en: "Valid for treatments from 90 minutes and up between 10:00 and 19:00. 2 guests pay for 1, 3 guests get 1 guest free, and 4 guests pay for 2.",
                      vi: "Áp dụng cho treatment từ 90 phút trở lên trong khung giờ 10:00 đến 19:00. Nếu đặt 2 khách thì tính tiền 1 khách; 3 khách giảm 1 khách; 4 khách tính tiền 2 khách.",
                      ko: "10:00~19:00 사이 90분 이상 트리트먼트에 적용. 2인은 1인 요금, 3인은 1인 무료, 4인은 2인 요금입니다.",
                    })}
                  </p>
                </div>
              </div>

              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link href={withLocalePath(locale, "/booking")} className="btn btn-primary btn-sm">
                  {t({ en: "Book with offer", vi: "Đặt lịch với ưu đãi", ko: "혜택으로 예약하기" })}
                </Link>
                <Link href={withLocalePath(locale, "/services")} className="btn btn-outline btn-sm">
                  {t({ en: "View services", vi: "Xem dịch vụ", ko: "서비스 보기" })}
                </Link>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
