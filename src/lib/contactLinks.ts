// Builders for the `tel:`, `mailto:` and Google Maps links used by the Header
// and Contact sections, so the formatting lives in one place.

/** "+420 777 685 331" -> "tel:+420777685331" */
export function telHref(phone: string): string {
  return `tel:${phone.replace(/\s+/g, "")}`;
}

export function mailtoHref(email: string, subject?: string): string {
  return subject
    ? `mailto:${email}?subject=${encodeURIComponent(subject)}`
    : `mailto:${email}`;
}

export function mapsSearchHref(query: string): string {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
