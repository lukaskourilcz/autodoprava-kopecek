'use client'
import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

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

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 8000); // Change image every 8 seconds

    return () => clearInterval(interval);
  }, [currentImage]);

  const handleNextImage = () => {
    setIsFading(true); // Start fade-out
    setTimeout(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length); // Move to the next image
      setIsFading(false); // End fade-in
    }, 400); // Match fade duration
  };

  const handleDotClick = (index: number) => {
    if (index !== currentImage) {
      setIsFading(true); // Start fade-out
      setTimeout(() => {
        setCurrentImage(index); // Directly set the selected image
        setIsFading(false); // End fade-in
      }, 400); // Match fade duration
    }
  };

  return (
    <section
      id="uvod"
      className="h-[89vh] bg-white bg-cover bg-center relative"
    >
      {/* Background image */}
      <div
        className={`absolute inset-0 bg-cover bg-center transition-opacity duration-500 ease-in-out ${
          isFading ? "opacity-0" : "opacity-100"
        }`}
        style={{
          backgroundImage: `url('${images[currentImage]}')`,
        }}
      ></div>

{/* Content */}
<div className="absolute left-1/2 top-[70%] transform -translate-x-1/2 -translate-y-1/2 w-5/6 sm:w-3/4 lg:w-2/3 bg-white bg-opacity-75 backdrop-blur-sm rounded-[10px] shadow-xl text-center p-6 border border-white border-opacity-30">
  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider text-gray-900 mb-3 drop-shadow-md">
    {t("home.subtitle")}
  </h1>
  <div className="my-2 w-4/5 mx-auto border-t-2 border-gray-500"></div>
  <p className="text-sm sm:text-base lg:text-lg text-gray-800 leading-relaxed tracking-wide drop-shadow-sm">
    {t("home.description")}
  </p>
</div>

{/* Dots for manual navigation */}
<div
  className="absolute left-1/2 flex space-x-2 transform -translate-x-1/2"
  style={{
    bottom: '2.5%', // Positioning dots dynamically below the container
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
