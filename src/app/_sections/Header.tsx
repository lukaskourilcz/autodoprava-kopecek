"use client";

import { useTranslation } from "../components/TranslationProvider";
import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import { Phone } from "lucide-react";
import type { SupportedLocale } from "../../lib/locale";

const images = [
  "/pics/uvodka.jpg",
  "/pics/uvodka1.jpg",
  "/pics/uvodka2.jpg",
  "/pics/uvodka3.jpg",
  "/pics/uvodka4.jpg",
  "/pics/uvodka5.jpg",
  "/pics/uvodka6.jpg",
  "/pics/uvodka7.jpg",
  "/pics/uvodka8.jpg",
];

export default function Header({ locale }: { locale: SupportedLocale }) {
  const { t } = useTranslation();
  const phone = t("contact.phone");
  const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const onChange = () => setReducedMotion(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const advance = useCallback(() => {
    setCurrentImage((prev) => (prev + 1) % images.length);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const interval = setInterval(advance, 8000);
    return () => clearInterval(interval);
  }, [advance, reducedMotion]);

  return (
    <section
      id="hero"
      className="relative bg-white overflow-hidden"
      style={{ height: "calc(100dvh - var(--nav-height))", minHeight: "480px" }}
    >
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={index === 0}
          loading={index === 0 ? undefined : "lazy"}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 ease-in-out ${
            index === currentImage ? "opacity-100" : "opacity-0"
          }`}
        />
      ))}

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/40"
        aria-hidden="true"
      />

      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl text-center p-7 sm:p-10 ring-1 ring-black/5">
          <span className="section-accent" aria-hidden="true" />
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight text-gray-900 mb-3">
            {t("home.heroText")}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-medium mb-5 uppercase tracking-widest">
            {t("home.subtitle")}
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-xl mx-auto">
            {t("home.description")}
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={phoneHref}
              aria-label={`${t("contact.callCta")}: ${phone}`}
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-400 hover:shadow-lg active:translate-y-px transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 min-h-[44px]"
            >
              <Phone size={18} aria-hidden="true" />
              <span>{t("contact.callCta")}</span>
              <span className="hidden sm:inline">: {phone}</span>
            </a>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center justify-center bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 hover:shadow-lg active:translate-y-px transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 min-h-[44px]"
            >
              {t("contact.contactCta")}
            </Link>
          </div>
        </div>
      </div>

      <div
        className="absolute left-1/2 bottom-3 flex flex-wrap justify-center transform -translate-x-1/2 z-20"
        role="tablist"
        aria-label="Hero slides"
      >
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={index === currentImage}
            aria-label={`Snímek ${index + 1} z ${images.length}`}
            onClick={() => setCurrentImage(index)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
          >
            <span
              className={`block rounded-full transition-all duration-300 ${
                index === currentImage
                  ? "w-8 h-2 bg-yellow-500"
                  : "w-2 h-2 bg-white/70 hover:bg-white"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
