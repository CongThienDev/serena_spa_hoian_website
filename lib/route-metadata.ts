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
