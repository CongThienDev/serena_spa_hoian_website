import { type Locale } from "@/lib/i18n";

export function getHomeCopy(locale: Locale) {
  if (locale === "vi") {
    return {
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
    };
  }

  return {
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
  };
}
