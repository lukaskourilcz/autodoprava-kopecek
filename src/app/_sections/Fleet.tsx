"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/content/useContent";
import { FEATURE_ICONS } from "../components/icons";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SlideDots } from "../components/ui/SlideDots";
import { RichText } from "../components/ui/RichText";
import { Reveal } from "../components/ui/Reveal";
import { uiStrings } from "@/lib/ui-strings";
import type { SupportedLocale } from "@/lib/locale";

/** Bundled images live under /public; uploaded or linked photos are left unoptimized. */
const isLocalImage = (src: string) => src.startsWith("/");

function VehicleCarousel({
  images,
  vehicleName,
  locale,
}: {
  images: string[];
  vehicleName: string;
  locale: SupportedLocale;
}) {
  const ui = uiStrings(locale);
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.children[0]?.clientWidth || 0;
    track.scrollTo({ left: index * slideWidth, behavior: "smooth" });
    setCurrentIndex(index);
  }, []);

  // Keep the active dot in sync while the user swipes, throttled to one update per frame.
  const handleScroll = useCallback(() => {
    if (scrollFrameRef.current !== null) return;
    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      const track = trackRef.current;
      if (!track) return;
      const slideWidth = track.children[0]?.clientWidth || 0;
      if (!slideWidth) return;
      setCurrentIndex(Math.round(track.scrollLeft / slideWidth));
    });
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    track.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      track.removeEventListener("scroll", handleScroll);
      if (scrollFrameRef.current !== null) cancelAnimationFrame(scrollFrameRef.current);
    };
  }, [handleScroll]);

  return (
    <div className="relative w-full" aria-roledescription="carousel" aria-label={vehicleName}>
      <div
        ref={trackRef}
        className="flex snap-x snap-mandatory scroll-smooth overflow-x-auto scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {images.map((src, index) => (
          <div key={`${src}-${index}`} className="basis-full shrink-0 snap-center">
            <Image
              src={src}
              alt={`${vehicleName} (${index + 1}/${images.length})`}
              width={350}
              height={350}
              sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 350px"
              loading={index === 0 ? "eager" : "lazy"}
              unoptimized={!isLocalImage(src)}
              className="h-auto w-full rounded-2xl"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(currentIndex - 1, 0))}
            aria-label={ui.prevPhoto}
            disabled={currentIndex === 0}
            className="absolute left-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow transition-opacity disabled:cursor-not-allowed disabled:opacity-30 focus-ring"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(currentIndex + 1, images.length - 1))}
            aria-label={ui.nextPhoto}
            disabled={currentIndex === images.length - 1}
            className="absolute right-1 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-800 shadow transition-opacity disabled:cursor-not-allowed disabled:opacity-30 focus-ring"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </>
      )}

      {images.length > 1 && (
        <SlideDots
          count={images.length}
          current={currentIndex}
          onSelect={scrollToIndex}
          label={ui.photos}
          slideLabel={ui.slideOf}
          className="mt-3"
        />
      )}
    </div>
  );
}

export default function Fleet() {
  const { locale, texts, vehicles } = useContent();

  return (
    <section
      id="fleet"
      className="section bg-gradient-to-b from-gray-200 to-white px-4 py-20 sm:px-8 sm:py-24 md:px-16 lg:px-32"
    >
      <SectionHeading
        title={texts.fleet.title}
        description={texts.fleet.description}
        className="mb-12"
      />

      <div className="mx-auto grid max-w-6xl grid-cols-1 justify-center gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {vehicles.map((vehicle, index) => (
          <Reveal key={vehicle.id} delay={(index % 4) * 80}>
            <article className="flex h-full flex-col items-center rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-yellow-200">
              <VehicleCarousel
                images={vehicle.images}
                vehicleName={vehicle.name[locale]}
                locale={locale}
              />
              <h3 className="mt-4 text-center font-bold text-gray-900">
                {vehicle.name[locale]}
              </h3>
              {vehicle.features.length > 0 && (
                <ul className="mt-3 flex flex-wrap items-center justify-center gap-2">
                  {vehicle.features.map((feature) => {
                    const Icon = FEATURE_ICONS[feature];
                    if (!Icon) return null;
                    const label = texts.fleet.features[feature];
                    return (
                      <li key={feature}>
                        <span title={label} aria-label={label} className="inline-block">
                          <Icon className="h-5 w-5 text-gray-700" aria-hidden="true" />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
              <p className="mt-3 text-center text-gray-700">
                <RichText text={vehicle.description[locale]} />
              </p>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
