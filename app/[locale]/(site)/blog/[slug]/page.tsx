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

          <p className="prose-spa mt-8">{post.excerpt}</p>
          <p className="prose-spa mt-4">
            {locale === "vi"
              ? "Serena Spa chia sẻ nội dung này để giúp khách hiểu rõ lợi ích liệu trình, chuẩn bị tốt hơn trước buổi trị liệu và duy trì lối sống wellness sau chuyến đi Hội An."
              : "Serena Spa shares this journal to help guests understand treatment benefits, prepare for sessions, and create a more mindful wellness lifestyle before and after visiting Hội An."}
          </p>

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
