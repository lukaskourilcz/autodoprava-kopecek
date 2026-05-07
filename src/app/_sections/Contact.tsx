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
        className="relative bg-cover bg-center md:bg-fixed py-20 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-32"
        style={{
          backgroundImage: "url('/pics/footer-map.jpg')",
        }}
      >
        <div
          className="absolute inset-0 bg-gray-900/40"
          aria-hidden="true"
        />
        <div className="relative max-w-4xl mx-auto bg-white/95 backdrop-blur-sm p-6 sm:p-10 rounded-2xl shadow-xl ring-1 ring-black/5">
          <div className="text-center mb-10">
            <span className="section-accent mx-auto" aria-hidden="true" />
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-4">
              {t("contact.title")}
            </h2>
            <p className="text-base md:text-lg text-gray-600 max-w-prose mx-auto">
              {t("contact.description")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <address className="not-italic space-y-5">
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-50 ring-1 ring-yellow-200 text-yellow-600 flex items-center justify-center">
                  <MapPinHouse className="w-5 h-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {t("contact.addressLabel")}
                  </span>
                  <span className="block group-hover:underline">
                    {addressLine1}, {addressLine2}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5">
                    {t("contact.mapLabel")} →
                  </span>
                </span>
              </a>

              <a
                href={phoneHref}
                className="group flex items-start gap-3 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-50 ring-1 ring-yellow-200 text-yellow-600 flex items-center justify-center">
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {t("contact.phoneLabel")}
                  </span>
                  <span className="block font-medium group-hover:underline">
                    {phone}
                  </span>
                </span>
              </a>

              <a
                href={mailHref}
                className="group flex items-start gap-3 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-50 ring-1 ring-yellow-200 text-yellow-600 flex items-center justify-center">
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {t("contact.emailLabel")}
                  </span>
                  <span className="block font-medium group-hover:underline break-all">
                    {email}
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-3 text-gray-700">
                <span className="flex-shrink-0 w-10 h-10 rounded-lg bg-yellow-50 ring-1 ring-yellow-200 text-yellow-600 flex items-center justify-center">
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </span>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {t("contact.hoursLabel")}
                  </span>
                  <span className="block">{t("contact.hours")}</span>
                </span>
              </div>
            </address>

            <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-10">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                {t("contact.billingTitle")}
              </h3>
              <dl className="space-y-2 text-gray-700">
                <div className="flex gap-2">
                  <dt className="font-semibold text-gray-900">
                    {t("contact.companyIDLabel")}:
                  </dt>
                  <dd>{t("contact.companyID")}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold text-gray-900">
                    {t("contact.taxIDLabel")}:
                  </dt>
                  <dd>{t("contact.taxID")}</dd>
                </div>
              </dl>
              <div className="mt-6 flex justify-start">
                <Image
                  src="/pics/logo-black-footer.png"
                  alt={t("contact.logoAlt")}
                  width={160}
                  height={160}
                  className="object-contain w-32 h-auto"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={phoneHref}
              className="inline-flex items-center justify-center gap-2 bg-yellow-500 text-gray-900 font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-yellow-400 hover:shadow-lg active:translate-y-px transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-500 min-h-[44px]"
            >
              <Phone size={18} aria-hidden="true" />
              {t("contact.callCta")}
            </a>
            <a
              href={mailHref}
              className="inline-flex items-center justify-center gap-2 bg-gray-900 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-gray-800 hover:shadow-lg active:translate-y-px transition-all focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-800 min-h-[44px]"
            >
              <Mail size={18} aria-hidden="true" />
              {t("contact.emailLabel")}
            </a>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-gray-400 text-sm">
            {t("contact.footerNote", { year })}
          </p>
        </div>
      </footer>
    </>
  );
}
