import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    cs: {
      common: {
        home: 'Úvod',
        about: 'O nás',
        services: 'Služby',
        fleet: 'Vozový park',
        contact: 'Kontakt',
      },
    },
    en: {
      common: {
        home: 'Home',
        about: 'About Us',
        services: 'Services',
        fleet: 'Fleet',
        contact: 'Contact',
      },
    },
    de: {
      common: {
        home: 'Startseite',
        about: 'Über uns',
        services: 'Dienstleistungen',
        fleet: 'Fuhrpark',
        contact: 'Kontakt',
      },
    },
  },
  lng: 'cs', // Default language
  fallbackLng: 'cs', // Fallback language if the key is missing
  interpolation: {
    escapeValue: false, // React already escapes content
  },
});

export default i18n;
