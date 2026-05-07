"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation, RichText } from "../components/TranslationProvider";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Icons } from "../components/icons";

const iconMappings = {
  BeachIcon: Icons.BeachIcon,
  AirplaneSeatIcon: Icons.AirplaneSeatIcon,
  BeltIcon: Icons.BeltIcon,
  ThermometerColdIcon: Icons.ThermometerColdIcon,
  TvSmartIcon: Icons.TvSmartIcon,
  Mic01Icon: Icons.Mic01Icon,
  FridgeIcon: Icons.FridgeIcon,
  Toilet01Icon: Icons.Toilet01Icon,
} as const;

const Carousel = ({
  images,
  vehicleName,
}: {
  images: string[];
  vehicleName: string;
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const rafIdRef = useRef<number | null>(null);

  const scrollToIndex = useCallback((index: number) => {
    if (containerRef.current) {
      const imageWidth = containerRef.current.children[0]?.clientWidth || 350;
      containerRef.current.scrollTo({
        left: index * imageWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  }, []);

  const handleScroll = useCallback(() => {
    if (rafIdRef.current !== null) return;
    rafIdRef.current = requestAnimationFrame(() => {
      rafIdRef.current = null;
      if (containerRef.current) {
        const scrollLeft = containerRef.current.scrollLeft;
        const imageWidth = containerRef.current.children[0]?.clientWidth || 350;
        const index = Math.round(scrollLeft / imageWidth);
        setCurrentIndex(index);
      }
    });
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;
    container.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      container.removeEventListener("scroll", handleScroll);
      if (rafIdRef.current !== null) cancelAnimationFrame(rafIdRef.current);
    };
  }, [handleScroll]);

  const next = () => scrollToIndex(Math.min(currentIndex + 1, images.length - 1));
  const prev = () => scrollToIndex(Math.max(currentIndex - 1, 0));

  return (
    <div className="relative w-full" aria-roledescription="carousel" aria-label={vehicleName}>
      <div
        ref={containerRef}
        className="flex overflow-x-scroll scroll-smooth space-x-4 scrollbar-hide"
        style={{
          scrollSnapType: "x mandatory",
          WebkitOverflowScrolling: "touch",
        }}
      >
        {images.map((img, index) => (
          <Image
            key={img}
            src={img}
            alt={`${vehicleName} – fotografie ${index + 1}`}
            width={350}
            height={350}
            sizes="(max-width: 640px) 90vw, (max-width: 1024px) 45vw, 350px"
            loading={index === 0 ? "eager" : "lazy"}
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
            onClick={prev}
            aria-label="Předchozí fotografie"
            disabled={currentIndex === 0}
            className="absolute left-1 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 rounded-full w-11 h-11 flex items-center justify-center shadow disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
          >
            <ChevronLeft size={22} aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={next}
            aria-label="Další fotografie"
            disabled={currentIndex === images.length - 1}
            className="absolute right-1 top-1/2 -translate-y-1/2 bg-white/90 text-gray-800 rounded-full w-11 h-11 flex items-center justify-center shadow disabled:opacity-30 disabled:cursor-not-allowed focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
          >
            <ChevronRight size={22} aria-hidden="true" />
          </button>
        </>
      )}

      <div className="flex justify-center mt-3" role="tablist" aria-label="Snímky">
        {images.map((_, index) => (
          <button
            key={index}
            type="button"
            role="tab"
            aria-selected={currentIndex === index}
            aria-label={`Snímek ${index + 1} z ${images.length}`}
            onClick={() => scrollToIndex(index)}
            className="min-w-[44px] min-h-[44px] flex items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500"
          >
            <span
              className={`block w-2.5 h-2.5 rounded-full transition-colors ${
                currentIndex === index ? "bg-yellow-500" : "bg-gray-300"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
};

export default function FleetSection() {
  const { t } = useTranslation();

  const vehicles: Array<{
    id: string;
    images: string[];
    icons?: string[];
  }> = [
    {
      id: "tourismo",
      images: [
        "/pics/tourismo.jpg",
        "/pics/tourismo1.jpg",
        "/pics/tourismo2.jpg",
        "/pics/tourismo3.jpg",
        "/pics/tourismo4.jpg",
        "/pics/tourismo5.jpg",
        "/pics/tourismo6.jpg",
      ],
      icons: [
        "BeachIcon",
        "AirplaneSeatIcon",
        "BeltIcon",
        "ThermometerColdIcon",
        "TvSmartIcon",
        "Mic01Icon",
        "FridgeIcon",
        "Toilet01Icon",
      ],
    },
    {
      id: "travego",
      images: [
        "/pics/travego.jpg",
        "/pics/travego1.jpg",
        "/pics/travego2.jpg",
        "/pics/travego3.jpg",
        "/pics/travego4.jpg",
        "/pics/travego5.jpg",
      ],
      icons: [
        "BeachIcon",
        "AirplaneSeatIcon",
        "BeltIcon",
        "ThermometerColdIcon",
        "TvSmartIcon",
        "Mic01Icon",
        "FridgeIcon",
        "Toilet01Icon",
      ],
    },
    {
      id: "setra",
      images: [
        "/pics/setra.jpg",
        "/pics/setra1.jpg",
        "/pics/setra2.jpg",
        "/pics/setra3.jpg",
        "/pics/setra4.jpg",
      ],
      icons: ["BeltIcon", "ThermometerColdIcon", "TvSmartIcon", "Mic01Icon"],
    },
    {
      id: "man",
      images: [
        "/pics/man.jpg",
        "/pics/man1.jpg",
        "/pics/man2.jpg",
        "/pics/man3.jpg",
        "/pics/man6.jpg",
        "/pics/man4.jpg",
        "/pics/man5.jpg",
      ],
      icons: [
        "AirplaneSeatIcon",
        "BeltIcon",
        "ThermometerColdIcon",
        "TvSmartIcon",
      ],
    },
    {
      id: "tourino",
      images: ["/pics/tourino.jpg", "/pics/tourino2.jpg"],
      icons: [
        "AirplaneSeatIcon",
        "BeltIcon",
        "ThermometerColdIcon",
        "TvSmartIcon",
        "Mic01Icon",
        "FridgeIcon",
      ],
    },
    {
      id: "karosa",
      images: [
        "/pics/karosa.jpg",
        "/pics/karosa1.jpg",
        "/pics/karosa2.jpg",
        "/pics/karosa3.jpg",
        "/pics/karosa4.jpg",
      ],
      icons: [
        "AirplaneSeatIcon",
        "BeltIcon",
        "ThermometerColdIcon",
        "FridgeIcon",
      ],
    },
    {
      id: "daf",
      images: [
        "/pics/daf.jpg",
        "/pics/daf1.jpg",
        "/pics/daf2.jpg",
        "/pics/daf3.jpg",
      ],
    },
  ];

  return (
    <section
      id="fleet-content"
      className="bg-gradient-to-b from-gray-100 to-white py-16 px-8 sm:px-16 lg:px-32"
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          {t("fleet.title")}
        </h2>
        <p className="text-base text-gray-700 max-w-prose mx-auto">
          {t("fleet.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 justify-center">
        {vehicles.map((vehicle) => {
          const name = t(`fleet.vehicles.name.${vehicle.id}`);
          return (
            <article key={vehicle.id} className="flex flex-col items-center">
              <Carousel images={vehicle.images} vehicleName={name} />
              <h3 className="mt-4 text-gray-700 font-bold text-center">
                {name}
              </h3>
              {vehicle.icons && vehicle.icons.length > 0 && (
                <ul className="flex flex-wrap justify-center items-center gap-2 mt-3">
                  {vehicle.icons.map((iconKey) => {
                    const IconComponent =
                      iconMappings[iconKey as keyof typeof iconMappings];
                    if (!IconComponent) return null;
                    const label = t(`fleet.icons.${iconKey}`);
                    return (
                      <li key={iconKey}>
                        <span
                          title={label}
                          aria-label={label}
                          className="inline-block"
                        >
                          <IconComponent
                            className="w-5 h-5 text-gray-700"
                            aria-hidden="true"
                          />
                        </span>
                      </li>
                    );
                  })}
                </ul>
              )}
              <p className="mt-3 text-gray-700 text-center">
                <RichText text={t(`fleet.vehicles.description.${vehicle.id}`)} />
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
