import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, getPostBySlug } from "@/data/blog";
import { generatePageMetadata } from "@/lib/metadata";
import { normalizeLocale, withLocalePath } from "@/lib/i18n";

type Props = { params: Promise<{ locale: string; slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale: localeInput, slug } = await params;
  const locale = normalizeLocale(localeInput);
  const post = getPostBySlug(slug, locale);
  if (!post) {
    return generatePageMetadata({
      title: locale === "vi" ? "Không tìm thấy bài viết" : "Article Not Found",
      description:
        locale === "vi"
          ? "Bài viết bạn yêu cầu không tồn tại."
          : "The requested journal article could not be found.",
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
  return BLOG_POSTS.flatMap((post) => [{ locale: "vi", slug: post.slug }, { locale: "en", slug: post.slug }]);
}

export default async function LocalizedBlogDetailPage({ params }: Props) {
  const { locale: localeInput, slug } = await params;
  const locale = normalizeLocale(localeInput);
  const post = getPostBySlug(slug, locale);
  if (!post) notFound();
  const isHotStoneArticle = post.slug === "benefits-hot-stone-massage";
  const isJapandiArticle = post.slug === "japandi-wellness-design-serenity";
  const hotStoneCustomIntroTop =
    locale === "vi"
      ? "Liệu pháp chăm sóc sức khỏe Serena với đá muối Himalaya là một liệu pháp đặc trưng được thiết kế để khôi phục sự cân bằng và trẻ hóa cơ thể. Những viên đá muối Himalaya ấm áp được nhẹ nhàng đặt và lướt trên cơ thể để giải phóng căng thẳng cơ sâu, thải độc và cải thiện tuần hoàn máu."
      : "Serena Healthy Treatment with Himalayan Salt Stone is a signature wellness therapy designed to restore balance and rejuvenate the body. Warm Himalayan salt stones are gently placed and glided over the body to release deep muscle tension, detoxify, and improve blood circulation.";
  const hotStoneCustomIntroBottom =
    locale === "vi"
      ? "Các khoáng chất tự nhiên từ muối Himalaya giúp thanh lọc da, làm dịu hệ thần kinh và thúc đẩy sức khỏe thể chất và tinh thần tổng thể. Liệu pháp này lý tưởng cho những khách hàng tìm kiếm sự thư giãn sâu, giảm căng thẳng và chữa lành toàn diện."
      : "The natural minerals from Himalayan salt help purify the skin, calm the nervous system, and promote overall physical and mental well-being. This treatment is ideal for guests seeking deep relaxation, stress relief, and holistic healing.";
  const japandiIntro =
    locale === "vi"
      ? "Văn hóa Serena Spa nổi bật nhờ sự kết hợp giữa chữa lành thân - tâm - trí, kết nối sâu với thiên nhiên và trải nghiệm thư giãn như một retreat, thay vì chỉ dừng ở các liệu trình làm đẹp."
      : "Serena Spa’s culture stands out through its combination of healing the body, mind, and spirit, its close connection to nature, and a retreat-like relaxation experience rather than simply offering beauty treatments.";
  const japandiHighlights =
    locale === "vi"
      ? [
          "Đặt \"an yên nội tại\" vào trung tâm của trải nghiệm",
          "Kết nối với thiên nhiên và giá trị văn hóa bản địa",
          "Mang đến trải nghiệm wellness đa giác quan",
          "Ưu tiên các liệu pháp trị liệu tự nhiên",
          "Dịch vụ nhẹ nhàng, cá nhân hóa",
          "Nuôi dưỡng văn hóa \"wellness lifestyle\"",
        ]
      : [
          "Placing \"inner peace\" at the center of the experience",
          "Connecting with nature and local cultural values",
          "Providing multi-sensory wellness experiences",
          "Prioritizing natural therapeutic treatments",
          "Offering gentle, personalized service",
          "Promoting a \"wellness lifestyle\" culture",
        ];

  return (
    <main>
      <section className="section-padding section-cream">
        <article className="container-content max-w-3xl">
          <p className="eyebrow">{post.category}</p>
          <h1 className="text-h1 mt-4">{post.title}</h1>
          <p className="text-sm text-[var(--color-warm-gray)] mt-4">
            {new Date(post.publishedAt).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })} · {post.readingTime} {locale === "vi" ? "phút đọc" : "min read"}
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
              {locale === "vi"
                ? "Serena Spa chia sẻ nội dung này để giúp khách hiểu rõ lợi ích liệu trình, chuẩn bị tốt hơn trước buổi trị liệu và duy trì lối sống wellness sau chuyến đi Hội An."
                : "Serena Spa shares this journal to help guests understand treatment benefits, prepare for sessions, and create a more mindful wellness lifestyle before and after visiting Hội An."}
            </p>
          )}

          <div className="mt-10 flex gap-3">
            <Link href={withLocalePath(locale, "/booking")} className="btn btn-primary btn-sm">
              {locale === "vi" ? "Đặt liệu trình" : "Book a Treatment"}
            </Link>
            <Link href={withLocalePath(locale, "/blog")} className="btn btn-outline btn-sm">
              {locale === "vi" ? "Quay lại Blog" : "Back to Blog"}
            </Link>
          </div>
        </article>
      </section>
    </main>
  );
}
