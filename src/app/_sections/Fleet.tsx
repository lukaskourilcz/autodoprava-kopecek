"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useContent } from "@/content/useContent";
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
    const slideWidth = track.children[0]?.clientWidth || track.clientWidth;
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
      const slideWidth = track.children[0]?.clientWidth || track.clientWidth;
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
        className="flex snap-x snap-mandatory overflow-x-scroll scroll-smooth scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className="relative aspect-[4/3] w-full flex-shrink-0 snap-center border-[1.5px] border-jetstream bg-stratosphere"
          >
            <Image
              src={src}
              alt={`${vehicleName} – fotografie ${index + 1}`}
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              loading={index === 0 ? "eager" : "lazy"}
              unoptimized={!isLocalImage(src)}
              className="object-cover"
            />
          </div>
        ))}
      </div>

      {images.length > 1 && (
        <>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.max(currentIndex - 1, 0))}
            aria-label="Předchozí fotografie"
            disabled={currentIndex === 0}
            className="absolute left-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-cloud text-onyx disabled:opacity-0 focus-ring"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(currentIndex + 1, images.length - 1))}
            aria-label="Další fotografie"
            disabled={currentIndex === images.length - 1}
            className="absolute right-0 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center bg-cloud text-onyx disabled:opacity-0 focus-ring"
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
        className="mt-4 justify-start gap-1"
      />
    </div>
  );
}

export default function Fleet() {
  const { locale, texts, vehicles } = useContent();

  return (
    <section
      id="fleet"
      className="section bg-cloud py-[70px] px-[40px] max-[640px]:px-5"
    >
      <SectionHeading title={texts.fleet.title} description={texts.fleet.description} />

      <div className="grid grid-cols-1 gap-x-12 gap-y-[70px] md:grid-cols-2">
        {vehicles.map((vehicle) => (
          <article key={vehicle.id} className="flex flex-col">
            <VehicleCarousel images={vehicle.images} vehicleName={vehicle.name[locale]} />

            <h3 className="mt-7 font-display text-[28px] font-semibold tracking-display text-onyx">
              {vehicle.name[locale]}
            </h3>

            {vehicle.features.length > 0 && (
              <p className="mt-4 text-[14px] uppercase tracking-[0.04em] text-onyx/55">
                {vehicle.features.map((feature) => texts.fleet.features[feature]).join(" · ")}
              </p>
            )}

            <p className="mt-4 text-[18px] leading-[1.3] tracking-body text-onyx/80">
              <RichText text={vehicle.description[locale]} />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
