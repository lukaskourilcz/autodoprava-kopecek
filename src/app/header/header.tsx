import { useTranslation } from "react-i18next";
import { useState, useEffect } from "react";

export default function Header() {
  const { t } = useTranslation();
  const images = [
    "/pics/uvodka.png",
    "/pics/uvodka2.png",
    "/pics/uvodka3.png",
    "/pics/uvodka4.png",
    "/pics/uvodka5.png",
  ];

  const [currentImage, setCurrentImage] = useState<number>(0);
  const [isFading, setIsFading] = useState<boolean>(false);

  useEffect(() => {
    const interval = setInterval(() => {
      handleNextImage();
    }, 5000); // Change image every 5 seconds

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
      className="h-screen bg-white bg-cover bg-center relative"
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
      <div
        className="w-5/6 absolute left-1/2 transform -translate-x-1/2 top-2/3 p-8 bg-white bg-opacity-80 rounded-lg shadow-lg text-center"
        style={{
          transform: "translate(-50%, -33.33%)",
        }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black mb-2 text-black">
          {t("home.subtitle")}
        </h1>
        <p className="text-sm md:text-base lg:text-lg">
          {t("home.description")}
        </p>
      </div>

      {/* Dots for manual navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
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
