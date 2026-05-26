import { cn } from "@/lib/utils";
import { LotusMarkSmall } from "./LotusIcon";

type OrnamentDividerProps = {
  className?: string;
  color?: string;
};

/**
 * Decorative section divider: thin lines flanking a lotus mark.
 * Used between eyebrow/heading or between major sections.
 */
export default function OrnamentDivider({
  className,
  color = "var(--color-terracotta)",
}: OrnamentDividerProps) {
  return (
    <div
      className={cn("flex items-center justify-center gap-3 my-4", className)}
      aria-hidden="true"
    >
      <span
        className="flex-1 h-px max-w-[80px]"
        style={{
          background: `linear-gradient(to right, transparent, ${color})`,
        }}
      />
      <LotusMarkSmall size={18} color={color} />
      <span
        className="flex-1 h-px max-w-[80px]"
        style={{
          background: `linear-gradient(to left, transparent, ${color})`,
        }}
      />
    </div>
  );
}
