"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { Phone, ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/content/useContent";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { telHref } from "@/lib/contactLinks";
import { isLocalImage } from "@/lib/images";
import { interpolate } from "@/lib/format";
import { Button } from "../components/ui/Button";
import type { MobileFocus } from "@/content/types";

const SLIDE_INTERVAL_MS = 8000;

/* Narrow screens crop landscape photos hard; the owner picks per photo
   which part stays in frame (/dev → Fotografie webu). Desktop shows the
   full width, so it always centers. */
const focusClasses: Record<MobileFocus, string> = {
  left: "object-[30%_center] md:object-center",
  center: "object-center",
  right: "object-[70%_center] md:object-center",
};

export default function Header() {
  const { locale, texts, images } = useContent();
  const heroImages = images.hero;
  const slideCount = heroImages.length;
  const phone = texts.contact.phone;
  const prefersReducedMotion = usePrefersReducedMotion();
  const [activeSlide, setActiveSlide] = useState(0);
  // Slides are mounted lazily (active + the next one) so the first paint only loads two images.
  const [mountedSlides, setMountedSlides] = useState<Set<number>>(
    () => new Set([0, 1])
  );

  const goTo = useCallback(
    (index: number) => {
      if (slideCount === 0) return;
      const target = ((index % slideCount) + slideCount) % slideCount;
      setMountedSlides((prev) => {
        const next = new Set(prev);
        next.add(target);
        next.add((target + 1) % slideCount);
        return next;
      });
      setActiveSlide(target);
    },
    [slideCount]
  );

  // Keep the index valid when the owner edits the photo list in /dev.
  useEffect(() => {
    if (activeSlide >= slideCount) setActiveSlide(0);
  }, [activeSlide, slideCount]);

  // Restarts whenever the slide changes, so manual navigation resets the timer.
  useEffect(() => {
    if (prefersReducedMotion || slideCount < 2) return;
    const timer = setInterval(() => goTo(activeSlide + 1), SLIDE_INTERVAL_MS);
    return () => clearInterval(timer);
  }, [activeSlide, goTo, prefersReducedMotion, slideCount]);

  return (
    <section
      id="home"
      className="section relative bg-ink overflow-hidden"
      style={{ height: "calc(100dvh - var(--nav-height))", minHeight: "520px" }}
    >
      {heroImages.map(({ src, focus }, index) =>
        mountedSlides.has(index) ? (
          <div
            key={`${src}-${index}`}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
              index === activeSlide ? "opacity-100" : "opacity-0"
            }`}
            aria-hidden={index !== activeSlide}
          >
            <Image
              src={src}
              alt=""
              fill
              priority={index === 0}
              sizes="100vw"
              unoptimized={!isLocalImage(src)}
              className={`object-cover ${focusClasses[focus] ?? "object-center"} ${
                index === activeSlide && !prefersReducedMotion ? "kenburns" : ""
              }`}
            />
          </div>
        ) : null
      )}

      <div
        className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10"
        aria-hidden="true"
      />

      <div className="relative z-10 h-full flex items-end">
        <div className="container-site pb-16 sm:pb-20">
          <p className="text-brand-light font-semibold text-sm sm:text-base tracking-wide mb-3">
            {texts.home.subtitle}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] text-white max-w-3xl">
            {texts.home.heroText.endsWith(".") ? (
              <>
                {texts.home.heroText.slice(0, -1)}
                <span className="text-brand">.</span>
              </>
            ) : (
              texts.home.heroText
            )}
          </h1>
          <p className="mt-4 text-white/80 leading-relaxed max-w-2xl line-clamp-2 sm:line-clamp-3">
            {texts.home.description}
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <Button href={telHref(phone)} ariaLabel={`${texts.contact.callCta}: ${phone}`}>
              <Phone size={18} aria-hidden="true" />
              <span>
                {texts.contact.callCta}: {phone}
              </span>
            </Button>
            <Button href={`/${locale}#contact`} variant="outline">
              {texts.contact.contactCta}
            </Button>
          </div>
        </div>
      </div>

      {slideCount > 1 && (
        <div
          role="group"
          aria-label={texts.a11y.heroSlides}
          className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 z-20 flex items-center gap-2 text-white [@media(max-height:520px)]:hidden"
        >
          <button
            type="button"
            onClick={() => goTo(activeSlide - 1)}
            aria-label={texts.a11y.previousPhoto}
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors focus-ring"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <span
            className="text-xs font-semibold tabular-nums tracking-widest"
            aria-live="polite"
            aria-label={interpolate(texts.a11y.photoOf, {
              current: activeSlide + 1,
              total: slideCount,
            })}
          >
            {String(activeSlide + 1).padStart(2, "0")}
            <span className="text-white/50"> / {String(slideCount).padStart(2, "0")}</span>
          </span>
          <span className="hidden sm:block w-16 h-1 rounded-full bg-white/25 overflow-hidden">
            {!prefersReducedMotion && (
              <span key={activeSlide} className="block h-full w-full bg-brand slide-progress" />
            )}
          </span>
          <button
            type="button"
            onClick={() => goTo(activeSlide + 1)}
            aria-label={texts.a11y.nextPhoto}
            className="w-11 h-11 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors focus-ring"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>
        </div>
      )}
    </section>
  );
}
