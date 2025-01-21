"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";

export default function Kontakt() {
  const { t } = useTranslation();

  return (
    <section
      id="kontakt"
      className="bg-gray-100 py-16 px-4 sm:px-8 md:px-16 lg:px-32 relative"
      style={{
        backgroundImage: "url('/pics/footer-map.png')",
        backgroundSize: "cover",
        backgroundPosition: "fixed",
        opacity: "1",
      }}
    >
      <div className="max-w-4xl mx-auto text-center bg-white bg-opacity-75 p-8 rounded-lg">
        <h2 className="text-4xl font-bold text-gray-800 mb-8">
          {t("contact.title")}
        </h2>
        <p className="text-lg text-gray-700 mb-12">{t("contact.description")}</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:text-left sm:text-center items-center">
          {/* Contact Details */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              {t("")}
            </h3>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">{t("contact.addressLabel")}:</span> {t("contact.address")}
            </p>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">{t("contact.phoneLabel")}:</span> {t("contact.phone")}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">{t("contact.emailLabel")}:</span>{" "}
              <a
                href={`mailto:${t("contact.email")}`}
                className="text-blue-600 underline"
              >
                {t("contact.email")}
              </a>
            </p>
          </div>

          {/* Billing Information */}
          <div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {t("contact.billingTitle")}
            </h3>
            <p className="text-gray-700 mb-2">
              <span className="font-bold">{t("contact.companyIDLabel")}:</span> {t("contact.companyID")}
            </p>
            <p className="text-gray-700">
              <span className="font-bold">{t("contact.taxIDLabel")}:</span> {t("contact.taxID")}
            </p>
          </div>

          {/* Logo */}
          <div className="flex justify-center items-center">
            <Image
              src="/pics/logo-black-footer.png"
              alt={t("contact.logoAlt")}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
