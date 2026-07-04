/**
 * Bundled images live under /public and go through Next.js optimization;
 * uploaded photos (data: URLs) and external links are rendered as-is.
 */
export const isLocalImage = (src: string) => src.startsWith("/");
