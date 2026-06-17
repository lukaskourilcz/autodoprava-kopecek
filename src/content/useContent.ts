"use client";

import { useLocale } from "./locale-context";
import { useSiteContent } from "./store";
import type { SiteTexts, Vehicle } from "./types";

/**
 * The one hook section components use. Returns the texts for the active
 * language plus the fleet, so usage is fully typed: `texts.about.title`,
 * `vehicles.map(...)`, no string paths to mistype.
 */
export function useContent(): {
  locale: ReturnType<typeof useLocale>;
  texts: SiteTexts;
  vehicles: Vehicle[];
} {
  const locale = useLocale();
  const content = useSiteContent();
  return { locale, texts: content.texts[locale], vehicles: content.vehicles };
}
