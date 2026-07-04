import type { MetadataRoute } from "next";
import { SUPPORTED_LOCALES, DEFAULT_LOCALE } from "../lib/locale";

const SITE_URL = "https://www.autobusyhodonin.cz";

export default function sitemap(): MetadataRoute.Sitemap {
  return SUPPORTED_LOCALES.map((locale) => ({
    url: `${SITE_URL}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === DEFAULT_LOCALE ? 1 : 0.8,
  }));
}
