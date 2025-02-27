"use client";
import { useTranslation } from "react-i18next";
import { useState, useEffect, useCallback } from "react";

export default function Header() {
  const { t } = useTranslation();
  const images = [
    "/pics/uvodka.png",
    "/pics/uvodka1.png",
    "/pics/uvodka2.png",
    "/pics/uvodka3.png",
    "/pics/uvodka4.png",
    "/pics/uvodka5.png",
    "/pics/uvodka6.png",
    "/pics/uvodka7.png",
  ];

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  const handleNextImage = useCallback(() => {
    setIsFading(true);
    setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length);
      setIsFading(false);
    }, 400);
  }, [images.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 8000);

    return () => clearInterval(interval);
  }, [handleNextImage]);

  const handleDotClick = (index: number) => {
    if (index !== currentImage) {
      setIsFading(true);
      setTimeout(() => {
        setCurrentImage(index);
        setIsFading(false);
      }, 400);
    }
  };

  return (
    <section
    id="uvod"
    className="relative bg-white bg-cover bg-center"
    style={{
      height: "calc(100vh - 60px)",
    }}
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
    ></div>
  
    <div className="absolute left-1/2 top-[67%] transform -translate-x-1/2 -translate-y-1/2 w-[90%] sm:w-3/4 lg:w-2/3 bg-white bg-opacity-75 backdrop-blur-sm rounded-[10px] shadow-xl text-center p-6 border border-white border-opacity-30">
      <h1 className="text-xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-wider text-gray-900 mb-3 drop-shadow-md">
        {t("home.subtitle")}
      </h1>
      <div className="my-2 w-4/5 mx-auto border-t-2 border-gray-500"></div>
      <p className="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed tracking-wide drop-shadow-sm">
        {t("home.description")}
      </p>
    </div>
  
    <div
      className="absolute left-1/2 flex space-x-2 transform -translate-x-1/2"
      style={{
        bottom: "2.5%",
      }}
    >
      {images.map((_, index) => (
        <button
          key={index}
          onClick={() => handleDotClick(index)}
          className={`w-3 h-3 rounded-full transition-colors duration-300 ${
            index === currentImage ? "bg-blue-500" : "bg-gray-300"
          }`}
        ></button>
      ))}
    </div>
  </section>
  

  );
}
