"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";
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

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: index * 350,
        behavior: "smooth",
      });
    }
  };

  const handleScroll = useCallback(() => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const containerWidth = containerRef.current.offsetWidth;
      const totalScrollWidth = containerRef.current.scrollWidth;

      const index = Math.round(
        (scrollLeft / (totalScrollWidth - containerWidth)) * (images.length - 1)
      );

      setCurrentIndex(index);
    }
  }, [images.length]);

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
    <div className="relative w-full">
      <div
        ref={containerRef}
        className="flex overflow-x-scroll scroll-smooth space-x-4 no-scrollbar"
        style={{ scrollSnapType: "x mandatory" }}
      >
        {images.map((img, index) => (
          <Image
            key={index}
            src={img}
            alt={`Carousel Image ${index + 1}`}
            width={350}
            height={350}
            className="rounded-[15%] flex-shrink-0"
            style={{ scrollSnapAlign: "center" }}
          />
        ))}
      </div>

      <div className="flex justify-center mt-4 space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => scrollToIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? "bg-blue-500" : "bg-gray-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default function Fleet() {
  const { t } = useTranslation();

  const vehicles = [
    {
      images: [
        "/pics/tourismo.png",
        "/pics/tourismo1.png",
        "/pics/tourismo2.png",
        "/pics/tourismo3.png",
        "/pics/tourismo4.png",
        "/pics/tourismo5.png",
        "/pics/tourismo6.png",
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
        "/pics/travego.png",
        "/pics/travego1.png",
        "/pics/travego2.png",
        "/pics/travego3.png",
        "/pics/travego4.png",
        "/pics/travego5.png",
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
        "/pics/setra.png",
        "/pics/setra1.png",
        "/pics/setra2.png",
        "/pics/setra3.png",
        "/pics/setra4.png",
      ],
      name: t("fleet.vehicles.name.setra"),
      description: t("fleet.vehicles.description.setra"),
      icons: ["BeltIcon", "ThermometerColdIcon", "TvSmartIcon", "Mic01Icon"],
    },
    {
      images: [
        "/pics/man.png",
        "/pics/man1.png",
        "/pics/man2.png",
        "/pics/man3.png",
        "/pics/man4.png",
      ],
      name: t("fleet.vehicles.name.man"),
      description: t("fleet.vehicles.description.man"),
      icons: [
        "AirplaneSeatIcon",
        "BeltIcon",
        "ThermometerColdIcon",
        "Mic01Icon",
        "FridgeIcon",
      ],
    },
    {
      images: ["/pics/tourino.png", "/pics/tourino2.png"],
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
        "/pics/karosa.png",
        "/pics/karosa1.png",
        "/pics/karosa2.png",
        "/pics/karosa3.png",
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
      images: ["/pics/fmax.png", "/pics/fmax1.png"],
      name: t("fleet.vehicles.name.fmax"),
      description: t("fleet.vehicles.description.fmax"),
    },
    {
      images: [
        "/pics/daf.png",
        "/pics/daf1.png",
        "/pics/daf2.png",
        "/pics/daf3.png",
      ],
      name: t("fleet.vehicles.name.daf"),
      description: t("fleet.vehicles.description.daf"),
    },
  ];

  return (
    <section
      id="vozovy-park"
      className="bg-gradient-to-b from-gray-100 to-white py-16 px-8 sm:px-16 lg:px-32"
    >
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold text-gray-800 mb-4">
          {t("fleet.title")}
        </h2>
        <p className="text-base text-gray-700">{t("fleet.description")}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {vehicles.map((vehicle, index) => (
          <div key={index} className="flex flex-col items-center">
            <Carousel images={vehicle.images} />
            <p className="mt-4 text-gray-700 font-bold text-center">
              {vehicle.name}
            </p>
            <div className="flex flex-wrap justify-center items-center gap-2 mt-3">
              {vehicle.icons?.map((iconKey, iconIndex) => {
                const IconComponent =
                  iconMappings[iconKey as keyof typeof iconMappings];
                return IconComponent ? (
                  <span
                    key={iconIndex}
                    title={t(`fleet.icons.${iconKey}`)}
                    className="inline-block"
                  >
                    <IconComponent className="w-5 h-5 text-gray-700" />
                  </span>
                ) : null;
              })}
            </div>
            <p
              className="mt-3 text-gray-700 text-center"
              dangerouslySetInnerHTML={{ __html: vehicle.description }}
            ></p>
          </div>
        ))}
      </div>
    </section>
  );
}
