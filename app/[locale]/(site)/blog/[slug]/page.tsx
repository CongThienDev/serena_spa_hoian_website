import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, getPostBySlug } from "@/data/blog";
import { generatePageMetadata } from "@/lib/metadata";
import { localize, normalizeLocale, SUPPORTED_LOCALES, withLocalePath } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeInput, slug } = await params;
  const locale = normalizeLocale(localeInput);
  const post = getPostBySlug(slug, locale);
  if (!post) {
    return generatePageMetadata({
      title: localize(locale, {
        en: "Article Not Found",
        vi: "Không tìm thấy bài viết",
        ko: "글을 찾을 수 없습니다",
      }),
      description: localize(locale, {
        en: "The requested journal article could not be found.",
        vi: "Bài viết bạn yêu cầu không tồn tại.",
        ko: "요청하신 저널 글을 찾을 수 없습니다.",
      }),
      path: "/blog",
      noIndex: true,
      locale,
    });
  }
  return generatePageMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
    locale,
  });
}

export async function generateStaticParams() {
  return BLOG_POSTS.flatMap((post) =>
    SUPPORTED_LOCALES.map((locale) => ({ locale, slug: post.slug })),
  );
}

export default async function LocalizedBlogDetailPage({ params }: Props) {
  const { locale: localeInput, slug } = await params;
  const locale = normalizeLocale(localeInput);
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();
  const isHotStoneArticle = post.slug === "benefits-hot-stone-massage";
  const isJapandiArticle = post.slug === "japandi-wellness-design-serenity";
  const hotStoneCustomIntroTop = localize(locale, {
    en: "Serena Healthy Treatment with Himalayan Salt Stone is a signature wellness therapy designed to restore balance and rejuvenate the body. Warm Himalayan salt stones are gently placed and glided over the body to release deep muscle tension, detoxify, and improve blood circulation.",
    vi: "Liệu pháp chăm sóc sức khỏe Serena với đá muối Himalaya là một liệu pháp đặc trưng được thiết kế để khôi phục sự cân bằng và trẻ hóa cơ thể. Những viên đá muối Himalaya ấm áp được nhẹ nhàng đặt và lướt trên cơ thể để giải phóng căng thẳng cơ sâu, thải độc và cải thiện tuần hoàn máu.",
    ko: "히말라야 소금돌 세레나 헬시 트리트먼트는 균형을 되찾고 몸에 활력을 주기 위해 설계된 시그니처 웰니스 테라피입니다. 따뜻한 히말라야 소금돌을 몸 위에 부드럽게 올리고 미끄러뜨려 깊은 근육 긴장을 풀고 해독하며 혈액 순환을 개선합니다.",
  });
  const hotStoneCustomIntroBottom = localize(locale, {
    en: "The natural minerals from Himalayan salt help purify the skin, calm the nervous system, and promote overall physical and mental well-being. This treatment is ideal for guests seeking deep relaxation, stress relief, and holistic healing.",
    vi: "Các khoáng chất tự nhiên từ muối Himalaya giúp thanh lọc da, làm dịu hệ thần kinh và thúc đẩy sức khỏe thể chất và tinh thần tổng thể. Liệu pháp này lý tưởng cho những khách hàng tìm kiếm sự thư giãn sâu, giảm căng thẳng và chữa lành toàn diện.",
    ko: "히말라야 소금의 천연 미네랄은 피부를 정화하고 신경계를 진정시키며 전반적인 신체적·정신적 웰빙을 증진합니다. 깊은 이완과 스트레스 해소, 전인적 힐링을 원하는 분께 이상적인 트리트먼트입니다.",
  });
  const japandiIntro = localize(locale, {
    en: "Serena Spa’s culture stands out through its combination of healing the body, mind, and spirit, its close connection to nature, and a retreat-like relaxation experience rather than simply offering beauty treatments.",
    vi: "Văn hóa Serena Spa nổi bật nhờ sự kết hợp giữa chữa lành thân - tâm - trí, kết nối sâu với thiên nhiên và trải nghiệm thư giãn như một retreat, thay vì chỉ dừng ở các liệu trình làm đẹp.",
    ko: "세레나 스파의 문화는 몸·마음·정신의 힐링, 자연과의 깊은 연결, 그리고 단순한 뷰티 트리트먼트를 넘어선 리트리트 같은 이완 경험으로 돋보입니다.",
  });
  const japandiHighlights = localize(locale, {
    en: [
      "Placing \"inner peace\" at the center of the experience",
      "Connecting with nature and local cultural values",
      "Providing multi-sensory wellness experiences",
      "Prioritizing natural therapeutic treatments",
      "Offering gentle, personalized service",
      "Promoting a \"wellness lifestyle\" culture",
    ],
    vi: [
      "Đặt \"an yên nội tại\" vào trung tâm của trải nghiệm",
      "Kết nối với thiên nhiên và giá trị văn hóa bản địa",
      "Mang đến trải nghiệm wellness đa giác quan",
      "Ưu tiên các liệu pháp trị liệu tự nhiên",
      "Dịch vụ nhẹ nhàng, cá nhân hóa",
      "Nuôi dưỡng văn hóa \"wellness lifestyle\"",
    ],
    ko: [
      "\"내면의 평온\"을 경험의 중심에 두기",
      "자연 및 지역 문화 가치와의 연결",
      "다감각 웰니스 경험 제공",
      "자연 치유 트리트먼트 우선",
      "부드럽고 개인화된 서비스 제공",
      "\"웰니스 라이프스타일\" 문화 확산",
    ],
  });

  return (
    <main>
      <section className="section-padding section-cream">
        <article className="container-content max-w-3xl">
          <p className="eyebrow">{post.category}</p>
          <h1 className="text-h1 mt-4">{post.title}</h1>
          <p className="text-sm text-[var(--color-warm-gray)] mt-4">
            {new Date(post.publishedAt).toLocaleDateString(localize(locale, { en: "en-US", vi: "vi-VN", ko: "ko-KR" }), {
              month: "long",
              day: "numeric",
              year: "numeric",
            })} · {post.readingTime} {localize(locale, { en: "min read", vi: "phút đọc", ko: "분 읽기" })}
          </p>

          <p className="prose-spa mt-8">
            {isHotStoneArticle ? (
              <>
                {hotStoneCustomIntroTop}
                <br />
                <br />
                {hotStoneCustomIntroBottom}
              </>
            ) : isJapandiArticle ? (
              japandiIntro
            ) : post.excerpt}
          </p>
          {isJapandiArticle && (
            <ul className="prose-spa mt-4 pl-5 list-disc">
              {japandiHighlights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {!isHotStoneArticle && !isJapandiArticle && (
            <p className="prose-spa mt-4">
              {localize(locale, {
                en: "Serena Spa shares this journal to help guests understand treatment benefits, prepare for sessions, and create a more mindful wellness lifestyle before and after visiting Hội An.",
                vi: "Serena Spa chia sẻ nội dung này để giúp khách hiểu rõ lợi ích liệu trình, chuẩn bị tốt hơn trước buổi trị liệu và duy trì lối sống wellness sau chuyến đi Hội An.",
                ko: "세레나 스파는 이 저널을 통해 손님들이 트리트먼트의 효능을 이해하고 세션을 준비하며 호이안 방문 전후로 보다 마음챙김의 웰니스 라이프스타일을 만들 수 있도록 돕습니다.",
              })}
            </p>
          )}

          <div className="mt-10 flex gap-3">
            <Link href={withLocalePath(locale, "/booking")} className="btn btn-primary btn-sm">
              {localize(locale, { en: "Book a Treatment", vi: "Đặt liệu trình", ko: "트리트먼트 예약" })}
            </Link>
            <Link href={withLocalePath(locale, "/blog")} className="btn btn-outline btn-sm">
              {localize(locale, { en: "Back to Blog", vi: "Quay lại Blog", ko: "블로그로 돌아가기" })}
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
