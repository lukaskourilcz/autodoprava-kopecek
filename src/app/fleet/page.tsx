"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Icons } from "../components/icons";
import { SafeText } from "../components/SafeText";
import { Vehicle } from "../../types";

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

interface CarouselProps {
  images: string[];
  vehicleName: string;
}

const Carousel = ({ images, vehicleName }: CarouselProps) => {
  const { t } = useTranslation();
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    if (containerRef.current) {
      const imageWidth = containerRef.current.children[0]?.clientWidth || 350;
      containerRef.current.scrollTo({
        left: index * imageWidth,
        behavior: "smooth",
      });
      setCurrentIndex(index);
    }
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + images.length) % images.length;
    scrollToIndex(newIndex);
  };

  const handleNext = () => {
    const newIndex = (currentIndex + 1) % images.length;
    scrollToIndex(newIndex);
  };

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const imageWidth = containerRef.current.children[0]?.clientWidth || 350;
      const index = Math.round(scrollLeft / imageWidth);
      setCurrentIndex(index);
    }
  }, []);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        handlePrev();
        break;
      case "ArrowRight":
        event.preventDefault();
        handleNext();
        break;
    }
  };

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener("scroll", handleScroll);
    }
    return () => {
      if (container) {
        container.removeEventListener("scroll", handleScroll);
      }
    };
  }, [handleScroll]);

  return (
    <div
      className="relative w-full"
      role="region"
      aria-roledescription="carousel"
      aria-label={`${vehicleName} gallery`}
      onKeyDown={handleKeyDown}
      tabIndex={0}
    >
      {images.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            className="absolute left-1 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label={t("accessibility.carouselPrevious")}
          >
            <ChevronLeft size={16} />
          </button>
          <button
            onClick={handleNext}
            className="absolute right-1 top-1/2 -translate-y-1/2 z-10 bg-black/30 hover:bg-black/50 text-white p-1 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400"
            aria-label={t("accessibility.carouselNext")}
          >
            <ChevronRight size={16} />
          </button>
        </>
      )}

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
            alt={`${vehicleName} - ${index + 1}/${images.length}`}
            width={350}
            height={350}
            className="rounded-[15%] flex-shrink-0 snap-center transition-opacity duration-300"
            style={{
              scrollSnapAlign: "center",
              opacity: index === currentIndex ? 1 : 0.5,
            }}
            loading={index === 0 ? "eager" : "lazy"}
            placeholder="blur"
            blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDABQODxIPDRQSEBIXFRQdHx4eHRoaHSQsJCgkLDY2NDAwNjZBPUA9QTY2QUE2NjZBQUFBQUFBQUFBQUFBQUFBQUH/2wBDABUXFx4aHR4eHUE2QTZBNUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUFBQUH/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAb/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBEQCEAwEPwAB/AD//2Q=="
          />
        ))}
      </div>

      {images.length > 1 && (
        <div
          className="flex justify-center mt-4 space-x-2"
          role="tablist"
          aria-label={`${vehicleName} - ${currentIndex + 1}/${images.length}`}
        >
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => scrollToIndex(index)}
              className={`w-2.5 h-2.5 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-1 ${
                currentIndex === index ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
              }`}
              role="tab"
              aria-selected={currentIndex === index}
              aria-label={t("accessibility.carouselDot", { number: index + 1 })}
              tabIndex={index === currentIndex ? 0 : -1}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default function Fleet() {
  const { t } = useTranslation();

  const vehicles: Vehicle[] = [
    {
      images: [
        "/pics/tourismo.webp",
        "/pics/tourismo1.webp",
        "/pics/tourismo2.webp",
        "/pics/tourismo3.webp",
        "/pics/tourismo4.webp",
        "/pics/tourismo5.webp",
        "/pics/tourismo6.webp",
      ],
      name: t("fleet.vehicles.name.tourismo"),
      description: t("fleet.vehicles.description.tourismo"),
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
      images: [
        "/pics/travego.webp",
        "/pics/travego1.webp",
        "/pics/travego2.webp",
        "/pics/travego3.webp",
        "/pics/travego4.webp",
        "/pics/travego5.webp",
      ],
      name: t("fleet.vehicles.name.travego"),
      description: t("fleet.vehicles.description.travego"),
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
      images: [
        "/pics/setra.webp",
        "/pics/setra1.webp",
        "/pics/setra2.webp",
        "/pics/setra3.webp",
        "/pics/setra4.webp",
      ],
      name: t("fleet.vehicles.name.setra"),
      description: t("fleet.vehicles.description.setra"),
      icons: ["BeltIcon", "ThermometerColdIcon", "TvSmartIcon", "Mic01Icon"],
    },
    {
      images: [
        "/pics/man.webp",
        "/pics/man1.webp",
        "/pics/man2.webp",
        "/pics/man3.webp",
        "/pics/man6.webp",
        "/pics/man4.webp",
        "/pics/man5.webp",
      ],
      name: t("fleet.vehicles.name.man"),
      description: t("fleet.vehicles.description.man"),
      icons: [
        "AirplaneSeatIcon",
        "BeltIcon",
        "ThermometerColdIcon",
        "TvSmartIcon",
      ],
    },
    {
      images: ["/pics/tourino.webp", "/pics/tourino2.webp"],
      name: t("fleet.vehicles.name.tourino"),
      description: t("fleet.vehicles.description.tourino"),
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
      images: [
        "/pics/karosa.webp",
        "/pics/karosa1.webp",
        "/pics/karosa2.webp",
        "/pics/karosa3.webp",
        "/pics/karosa4.webp",
      ],
      name: t("fleet.vehicles.name.karosa"),
      description: t("fleet.vehicles.description.karosa"),
      icons: [
        "AirplaneSeatIcon",
        "BeltIcon",
        "ThermometerColdIcon",
        "FridgeIcon",
      ],
    },
    {
      images: [
        "/pics/daf.webp",
        "/pics/daf1.webp",
        "/pics/daf2.webp",
        "/pics/daf3.webp",
      ],
      name: t("fleet.vehicles.name.daf"),
      description: t("fleet.vehicles.description.daf"),
    },
  ];

  return (
    <section
      id="vozovy-park"
      className="bg-gradient-to-b from-gray-100 to-white py-12 sm:py-16 px-4 sm:px-8 md:px-16 lg:px-32"
    >
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-800 mb-4">
          {t("fleet.title")}
        </h2>
        <p className="text-sm sm:text-base text-gray-700 max-w-2xl mx-auto">
          {t("fleet.description")}
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8 justify-center">
        {vehicles.map((vehicle) => (
          <article
            key={vehicle.name}
            className="flex flex-col items-center bg-white rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
          >
            <Carousel images={vehicle.images} vehicleName={vehicle.name} />
            <h3 className="mt-4 text-gray-700 font-bold text-center text-sm sm:text-base">
              {vehicle.name}
            </h3>
            <div
              className="flex flex-wrap justify-center items-center gap-2 mt-3"
              role="list"
              aria-label="Vehicle features"
            >
              {vehicle.icons?.map((iconKey) => {
                const IconComponent =
                  iconMappings[iconKey as keyof typeof iconMappings];
                return IconComponent ? (
                  <span
                    key={iconKey}
                    title={t(`fleet.icons.${iconKey}`)}
                    className="inline-block"
                    role="listitem"
                    aria-label={t(`fleet.icons.${iconKey}`)}
                  >
                    <IconComponent className="w-5 h-5 text-gray-700" aria-hidden="true" />
                  </span>
                ) : null;
              })}
            </div>
            <p className="mt-3 text-gray-700 text-center text-xs sm:text-sm">
              <SafeText text={vehicle.description} />
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
