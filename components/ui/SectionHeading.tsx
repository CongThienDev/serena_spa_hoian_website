import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  titleAs?: "h1" | "h2" | "h3";
  className?: string;
  subtitleClassName?: string;
};

/**
 * Reusable section heading pattern throughout the site.
 * Eyebrow label → Main heading → Optional subtitle
 * Used in every major section per DESIGN_SYSTEM.md heading hierarchy.
 */
export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = "left",
  titleAs: Tag = "h2",
  className,
  subtitleClassName,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className
      )}
    >
      {eyebrow && (
        <span className="eyebrow">{eyebrow}</span>
      )}

      <Tag
        className={cn(
          "font-serif text-h2",
          align === "center" ? "max-w-2xl" : "max-w-xl"
        )}
      >
        {title}
      </Tag>

      {/* Thin terracotta divider line */}
      <span
        className={cn(
          "divider",
          align === "center" && "divider-center"
        )}
        aria-hidden="true"
      />

      {subtitle && (
        <p
          className={cn(
            "prose-spa",
            align === "center" && "text-center",
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
