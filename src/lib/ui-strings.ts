import type { SupportedLocale } from "@/lib/locale";

/**
 * UI "chrome" strings — labels for controls and ARIA that aren't editable site
 * content (menus, carousels, skip link, etc.). Kept here so every locale gets a
 * proper translation instead of the hardcoded Czech that used to live inline.
 */
type UIStrings = {
  skipToContent: string;
  openMenu: string;
  closeMenu: string;
  changeLanguage: (current: string) => string;
  heroSlides: string;
  photos: string;
  prevPhoto: string;
  nextPhoto: string;
  slideOf: (index: number, total: number) => string;
  pauseSlideshow: string;
  playSlideshow: string;
  scrollDown: string;
  backToTop: string;
  sendEmail: string;
};

const STRINGS: Record<SupportedLocale, UIStrings> = {
  cs: {
    skipToContent: "Přeskočit na obsah",
    openMenu: "Otevřít menu",
    closeMenu: "Zavřít menu",
    changeLanguage: (current) => `Změnit jazyk (aktuální: ${current})`,
    heroSlides: "Úvodní snímky",
    photos: "Fotografie",
    prevPhoto: "Předchozí fotografie",
    nextPhoto: "Další fotografie",
    slideOf: (index, total) => `Snímek ${index} z ${total}`,
    pauseSlideshow: "Pozastavit prezentaci",
    playSlideshow: "Spustit prezentaci",
    scrollDown: "Posunout na obsah",
    backToTop: "Zpět nahoru",
    sendEmail: "Napsat e-mail",
  },
  en: {
    skipToContent: "Skip to content",
    openMenu: "Open menu",
    closeMenu: "Close menu",
    changeLanguage: (current) => `Change language (current: ${current})`,
    heroSlides: "Hero slides",
    photos: "Photos",
    prevPhoto: "Previous photo",
    nextPhoto: "Next photo",
    slideOf: (index, total) => `Slide ${index} of ${total}`,
    pauseSlideshow: "Pause slideshow",
    playSlideshow: "Play slideshow",
    scrollDown: "Scroll to content",
    backToTop: "Back to top",
    sendEmail: "Send e-mail",
  },
  de: {
    skipToContent: "Zum Inhalt springen",
    openMenu: "Menü öffnen",
    closeMenu: "Menü schließen",
    changeLanguage: (current) => `Sprache ändern (aktuell: ${current})`,
    heroSlides: "Startbilder",
    photos: "Fotos",
    prevPhoto: "Vorheriges Foto",
    nextPhoto: "Nächstes Foto",
    slideOf: (index, total) => `Bild ${index} von ${total}`,
    pauseSlideshow: "Diashow pausieren",
    playSlideshow: "Diashow abspielen",
    scrollDown: "Zum Inhalt scrollen",
    backToTop: "Nach oben",
    sendEmail: "E-Mail senden",
  },
};

export function uiStrings(locale: SupportedLocale): UIStrings {
  return STRINGS[locale];
}
