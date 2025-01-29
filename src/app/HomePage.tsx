"use client";

import React, { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslation } from "react-i18next";
import Header from "./header/page";
import Contact from "./contact/page";
import About from "./about/page";
import Services from "./services/page";
import Fleet from "./fleet/page";

export default function HomePage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "cs";
  const { i18n } = useTranslation();

  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang).catch((err) =>
        console.error("Failed to change language:", err)
      );
    }
  }, [lang, i18n]);

  return (
    <main>
      <section id="header" className="section">
        <Header />
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
