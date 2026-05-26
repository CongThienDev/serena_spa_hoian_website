import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/metadata";
import SectionHeading from "@/components/ui/SectionHeading";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { BLOG_POSTS } from "@/data/blog";

export const metadata: Metadata = generatePageMetadata({
  title: "Wellness Journal — Serena Spa Hội An",
  description: "Wellness tips, treatment guides, and spa insights from Serena Spa Hội An.",
  path: "/blog",
});

export default function BlogPage() {
  return (
    <main>
      <section className="section-padding section-cream">
        <div className="container-site">
          <AnimatedSection animation="slide-up-fade">
            <SectionHeading
              eyebrow="Wellness Journal"
              title="Latest Articles"
              subtitle="Practical guides and mindful inspiration for your wellness journey."
              titleAs="h1"
              align="center"
              className="mb-12"
            />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BLOG_POSTS.map((post, i) => (
              <AnimatedSection key={post.id} animation="slide-up-fade" delay={i * 0.04}>
                <Link href={`/blog/${post.slug}`} className="card p-6 block h-full">
                  <p className="eyebrow text-[0.65rem]">{post.category}</p>
                  <h2 className="font-serif text-h4 mt-3">{post.title}</h2>
                  <p className="text-sm text-[var(--color-warm-gray)] mt-3">{post.excerpt}</p>
                  <p className="text-xs text-[var(--color-warm-gray)] mt-4">
                    {new Date(post.publishedAt).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                      year: "numeric",
                    })} · {post.readingTime} min read
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
