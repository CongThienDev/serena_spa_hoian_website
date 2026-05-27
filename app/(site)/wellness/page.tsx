import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";
import SectionHeading from "@/components/ui/SectionHeading";
import { type Locale, withLocalePath } from "@/lib/i18n";

export const metadata: Metadata = generatePageMetadata({
  title: "Wellness Philosophy — Serena Spa Hội An",
  description:
    "Discover the Serena wellness philosophy — where every ritual, space, and moment is designed to restore your body, quiet your mind, and awaken your spirit in Hội An.",
  path: "/wellness",
  keywords: [
    "wellness spa hoi an",
    "holistic healing hoi an",
    "spa philosophy",
    "luxury wellness vietnam",
    "mind body spirit spa",
  ],
});

// ─── Data ────────────────────────────────────────────────────────────────────

const philosophyPillars = [
  {
    number: "01",
    heading: "The Body",
    body: "We begin with the body. Skilled therapists trained in Vietnamese and international techniques release physical tension through targeted pressure, heat, and botanical medicine.",
  },
  {
    number: "02",
    heading: "The Mind",
    body: "A quiet mind is the foundation of true healing. Our rituals incorporate breathwork, scent therapy, and intentional silence to guide you into deep restoration.",
  },
  {
    number: "03",
    heading: "The Spirit",
    body: "When body and mind find ease, the spirit follows. We create spaces of stillness — designed to reconnect you with what matters most.",
  },
];

const philosophyPillarsVi = [
  {
    number: "01",
    heading: "Cơ thể",
    body: "Chúng tôi bắt đầu từ cơ thể. Các kỹ thuật viên trị liệu được đào tạo bài bản giúp giải phóng căng cơ bằng lực tay chuẩn xác, nhiệt ấm và thảo dược.",
  },
  {
    number: "02",
    heading: "Tâm trí",
    body: "Một tâm trí tĩnh lặng là nền tảng của chữa lành. Nghi thức tại Serena kết hợp hơi thở, hương thơm và khoảng lặng có chủ đích để đưa bạn vào trạng thái phục hồi sâu.",
  },
  {
    number: "03",
    heading: "Tinh thần",
    body: "Khi cơ thể và tâm trí dịu lại, tinh thần cũng được nuôi dưỡng. Chúng tôi tạo nên những khoảng không tĩnh tại để bạn kết nối lại với điều quan trọng nhất.",
  },
];

const approachSteps = [
  {
    step: "01",
    heading: "Arrival Ritual",
    body: "From your first step through our arch doorways, the transition begins. A warm foot soak, herbal welcome tea, and quiet music signal to your body: you are safe.",
  },
  {
    step: "02",
    heading: "Expert Assessment",
    body: "Your therapist takes time to understand your body's needs — areas of tension, sensitivity, and desired outcomes — before a single drop of oil is applied.",
  },
  {
    step: "03",
    heading: "The Treatment",
    body: "Every ritual is performed with full presence. We use organic botanical oils, warm herbal compresses, and techniques refined across generations.",
  },
  {
    step: "04",
    heading: "The Close",
    body: "As your treatment concludes, we guide you gently back with herbal tea, a warm towel ritual, and a moment of quiet before you re-enter the world.",
  },
];

const approachStepsVi = [
  {
    step: "01",
    heading: "Nghi thức chào đón",
    body: "Ngay từ khoảnh khắc bước vào, hành trình chuyển trạng thái đã bắt đầu. Ngâm chân ấm, trà thảo mộc và âm nhạc nhẹ nhàng giúp cơ thể cảm thấy an toàn.",
  },
  {
    step: "02",
    heading: "Đánh giá chuyên sâu",
    body: "Kỹ thuật viên dành thời gian lắng nghe nhu cầu của bạn: vùng căng mỏi, độ nhạy cảm và mục tiêu phục hồi trước khi bắt đầu liệu trình.",
  },
  {
    step: "03",
    heading: "Thực hiện liệu trình",
    body: "Mỗi thao tác đều được thực hiện với sự hiện diện trọn vẹn. Chúng tôi sử dụng tinh dầu thực vật, thảo dược ấm và kỹ thuật được tinh luyện qua nhiều thế hệ.",
  },
  {
    step: "04",
    heading: "Khép lại nhẹ nhàng",
    body: "Khi liệu trình kết thúc, bạn được dẫn trở lại nhịp bình thường bằng khăn ấm, trà thảo mộc và một khoảnh khắc tĩnh lặng.",
  },
];

const galleryImages = [
  {
    src: "/images/serena_image/z7863130216608_73332d9cd639070a514abcd33a5d3c1f.jpg",
    alt: "Grand 4-bed treatment room at Serena Spa — warm ambient lighting and pristine white linen",
  },
  {
    src: "/images/serena_image/z7863130169696_bef89068f64117b9f9f5e674010e0775.jpg",
    alt: "Serene 2-bed treatment room — intimate and peaceful spa interior",
  },
  {
    src: "/images/serena_image/z7863130453148_866502f8f3e7b371f3f401114f363aa4.jpg",
    alt: "Serena Spa reception lounge with elegant Serena Spa branding",
  },
  {
    src: "/images/serena_image/z7863130176379_c5ca367025c871384fcc1d77b7468dc8.jpg",
    alt: "Couple treatment room — luxurious dual beds in a tranquil spa setting",
  },
];

// ─── Page ────────────────────────────────────────────────────────────────────

export default function WellnessPage({ locale = "en" }: { locale?: Locale }) {
  const vi = locale === "vi";
  const localizedPhilosophyPillars = vi ? philosophyPillarsVi : philosophyPillars;
  const localizedApproachSteps = vi ? approachStepsVi : approachSteps;
  return (
    <>
      {/* ══════════════════════════════════════════════════════════════════════
          Section 1 — Hero: cinematic split
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative w-full overflow-hidden"
        style={{
          minHeight: "clamp(500px, 80vh, 860px)",
          background: "linear-gradient(135deg, var(--color-cream-dark) 0%, var(--color-cream) 55%)",
        }}
        aria-label={vi ? "Triết lý chăm sóc toàn diện tại Serena Spa" : "Wellness philosophy at Serena Spa"}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-[45fr_55fr] w-full"
          style={{ minHeight: "clamp(500px, 80vh, 860px)" }}
        >
          {/* Left — text content */}
          <div
            className="flex flex-col justify-center py-16 lg:py-28 relative z-10 order-last lg:order-first"
            style={{
              paddingLeft: "max(1.25rem, calc((100vw - 80rem) / 2 + 2rem))",
              paddingRight: "clamp(2rem, 4vw, 5rem)",
            }}
          >
            {/* Eyebrow with lotus ornaments */}
            <AnimatedSection animation="fade" delay={0.1}>
              <div className="flex items-center gap-2 mb-4">
                <LotusMarkSmall size={14} color="var(--color-terracotta)" />
                <span
                  className="font-sans uppercase tracking-[0.22em] text-[var(--color-terracotta)]"
                  style={{ fontSize: "0.72rem" }}
                >
                  {vi ? "Triết lý của chúng tôi" : "Our Philosophy"}
                </span>
                <LotusMarkSmall size={14} color="var(--color-terracotta)" />
              </div>
            </AnimatedSection>

            {/* H1 */}
            <AnimatedSection animation="slide-up-fade" delay={0.18}>
              <h1
                className="font-serif text-[var(--color-espresso)] mt-1"
                style={{
                  fontSize: "clamp(2.4rem, 4.5vw, 4.8rem)",
                  lineHeight: 1.0,
                  fontWeight: 700,
                  textTransform: "uppercase",
                  letterSpacing: "-0.01em",
                }}
              >
                {vi ? "An dưỡng" : "Wellness"}<br />
                {vi ? "Từ Bên Trong" : "From Within"}
              </h1>
            </AnimatedSection>

            {/* Lotus divider */}
            <AnimatedSection animation="fade" delay={0.28}>
              <div className="flex items-center gap-3 my-5" aria-hidden="true">
                <span
                  className="block h-px flex-1 max-w-[60px]"
                  style={{ background: "var(--color-terracotta)", opacity: 0.4 }}
                />
                <LotusMarkSmall size={18} color="var(--color-terracotta)" />
                <span
                  className="block h-px flex-1 max-w-[60px]"
                  style={{ background: "var(--color-terracotta)", opacity: 0.4 }}
                />
              </div>
            </AnimatedSection>

            {/* Tagline */}
            <AnimatedSection animation="slide-up-fade" delay={0.32}>
              <p
                className="font-sans text-[var(--color-espresso)] mb-10"
                style={{ fontSize: "1.0rem", lineHeight: 1.78, maxWidth: "36ch", opacity: 0.75 }}
              >
                {vi
                  ? "Tại Serena, chăm sóc toàn diện không chỉ là dịch vụ mà là một trạng thái sống. Mỗi nghi thức, mỗi không gian, mỗi khoảnh khắc đều được thiết kế để phục hồi cơ thể, tĩnh tâm trí và đánh thức tinh thần."
                  : "At Serena, wellness is not a service — it is a way of being. Every ritual, every room, every moment is designed to restore your body, quiet your mind, and awaken your spirit."}
              </p>
            </AnimatedSection>

            {/* CTAs */}
            <AnimatedSection animation="slide-up-fade" delay={0.42}>
              <div className="flex flex-wrap gap-3">
                <Link href={withLocalePath(locale, "/services")} className="btn btn-primary btn-lg">
                  {vi ? "Khám phá liệu trình" : "Explore Treatments"}
                </Link>
                <Link href={withLocalePath(locale, "/about")} className="btn btn-outline btn-lg">
                  {vi ? "Câu chuyện Serena" : "Our Story"}
                </Link>
              </div>
            </AnimatedSection>
          </div>

          {/* Right — hero image bleeds to edge */}
          <div
            className="relative overflow-hidden order-first lg:order-last"
            style={{ height: "clamp(300px, 45vw, 860px)", minHeight: "300px" }}
          >
            <Image
              src="/images/serena_image/z7863130054870_104b2ec8bb7461a68a2bc1b51c3d7d19.jpg"
              alt="Serena Spa reception desk with illuminated neon lotus logo"
              fill
              className="object-cover object-center"
              priority
              sizes="(max-width: 1024px) 100vw, 55vw"
            />

            {/* Rounded left edge on desktop */}
            <div
              className="absolute inset-0 hidden lg:block pointer-events-none"
              style={{ borderRadius: "2.5rem 0 0 2.5rem" }}
              aria-hidden="true"
            />

            {/* Left-side gradient blending into text panel */}
            <div
              className="absolute inset-y-0 left-0 w-28 hidden lg:block"
              style={{
                background: "linear-gradient(to right, var(--color-cream-dark), transparent)",
              }}
              aria-hidden="true"
            />

            {/* Subtle warm tint */}
            <div
              className="absolute inset-0"
              style={{ background: "rgba(253, 238, 222, 0.06)" }}
              aria-hidden="true"
            />
          </div>
        </div>

        {/* Bottom fade */}
        <div
          className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, transparent, var(--color-cream))" }}
          aria-hidden="true"
        />
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Section 2 — Philosophy Strip: 3 pillars
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-round-top section-padding"
        style={{ background: "var(--color-cream)" }}
        aria-label={vi ? "Ba trụ cột triết lý chăm sóc toàn diện" : "Our wellness philosophy pillars"}
      >
        <div className="container-site">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
            {localizedPhilosophyPillars.map((pillar, i) => (
              <AnimatedSection key={pillar.number} animation="slide-up-fade" delay={0.1 * i}>
                <article className="flex flex-col gap-4">
                  {/* Large serif number */}
                  <span
                    className="font-serif text-[var(--color-terracotta)] leading-none select-none"
                    style={{ fontSize: "clamp(3rem, 5vw, 4.5rem)", fontWeight: 700, opacity: 0.9 }}
                    aria-hidden="true"
                  >
                    {pillar.number}
                  </span>

                  {/* Thin divider */}
                  <span
                    className="block h-px w-12"
                    style={{ background: "var(--color-terracotta)", opacity: 0.35 }}
                    aria-hidden="true"
                  />

                  {/* Heading */}
                  <h3
                    className="font-serif text-[var(--color-espresso)]"
                    style={{ fontSize: "1.35rem", fontWeight: 700 }}
                  >
                    {pillar.heading}
                  </h3>

                  {/* Body */}
                  <p
                    className="font-sans text-[var(--color-espresso)]"
                    style={{ fontSize: "0.96rem", lineHeight: 1.8, opacity: 0.72 }}
                  >
                    {pillar.body}
                  </p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Section 3 — The Space: asymmetric photo layout
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-padding"
        style={{ background: "var(--color-section-warm)" }}
        aria-label={vi ? "Không gian tại Serena Spa" : "Our spa environment"}
      >
        <div className="container-site">
          {/* Heading */}
          <AnimatedSection animation="slide-up-fade" className="mb-10 md:mb-14">
            <SectionHeading
              eyebrow={vi ? "Không gian trị liệu" : "Our Environment"}
              title={vi ? "Không gian được thiết kế cho tĩnh tại" : "A Space Designed for Stillness"}
              align="center"
            />
          </AnimatedSection>

          {/* Asymmetric grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
            {/* Large image — spans 2 rows on desktop */}
            <AnimatedSection
              animation="fade"
              delay={0.05}
              className="md:row-span-2"
            >
              <div
                className="relative w-full overflow-hidden"
                style={{
                  borderRadius: "var(--radius-card)",
                  aspectRatio: "3 / 4",
                  minHeight: "340px",
                }}
              >
                <Image
                  src="/images/serena_image/z7863130109467_a7e314ed3fec777a4084932b16477b2e.jpg"
                  alt="Serena Spa wellness lounge with botanical product shelves and lush greenery"
                  fill
                  className="object-cover object-center"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>

            {/* Small images — right column */}
            {[
              {
                src: "/images/serena_image/z7863130256078_8fa272cfe79d9ecb0518735720b5bfda.jpg",
                alt: "Serena Spa arched entrance with 'A place to glow' sign — beautiful architectural arch",
              },
              {
                src: "/images/serena_image/z7863130095713_b817eeade5199ad502efe90d9949c59d.jpg",
                alt: "Aerial view of Serena Spa lounge and product display area",
              },
              {
                src: "/images/serena_image/z7863130038022_12382ee51f7d6893a8ced778096e42b8.jpg",
                alt: "Serena Spa lobby arch doorways and pedicure area — elegant interior design",
              },
            ].map((img, i) => (
              <AnimatedSection
                key={img.src}
                animation="fade"
                delay={0.1 + 0.08 * i}
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{
                    borderRadius: "var(--radius-card)",
                    aspectRatio: "4 / 3",
                  }}
                >
                  <Image
                    src={img.src}
                    alt={img.alt}
                    fill
                    className="object-cover object-center"
                    sizes="(max-width: 768px) 100vw, 25vw"
                  />
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Section 4 — Our Approach: 4 step cards
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="section-padding"
        style={{ background: "var(--color-cream)" }}
        aria-label={vi ? "Phương pháp Serena" : "The Serena method — our approach"}
      >
        <div className="container-site">
          {/* Heading */}
          <AnimatedSection animation="slide-up-fade" className="mb-10 md:mb-14">
            <SectionHeading
              eyebrow={vi ? "Cách chúng tôi thực hiện" : "How We Work"}
              title={vi ? "Phương pháp Serena" : "The Serena Method"}
              align="center"
            />
          </AnimatedSection>

          {/* 4 cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {localizedApproachSteps.map((step, i) => (
              <AnimatedSection key={step.step} animation="slide-up-fade" delay={0.1 * i}>
                <article
                  className="card flex flex-col gap-5 h-full"
                  style={{ background: "var(--color-warm-white)" }}
                >
                  {/* Step circle */}
                  <div
                    className="flex items-center justify-center w-11 h-11 rounded-full flex-shrink-0"
                    style={{ background: "var(--color-terracotta)" }}
                    aria-hidden="true"
                  >
                    <span
                      className="font-serif text-white leading-none"
                      style={{ fontSize: "0.85rem", fontWeight: 700 }}
                    >
                      {step.step}
                    </span>
                  </div>

                  {/* Heading */}
                  <h3
                    className="font-serif text-[var(--color-espresso)]"
                    style={{ fontSize: "1.15rem", fontWeight: 700 }}
                  >
                    {step.heading}
                  </h3>

                  {/* Body */}
                  <p
                    className="font-sans text-[var(--color-espresso)] flex-1"
                    style={{ fontSize: "0.93rem", lineHeight: 1.8, opacity: 0.72 }}
                  >
                    {step.body}
                  </p>
                </article>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Section 5 — Environment Gallery: horizontal photo row
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="overflow-hidden"
        style={{ background: "var(--color-espresso)" }}
        aria-label="Serena Spa interior environment gallery"
      >
        <div className="grid grid-cols-2 lg:grid-cols-4">
          {galleryImages.map((img, i) => (
            <AnimatedSection key={img.src} animation="fade" delay={0.08 * i}>
              <div
                className="relative overflow-hidden group"
                style={{ aspectRatio: "3 / 4" }}
              >
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover object-center transition-[filter] duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] group-hover:brightness-110"
                  sizes="(max-width: 1024px) 50vw, 25vw"
                />
                {/* Subtle dark vignette */}
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{ background: "rgba(61, 31, 15, 0.15)" }}
                  aria-hidden="true"
                />
              </div>
            </AnimatedSection>
          ))}
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════════════
          Section 6 — Booking CTA
      ══════════════════════════════════════════════════════════════════════ */}
      <section
        className="relative section-padding"
        style={{ background: "var(--color-espresso)" }}
        aria-label={vi ? "Bắt đầu hành trình chăm sóc toàn diện — đặt liệu trình" : "Begin your wellness journey — book a treatment"}
      >
        {/* Warm tint overlay */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "rgba(180, 90, 40, 0.08)" }}
          aria-hidden="true"
        />

        <div className="relative container-site flex flex-col items-center text-center gap-6">
          {/* Lotus ornament */}
          <AnimatedSection animation="scale-fade">
            <LotusMarkSmall size={36} color="var(--color-terracotta)" />
          </AnimatedSection>

          {/* Heading */}
          <AnimatedSection animation="slide-up-fade" delay={0.1}>
            <h2
              className="font-serif text-white max-w-2xl"
              style={{
                fontSize: "clamp(2rem, 4vw, 3.25rem)",
                fontWeight: 500,
                lineHeight: 1.1,
              }}
            >
              {vi ? "Bắt đầu hành trình an dưỡng" : "Begin Your Wellness Journey"}
            </h2>
          </AnimatedSection>

          {/* Subtext */}
          <AnimatedSection animation="fade" delay={0.2}>
            <p
              className="font-sans max-w-md"
              style={{
                color: "var(--color-sand)",
                fontSize: "1rem",
                lineHeight: 1.75,
              }}
            >
              {vi ? "Chỉ một giờ tại Serena có thể giúp bạn cảm nhận khác biệt trong nhiều ngày." : "One hour with us can change the way you feel for days."}
            </p>
          </AnimatedSection>

          {/* CTAs */}
          <AnimatedSection animation="slide-up-fade" delay={0.3}>
            <div className="flex flex-wrap gap-4 justify-center mt-2">
              <Link
                href={withLocalePath(locale, "/booking")}
                className="btn btn-lg"
                style={{
                  background: "var(--color-terracotta)",
                  color: "#fff",
                  border: "none",
                }}
              >
                {vi ? "Đặt liệu trình" : "Book a Treatment"}
              </Link>
              <Link
                href={withLocalePath(locale, "/services")}
                className="btn btn-lg"
                style={{
                  background: "transparent",
                  color: "#fff",
                  border: "1.5px solid rgba(255,255,255,0.55)",
                }}
              >
                {vi ? "Xem tất cả dịch vụ" : "View All Services"}
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
