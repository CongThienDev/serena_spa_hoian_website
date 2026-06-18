import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { localize, type Locale } from "@/lib/i18n";

export const metadata: Metadata = generatePageMetadata({
  title: "Terms & Conditions — Serena Spa Hội An",
  description: "Booking terms, cancellation policy, and service conditions at Serena Spa Hội An.",
  path: "/terms",
});

export default function TermsPage({ locale = "en" }: { locale?: Locale }) {
  const t = <T,>(v: Record<Locale, T>): T => localize(locale, v);
  return (
    <main>
      <section className="section-padding section-cream">
        <article className="container-content max-w-3xl">
          <h1 className="text-h1">{t({ en: "Terms & Conditions", vi: "Điều khoản & điều kiện", ko: "이용약관" })}</h1>
          <p className="text-[var(--color-warm-gray)] mt-5">
            {t({
              en: "Appointments are subject to availability. Please inform us in advance for cancellations or rescheduling to ensure the best service experience for all guests.",
              vi: "Lịch hẹn phụ thuộc vào tình trạng chỗ trống. Vui lòng báo trước nếu cần hủy hoặc đổi lịch để Serena phục vụ tốt nhất cho tất cả khách hàng.",
              ko: "예약은 가능 여부에 따라 진행됩니다. 모든 고객에게 최상의 서비스를 제공하기 위해 취소나 일정 변경 시 미리 알려 주세요.",
            })}
          </p>
          <p className="text-[var(--color-warm-gray)] mt-4">
            {t({
              en: "By confirming a booking, you agree to our treatment and arrival policies.",
              vi: "Khi xác nhận đặt lịch, bạn đồng ý với chính sách trị liệu và giờ đến của Serena Spa.",
              ko: "예약을 확정하면 세레나 스파의 트리트먼트 및 도착 정책에 동의하는 것으로 간주됩니다.",
            })}
          </p>
        </article>
      </section>
    </main>
  );
}
