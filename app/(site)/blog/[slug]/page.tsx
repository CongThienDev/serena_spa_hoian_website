import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { BLOG_POSTS, getPostBySlug } from "@/data/blog";
import { generatePageMetadata } from "@/lib/metadata";

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) {
    return generatePageMetadata({
      title: "Article Not Found",
      description: "The requested journal article could not be found.",
      path: "/blog",
      noIndex: true,
    });
  }
  return generatePageMetadata({
    title: post.seoTitle || post.title,
    description: post.seoDescription || post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

export async function generateStaticParams() {
  return BLOG_POSTS.map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();
  const isHotStoneArticle = post.slug === "benefits-hot-stone-massage";
  const hotStoneCustomIntroTop =
    "Serena Healthy Treatment with Himalayan Salt Stone is a signature wellness therapy designed to restore balance and rejuvenate the body. Warm Himalayan salt stones are gently placed and glided over the body to release deep muscle tension, detoxify, and improve blood circulation.";
  const hotStoneCustomIntroBottom =
    "The natural minerals from Himalayan salt help purify the skin, calm the nervous system, and promote overall physical and mental well-being. This treatment is ideal for guests seeking deep relaxation, stress relief, and holistic healing.";

  return (
    <main>
      <section className="section-padding section-cream">
        <article className="container-content max-w-3xl">
          <p className="eyebrow">{post.category}</p>
          <h1 className="text-h1 mt-4">{post.title}</h1>
          <p className="text-sm text-[var(--color-warm-gray)] mt-4">
            {new Date(post.publishedAt).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
              year: "numeric",
            })} · {post.readingTime} min read
          </p>

          <p className="prose-spa mt-8">
            {isHotStoneArticle ? (
              <>
                {hotStoneCustomIntroTop}
                <br />
                <br />
                {hotStoneCustomIntroBottom}
              </>
            ) : post.excerpt}
          </p>
          {!isHotStoneArticle && (
            <p className="prose-spa mt-4">
              Serena Spa shares this journal to help guests understand treatment benefits, prepare for sessions, and create a more mindful wellness lifestyle before and after visiting Hội An.
            </p>
          )}

          <div className="mt-10 flex gap-3">
            <Link href="/booking" className="btn btn-primary btn-sm">Book a Treatment</Link>
            <Link href="/blog" className="btn btn-outline btn-sm">Back to Blog</Link>
          </div>
        </article>
      </section>
    </main>
  );
}
