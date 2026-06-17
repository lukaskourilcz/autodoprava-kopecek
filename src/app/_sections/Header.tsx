"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Phone, Pause, Play } from "lucide-react";
import { useContent } from "@/content/useContent";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { telHref } from "@/lib/contactLinks";
import { uiStrings } from "@/lib/ui-strings";
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
  const ui = uiStrings(locale);
  const phone = texts.contact.phone;
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  const [paused, setPaused] = useState(false);

  const showNextSlide = useCallback(
    () => setActiveSlide((index) => (index + 1) % heroImages.length),
    []
  );

  useEffect(() => {
    if (prefersReducedMotion || paused) return;
    const timer = setInterval(showNextSlide, SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [showNextSlide, prefersReducedMotion, paused]);

  return (
    <section
      id="home"
      className="section relative overflow-hidden bg-gray-900"
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
            index === activeSlide
              ? "opacity-100 motion-safe:animate-kenburns"
              : "opacity-0"
          }`}
        />
      ))}

      <div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/50"
        aria-hidden="true"
      />

      <div className="relative z-10 flex h-full items-center justify-center px-4">
        <div className="w-full max-w-2xl rounded-2xl bg-white/90 p-7 text-center shadow-2xl ring-1 ring-black/5 backdrop-blur-md motion-safe:animate-fade-in sm:p-10">
          <span
            className="section-accent mx-auto motion-safe:animate-fade-up"
            style={{ animationDelay: "80ms" }}
            aria-hidden="true"
          />
          <h1
            className="mb-3 text-2xl font-extrabold tracking-tight text-gray-900 motion-safe:animate-fade-up sm:text-3xl md:text-4xl lg:text-5xl"
            style={{ animationDelay: "120ms" }}
          >
            {texts.home.heroText}
          </h1>
          <p
            className="mb-5 text-sm font-medium uppercase tracking-widest text-gray-600 motion-safe:animate-fade-up sm:text-base"
            style={{ animationDelay: "200ms" }}
          >
            {texts.home.subtitle}
          </p>
          <p
            className="mx-auto max-w-xl text-sm leading-relaxed text-gray-700 motion-safe:animate-fade-up sm:text-base"
            style={{ animationDelay: "280ms" }}
          >
            {texts.home.description}
          </p>
          <div
            className="mt-7 flex flex-col justify-center gap-3 motion-safe:animate-fade-up sm:flex-row"
            style={{ animationDelay: "360ms" }}
          >
            <Button href={telHref(phone)} ariaLabel={`${texts.contact.callCta}: ${phone}`}>
              <Phone size={18} aria-hidden="true" />
              <span>{texts.contact.callCta}</span>
              <span>: {phone}</span>
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
        label={ui.heroSlides}
        slideLabel={ui.slideOf}
        className="absolute bottom-3 left-1/2 z-20 -translate-x-1/2"
      />

      {!prefersReducedMotion && (
        <button
          type="button"
          onClick={() => setPaused((value) => !value)}
          aria-label={paused ? ui.playSlideshow : ui.pauseSlideshow}
          className="absolute bottom-3 right-3 z-20 inline-flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm transition-colors hover:bg-black/60 focus-ring"
        >
          {paused ? <Play size={16} aria-hidden="true" /> : <Pause size={16} aria-hidden="true" />}
        </button>
      )}
    </section>
  );
}
