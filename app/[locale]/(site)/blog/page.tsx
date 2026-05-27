import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { generateLocalizedRouteMetadata } from "@/lib/route-metadata";
import { normalizeLocale, withLocalePath } from "@/lib/i18n";
import { getFeaturedPosts } from "@/data/blog";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateLocalizedRouteMetadata(locale, "/blog");
}

export default async function LocalizedBlogPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: localeInput } = await params;
  const locale = normalizeLocale(localeInput);
  const posts = getFeaturedPosts(50, locale);

  return (
    <main>
      <section className="section-padding section-cream">
        <div className="container-site">
          <AnimatedSection animation="slide-up-fade">
            <SectionHeading
              eyebrow={locale === "vi" ? "Nhật ký Wellness" : "Wellness Journal"}
              title={locale === "vi" ? "Bài viết mới" : "Latest Articles"}
              subtitle={
                locale === "vi"
                  ? "Các hướng dẫn thực tế và nguồn cảm hứng cho hành trình chăm sóc sức khỏe của bạn."
                  : "Practical guides and mindful inspiration for your wellness journey."
              }
              titleAs="h1"
              align="center"
              className="mb-12"
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => (
              <AnimatedSection key={post.id} animation="slide-up-fade" delay={i * 0.04}>
                <Link href={withLocalePath(locale, `/blog/${post.slug}`)} className="card p-6 block h-full">
                  <p className="eyebrow text-[0.65rem]">{post.category}</p>
                  <h2 className="font-serif text-h4 mt-3">{post.title}</h2>
                  <p className="text-sm text-[var(--color-warm-gray)] mt-3">{post.excerpt}</p>
                  <p className="text-xs text-[var(--color-warm-gray)] mt-4">
                    {new Date(post.publishedAt).toLocaleDateString(locale === "vi" ? "vi-VN" : "en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })} · {post.readingTime} {locale === "vi" ? "phút đọc" : "min read"}
                  </p>
                </Link>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
