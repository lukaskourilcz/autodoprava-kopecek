import { useTranslation } from "react-i18next";

export default function Header() {
  const { t } = useTranslation();

  return (
    <section
      id="uvod"
      className="h-screen bg-white bg-cover bg-center relative"
    >
      {/* Background overlay */}
      <div
        role="img"
        aria-label={t("home.heroImageAlt", "Hero background image")}
        className="absolute inset-0 bg-black opacity-80 bg-cover bg-center"
        style={{
          backgroundImage: "url('/pics/uvodka.png')",
        }}
      ></div>
      {/* Content */}
      <div
        className="w-5/6 absolute left-1/2 transform -translate-x-1/2 top-2/3 p-8 bg-white bg-opacity-70 rounded-lg shadow-lg text-center"
        style={{
          transform: "translate(-50%, -33.33%)",
        }}
      >
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4">
          {t("home.subtitle")}
        </h1>
        <p className="text-sm sm:text-base lg:text-lg">
          {t("home.description")}
        </p>
      </div>
    </section>
  );
}
