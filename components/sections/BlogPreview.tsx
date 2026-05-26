import Link from "next/link";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { getFeaturedPosts } from "@/data/blog";

function BlogCard({ post }: { post: ReturnType<typeof getFeaturedPosts>[number] }) {
  const date = new Date(post.publishedAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Link href={`/blog/${post.slug}`} className="group block h-full">
      <article
        className="card h-full flex flex-col"
        style={{ borderRadius: "var(--radius-card)" }}
      >
        {/* Cover image */}
        <div className="relative overflow-hidden flex-shrink-0" style={{ aspectRatio: "16/9" }}>
          <div
            className="w-full h-full"
            style={{ backgroundColor: "var(--color-section-warm)" }}
          >
            {/* Placeholder shown when blog images aren't available yet */}
            <div className="w-full h-full flex items-center justify-center">
              <svg className="w-12 h-12 opacity-20" viewBox="0 0 64 64" fill="var(--color-terracotta)" aria-hidden="true">
                <path d="M32 4 C25 14, 16 18, 16 28 C16 40, 24 48, 32 52 C40 48, 48 40, 48 28 C48 18, 39 14, 32 4Z" />
              </svg>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col gap-3 px-5 py-5 flex-1">
          {/* Category + reading time */}
          <div className="flex items-center justify-between">
            <span className="eyebrow text-[0.65rem]">{post.category}</span>
            <span
              className="font-sans text-[var(--color-warm-gray)]"
              style={{ fontSize: "0.72rem" }}
            >
              {post.readingTime} min read
            </span>
          </div>

          {/* Title */}
          <h3
            className="font-serif text-[var(--color-espresso)] group-hover:text-[var(--color-terracotta)] transition-colors duration-200"
            style={{ fontSize: "1.1rem", fontWeight: 500, lineHeight: 1.3 }}
          >
            {post.title}
          </h3>

          {/* Excerpt */}
          <p
            className="font-sans text-[var(--color-warm-gray)] flex-1"
            style={{ fontSize: "0.85rem", lineHeight: 1.7 }}
          >
            {post.excerpt.slice(0, 110)}…
          </p>

          {/* Date + read link */}
          <div className="flex items-center justify-between pt-3 border-t border-[var(--color-sand)] mt-auto">
            <time
              dateTime={post.publishedAt}
              className="font-sans text-[var(--color-warm-gray)]"
              style={{ fontSize: "0.75rem" }}
            >
              {date}
            </time>
            <span
              className="font-sans font-semibold text-[var(--color-terracotta)] flex items-center gap-1 group-hover:gap-2 transition-all duration-200"
              style={{ fontSize: "0.78rem", letterSpacing: "0.05em" }}
            >
              Read More
              <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
}

/**
 * BlogPreview — 3 featured blog posts.
 * Sits on cream background before the dark CTA footer.
 */
export default function BlogPreview() {
  const posts = getFeaturedPosts(3);

  return (
    <section
      className="section-padding"
      style={{ backgroundColor: "var(--color-cream)" }}
      aria-labelledby="blog-heading"
    >
      <div className="container-site">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <AnimatedSection animation="slide-up-fade">
            <SectionHeading
              eyebrow="Wellness Journal"
              title="From the Journal"
              titleAs="h2"
            />
          </AnimatedSection>
          <AnimatedSection animation="fade" delay={0.2}>
            <Link href="/blog" className="btn btn-outline btn-sm flex-shrink-0 self-start md:self-auto">
              All Articles
            </Link>
          </AnimatedSection>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {posts.map((post, i) => (
            <AnimatedSection key={post.id} animation="slide-up-fade" delay={i * 0.09}>
              <BlogCard post={post} />
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
