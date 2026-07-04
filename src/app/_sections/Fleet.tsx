"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Users } from "lucide-react";
import { useContent } from "@/content/useContent";
import { interpolate } from "@/lib/format";
import { isLocalImage } from "@/lib/images";
import { FEATURE_ICONS } from "../components/icons";
import { SectionHeading } from "../components/ui/SectionHeading";
import { SlideDots } from "../components/ui/SlideDots";
import { RichText } from "../components/ui/RichText";
import { Reveal } from "../components/ui/Reveal";
import type { SiteTexts } from "@/content/types";

function VehicleCarousel({
  images,
  vehicleName,
  a11y,
}: {
  images: string[];
  vehicleName: string;
  a11y: SiteTexts["a11y"];
}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  const scrollFrameRef = useRef<number | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const child = track.children[index] as HTMLElement | undefined;
    if (!child) return;
    // Center the slide in the track (matches snap-center; clamped by the browser at the ends).
    const left = child.offsetLeft - (track.clientWidth - child.clientWidth) / 2;
    track.scrollTo({ left, behavior: "smooth" });
    setCurrentIndex(index);
  }, []);

  // Keep the active dot in sync while the user swipes, throttled to one update per frame.
  // The active slide is the one whose center is closest to the track's center.
  const handleScroll = useCallback(() => {
    if (scrollFrameRef.current !== null) return;
    scrollFrameRef.current = requestAnimationFrame(() => {
      scrollFrameRef.current = null;
      const track = trackRef.current;
      if (!track || track.clientWidth === 0) return;
      const center = track.scrollLeft + track.clientWidth / 2;
      let closest = 0;
      let closestDistance = Infinity;
      for (let i = 0; i < track.children.length; i++) {
        const child = track.children[i] as HTMLElement;
        const distance = Math.abs(child.offsetLeft + child.clientWidth / 2 - center);
        if (distance < closestDistance) {
          closestDistance = distance;
          closest = i;
        }
      }
      setCurrentIndex(closest);
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
    <div
      className="relative w-full overflow-hidden"
      aria-roledescription="carousel"
      aria-label={vehicleName}
    >
      <div
        ref={trackRef}
        className="flex gap-2 overflow-x-auto snap-x snap-mandatory scrollbar-hide"
        style={{ WebkitOverflowScrolling: "touch" }}
      >
        {images.map((src, index) => (
          <div
            key={`${src}-${index}`}
            className={`relative flex-shrink-0 snap-center aspect-[4/3] transition-opacity duration-300 ${
              images.length > 1 ? "w-[88%]" : "w-full"
            } ${index === currentIndex ? "opacity-100" : "opacity-50"}`}
          >
            <Image
              src={src}
              alt={`${vehicleName} – ${interpolate(a11y.photoOf, {
                current: index + 1,
                total: images.length,
              })}`}
              fill
              sizes="(max-width: 640px) 92vw, (max-width: 1024px) 46vw, 280px"
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
            aria-label={a11y.previousPhoto}
            disabled={currentIndex === 0}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-ink rounded-full w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-ring"
          >
            <ChevronLeft size={20} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollToIndex(Math.min(currentIndex + 1, images.length - 1))}
            aria-label={a11y.nextPhoto}
            disabled={currentIndex === images.length - 1}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-ink rounded-full w-10 h-10 flex items-center justify-center transition-colors disabled:opacity-30 disabled:cursor-not-allowed focus-ring"
          >
            <ChevronRight size={20} aria-hidden="true" />
          </button>

          <SlideDots
            count={images.length}
            current={currentIndex}
            onSelect={scrollToIndex}
            label={vehicleName}
            slideLabel={(index, total) =>
              interpolate(a11y.photoOf, { current: index, total })
            }
            className="absolute left-1/2 bottom-0 -translate-x-1/2"
          />
        </>
      )}
    </div>
  );
}

export default function Fleet() {
  const { locale, texts, vehicles } = useContent();

  return (
    <section id="fleet" className="section bg-white py-20 sm:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeading title={texts.fleet.title} description={texts.fleet.description} />
        </Reveal>

        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {vehicles.map((vehicle) => {
            const capacity = vehicle.capacity?.[locale];
            return (
            <Reveal key={vehicle.id} className="h-full">
              <article className="h-full flex flex-col bg-white rounded-xl border border-gray-200 overflow-hidden">
                <div className="relative">
                  <VehicleCarousel
                    images={vehicle.images}
                    vehicleName={vehicle.name[locale]}
                    a11y={texts.a11y}
                  />
                  {capacity && (
                    <span className="absolute top-2.5 left-2.5 z-10 inline-flex items-center gap-1.5 rounded-full bg-ink/80 backdrop-blur-sm px-2.5 py-1 text-xs font-semibold text-white pointer-events-none">
                      <Users className="w-3.5 h-3.5" aria-hidden="true" />
                      {capacity}
                    </span>
                  )}
                </div>
                <div className="p-4 sm:p-5 flex flex-col flex-1">
                  <h3 className="font-display text-lg font-semibold text-ink">
                    {vehicle.name[locale]}
                  </h3>
                  <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">
                    <RichText text={vehicle.description[locale]} />
                  </p>
                  {vehicle.features.length > 0 && (
                    <ul className="flex flex-wrap gap-1.5 mt-auto pt-3">
                      {vehicle.features.map((feature) => {
                        const Icon = FEATURE_ICONS[feature];
                        if (!Icon) return null;
                        const label = texts.fleet.features[feature];
                        return (
                          <li
                            key={feature}
                            className="inline-flex items-center gap-1 rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-700"
                          >
                            <Icon className="w-3 h-3" aria-hidden="true" />
                            {label}
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
              </article>
            </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
