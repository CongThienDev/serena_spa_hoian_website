import Link from "next/link";
import { cn } from "@/lib/utils";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

type BreadcrumbProps = {
  items: BreadcrumbItem[];
  className?: string;
};

/**
 * Accessible breadcrumb with JSON-LD BreadcrumbList schema.
 * Per SEO.md: every non-home page should have breadcrumbs.
 */
export default function Breadcrumb({ items, className }: BreadcrumbProps) {
  const schemaData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "/" },
      ...items.map((item, i) => ({
        "@type": "ListItem",
        position: i + 2,
        name: item.label,
        ...(item.href ? { item: item.href } : {}),
      })),
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />
      <nav aria-label="Breadcrumb" className={cn("", className)}>
        <ol className="flex flex-wrap items-center gap-1.5 text-sm text-[var(--color-warm-gray)]">
          <li>
            <Link
              href="/"
              className="hover:text-[var(--color-terracotta)] transition-colors duration-200"
            >
              Home
            </Link>
          </li>

          {items.map((item, index) => (
            <li key={index} className="flex items-center gap-1.5">
              {/* Separator */}
              <span aria-hidden="true" className="text-[var(--color-sand-dark)]">
                /
              </span>

              {item.href && index < items.length - 1 ? (
                <Link
                  href={item.href}
                  className="hover:text-[var(--color-terracotta)] transition-colors duration-200"
                >
                  {item.label}
                </Link>
              ) : (
                <span
                  aria-current="page"
                  className="text-[var(--color-espresso)] font-medium"
                >
                  {item.label}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
}
