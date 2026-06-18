export const SUPPORTED_LOCALES = ["vi", "en", "ko"] as const;

export type Locale = (typeof SUPPORTED_LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Pick a value for the active locale from a per-locale map.
 * Requiring all locales (Record<Locale, T>) means adding a new language
 * forces a compile error at every call site instead of silently falling
 * back to English — no untranslated strings slip through.
 */
export function localize<T>(locale: Locale, variants: Record<Locale, T>): T {
  return variants[locale] ?? variants[DEFAULT_LOCALE];
}

export function isLocale(value: string): value is Locale {
  return SUPPORTED_LOCALES.includes(value as Locale);
}

export function normalizeLocale(value?: string | null): Locale {
  if (!value) return DEFAULT_LOCALE;
  return isLocale(value) ? value : DEFAULT_LOCALE;
}

export function detectPreferredLocale(acceptLanguage?: string | null): Locale {
  if (!acceptLanguage) return DEFAULT_LOCALE;
  const normalized = acceptLanguage.toLowerCase();
  if (normalized.includes("vi")) return "vi";
  if (normalized.includes("ko")) return "ko";
  return "en";
}

export function stripLocalePrefix(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (segments.length === 0) return "/";
  const firstSegment = segments[0];
  if (firstSegment && isLocale(firstSegment)) {
    const rest = segments.slice(1).join("/");
    return rest ? `/${rest}` : "/";
  }
  return pathname;
}

export function withLocalePath(locale: Locale, href: string): string {
  if (!href.startsWith("/")) return href;
  const stripped = stripLocalePrefix(href);
  return stripped === "/" ? `/${locale}` : `/${locale}${stripped}`;
}

export function localeFromPathname(pathname: string): Locale {
  const segment = pathname.split("/").filter(Boolean)[0] ?? "";
  return normalizeLocale(segment);
}
