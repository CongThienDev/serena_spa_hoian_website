import { cn } from "@/lib/utils";

type LotusIconProps = {
  className?: string;
  size?: number;
  color?: string;
};

/**
 * Serena Spa lotus mark — the brand identity symbol.
 * Appears in: logo, feature strip icons, section ornaments.
 * A stylised water lily / lotus with 6 petals + circle center.
 */
export default function LotusIcon({
  className,
  size = 32,
  color = "currentColor",
}: LotusIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
    >
      {/* Center circle */}
      <circle cx="32" cy="36" r="5" fill={color} opacity="0.9" />

      {/* Center top petal */}
      <path
        d="M32 30 C28 22, 22 16, 32 8 C42 16, 36 22, 32 30Z"
        fill={color}
        opacity="0.85"
      />

      {/* Upper-right petal */}
      <path
        d="M36 32 C42 26, 50 24, 54 32 C48 38, 40 36, 36 32Z"
        fill={color}
        opacity="0.75"
      />

      {/* Lower-right petal */}
      <path
        d="M35 38 C42 36, 50 38, 50 46 C44 50, 38 44, 35 38Z"
        fill={color}
        opacity="0.65"
      />

      {/* Center bottom petal */}
      <path
        d="M32 42 C28 50, 22 54, 32 58 C42 54, 36 50, 32 42Z"
        fill={color}
        opacity="0.7"
      />

      {/* Lower-left petal */}
      <path
        d="M29 38 C22 44, 16 50, 14 46 C14 38, 22 36, 29 38Z"
        fill={color}
        opacity="0.65"
      />

      {/* Upper-left petal */}
      <path
        d="M28 32 C22 36, 14 38, 10 32 C14 24, 22 26, 28 32Z"
        fill={color}
        opacity="0.75"
      />

      {/* Stem */}
      <path
        d="M32 58 C32 60, 32 62, 32 64"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        opacity="0.5"
      />
    </svg>
  );
}

/**
 * Minimal lotus mark for small contexts (nav logo, badges).
 */
export function LotusMarkSmall({
  className,
  size = 20,
  color = "currentColor",
}: LotusIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
    >
      <circle cx="20" cy="22" r="3.5" fill={color} />
      <path d="M20 18 C17 12, 13 8, 20 4 C27 8, 23 12, 20 18Z" fill={color} opacity="0.9" />
      <path d="M23 20 C27 16, 33 15, 35 20 C31 25, 25 23, 23 20Z" fill={color} opacity="0.75" />
      <path d="M22 25 C26 23, 32 25, 31 30 C27 33, 23 28, 22 25Z" fill={color} opacity="0.65" />
      <path d="M20 27 C17 32, 13 35, 20 38 C27 35, 23 32, 20 27Z" fill={color} opacity="0.7" />
      <path d="M18 25 C14 28, 9 33, 9 30 C8 25, 14 23, 18 25Z" fill={color} opacity="0.65" />
      <path d="M17 20 C13 23, 7 25, 5 20 C7 15, 13 16, 17 20Z" fill={color} opacity="0.75" />
    </svg>
  );
}
