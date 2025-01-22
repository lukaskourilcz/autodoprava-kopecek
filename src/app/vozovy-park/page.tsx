"use client";

import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import Image from "next/image";

const Carousel = ({ images }: { images: string[] }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scrollToIndex = (index: number) => {
    setCurrentIndex(index);
    if (containerRef.current) {
      containerRef.current.scrollTo({
        left: index * 350, // Assuming each image width is 350px
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="relative w-full">
      {/* Image Container */}
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

      {/* Navigation Dots */}
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

export default function VozovyPark() {
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
      name: "Mercedes-Benz Tourismo",
      description:
        "Luxusní klimatizovaný autobus s TV a lednicí, kapacita 51 osob.",
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
      name: "Mercedes-Benz Travego",
      description: "Moderní autobus s kapacitou 62 osob.",
    },
    {
      images: [
        "/pics/setra.png",
        "/pics/setra1.png",
        "/pics/setra2.png",
        "/pics/setra3.png",
        "/pics/setra4.png",
      ],
      name: "Setra Multiclass",
      description: "Moderní autobus s kapacitou 67 osob.",
    },
    {
      images: [
        "/pics/man.png",
        "/pics/man1.png",
        "/pics/man2.png",
        "/pics/man3.png",
        "/pics/man4.png",
      ],
      name: "MAN Lion's Regio",
      description: "Kompaktní autobus pro skupiny do 57 osob.",
    },
    {
      images: [
        "/pics/karosa.png",
        "/pics/karosa1.png",
        "/pics/karosa2.png",
        "/pics/karosa3.png",
      ],
      name: "Karosa Axer",
      description: "Ideální autobus pro výlety po tuzemsku, kapacita 59 osob.",
    },
    {
      images: ["/pics/tourino.png", "/pics/tourino2.png"],
      name: "Mercedes-Benz Tourino",
      description: "Stylový autobus s veškerým komfortem pro 36 osob.",
    },
    {
      images: ["/pics/fmax.png", "/pics/fmax1.png", "/pics/fmax2.png"],
      name: "Ford F-Max + 13.6m návěs",
      description: "Nákladní vůz pro velkoobjemový transport.",
    },
    {
      images: [
        "/pics/daf.png",
        "/pics/daf1.png",
        "/pics/daf2.png",
        "/pics/daf3.png",
      ],
      name: "DAF XF 510 FT",
      description: "Nákladní vůz pro velkoobjemový transport.",
    },
  ];

  return (
    <section id="vozovy-park" className="bg-white py-16 px-8 sm:px-16 lg:px-32">
      <div className="text-center mb-8">
        <h2 className="text-4xl font-semibold text-red-600 mb-4">
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
            <p className="mt-4 text-gray-700 text-center">
              {vehicle.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
