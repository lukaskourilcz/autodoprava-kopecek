"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Phone } from "lucide-react";
import { useContent } from "@/content/useContent";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { telHref } from "@/lib/contactLinks";
import { Button } from "../components/ui/Button";
import { SlideDots } from "../components/ui/SlideDots";

const heroImages = [
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

const SLIDE_INTERVAL_MS = 8000;

export default function Header() {
  const { locale, texts } = useContent();
  const phone = texts.contact.phone;
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);

  const showNextSlide = useCallback(
    () => setActiveSlide((index) => (index + 1) % heroImages.length),
    []
  );

  useEffect(() => {
    if (prefersReducedMotion) return;
    const timer = setInterval(showNextSlide, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [showNextSlide, prefersReducedMotion]);

  return (
    <section
      id="home"
      className="section relative bg-white overflow-hidden"
      style={{ height: "calc(100dvh - var(--nav-height))", minHeight: "480px" }}
    >
      {heroImages.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt=""
          fill
          priority={index === 0}
          loading={index === 0 ? undefined : "lazy"}
          sizes="100vw"
          className={`object-cover object-center transition-opacity duration-700 ease-in-out ${
            index === activeSlide ? "opacity-100" : "opacity-0"
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
            {texts.home.heroText}
          </h1>
          <p className="text-sm sm:text-base text-gray-600 font-medium mb-5 uppercase tracking-widest">
            {texts.home.subtitle}
          </p>
          <p className="text-sm sm:text-base text-gray-700 leading-relaxed max-w-xl mx-auto">
            {texts.home.description}
          </p>
          <div className="mt-7 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={telHref(phone)} ariaLabel={`${texts.contact.callCta}: ${phone}`}>
              <Phone size={18} aria-hidden="true" />
              <span>{texts.contact.callCta}</span>
              <span className="hidden sm:inline">: {phone}</span>
            </Button>
            <Button href={`/${locale}#contact`} variant="secondary">
              {texts.contact.contactCta}
            </Button>
          </div>
        </div>
      </div>

      <SlideDots
        count={heroImages.length}
        current={activeSlide}
        onSelect={setActiveSlide}
        variant="bar"
        label="Hero slides"
        slideLabel={(index, total) => `Snímek ${index} z ${total}`}
        className="absolute left-1/2 bottom-3 -translate-x-1/2 z-20"
      />
    </section>
  );
}
