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
      style={{ height: "calc(100dvh - 122px)", minHeight: "480px" }}
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

      <div className="relative z-10 h-full flex items-center justify-center px-4">
        <div className="w-full max-w-3xl bg-white/85 backdrop-blur-sm rounded-2xl shadow-xl text-center p-6 sm:p-10 border border-white/30">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wider text-gray-900 mb-3 drop-shadow-md">
            {t("home.heroText")}
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-gray-700 font-semibold mb-2">
            {t("home.subtitle")}
          </p>
          <div className="my-3 w-4/5 mx-auto border-t-2 border-gray-300" aria-hidden="true" />
          <p className="text-sm sm:text-base text-gray-800 leading-relaxed tracking-wide drop-shadow-sm">
            {t("home.description")}
          </p>
          <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 min-h-[44px]"
            >
              <Phone size={18} aria-hidden="true" />
              <span>
                {t("contact.callCta")}: {phone}
              </span>
            </a>
            <Link
              href={`/${locale}#contact`}
              className="inline-flex items-center justify-center bg-gray-800 text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 min-h-[44px]"
            >
              {t("contact.contactCta")}
            </Link>
          </div>
        </div>
      </div>

      <div
        className="absolute left-1/2 bottom-4 flex space-x-2 transform -translate-x-1/2 z-20"
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
              className={`block w-3 h-3 rounded-full transition-colors duration-300 ${
                index === currentImage ? "bg-yellow-500" : "bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </section>
  );
}
