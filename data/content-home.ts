import { type Locale } from "@/lib/i18n";

type HomeCopy = {
  hero: {
    eyebrow: string;
    title: string[];
    tagline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  features: {
    sectionAria: string;
    items: { title: string; description: string }[];
  };
  treatments: {
    eyebrow: string;
    title: string;
    subtitle: string;
    bookingEyebrow: string;
    bookingTitle: string;
    bookingDesc: string;
    bookingPrimary: string;
    bookingSecondary: string;
  };
  why: {
    eyebrow: string;
    title: string;
    subtitle: string;
    items: { title: string; description: string }[];
  };
  testimonials: {
    eyebrow: string;
    title: string;
    source: { google: string; tripadvisor: string; booking: string; direct: string };
  };
  blog: {
    eyebrow: string;
    title: string;
    allArticles: string;
    readMore: string;
    minRead: string;
  };
  cta: {
    eyebrow: string;
    title: string;
    subtitle: string;
    primary: string;
    secondary: string;
  };
};

const HOME_COPY: Record<Locale, HomeCopy> = {
  vi: {
    hero: {
      eyebrow: "Nơi bạn toả sáng",
      title: ["Thư giãn", "và phục hồi", "đẳng cấp"],
      tagline: "Đánh thức năng lượng, giải phóng căng thẳng và để vẻ rạng rỡ tự nhiên của bạn tỏa sáng.",
      ctaPrimary: "Đặt lịch ngay",
      ctaSecondary: "Khám phá dịch vụ",
    },
    features: {
      sectionAria: "Trụ cột chăm sóc toàn diện",
      items: [
        { title: "Chăm sóc toàn diện", description: "Cân bằng thân - tâm - trí qua các liệu pháp cổ truyền kết hợp hiện đại." },
        { title: "Phục hồi tự nhiên", description: "Thảo dược và nguyên liệu thực vật tinh khiết giúp tái tạo sâu." },
        { title: "Tĩnh tại bên trong", description: "Nghi thức đánh thức giác quan giúp tâm trí lắng dịu và cân bằng." },
        { title: "Bền vững & đạo đức", description: "Sản phẩm hữu cơ cao cấp và quy trình thân thiện với môi trường." },
      ],
    },
    treatments: {
      eyebrow: "Liệu trình đặc trưng",
      title: "Liệu trình đặc trưng",
      subtitle: "Mỗi liệu trình là một nghi thức được thiết kế chỉn chu để phục hồi, tái tạo và nâng tầm năng lượng.",
      bookingEyebrow: "Đặt lịch chăm sóc toàn diện",
      bookingTitle: "Bắt đầu hành trình phục hồi của bạn",
      bookingDesc: "Đặt online hoặc liên hệ trực tiếp qua WhatsApp. Hỗ trợ đặt lịch trong ngày.",
      bookingPrimary: "Đặt liệu trình",
      bookingSecondary: "Xem tất cả dịch vụ",
    },
    why: {
      eyebrow: "Vì sao chọn Serena",
      title: "Vì sao khách quay lại",
      subtitle: "Từ khoảnh khắc đầu tiên đến ngụm trà thảo mộc cuối cùng, mọi chi tiết đều dành cho bạn.",
      items: [
        { title: "Kỹ thuật viên chuyên nghiệp", description: "Đội ngũ trị liệu viên được đào tạo bài bản với kinh nghiệm thực tế dày dặn." },
        { title: "Sản phẩm cao cấp", description: "Tinh tuyển thành phần hữu cơ và thực vật an toàn cho da, hiệu quả và tinh tế." },
        { title: "Không gian riêng tư", description: "Phòng trị liệu yên tĩnh, riêng tư tuyệt đối để bạn nghỉ ngơi trọn vẹn." },
        { title: "Giá trị xứng đáng", description: "Trải nghiệm cao cấp với mức giá minh bạch, không phụ phí ẩn." },
      ],
    },
    testimonials: {
      eyebrow: "Câu chuyện khách hàng",
      title: "Khách nói gì về Serena",
      source: {
        google: "Đánh giá Google",
        tripadvisor: "TripAdvisor",
        booking: "Booking.com",
        direct: "Khách tại spa",
      },
    },
    blog: {
      eyebrow: "Nhật ký Serena",
      title: "Từ nhật ký Serena",
      allArticles: "Xem tất cả bài viết",
      readMore: "Xem thêm",
      minRead: "phút đọc",
    },
    cta: {
      eyebrow: "Không gian chữa lành đang chờ bạn",
      title: "Bắt đầu hành trình chăm sóc toàn diện ngay hôm nay",
      subtitle: "Đặt lịch trực tuyến hoặc liên hệ trực tiếp. Serena luôn sẵn sàng đón bạn trong ngày.",
      primary: "Đặt liệu trình ngay",
      secondary: "Khám phá dịch vụ",
    },
  },

  en: {
    hero: {
      eyebrow: "A Place to Glow",
      title: ["Premium", "Relaxation", "& Healing"],
      tagline: "Awaken your energy, release your stress and let your natural glow shine.",
      ctaPrimary: "Book Your Escape",
      ctaSecondary: "Explore Services",
    },
    features: {
      sectionAria: "Our wellness pillars",
      items: [
        { title: "Holistic Wellness", description: "Mind, body and spirit aligned through ancient and modern healing arts." },
        { title: "Natural Healing", description: "Pure botanical ingredients and traditional herbal compresses for deep renewal." },
        { title: "Inner Calm", description: "Sensory rituals crafted to quiet the mind and restore your natural balance." },
        { title: "Sustainable & Ethical", description: "Premium organic products with zero-waste rituals, aligned with the earth." },
      ],
    },
    treatments: {
      eyebrow: "Our Signature Treatments",
      title: "Our Signature Treatments",
      subtitle: "Each treatment is a carefully designed ritual — blending ancient Vietnamese healing with modern wellness to restore, renew and illuminate.",
      bookingEyebrow: "Wellness Booking",
      bookingTitle: "Book Your Wellness Journey",
      bookingDesc: "Reserve your treatment online or reach us directly on WhatsApp. Same-day bookings welcome.",
      bookingPrimary: "Reserve a Treatment",
      bookingSecondary: "View All Services",
    },
    why: {
      eyebrow: "Why Serena",
      title: "Why Guests Choose Us",
      subtitle: "From your first breath in our space to your final sip of herbal tea, every detail is designed around you.",
      items: [
        { title: "Professional Therapists", description: "Trained and certified wellness practitioners with years of hands-on expertise." },
        { title: "Premium Products", description: "Curated organic and botanical skincare — selected for purity, performance and scent." },
        { title: "Private & Peaceful Space", description: "Intimate treatment suites designed for complete privacy, quiet and deep restoration." },
        { title: "Best Price Guarantee", description: "Exceptional luxury at honest value — no hidden charges, no surprises." },
      ],
    },
    testimonials: {
      eyebrow: "Guest Stories",
      title: "What Our Guests Say",
      source: {
        google: "Google Review",
        tripadvisor: "TripAdvisor",
        booking: "Booking.com",
        direct: "Guest",
      },
    },
    blog: {
      eyebrow: "Wellness Journal",
      title: "From the Journal",
      allArticles: "All Articles",
      readMore: "Read More",
      minRead: "min read",
    },
    cta: {
      eyebrow: "Your Sanctuary Awaits",
      title: "Begin Your Wellness Journey Today",
      subtitle: "Reserve your treatment online or connect with us directly. Same-day bookings are warmly welcomed.",
      primary: "Reserve Your Treatment",
      secondary: "Explore Services",
    },
  },

  // 한국어 임시 번역 — 검토 후 다듬어 주세요 (Korean placeholder translations — please review/refine).
  ko: {
    hero: {
      eyebrow: "당신이 빛나는 공간",
      title: ["고품격", "휴식", "& 힐링"],
      tagline: "지친 일상에서 벗어나 몸과 마음에 새로운 활력을 불어넣으세요.",
      ctaPrimary: "예약하기",
      ctaSecondary: "서비스 둘러보기",
    },
    features: {
      sectionAria: "세레나의 웰니스 가치",
      items: [
        { title: "전인적 웰니스", description: "전통과 현대의 힐링 기법으로 몸·마음·정신의 균형을 맞춥니다." },
        { title: "자연 힐링", description: "순수 식물성 원료와 전통 허브 찜질로 깊은 재생을 선사합니다." },
        { title: "내면의 평온", description: "감각을 깨우는 리추얼로 마음을 가라앉히고 균형을 되찾습니다." },
        { title: "지속가능 & 윤리", description: "프리미엄 유기농 제품과 친환경 리추얼로 자연과 함께합니다." },
      ],
    },
    treatments: {
      eyebrow: "시그니처 트리트먼트",
      title: "시그니처 트리트먼트",
      subtitle:
        "각 트리트먼트는 지친 몸과 마음을 회복시키고, 새로운 에너지를 채워 본연의 아름다움을 더욱 빛나게 하기 위해 세심하게 디자인되었습니다.",
      bookingEyebrow: "웰니스 예약",
      bookingTitle: "당신의 웰니스 여정을 예약하세요",
      bookingDesc: "온라인으로 예약하거나 WhatsApp으로 직접 문의하세요. 당일 예약도 환영합니다.",
      bookingPrimary: "트리트먼트 예약",
      bookingSecondary: "전체 서비스 보기",
    },
    why: {
      eyebrow: "왜 세레나인가",
      title: "손님들이 다시 찾는 이유",
      subtitle: "공간에 들어선 첫 순간부터 마지막 허브차 한 모금까지, 모든 디테일이 당신을 위해 준비되어 있습니다.",
      items: [
        { title: "전문 테라피스트", description: "풍부한 실무 경험을 갖춘 체계적으로 훈련된 웰니스 전문가입니다." },
        { title: "프리미엄 제품", description: "순수함, 효능, 향을 기준으로 엄선한 유기농·식물성 스킨케어입니다." },
        { title: "프라이빗한 공간", description: "완전한 프라이버시와 깊은 휴식을 위한 조용하고 아늑한 트리트먼트 룸입니다." },
        { title: "합리적인 가치", description: "투명한 가격과 숨은 비용 없는 프리미엄 경험을 제공합니다." },
      ],
    },
    testimonials: {
      eyebrow: "고객 이야기",
      title: "고객들이 전하는 세레나",
      source: {
        google: "Google 리뷰",
        tripadvisor: "TripAdvisor",
        booking: "Booking.com",
        direct: "스파 방문 고객",
      },
    },
    blog: {
      eyebrow: "세레나 저널",
      title: "세레나 저널에서",
      allArticles: "모든 글 보기",
      readMore: "더 보기",
      minRead: "분 읽기",
    },
    cta: {
      eyebrow: "당신을 위한 안식처가 기다립니다",
      title: "오늘 당신의 웰니스 여정을 시작하세요",
      subtitle: "온라인으로 예약하거나 직접 연락 주세요. 당일 예약도 따뜻하게 환영합니다.",
      primary: "지금 트리트먼트 예약",
      secondary: "서비스 둘러보기",
    },
  },
};

export function getHomeCopy(locale: Locale) {
  return HOME_COPY[locale] ?? HOME_COPY.en;
}
