/**
 * Serena Spa — Testimonials data
 * MVP: static data. Phase 9: migrate to Sanity CMS.
 * Per CONTENT_CHECKLIST.md: aim for 5-10 authentic testimonials.
 * TODO: Replace with real customer testimonials before launch.
 */

export type Testimonial = {
  id: string;
  name: string;
  country: string;
  countryCode: string; // ISO 3166-1 alpha-2
  avatar?: string;
  rating: 1 | 2 | 3 | 4 | 5;
  service: string;
  text: string;
  source: "google" | "tripadvisor" | "booking" | "direct";
  date: string; // ISO date string
  isFeatured?: boolean;
};

type LocalizedTestimonialOverride = Partial<
  Pick<Testimonial, "country" | "service" | "text">
>;

export const TESTIMONIALS: Testimonial[] = [
  {
    id: "t-01",
    name: "Emma L.",
    country: "Australia",
    countryCode: "AU",
    rating: 5,
    service: "Serena Signature Massage",
    text: "Absolutely the best spa experience I've had in Southeast Asia. The atmosphere is incredibly calming, the therapists are genuinely skilled, and the hot herbal compress left me completely renewed. I came back a second time the very next day.",
    source: "google",
    date: "2026-04-15",
    isFeatured: true,
  },
  {
    id: "t-02",
    name: "James & Sophie K.",
    country: "United Kingdom",
    countryCode: "GB",
    rating: 5,
    service: "Couple Ritual",
    text: "We booked the couple ritual for our anniversary and it was simply magical. The private suite, the thoughtful details, the quality of the treatments — everything felt deeply considered. We left glowing and completely relaxed.",
    source: "tripadvisor",
    date: "2026-03-20",
    isFeatured: true,
  },
  {
    id: "t-03",
    name: "Min-Ju H.",
    country: "South Korea",
    countryCode: "KR",
    rating: 5,
    service: "Facial Clay Therapy",
    text: "I was recommended Serena Spa by my hotel concierge and I'm so glad I went. The facial was outstanding — my skin has never felt this clean and radiant. The staff communicated well and made me feel very welcome.",
    source: "google",
    date: "2026-04-02",
    isFeatured: true,
  },
  {
    id: "t-04",
    name: "David M.",
    country: "United States",
    countryCode: "US",
    rating: 5,
    service: "Hot Stone Therapy",
    text: "I was sceptical about hot stone massage but this experience converted me entirely. The heat penetrated muscles I didn't even know were tight. The ambience — soft music, warm lighting, the scent of herbs — made it truly transportive.",
    source: "tripadvisor",
    date: "2026-02-28",
    isFeatured: true,
  },
  {
    id: "t-05",
    name: "Linh T.",
    country: "Vietnam",
    countryCode: "VN",
    rating: 5,
    service: "Body Scrub Ritual",
    text: "Tôi rất ấn tượng với chất lượng dịch vụ tại Serena Spa. Không gian đẹp, nhân viên chuyên nghiệp và thân thiện. Liệu trình tẩy tế bào chết toàn thân khiến da tôi mềm mại hơn hẳn.",
    source: "google",
    date: "2026-01-18",
    isFeatured: false,
  },
  {
    id: "t-06",
    name: "Charlotte B.",
    country: "France",
    countryCode: "FR",
    rating: 5,
    service: "Foot Massage",
    text: "After three days walking around Hội An, my feet were desperate for relief. The 60-minute foot massage was pure heaven — the reflexology was precise and deeply relaxing. Worth every cent.",
    source: "google",
    date: "2026-03-05",
    isFeatured: false,
  },
];

const TESTIMONIALS_VI: Record<string, LocalizedTestimonialOverride> = {
  "t-01": {
    country: "Úc",
    service: "Serena Signature Massage",
    text: "Đây là trải nghiệm spa tuyệt vời nhất mà tôi từng có ở Đông Nam Á. Không gian rất thư giãn, kỹ thuật viên tay nghề cao và túi thảo dược nóng giúp tôi phục hồi hoàn toàn.",
  },
  "t-02": {
    country: "Vương quốc Anh",
    service: "Couple Ritual",
    text: "Chúng tôi đặt gói trị liệu cặp đôi cho dịp kỷ niệm và mọi thứ thực sự hoàn hảo. Phòng riêng, sự tinh tế trong từng chi tiết và chất lượng liệu trình đều rất ấn tượng.",
  },
  "t-03": {
    country: "Hàn Quốc",
    service: "Facial Clay Therapy",
    text: "Tôi được concierge khách sạn giới thiệu Serena Spa và thật sự rất hài lòng. Liệu trình facial xuất sắc, da sạch và sáng rõ hơn sau buổi trị liệu.",
  },
  "t-04": {
    country: "Hoa Kỳ",
    service: "Hot Stone Therapy",
    text: "Ban đầu tôi khá nghi ngờ massage đá nóng, nhưng trải nghiệm này đã thay đổi hoàn toàn suy nghĩ của tôi. Nhiệt đá đi sâu vào vùng cơ căng và giúp thư giãn tuyệt đối.",
  },
  "t-06": {
    country: "Pháp",
    service: "Foot Massage",
    text: "Sau nhiều ngày đi bộ quanh Hội An, bàn chân tôi được giải cứu hoàn toàn với liệu trình massage chân 60 phút rất chính xác và thư giãn.",
  },
};

function localizeTestimonial(
  testimonial: Testimonial,
  locale: "vi" | "en",
): Testimonial {
  if (locale === "en") return testimonial;
  return { ...testimonial, ...(TESTIMONIALS_VI[testimonial.id] ?? {}) };
}

export function getFeaturedTestimonials(
  limit = 3,
  locale: "vi" | "en" = "en",
): Testimonial[] {
  return TESTIMONIALS.filter((t) => t.isFeatured)
    .slice(0, limit)
    .map((item) => localizeTestimonial(item, locale));
}
