import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import csTranslations from "../locales/cs.json";
import enTranslations from "../locales/en.json";
import deTranslations from "../locales/de.json";

i18n.use(initReactI18next).init({
  resources: {
    cs: {
      common: csTranslations,
    },
    en: {
      common: enTranslations,
    },
    de: {
      common: deTranslations,
    },
  },
  lng: "cs",
  fallbackLng: "cs",
  defaultNS: "common",
  interpolation: {
    escapeValue: false,
  },
  debug: false,
});

export default i18n;
