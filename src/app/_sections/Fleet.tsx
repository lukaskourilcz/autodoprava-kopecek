"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/content/useContent";
import { FEATURE_ICONS } from "../components/icons";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SlideDots } from "../components/ui/SlideDots";
import { RichText } from "../components/ui/RichText";

/** Bundled images live under /public; uploaded or linked photos are left unoptimized. */
const isLocalImage = (src: string) => src.startsWith("/");

function VehicleCarousel({
  images,
  vehicleName,
}: {
  images: string[];
  vehicleName: string;
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const slideWidth = track.children[0]?.clientWidth || 350;
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
      const slideWidth = track.children[0]?.clientWidth || 350;
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
        className="flex overflow-x-scroll scroll-smooth space-x-4 scrollbar-hide"
        style={{ scrollSnapType: "x mandatory", WebkitOverflowScrolling: "touch" }}
      >
        {images.map((src, index) => (
          <Image
            key={`${src}-${index}`}
            src={src}
            alt={`${vehicleName} – fotografie ${index + 1}`}
            width={350}
            height={350}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 350px"
            loading={index === 0 ? "eager" : "lazy"}
            unoptimized={!isLocalImage(src)}
            className="rounded-[15%] flex-shrink-0 snap-center transition-opacity duration-300"
            style={{
              scrollSnapAlign: "center",
              opacity: index === currentIndex ? 1 : 0.5,
            }}
          />
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(currentIndex - 1, 0))}
            aria-label="Předchozí fotografie"
            disabled={currentIndex === 0}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 rounded-full w-11 h-11 flex items-center justify-center shadow disabled:opacity-30 disabled:cursor-not-allowed focus-ring"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(currentIndex + 1, images.length - 1))}
            aria-label="Další fotografie"
            disabled={currentIndex === images.length - 1}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 rounded-full w-11 h-11 flex items-center justify-center shadow disabled:opacity-30 disabled:cursor-not-allowed focus-ring"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </>
      )}

      <SlideDots
        count={images.length}
        current={currentIndex}
        onSelect={scrollToIndex}
        label="Snímky"
        slideLabel={(index, total) => `Snímek ${index} z ${total}`}
        className="mt-3"
      />
    </div>
  );
}

export default function Fleet() {
  const { locale, texts, vehicles } = useContent();

  return (
    <section
      id="fleet"
      className="section bg-gradient-to-b from-gray-200 to-white py-20 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-32"
    >
      <SectionHeading
        title={texts.fleet.title}
        description={texts.fleet.description}
        className="mb-12"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center max-w-6xl mx-auto">
        {vehicles.map((vehicle) => (
          <article
            key={vehicle.id}
            className="flex flex-col items-center bg-white rounded-2xl p-4 shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
          >
            <VehicleCarousel images={vehicle.images} vehicleName={vehicle.name[locale]} />
            <h3 className="mt-4 text-gray-900 font-bold text-center">
              {vehicle.name[locale]}
            </h3>
            {vehicle.features.length > 0 && (
              <ul className="flex flex-wrap justify-center items-center gap-2 mt-3">
                {vehicle.features.map((feature) => {
                  const Icon = FEATURE_ICONS[feature];
                  if (!Icon) return null;
                  const label = texts.fleet.features[feature];
                  return (
                    <li key={feature}>
                      <span title={label} aria-label={label} className="inline-block">
                        <Icon className="w-5 h-5 text-gray-700" aria-hidden="true" />
                      </span>
                    </li>
                  );
                })}
              </ul>
            )}
            <p className="mt-3 text-gray-700 text-center">
              <RichText text={vehicle.description[locale]} />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
