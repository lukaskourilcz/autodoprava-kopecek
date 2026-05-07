export const SUPPORTED_LOCALES = ["cs", "en", "de"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = "cs";

export function normalizeLocale(
  value: string | null | undefined
): SupportedLocale {
  if (value && (SUPPORTED_LOCALES as readonly string[]).includes(value)) {
    return value as SupportedLocale;
  }
  return DEFAULT_LOCALE;
}
