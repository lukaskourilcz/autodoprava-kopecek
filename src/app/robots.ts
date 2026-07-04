import type { MetadataRoute } from "next";

const SITE_URL = "https://www.autobusyhodonin.cz";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: "/dev",
    },
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
