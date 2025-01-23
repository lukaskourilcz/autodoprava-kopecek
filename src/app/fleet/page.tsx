"use client";

import { useState, useRef, useEffect } from "react";
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

  const handleScroll = () => {
    if (containerRef.current) {
      const scrollLeft = containerRef.current.scrollLeft;
      const containerWidth = containerRef.current.offsetWidth;
      const totalScrollWidth = containerRef.current.scrollWidth;

      const index = Math.round(
        (scrollLeft / (totalScrollWidth - containerWidth)) * (images.length - 1)
      );

      setCurrentIndex(index);
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
  }, []);

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

export default function Fleet() {
  const { t } = useTranslation();


  const BeltIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
      <path d="M8.9751 17.9655C12.4619 17.5232 16 16.3318 16 12C16 7.66817 12.4619 6.47683 8.9751 6.0345C6.62063 5.73582 6 7.41975 6 9.41154V14.5885C6 16.5803 6.62063 18.2642 8.9751 17.9655Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M2 7.5H6M2 16.5H6M14 7.5H22M14 16.5L22 16.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M5 12H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M19.9998 12H20.0088" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const ThermometerColdIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
      <path d="M17.5 22C19.7091 22 21.5 20.2091 21.5 18C21.5 16.9335 21.0827 15.9646 20.4024 15.2475C19.8957 14.7134 19.6423 14.4463 19.5712 14.2679C19.5 14.0895 19.5 13.8535 19.5 13.3815V4C19.5 2.89543 18.6046 2 17.5 2C16.3954 2 15.5 2.89543 15.5 4V13.3815C15.5 13.8535 15.5 14.0895 15.4288 14.2679C15.3577 14.4463 15.1043 14.7134 14.5976 15.2475C13.9173 15.9646 13.5 16.9335 13.5 18C13.5 20.2091 15.2909 22 17.5 22Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M9.04545 5V8.65625M9.04545 8.65625V14.3438M9.04545 8.65625L11.0909 6.625M9.04545 8.65625L7 6.625M9.04545 14.3438L9.04546 18M9.04545 14.3438L7 16.375M9.04545 14.3438L11.0909 16.375M4.13636 9.46875L6.18182 11.5M6.18182 11.5L4.13636 13.5312M6.18182 11.5H11.5M6.18182 11.5H2.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const Toilet01Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
      <path d="M8 11H17.1351C18.6001 11 19.3326 11 19.7749 11.7353C20.2172 12.4706 19.9567 12.9393 19.4357 13.8769C18.4017 15.738 16.3955 17 14.0901 17C12.5456 17 11.1353 16.4335 10.0618 15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 11V4C8 3.05719 8 2.58579 7.70711 2.29289C7.41421 2 6.94281 2 6 2C5.05719 2 4.58579 2 4.29289 2.29289C4 2.58579 4 3.05719 4 4V11C4 11.9428 4 12.4142 4.29289 12.7071C4.58579 13 5.05719 13 6 13C6.94281 13 7.41421 13 7.70711 12.7071C8 12.4142 8 11.9428 8 11Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M7 7L10 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 17C15 18 16 21 17.9996 22H4C5 21 6.7 17.8 5.5 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const Mic01Icon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
      <path d="M17 7V11C17 13.7614 14.7614 16 12 16C9.23858 16 7 13.7614 7 11V7C7 4.23858 9.23858 2 12 2C14.7614 2 17 4.23858 17 7Z" stroke="currentColor" strokeWidth="1.5" />
      <path d="M17 7H14M17 11H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M20 11C20 15.4183 16.4183 19 12 19M12 19C7.58172 19 4 15.4183 4 11M12 19V22M12 22H15M12 22H9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  const AirplaneSeatIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
      <path d="M8.48169 18H17.9722C19.0921 18 20 17.1077 20 16.0071C20 14.5 17.9722 14.0141 17.9722 14.0141C17.9722 14.0141 14.2844 12.5964 10 14C10 14 9.86099 8.87274 7.70985 3.17067C7.28543 2.04566 5.90119 1.66155 4.88539 2.3271C4.21507 2.7663 3.8807 3.55966 4.0387 4.33605L6.49327 16.3979C6.68283 17.3295 7.51507 18 8.48169 18Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.5 10.5H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M16 18L13 22M13 22H8M13 22H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const FridgeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
      <path d="M12 2C15.7712 2 17.6569 2 18.8284 3.17157C20 4.34315 20 6.22876 20 10V14C20 17.7712 20 19.6569 18.8284 20.8284C17.6569 22 15.7712 22 12 22C8.22876 22 6.34315 22 5.17157 20.8284C4 19.6569 4 17.7712 4 14L4 10C4 6.22876 4 4.34315 5.17157 3.17157C6.34315 2 8.22876 2 12 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M4 10H20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M8 6H8.00898" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M8 17L8 14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );

  const BeachIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
      <path d="M2 15.7501C2 15.7501 3.79534 15 7 15C12 15 16 18 22 18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 21H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12.594 3.22761C9.74838 4.04368 7.89871 6.85224 8.0043 9.87504C8.02623 10.5029 8.03719 10.8168 8.30546 10.9556C8.57373 11.0944 8.85218 10.8977 9.40908 10.5041L10.6506 9.6268C10.8371 9.49503 11.0585 9.43155 11.2815 9.44587L14.1977 9.63321L16.6357 7.91042C16.8222 7.77865 17.0435 7.71517 17.2666 7.7295L18.7879 7.82723C19.4407 7.86916 19.7671 7.89013 19.9291 7.63883C20.0912 7.38753 19.9594 7.11583 19.6959 6.57242C18.3856 3.86989 15.4553 2.40707 12.594 3.22761Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14.5 9.5L16.5 17M12.2857 3L12 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

  const TvSmartIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={24} height={24} color={"#000000"} fill={"none"} {...props}>
      <path d="M14 3H10C6.22876 3 4.34315 3 3.17157 4.17157C2 5.34315 2 7.22876 2 11C2 14.7712 2 16.6569 3.17157 17.8284C4.34315 19 6.22876 19 10 19H14C17.7712 19 19.6569 19 20.8284 17.8284C22 16.6569 22 14.7712 22 11C22 7.22876 22 5.34315 20.8284 4.17157C19.6569 3 17.7712 3 14 3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M16.9 15.5C16.9 14.6163 17.6163 13.9 18.5 13.9M13.7 15.5C13.7 12.849 15.849 10.7 18.5 10.7M10.5 15.5C10.5 11.0817 14.0817 7.5 18.5 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      <path d="M18 19L19 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M6 19L5 21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );

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
      icons: [BeachIcon, AirplaneSeatIcon, BeltIcon, ThermometerColdIcon, TvSmartIcon, Mic01Icon, FridgeIcon, Toilet01Icon],
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
      icons: [BeachIcon, AirplaneSeatIcon, BeltIcon, ThermometerColdIcon, TvSmartIcon, Mic01Icon, FridgeIcon, Toilet01Icon],
    },
    {
      images: ["/pics/tourino.png", "/pics/tourino2.png"],
      name: t("fleet.vehicles.name.tourino"),
      description: t("fleet.vehicles.description.tourino"),
      icons: [AirplaneSeatIcon, BeltIcon, ThermometerColdIcon, TvSmartIcon, Mic01Icon, FridgeIcon],
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
      icons: [AirplaneSeatIcon, BeltIcon, ThermometerColdIcon, Mic01Icon, FridgeIcon],
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
      icons: [BeltIcon, ThermometerColdIcon, TvSmartIcon, Mic01Icon],
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
      icons: [AirplaneSeatIcon, BeltIcon, ThermometerColdIcon, FridgeIcon],
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
    <section id="vozovy-park" className="bg-gradient-to-b from-gray-100 to-white py-16 px-8 sm:px-16 lg:px-32">
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
        {vehicle.icons?.map((Icon, iconIndex) => (
          <Icon key={iconIndex} className="w-5 h-5 text-gray-700" />
        ))}
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