"use client";

import { useTranslation } from "../components/TranslationProvider";
import Image from "next/image";
import { Clock, Mail, MapPinHouse, Phone } from "lucide-react";

export default function ContactSection() {
  const { t } = useTranslation();
  const phone = t("contact.phone");
  const phoneHref = `tel:${phone.replace(/\s+/g, "")}`;
  const email = t("contact.email");
  const subject = encodeURIComponent(t("contact.mailSubject"));
  const mailHref = `mailto:${email}?subject=${subject}`;
  const addressLine1 = t("contact.addressLine1");
  const addressLine2 = t("contact.addressLine2");
  const mapHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${addressLine1}, ${addressLine2}`
  )}`;
  const year = new Date().getFullYear();

  return (
    <>
      <section
        id="contact-content"
        className="bg-gray-100 py-16 px-4 sm:px-8 md:px-16 lg:px-32 relative bg-cover bg-center md:bg-fixed"
        style={{
          backgroundImage: "url('/pics/footer-map.jpg')",
        }}
      >
        <div className="max-w-4xl mx-auto text-center bg-white/90 p-8 rounded-3xl shadow-lg">
          <h2 className="text-4xl font-bold text-gray-800 mb-5">
            {t("contact.title")}
          </h2>
          <p className="text-base md:text-lg text-gray-700 mb-12 max-w-prose mx-auto">
            {t("contact.description")}
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start justify-items-center text-center md:text-left">
            <address className="not-italic max-w-xs space-y-4">
              <p className="text-gray-700 flex items-start">
                <span className="text-gray-600 w-6 h-6 mr-2 mt-0.5 flex-shrink-0">
                  <MapPinHouse aria-hidden="true" />
                </span>
                <span>
                  <span className="font-bold mr-2">
                    {t("contact.addressLabel")}:
                  </span>
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-700 underline hover:text-blue-900"
                  >
                    {addressLine1}
                    <br />
                    {addressLine2}
                  </a>
                  <span className="block text-xs text-gray-500 mt-0.5">
                    {t("contact.mapLabel")}
                  </span>
                </span>
              </p>

              <p className="text-gray-700 flex items-start">
                <span className="text-gray-600 w-6 h-6 mr-2 mt-0.5 flex-shrink-0">
                  <Phone aria-hidden="true" />
                </span>
                <span>
                  <span className="font-bold mr-2">
                    {t("contact.phoneLabel")}:
                  </span>
                  <a
                    href={phoneHref}
                    className="text-blue-700 underline hover:text-blue-900"
                  >
                    {phone}
                  </a>
                </span>
              </p>

              <p className="text-gray-700 flex items-start">
                <span className="text-gray-600 w-6 h-6 mr-2 mt-0.5 flex-shrink-0">
                  <Mail aria-hidden="true" />
                </span>
                <span>
                  <span className="font-bold mr-2">
                    {t("contact.emailLabel")}:
                  </span>
                  <a
                    href={mailHref}
                    className="text-blue-700 underline hover:text-blue-900 break-all"
                  >
                    {email}
                  </a>
                </span>
              </p>

              <p className="text-gray-700 flex items-start">
                <span className="text-gray-600 w-6 h-6 mr-2 mt-0.5 flex-shrink-0">
                  <Clock aria-hidden="true" />
                </span>
                <span>
                  <span className="font-bold mr-2">
                    {t("contact.hoursLabel")}:
                  </span>
                  {t("contact.hours")}
                </span>
              </p>
            </address>

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

          <div className="mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-md hover:bg-yellow-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 min-h-[44px]"
            >
              <Phone size={18} aria-hidden="true" />
              {t("contact.callCta")}
            </a>
            <a
              href={mailHref}
              className="inline-flex items-center justify-center gap-2 bg-gray-800 text-white font-semibold px-6 py-3 rounded-md hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 min-h-[44px]"
            >
              <Mail size={18} aria-hidden="true" />
              {t("contact.emailLabel")}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-800 py-4">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-white text-sm">
            {t("contact.footerNote", { year })}
          </p>
        </div>
      </footer>
    </>
  );
}
