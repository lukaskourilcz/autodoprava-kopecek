'use client';

import React, { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';
import Header from './header/header';
import Kontakt from './kontakt/page';
import ONas from './o-nas/page';
import Sluzby from './sluzby/page';
import VozovyPark from './vozovy-park/page';

export default function HomePage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get('lang') || 'cs'; // Get language from query params
  const { i18n } = useTranslation();

  // Change language after the render cycle
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang).catch((err) =>
        console.error('Failed to change language:', err)
      );
    }
  }, [lang, i18n]);

  return (
    <main>
      <section id="header">
        <Header />
      </section>
      <section id="about">
        <ONas />
      </section>
      <section id="services">
        <Sluzby />
      </section>
      <section id="fleet">
        <VozovyPark />
      </section>
      <section id="contact">
        <Kontakt />
      </section>
    </main>
  );
}
