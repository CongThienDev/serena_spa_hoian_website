import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import SectionHeading from "@/components/ui/SectionHeading";
import { localize, type Locale } from "@/lib/i18n";

export const metadata: Metadata = generatePageMetadata({
  title: "FAQ — Serena Spa Hội An",
  description: "Frequently asked questions about Serena Spa services, booking, and policies.",
  path: "/faq",
});

const faq = [
  ["Do I need to book in advance?", "Advance booking is recommended, especially for peak evening hours. Same-day bookings are welcome when slots are available."],
  ["How early should I arrive?", "Please arrive 10-15 minutes before your appointment to enjoy a calm check-in ritual."],
  ["Can I request a specific therapist?", "Yes. You can mention your preferred therapist during booking and we will do our best to arrange."],
  ["Do you offer couple rooms?", "Yes, we have private couple treatment rooms and curated SPA packages for two guests."],
];

export default function FaqPage({ locale = "en" }: { locale?: Locale }) {
  const t = <T,>(v: Record<Locale, T>): T => localize(locale, v);
  const localizedFaq = t({
    en: faq,
    vi: [
      ["Tôi có cần đặt lịch trước không?", "Nên đặt trước, đặc biệt vào khung giờ cao điểm buổi tối. Serena vẫn hỗ trợ đặt trong ngày nếu còn chỗ."],
      ["Tôi nên đến sớm bao lâu?", "Vui lòng đến sớm 10-15 phút để check-in và thư giãn trước khi bắt đầu liệu trình."],
      ["Tôi có thể chọn kỹ thuật viên không?", "Có. Bạn có thể ghi chú kỹ thuật viên mong muốn khi đặt lịch, Serena sẽ hỗ trợ sắp xếp tối đa."],
      ["Serena có phòng trị liệu đôi không?", "Có. Serena có phòng trị liệu riêng cho cặp đôi và các gói Spa dành cho hai khách."],
    ],
    ko: [
      ["사전 예약이 필요한가요?", "특히 저녁 피크 시간대에는 사전 예약을 권장합니다. 자리가 있으면 당일 예약도 환영합니다."],
      ["얼마나 일찍 도착해야 하나요?", "차분한 체크인을 위해 예약 시간 10~15분 전에 도착해 주세요."],
      ["특정 테라피스트를 요청할 수 있나요?", "네. 예약 시 원하시는 테라피스트를 알려 주시면 최대한 맞춰 드립니다."],
      ["커플 룸이 있나요?", "네. 프라이빗 커플 트리트먼트 룸과 2인을 위한 스파 패키지를 운영합니다."],
    ],
  });
  return (
    <main>
      <section className="section-padding section-cream">
        <div className="container-content">
          <SectionHeading eyebrow={t({ en: "Support", vi: "Hỗ trợ", ko: "지원" })} title={t({ en: "Frequently Asked Questions", vi: "Câu hỏi thường gặp", ko: "자주 묻는 질문" })} titleAs="h1" className="mb-10" />
          <div className="space-y-4">
            {localizedFaq.map(([q, a]) => (
              <div key={q} className="card p-6">
                <h2 className="font-serif text-h4">{q}</h2>
                <p className="text-[var(--color-warm-gray)] mt-2">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
