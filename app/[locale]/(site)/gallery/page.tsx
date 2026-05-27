import Image from "next/image";
import { generatePageMetadata } from "@/lib/metadata";
import { normalizeLocale } from "@/lib/i18n";

const IMAGES = [
  "/images/serena_image/z7863130038022_12382ee51f7d6893a8ced778096e42b8.jpg",
  "/images/serena_image/z7863130054870_104b2ec8bb7461a68a2bc1b51c3d7d19.jpg",
  "/images/serena_image/z7863130080318_bd46759e1d082e30adb7e1b0a0e90bd0.jpg",
  "/images/serena_image/z7863130169696_bef89068f64117b9f9f5e674010e0775.jpg",
  "/images/serena_image/z7863130216608_73332d9cd639070a514abcd33a5d3c1f.jpg",
  "/images/serena_image/z7863130399936_a16c4518ce69d94cc60728eb569ee3ae.jpg",
  "/images/serena_image/z7863130453148_866502f8f3e7b371f3f401114f363aa4.jpg",
  "/images/serena_image/z7863130478508_10e235315af4fa700c9d72721e87923d.jpg",
];

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  const vi = locale === "vi";
  return generatePageMetadata({
    title: vi ? "Thư viện ảnh — Serena Spa Hội An" : "Gallery — Serena Spa Hội An",
    description: vi ? "Khám phá không gian Serena Spa qua hình ảnh thực tế." : "Explore Serena Spa spaces through real photos.",
    path: "/gallery",
    locale,
  });
}

export default async function LocalizedGalleryPage({ params }: { params: Promise<{ locale: string }> }) {
  const locale = normalizeLocale((await params).locale);
  const vi = locale === "vi";

  return (
    <main>
      <section className="section-padding section-cream text-center">
        <div className="container-content">
          <p className="eyebrow">{vi ? "Không gian Serena" : "Serena Spaces"}</p>
          <h1 className="text-h1 mt-3">{vi ? "Thư viện ảnh" : "Photo Gallery"}</h1>
          <p className="prose-spa mt-4">
            {vi ? "Những khoảnh khắc thực tế từ khu vực lễ tân, phòng trị liệu và không gian thư giãn của Serena Spa." : "Real moments from our reception, treatment rooms, and wellness spaces."}
          </p>
        </div>
      </section>

      <section className="section-padding" style={{ backgroundColor: "var(--color-cream)" }}>
        <div className="container-site grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {IMAGES.map((src, index) => (
            <div key={src} className="relative overflow-hidden rounded-[var(--radius-card)]" style={{ aspectRatio: "4/3" }}>
              <Image
                src={src}
                alt={vi ? `Ảnh không gian Serena ${index + 1}` : `Serena space photo ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 33vw"
              />
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
