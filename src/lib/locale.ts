export const SUPPORTED_LOCALES = ["cs", "en", "de"] as const;
export type SupportedLocale = (typeof SUPPORTED_LOCALES)[number];
export const DEFAULT_LOCALE: SupportedLocale = "cs";

/** Display metadata for the language switcher, kept here so it has a single source of truth. */
export const LOCALE_DETAILS: Record<
  SupportedLocale,
  { label: string; short: string; flag: string }
> = {
  cs: { label: "Čeština", short: "CS", flag: "/flags/cz.png" },
  en: { label: "English", short: "EN", flag: "/flags/en.png" },
  de: { label: "Deutsch", short: "DE", flag: "/flags/de.png" },
};

export function isSupportedLocale(value: unknown): value is SupportedLocale {
  return (
    typeof value === "string" &&
    (SUPPORTED_LOCALES as readonly string[]).includes(value)
  );
}

export function normalizeLocale(value: string | null | undefined): SupportedLocale {
  return isSupportedLocale(value) ? value : DEFAULT_LOCALE;
}
