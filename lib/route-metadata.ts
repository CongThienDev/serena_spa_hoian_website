import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import { type Locale, normalizeLocale } from "@/lib/i18n";

type RouteKey =
  | "/"
  | "/about"
  | "/blog"
  | "/booking"
  | "/contact"
  | "/faq"
  | "/gallery"
  | "/privacy-policy"
  | "/services"
  | "/terms"
  | "/wellness";

const COPY: Record<RouteKey, Record<Locale, { title: string; description: string }>> = {
  "/": {
    vi: {
      title: "Serena Spa Hội An — Wellness & Massage cao cấp",
      description:
        "Khám phá các liệu trình wellness cao cấp, massage đặc trưng và hành trình phục hồi toàn diện tại Serena Spa Hội An.",
    },
    en: {
      title: "Serena Spa Hội An — Premium Wellness & Massage",
      description:
        "Discover premium wellness treatments, signature massages, and holistic healing at Serena Spa in Hội An. Book your sanctuary experience today.",
    },
    ko: {
      title: "세레나 스파 호이안 — 프리미엄 웰니스 & 마사지",
      description:
        "호이안 세레나 스파에서 프리미엄 웰니스 트리트먼트, 시그니처 마사지, 전인적 힐링을 만나보세요. 지금 나만의 안식 시간을 예약하세요.",
    },
  },
  "/about": {
    vi: {
      title: "Về Serena Spa Hội An",
      description: "Câu chuyện, triết lý và cam kết dịch vụ wellness cao cấp của Serena Spa tại Hội An.",
    },
    en: {
      title: "About Serena Spa Hội An",
      description: "Discover Serena Spa's story, philosophy, and commitment to premium wellness experiences in Hội An.",
    },
    ko: {
      title: "세레나 스파 호이안 소개",
      description: "호이안 세레나 스파의 이야기와 철학, 프리미엄 웰니스 경험을 향한 약속을 만나보세요.",
    },
  },
  "/blog": {
    vi: {
      title: "Nhật ký Wellness — Serena Spa Hội An",
      description: "Bí quyết chăm sóc sức khỏe, hướng dẫn liệu trình và cảm hứng wellness từ Serena Spa Hội An.",
    },
    en: {
      title: "Wellness Journal — Serena Spa Hội An",
      description: "Wellness tips, treatment guides, and spa insights from Serena Spa Hội An.",
    },
    ko: {
      title: "웰니스 저널 — 세레나 스파 호이안",
      description: "호이안 세레나 스파의 웰니스 팁과 트리트먼트 가이드, 스파 인사이트를 만나보세요.",
    },
  },
  "/booking": {
    vi: {
      title: "Đặt lịch — Serena Spa Hội An",
      description: "Đặt lịch liệu trình nhanh chóng tại Serena Spa Hội An.",
    },
    en: {
      title: "Booking — Serena Spa Hội An",
      description: "Reserve your treatment quickly at Serena Spa Hội An.",
    },
    ko: {
      title: "예약 — 세레나 스파 호이안",
      description: "호이안 세레나 스파에서 트리트먼트를 간편하게 예약하세요.",
    },
  },
  "/contact": {
    vi: {
      title: "Liên hệ — Serena Spa Hội An",
      description: "Liên hệ Serena Spa để được tư vấn và đặt lịch nhanh.",
    },
    en: {
      title: "Contact — Serena Spa Hội An",
      description: "Contact Serena Spa for booking and support.",
    },
    ko: {
      title: "문의 — 세레나 스파 호이안",
      description: "예약과 지원이 필요하시면 세레나 스파로 문의하세요.",
    },
  },
  "/faq": {
    vi: {
      title: "Câu hỏi thường gặp — Serena Spa Hội An",
      description: "Giải đáp câu hỏi thường gặp về liệu trình, đặt lịch và trải nghiệm tại Serena Spa Hội An.",
    },
    en: {
      title: "FAQ — Serena Spa Hội An",
      description: "Frequently asked questions about treatments, booking, and the Serena Spa Hội An experience.",
    },
    ko: {
      title: "자주 묻는 질문 — 세레나 스파 호이안",
      description: "트리트먼트, 예약, 세레나 스파 호이안 경험에 대한 자주 묻는 질문입니다.",
    },
  },
  "/gallery": {
    vi: {
      title: "Thư viện ảnh — Serena Spa Hội An",
      description: "Khám phá không gian Serena Spa qua hình ảnh thực tế.",
    },
    en: {
      title: "Gallery — Serena Spa Hội An",
      description: "Explore Serena Spa spaces through real photos.",
    },
    ko: {
      title: "갤러리 — 세레나 스파 호이안",
      description: "실제 사진으로 세레나 스파의 공간을 둘러보세요.",
    },
  },
  "/privacy-policy": {
    vi: {
      title: "Chính sách bảo mật — Serena Spa Hội An",
      description: "Tìm hiểu cách Serena Spa Hội An thu thập, sử dụng và bảo vệ thông tin cá nhân của bạn.",
    },
    en: {
      title: "Privacy Policy — Serena Spa Hội An",
      description: "Learn how Serena Spa Hội An collects, uses, and protects your information.",
    },
    ko: {
      title: "개인정보 처리방침 — 세레나 스파 호이안",
      description: "세레나 스파 호이안이 고객 정보를 수집·이용·보호하는 방식을 안내합니다.",
    },
  },
  "/services": {
    vi: {
      title: "Dịch vụ — Serena Spa Hội An",
      description: "Khám phá các liệu trình massage, facial và wellness tại Serena Spa Hội An.",
    },
    en: {
      title: "Services — Serena Spa Hội An",
      description: "Explore massage, facial, and wellness treatments at Serena Spa Hội An.",
    },
    ko: {
      title: "서비스 — 세레나 스파 호이안",
      description: "호이안 세레나 스파의 마사지, 페이셜, 웰니스 트리트먼트를 둘러보세요.",
    },
  },
  "/terms": {
    vi: {
      title: "Điều khoản & điều kiện — Serena Spa Hội An",
      description: "Điều khoản đặt lịch, chính sách hủy lịch và điều kiện dịch vụ tại Serena Spa Hội An.",
    },
    en: {
      title: "Terms & Conditions — Serena Spa Hội An",
      description: "Booking terms, cancellation policy, and service conditions at Serena Spa Hội An.",
    },
    ko: {
      title: "이용약관 — 세레나 스파 호이안",
      description: "세레나 스파 호이안의 예약 약관, 취소 정책, 서비스 조건을 안내합니다.",
    },
  },
  "/wellness": {
    vi: {
      title: "Triết lý Wellness — Serena Spa Hội An",
      description: "Khám phá triết lý wellness của Serena Spa: phục hồi cơ thể, tĩnh tâm trí và nuôi dưỡng tinh thần tại Hội An.",
    },
    en: {
      title: "Wellness Philosophy — Serena Spa Hội An",
      description:
        "Discover the Serena wellness philosophy — where every ritual, space, and moment is designed to restore your body, quiet your mind, and awaken your spirit in Hội An.",
    },
    ko: {
      title: "웰니스 철학 — 세레나 스파 호이안",
      description:
        "모든 리추얼과 공간, 순간이 몸을 회복시키고 마음을 가라앉히며 정신을 깨우도록 설계된 세레나의 웰니스 철학을 만나보세요.",
    },
  },
};

export function generateLocalizedRouteMetadata(
  localeInput: string,
  route: RouteKey,
): Metadata {
  const locale = normalizeLocale(localeInput);
  const copy = COPY[route][locale];

  return generatePageMetadata({
    title: copy.title,
    description: copy.description,
    path: route,
    locale,
  });
}
