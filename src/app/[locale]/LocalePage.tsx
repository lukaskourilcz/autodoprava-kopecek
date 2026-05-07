"use client";

import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import type { SupportedLocale } from "../../lib/i18n";
import Header from "../_sections/Header";
import About from "../_sections/About";
import Services from "../_sections/Services";
import Fleet from "../_sections/Fleet";
import Contact from "../_sections/Contact";

export default function LocalePage({ locale }: { locale: SupportedLocale }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== locale) {
      i18n
        .changeLanguage(locale)
        .catch((err) => console.error("Failed to change language:", err));
    }
  }, [locale, i18n]);

  return (
    <main id="main-content">
      <section id="home" className="section">
        <Header locale={locale} />
      </section>
      <section id="about" className="section">
        <About />
      </section>
      <section id="services" className="section">
        <Services />
      </section>
      <section id="fleet" className="section">
        <Fleet />
      </section>
      <section id="contact" className="section">
        <Contact />
      </section>
    </main>
  );
}
