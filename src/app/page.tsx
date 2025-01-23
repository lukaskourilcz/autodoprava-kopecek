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
  const lang = searchParams.get("lang") || "cs"; // Get language from query params
  const { i18n } = useTranslation();

  // Change language after the render cycle
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n
        .changeLanguage(lang)
        .catch((err) => console.error("Failed to change language:", err));
    }
  }, [lang, i18n]);

  return (
    <main>
      <section id="header">
        <Header />
      </section>
      <section id="about">
        <About />
      </section>
      <section id="services">
        <Services />
      </section>
      <section id="fleet">
        <Fleet />
      </section>
      <section id="contact">
        <Contact />
      </section>
    </main>
  );
}
