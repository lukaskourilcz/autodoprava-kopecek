"use client";

import { useLocale } from "./locale-context";
import { useSiteContent } from "./store";
import type { SiteImages, SiteTexts, Vehicle } from "./types";

/**
 * The one hook section components use. Returns the texts for the active
 * language, the fleet, and the section photos, so usage is fully typed:
 * `texts.about.title`, `vehicles.map(...)`, `images.hero`, no string paths.
 */
export function useContent(): {
  locale: ReturnType<typeof useLocale>;
  texts: SiteTexts;
  vehicles: Vehicle[];
  images: SiteImages;
} {
  const locale = useLocale();
  const content = useSiteContent();
  return {
    locale,
    texts: content.texts[locale],
    vehicles: content.vehicles,
    images: content.images,
  };
}
