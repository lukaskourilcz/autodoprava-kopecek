"use client";

import { useTranslation } from "react-i18next";
import Image from "next/image";
import { Mail, MapPinHouse, Phone } from "lucide-react";

export default function Contact() {
  const { t } = useTranslation();

  return (
    <>
      <section
        id="kontakt"
        className="bg-gray-100 py-16 px-4 sm:px-8 md:px-16 lg:px-32 relative"
        style={{
          backgroundImage: "url('/pics/footer-map.png')",
          backgroundSize: "cover",
          backgroundAttachment: "fixed",
          opacity: "1",
        }}
      >
        <div className="max-w-4xl mx-auto text-center bg-white bg-opacity-80 p-8 rounded-3xl shadow-lg">
          <h2 className="text-4xl font-bold text-gray-800 mb-5">
            {t("contact.title")}
          </h2>
          <p className="text-lg text-gray-700 mb-12">
            {t("contact.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-center justify-items-center text-center md:text-left">
            {/* Contact Details */}
            <div className="max-w-xs ml-4">
              <p className="text-gray-700 mb-4 flex items-center">
                <span className="text-gray-600 w-6 h-6 mx-2">
                  <MapPinHouse />
                </span>
                <span className="font-bold mr-4">
                  {t("contact.addressLabel")}:
                </span>{" "}
                <span
                  dangerouslySetInnerHTML={{
                    __html: t("contact.address"),
                  }}
                ></span>
              </p>
              <p className="text-gray-700 mb-4 flex items-center">
                <span className="text-gray-600 w-6 h-6 mx-2">
                  <Phone />
                </span>
                <span className="font-bold mr-4">
                  {t("contact.phoneLabel")}:
                </span>{" "}
                {t("contact.phone")}
              </p>
              <p className="text-gray-700 flex items-center">
                <span className="text-gray-600 w-6 h-6 mx-2">
                  <Mail />
                </span>
                <span className="font-bold mr-4">
                  {t("contact.emailLabel")}:
                </span>{" "}
                <a
                  href={`mailto:${t("contact.email")}`}
                  className="text-blue-600 underline"
                >
                  {t("contact.email")}
                </a>
              </p>
            </div>

            {/* Billing Information */}
            <div className="max-w-xs">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">
                {t("contact.billingTitle")}
              </h3>
              <p className="text-gray-700 mb-4">
                <span className="font-bold">
                  {t("contact.companyIDLabel")}:
                </span>{" "}
                {t("contact.companyID")}
              </p>
              <p className="text-gray-700">
                <span className="font-bold">{t("contact.taxIDLabel")}:</span>{" "}
                {t("contact.taxID")}
              </p>
            </div>

            {/* Logo */}
            <div className="flex justify-center items-center">
              <Image
                src="/pics/logo-black-footer.png"
                alt={t("contact.logoAlt")}
                width={200}
                height={200}
                className="object-contain"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 opacity-90 py-4">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-white text-sm">
            {t("", {
              name: "",
            })}
          </p>
        </div>
      </footer>
    </>
  );
}
