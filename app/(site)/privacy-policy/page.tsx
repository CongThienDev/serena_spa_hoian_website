import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { localize, type Locale } from "@/lib/i18n";

export const metadata: Metadata = generatePageMetadata({
  title: "Privacy Policy — Serena Spa Hội An",
  description: "Serena Spa privacy policy for personal data and booking information.",
  path: "/privacy-policy",
});

export default function PrivacyPolicyPage({ locale = "en" }: { locale?: Locale }) {
  const t = <T,>(v: Record<Locale, T>): T => localize(locale, v);
  return (
    <main>
      <section className="section-padding section-cream">
        <article className="container-content max-w-3xl">
          <h1 className="text-h1">{t({ en: "Privacy Policy", vi: "Chính sách bảo mật", ko: "개인정보 처리방침" })}</h1>
          <p className="text-[var(--color-warm-gray)] mt-5">
            {t({
              en: "We collect only the information needed to confirm bookings, provide treatments, and communicate with guests. Your information is handled securely and never sold to third parties.",
              vi: "Serena chỉ thu thập thông tin cần thiết để xác nhận đặt lịch, cung cấp liệu trình và liên hệ với khách. Dữ liệu được bảo mật và không bán cho bên thứ ba.",
              ko: "세레나는 예약 확정, 트리트먼트 제공, 고객 응대에 필요한 정보만 수집합니다. 고객 정보는 안전하게 관리되며 제3자에게 판매하지 않습니다.",
            })}
          </p>
          <p className="text-[var(--color-warm-gray)] mt-4">
            {t({
              en: "For any privacy-related request, contact us directly at serenaspahoian@gmail.com.",
              vi: "Với mọi yêu cầu liên quan đến quyền riêng tư, vui lòng liên hệ: serenaspahoian@gmail.com.",
              ko: "개인정보 관련 요청은 serenaspahoian@gmail.com 으로 직접 문의해 주세요.",
            })}
          </p>
        </article>
      </section>
    </main>
  );
}
