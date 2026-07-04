import type { SupportedLocale } from "@/lib/locale";

/** A piece of text that exists in every supported language. */
export type LocalizedText = Record<SupportedLocale, string>;

/**
 * The equipment badges shown on a vehicle card. Keys describe the feature
 * itself (not the icon drawing), so a new developer immediately knows what
 * each one means. The matching icon and label live in `icons.tsx` and the
 * `fleet.features` texts.
 */
export const FEATURE_KEYS = [
  "tourConfig",
  "recliningSeats",
  "seatBelts",
  "airConditioning",
  "tv",
  "microphone",
  "fridge",
  "toilet",
] as const;

export type FeatureKey = (typeof FEATURE_KEYS)[number];

/** A single vehicle in the fleet. Self-contained so it can be added/removed in the dev editor. */
export type Vehicle = {
  /** Stable slug used as the React key, e.g. "tourismo". */
  id: string;
  name: LocalizedText;
  description: LocalizedText;
  /** Image paths (`/pics/...`) or absolute URLs. The first image is the cover. */
  images: string[];
  features: FeatureKey[];
};

/** A heading paired with a paragraph — used by services and the "why us" reasons. */
export type TitleAndText = { title: string; description: string };

/** One "why choose us" reason. `icon` is structural (maps to a Lucide icon), not editable copy. */
export type AboutReason = {
  icon: "Waypoints" | "ChevronsUp" | "ShieldPlus";
  title: string;
  description: string;
};

/** Every text on the site for a single language (everything except vehicle copy). */
export type SiteTexts = {
  home: {
    title: string;
    subtitle: string;
    description: string;
    heroText: string;
  };
  about: {
    /** Small uppercase label above the section title. */
    kicker: string;
    title: string;
    paragraphs: string[];
    /** Headline figures shown next to the intro, e.g. value "2012", label "On the road since". */
    stats: { value: string; label: string }[];
    reasonsTitle: string;
    reasons: AboutReason[];
    closingText: string;
  };
  services: {
    title: string;
    description: string;
    items: Record<"safety" | "comfort" | "capacity" | "luggage", TitleAndText>;
    irregularBusTransport: Record<
      | "schoolTransport"
      | "sportsTransport"
      | "groupsTransport"
      | "airportTransfers"
      | "weddingTransport"
      | "replacementTransport",
      TitleAndText
    >;
    corporateTransport: TitleAndText;
    cargoTransport: TitleAndText;
  };
  fleet: {
    title: string;
    description: string;
    /** Label shown for each equipment badge, e.g. `airConditioning` → "Air Conditioning". */
    features: Record<FeatureKey, string>;
  };
  contact: {
    title: string;
    description: string;
    addressLine1: string;
    addressLine2: string;
    addressLabel: string;
    mapLabel: string;
    /** Accessible title of the embedded map iframe. */
    mapTitle: string;
    phone: string;
    phoneLabel: string;
    callCta: string;
    email: string;
    emailLabel: string;
    mailSubject: string;
    hoursLabel: string;
    hours: string;
    billingTitle: string;
    companyID: string;
    companyIDLabel: string;
    taxID: string;
    taxIDLabel: string;
    logoAlt: string;
    footerNote: string;
    contactCta: string;
    emailCta: string;
  };
  /** Translated labels for assistive tech and small UI chrome. */
  a11y: {
    skipToContent: string;
    changeLanguage: string;
    openMenu: string;
    closeMenu: string;
    previousPhoto: string;
    nextPhoto: string;
    /** Template with {{current}} and {{total}}, e.g. "Photo {{current}} of {{total}}". */
    photoOf: string;
    heroSlides: string;
    backToTop: string;
  };
  /** Copy for the 404 and error pages, which render outside the locale segment. */
  errors: {
    notFoundTitle: string;
    notFoundDescription: string;
    backHome: string;
    errorTitle: string;
    errorDescription: string;
    retry: string;
    home: string;
  };
};

/**
 * Photos used by the fixed page sections. Paths are `/pics/...` for bundled
 * images, or data:/https: URLs for uploaded and linked photos.
 */
export type SiteImages = {
  /** Hero slideshow photos, shown in order. */
  hero: string[];
  /** The three photo tiles in the services section. */
  services: {
    schoolTransport: string;
    airportTransfers: string;
    cargoTransport: string;
  };
  /** The photos under the "about" text (shown two per row). */
  about: string[];
};

/** The full editable content of the site: texts (per language), the fleet, and section photos. */
export type SiteContent = {
  texts: Record<SupportedLocale, SiteTexts>;
  vehicles: Vehicle[];
  images: SiteImages;
};
