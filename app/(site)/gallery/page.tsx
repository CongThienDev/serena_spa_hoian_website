"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { LotusMarkSmall } from "@/components/ui/LotusIcon";

type GalleryImage = {
  src: string;
  alt: string;
  category: "treatment" | "lobby" | "corridors";
  width: number;
  height: number;
};

type FilterCategory = "all" | "treatment" | "lobby" | "corridors";

const GALLERY_IMAGES: GalleryImage[] = [
  // Treatment Rooms
  {
    src: "/images/serena_image/z7863130078807_7f590ddcf81f53ef6a81848cf6a70c8c.jpg",
    alt: "Three-bed treatment room with elegant arched divider",
    category: "treatment",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130169696_bef89068f64117b9f9f5e674010e0775.jpg",
    alt: "Two-bed treatment room with graceful arched doorway",
    category: "treatment",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130176379_c5ca367025c871384fcc1d77b7468dc8.jpg",
    alt: "Private couple treatment suite — our signature room",
    category: "treatment",
    width: 800,
    height: 600,
  },
  {
    src: "/images/serena_image/z7863130176630_cfaef3e73c138c4cd37c3470ca672111.jpg",
    alt: "Double treatment room bathed in natural window light",
    category: "treatment",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130216608_73332d9cd639070a514abcd33a5d3c1f.jpg",
    alt: "Grand four-bed treatment room with warm ambient lighting",
    category: "treatment",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130239116_ea7adc34ac7622f1e5915a9528a3996a.jpg",
    alt: "Luminous VIP suite with five beds and dramatic skylights",
    category: "treatment",
    width: 800,
    height: 600,
  },
  {
    src: "/images/serena_image/z7863130274945_10d9118585cdf7d3112ab4ef49c500d6.jpg",
    alt: "Long treatment room featuring multiple therapy beds",
    category: "treatment",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130373074_bd43471af11ebd6a27da4edc71b541b6.jpg",
    alt: "Warm hot stone therapy room with terracotta tones",
    category: "treatment",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130384618_87340f638b52687ad588fcab65067fef.jpg",
    alt: "Three-bed treatment room with serene minimal window light",
    category: "treatment",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130390725_5b38f0adc29b0df33be0f3c9bad181b7.jpg",
    alt: "Intimate two-bed room with wooden door and warm desk lamp",
    category: "treatment",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130399936_a16c4518ce69d94cc60728eb569ee3ae.jpg",
    alt: "Group treatment room with distinctive curved ceiling",
    category: "treatment",
    width: 800,
    height: 600,
  },
  {
    src: "/images/serena_image/z7863130404136_d595f67689784a0fe0389dbd593186a3.jpg",
    alt: "Two-bed treatment room with arched door in warm tones",
    category: "treatment",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130441448_1b33c51358f0b6d00fce5f880a3eab4c.jpg",
    alt: "Bright white and cream multi-bed treatment room",
    category: "treatment",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130444643_7f6fd94c341efae6f8b26efbd0e9d69f.jpg",
    alt: "Long treatment room with wall text and multiple beds",
    category: "treatment",
    width: 800,
    height: 500,
  },
  {
    src: "/images/serena_image/z7863130478508_10e235315af4fa700c9d72721e87923d.jpg",
    alt: "Modern two-bed treatment room with window shades",
    category: "treatment",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130203764_6bc950cfa0128b88f9da0f0e14fc8264.jpg",
    alt: "Serene facial treatment room with soft lighting",
    category: "treatment",
    width: 800,
    height: 533,
  },
  // Lobby & Reception
  {
    src: "/images/serena_image/z7863130038022_12382ee51f7d6893a8ced778096e42b8.jpg",
    alt: "Grand lobby archways with elegant pedicure alcoves",
    category: "lobby",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130054870_104b2ec8bb7461a68a2bc1b51c3d7d19.jpg",
    alt: "Reception desk illuminated by Serena Spa neon logo",
    category: "lobby",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130059917_c86d918d9a520b97459a877454ca782c.jpg",
    alt: "Elevator lobby with warm terracotta plaster walls",
    category: "lobby",
    width: 800,
    height: 600,
  },
  {
    src: "/images/serena_image/z7863130063966_02bca12b005872be63d6ed4054b0cad4.jpg",
    alt: "Wide lobby reception view showing the full welcoming space",
    category: "lobby",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130095713_b817eeade5199ad502efe90d9949c59d.jpg",
    alt: "Aerial view of wellness lounge with curated product shelves",
    category: "lobby",
    width: 800,
    height: 600,
  },
  {
    src: "/images/serena_image/z7863130109467_a7e314ed3fec777a4084932b16477b2e.jpg",
    alt: "Wellness lounge featuring artisan product display shelves",
    category: "lobby",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130117766_994c6b03e33be4dc0c8efadeeea66c47.jpg",
    alt: "Pedicure chairs in warm arched alcoves — a signature feature",
    category: "lobby",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130120648_cda4269be7bd3cc476c216c0162986b3.jpg",
    alt: "Illuminated lotus logo at the reception — our emblem",
    category: "lobby",
    width: 800,
    height: 600,
  },
  {
    src: "/images/serena_image/z7863130453148_866502f8f3e7b371f3f401114f363aa4.jpg",
    alt: "Reception and lounge area with Serena Spa branding",
    category: "lobby",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130455427_9f4dc2733c14cd2a665e6e394dd77dd4.jpg",
    alt: "Entrance hallway with sweeping arch framing lush lounge plants",
    category: "lobby",
    width: 800,
    height: 600,
  },
  {
    src: "/images/serena_image/z7863130256078_8fa272cfe79d9ecb0518735720b5bfda.jpg",
    alt: "Arch entrance with the words 'Serena Spa — A Place to Glow'",
    category: "lobby",
    width: 800,
    height: 533,
  },
  // Corridors & Spaces
  {
    src: "/images/serena_image/z7863130061315_91691cc30708ca20bb81a66f81a0c638.jpg",
    alt: "Changing room with handcrafted wooden lockers",
    category: "corridors",
    width: 800,
    height: 600,
  },
  {
    src: "/images/serena_image/z7863130080318_bd46759e1d082e30adb7e1b0a0e90bd0.jpg",
    alt: "Pedicure chairs arranged in three serene arched alcoves",
    category: "corridors",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130088386_7d60eb6e84b43d3b681c23083715d7c8.jpg",
    alt: "Corridor with distinctive porthole windows and warm lighting",
    category: "corridors",
    width: 800,
    height: 600,
  },
  {
    src: "/images/serena_image/z7863130112733_8de29526d8c724cbefe4667d844e5199.jpg",
    alt: "Serene corridor with arched door framing a graceful potted plant",
    category: "corridors",
    width: 800,
    height: 600,
  },
  {
    src: "/images/serena_image/z7863130221255_12020b2f20957e67745bf1a521d58121.jpg",
    alt: "Long corridor with four arched doorways leading to treatment rooms",
    category: "corridors",
    width: 800,
    height: 533,
  },
  {
    src: "/images/serena_image/z7863130225920_fcbb5881c13f6f51fd437554d30283e4.jpg",
    alt: "Opulent VIP mirrored ceiling suite — the most exclusive space",
    category: "corridors",
    width: 800,
    height: 600,
  },
  {
    src: "/images/serena_image/z7863130416969_1e48e9b99297eaf38184f8a90b4ac330.jpg",
    alt: "Corridor with four arched doorways and warm terracotta tile floor",
    category: "corridors",
    width: 800,
    height: 533,
  },
];

const FILTER_LABELS: Record<FilterCategory, string> = {
  all: "All",
  treatment: "Treatment Rooms",
  lobby: "Lobby & Reception",
  corridors: "Private Space & Locker",
};

export default function GalleryPage() {
  const [activeFilter, setActiveFilter] = useState<FilterCategory>("all");

  const filteredImages =
    activeFilter === "all"
      ? GALLERY_IMAGES
      : GALLERY_IMAGES.filter((img) => img.category === activeFilter);

  return (
    <main>
      {/* ── Page Header ─────────────────────────────────────────────────── */}
      <section
        className="section-cream section-padding text-center"
        aria-label="Gallery header"
      >
        <div className="container-content">
          <AnimatedSection animation="fade" delay={0.05}>
            <div className="flex items-center justify-center gap-2.5 mb-5">
              <LotusMarkSmall size={14} color="var(--color-terracotta)" />
              <span className="eyebrow">Our Space</span>
              <LotusMarkSmall size={14} color="var(--color-terracotta)" />
            </div>
          </AnimatedSection>

          <AnimatedSection animation="slide-up-fade" delay={0.12}>
            <h1
              className="font-serif text-[var(--color-espresso)] mx-auto"
              style={{
                fontSize: "clamp(3rem, 6vw, 6rem)",
                fontWeight: 700,
                textTransform: "uppercase",
                lineHeight: 1.0,
                letterSpacing: "-0.01em",
              }}
            >
              Inside Serena
            </h1>
          </AnimatedSection>

          <AnimatedSection animation="slide-up-fade" delay={0.2}>
            <p
              className="prose-spa mx-auto mt-5 text-center"
              style={{ maxWidth: "52ch" }}
            >
              Step inside our sanctuary. Every room, every corridor, every
              corner — designed with intention.
            </p>
          </AnimatedSection>

          {/* Lotus divider */}
          <AnimatedSection animation="fade" delay={0.28}>
            <div
              className="flex items-center justify-center gap-4 mt-8"
              aria-hidden="true"
            >
              <span
                className="block h-px w-16"
                style={{
                  background:
                    "linear-gradient(to right, transparent, var(--color-terracotta))",
                  opacity: 0.5,
                }}
              />
              <LotusMarkSmall size={20} color="var(--color-terracotta)" />
              <span
                className="block h-px w-16"
                style={{
                  background:
                    "linear-gradient(to left, transparent, var(--color-terracotta))",
                  opacity: 0.5,
                }}
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Filter Tabs ─────────────────────────────────────────────────── */}
      <section
        className="section-cream pb-6 pt-0"
        aria-label="Gallery filter"
      >
        <div className="container-content">
          <AnimatedSection animation="fade" delay={0.1}>
            <div
              className="flex flex-wrap items-center justify-center gap-2"
              role="group"
              aria-label="Filter gallery by category"
            >
              {(Object.keys(FILTER_LABELS) as FilterCategory[]).map(
                (category) => (
                  <button
                    key={category}
                    onClick={() => setActiveFilter(category)}
                    aria-pressed={activeFilter === category}
                    className="font-sans font-medium transition-all duration-200"
                    style={{
                      fontSize: "0.8rem",
                      letterSpacing: "0.08em",
                      textTransform: "uppercase",
                      padding: "0.55rem 1.4rem",
                      borderRadius: "var(--radius-pill)",
                      border:
                        activeFilter === category
                          ? "1.5px solid var(--color-terracotta)"
                          : "1.5px solid var(--color-sand-dark)",
                      backgroundColor:
                        activeFilter === category
                          ? "var(--color-terracotta)"
                          : "transparent",
                      color:
                        activeFilter === category
                          ? "white"
                          : "var(--color-espresso-mid)",
                      cursor: "pointer",
                    }}
                  >
                    {FILTER_LABELS[category]}
                  </button>
                )
              )}
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Grid Gallery ────────────────────────────────────────────────── */}
      <section
        className="section-cream pb-0"
        style={{ paddingTop: "2rem" }}
        aria-label="Spa gallery images"
      >
        <div className="container-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredImages.map((image, index) => (
              <GalleryItem
                key={image.src}
                image={image}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Strip ───────────────────────────────────────────────────── */}
      <section
        style={{
          backgroundColor: "var(--color-section-warm)",
          padding: "clamp(3rem, 6vw, 4.5rem) 1.25rem",
          marginTop: "clamp(3rem, 6vw, 5rem)",
        }}
        aria-label="Book a visit"
      >
        <div className="container-content text-center">
          <AnimatedSection animation="slide-up-fade" delay={0.05}>
            <div className="flex items-center justify-center gap-2.5 mb-4">
              <LotusMarkSmall size={12} color="var(--color-terracotta)" />
              <span className="eyebrow">Ready to Visit?</span>
              <LotusMarkSmall size={12} color="var(--color-terracotta)" />
            </div>
            <h2
              className="font-serif text-[var(--color-espresso)] mb-3"
              style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 500 }}
            >
              Experience It in Person
            </h2>
            <p
              className="text-[var(--color-espresso-mid)] mb-8"
              style={{ fontSize: "1rem", maxWidth: "44ch", margin: "0.75rem auto 2rem" }}
            >
              No photograph can capture the warmth of our welcome. Come and
              feel it for yourself.
            </p>
            <Link href="/booking" className="btn btn-primary btn-lg">
              Book Your Visit
            </Link>
          </AnimatedSection>
        </div>
      </section>
    </main>
  );
}

/* ── Gallery Item — single grid card ─────────────────────────────────────── */

type GalleryItemProps = {
  image: GalleryImage;
  index: number;
};

function GalleryItem({ image, index }: GalleryItemProps) {
  const delay = Math.min(index * 0.03, 0.5);

  return (
    <div className="h-full">
      <AnimatedSection animation="fade" delay={delay}>
        <div
          className="group relative overflow-hidden h-full"
          style={{ borderRadius: "var(--radius-card)", aspectRatio: "4 / 3" }}
        >
          <Image
            src={image.src}
            alt={image.alt}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />

          {/* Hover overlay */}
          <div
            className="absolute inset-0 flex items-end opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            style={{
              background:
                "linear-gradient(to top, rgba(61,31,15,0.75) 0%, rgba(61,31,15,0.2) 50%, transparent 100%)",
            }}
            aria-hidden="true"
          >
            <p
              className="font-sans text-white px-4 pb-4 leading-snug"
              style={{ fontSize: "0.82rem", letterSpacing: "0.01em" }}
            >
              {image.alt}
            </p>
          </div>
        </div>
      </AnimatedSection>
    </div>
  );
}
