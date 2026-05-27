import en from "@/messages/en.json";
import vi from "@/messages/vi.json";
import { type Locale } from "@/lib/i18n";

const DICTIONARIES = { en, vi } as const;

export type Dictionary = (typeof DICTIONARIES)["en"];

export function getDictionary(locale: Locale): Dictionary {
  return DICTIONARIES[locale];
}
