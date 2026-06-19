"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
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

// The full-bleed atmospheric hero: edge-to-edge aviation-style photography of
// the fleet, washed in the stratosphere sky gradient, with a monumental
// headline anchored to the bottom-left. No card, no shadow — the photograph and
// the type are the only two elements.
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
      className="section relative min-h-[100dvh] overflow-hidden bg-stratosphere"
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

      {/* Stratosphere wash at the top (keeps the transparent nav legible),
          clearing to reveal the photograph, then a scrim at the foot so the
          cloud-white headline always survives. */}
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{
          backgroundImage:
            "linear-gradient(to bottom, rgba(113,110,133,0.88) 0%, rgba(113,110,133,0.20) 36%, rgba(0,0,0,0.28) 76%, rgba(0,0,0,0.62) 100%)",
        }}
      />

      <div className="relative z-10 flex min-h-[100dvh] flex-col justify-end px-[40px] pb-16 pt-[140px] max-[640px]:px-5">
        <div className="w-full max-w-3xl">
          <p className="mb-5 font-text text-[18px] font-semibold uppercase tracking-[0.04em] text-cloud/90">
            {texts.home.subtitle}
          </p>
          <h1 className="text-hero max-w-[700px] text-cloud">{texts.home.heroText}</h1>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button
              variant="light"
              href={telHref(phone)}
              ariaLabel={`${texts.contact.callCta}: ${phone}`}
            >
              {texts.contact.callCta}
            </Button>
            <Button variant="light" href={`/${locale}#contact`}>
              {texts.contact.contactCta}
            </Button>
          </div>

          <SlideDots
            count={heroImages.length}
            current={activeSlide}
            onSelect={setActiveSlide}
            variant="bar"
            label="Hero slides"
            slideLabel={(index, total) => `Snímek ${index} z ${total}`}
            className="mt-10 justify-start gap-1"
          />
        </div>
      </div>
    </section>
  );
}
