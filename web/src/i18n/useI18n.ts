import { useRouter } from "next/router";
import { dictionaries, type Dictionary, type Locale } from "./dictionaries";

export function resolveLocale(locale?: string): Locale {
  return locale === "en" ? "en" : "zh";
}

export function useI18n(): Dictionary {
  const { locale } = useRouter();
  return dictionaries[resolveLocale(locale)];
}
