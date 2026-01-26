"use client";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const CAROUSEL_INTERVAL = 8000;
const FADE_DURATION = 400;

export default function Header() {
  const { t } = useTranslation();
  const images = [
    "/pics/uvodka.webp",
    "/pics/uvodka1.webp",
    "/pics/uvodka2.webp",
    "/pics/uvodka3.webp",
    "/pics/uvodka4.webp",
    "/pics/uvodka5.webp",
    "/pics/uvodka6.webp",
    "/pics/uvodka7.webp",
    "/pics/uvodka8.webp",
  ];

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const goToImage = useCallback((index: number) => {
    if (index !== currentImage && !isFading) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImage(index);
        setIsFading(false);
      }, FADE_DURATION);
    }
  }, [currentImage, isFading]);

  const handleNextImage = useCallback(() => {
    if (!isFading) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev + 1) % images.length);
        setIsFading(false);
      }, FADE_DURATION);
    }
  }, [images.length, isFading]);

  const handlePrevImage = useCallback(() => {
    if (!isFading) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
        setIsFading(false);
      }, FADE_DURATION);
    }
  }, [images.length, isFading]);

  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(handleNextImage, CAROUSEL_INTERVAL);
    }
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [handleNextImage, isPaused]);

  const handleKeyDown = (event: React.KeyboardEvent) => {
    switch (event.key) {
      case "ArrowLeft":
        event.preventDefault();
        handlePrevImage();
        break;
      case "ArrowRight":
        event.preventDefault();
        handleNextImage();
        break;
      case " ":
        event.preventDefault();
        setIsPaused((prev) => !prev);
        break;
    }
  };

  return (
    <section
      id="uvod"
      className="relative bg-white bg-cover bg-center"
      style={{
        height: "calc(100vh - 60px)",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="region"
      aria-roledescription="carousel"
      aria-label={t("home.title")}
    >
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url('${images[currentImage]}')`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "100%",
        }}
        role="img"
        aria-label={`${t("home.title")} - ${currentImage + 1}/${images.length}`}
      />

      <button
        onClick={handlePrevImage}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 hidden sm:block"
        aria-label={t("accessibility.carouselPrevious")}
      >
        <ChevronLeft size={24} />
      </button>

      <button
        onClick={handleNextImage}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/30 hover:bg-black/50 text-white p-2 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-400 hidden sm:block"
        aria-label={t("accessibility.carouselNext")}
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute left-1/2 top-[67%] transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-3/4 lg:w-2/3 bg-white bg-opacity-75 backdrop-blur-sm rounded-[10px] shadow-xl text-center p-4 sm:p-6 border border-white border-opacity-30">
        <h1 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black tracking-wider text-gray-900 mb-2 sm:mb-3 drop-shadow-md">
          {t("home.subtitle")}
        </h1>
        <div className="my-2 w-4/5 mx-auto border-t-2 border-gray-500" />
        <p className="text-xs sm:text-sm md:text-base lg:text-lg text-gray-800 leading-relaxed tracking-wide drop-shadow-sm">
          {t("home.description")}
        </p>
      </div>

      <div
        className="absolute left-1/2 flex space-x-2 transform -translate-x-1/2 bottom-[2.5%]"
        role="tablist"
        aria-label={t("accessibility.currentSlide", { current: currentImage + 1, total: images.length })}
      >
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToImage(index)}
            className={`w-3 h-3 rounded-full transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 ${
              index === currentImage ? "bg-blue-500" : "bg-gray-300 hover:bg-gray-400"
            }`}
            role="tab"
            aria-selected={index === currentImage}
            aria-label={t("accessibility.carouselDot", { number: index + 1 })}
            tabIndex={index === currentImage ? 0 : -1}
          />
        ))}
      </div>

      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {t("accessibility.currentSlide", { current: currentImage + 1, total: images.length })}
      </div>
    </section>
  );
}
