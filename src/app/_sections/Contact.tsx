"use client";

import Image from "next/image";
import { Clock, Mail, MapPinHouse, Phone } from "lucide-react";
import { useContent } from "@/content/useContent";
import { telHref, mailtoHref, mapsSearchHref } from "@/lib/contactLinks";
import { interpolate } from "@/lib/format";
import { SectionHeading } from "../components/ui/SectionHeading";
import { IconBadge } from "../components/ui/IconBadge";
import { Button } from "../components/ui/Button";

export default function Contact() {
  const { contact } = useContent().texts;

  const phoneLink = telHref(contact.phone);
  const mailLink = mailtoHref(contact.email, contact.mailSubject);
  const mapLink = mapsSearchHref(`${contact.addressLine1}, ${contact.addressLine2}`);
  const year = new Date().getFullYear();

  return (
    <>
      <section
        id="contact"
        className="section relative bg-cover bg-center py-12 sm:py-16 px-4 sm:px-8 md:px-16 lg:px-32"
        style={{ backgroundImage: "url('/pics/footer-map.jpg')" }}
      >
        <div className="absolute inset-0 bg-gray-900/40" aria-hidden="true" />
        <div className="relative max-w-4xl mx-auto bg-white/95 backdrop-blur-sm p-5 sm:p-8 rounded-2xl shadow-xl ring-1 ring-black/5">
          <SectionHeading title={contact.title} description={contact.description} className="mb-6" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">
            <address className="not-italic space-y-4">
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-start gap-3 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <IconBadge>
                  <MapPinHouse className="w-5 h-5" aria-hidden="true" />
                </IconBadge>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {contact.addressLabel}
                  </span>
                  <span className="block group-hover:underline">
                    {contact.addressLine1}, {contact.addressLine2}
                  </span>
                  <span className="block text-xs text-gray-500 mt-0.5">
                    {contact.mapLabel} →
                  </span>
                </span>
              </a>

              <a
                href={phoneLink}
                className="group flex items-start gap-3 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <IconBadge>
                  <Phone className="w-5 h-5" aria-hidden="true" />
                </IconBadge>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {contact.phoneLabel}
                  </span>
                  <span className="block font-medium group-hover:underline">
                    {contact.phone}
                  </span>
                </span>
              </a>

              <a
                href={mailLink}
                className="group flex items-start gap-3 text-gray-700 hover:text-gray-900 transition-colors"
              >
                <IconBadge>
                  <Mail className="w-5 h-5" aria-hidden="true" />
                </IconBadge>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {contact.emailLabel}
                  </span>
                  <span className="block font-medium group-hover:underline break-all">
                    {contact.email}
                  </span>
                </span>
              </a>

              <div className="flex items-start gap-3 text-gray-700">
                <IconBadge>
                  <Clock className="w-5 h-5" aria-hidden="true" />
                </IconBadge>
                <span>
                  <span className="block text-xs font-semibold uppercase tracking-wider text-gray-500">
                    {contact.hoursLabel}
                  </span>
                  <span className="block">{contact.hours}</span>
                </span>
              </div>
            </address>

            <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-5 md:pt-0 md:pl-8">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-3">
                {contact.billingTitle}
              </h3>
              <dl className="space-y-2 text-gray-700">
                <div className="flex gap-2">
                  <dt className="font-semibold text-gray-900">{contact.companyIDLabel}:</dt>
                  <dd>{contact.companyID}</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="font-semibold text-gray-900">{contact.taxIDLabel}:</dt>
                  <dd>{contact.taxID}</dd>
                </div>
              </dl>
              <div className="mt-4 flex justify-start">
                <Image
                  src="/pics/logo-black-footer.png"
                  alt={contact.logoAlt}
                  width={160}
                  height={160}
                  className="object-contain w-28 h-auto"
                />
              </div>
            </div>
          </div>

          <div className="mt-6 pt-5 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={phoneLink}>
              <Phone size={18} aria-hidden="true" />
              {contact.callCta}
            </Button>
            <Button href={mailLink} variant="secondary">
              <Mail size={18} aria-hidden="true" />
              {contact.emailLabel}
            </Button>
          </div>
        </div>
      </section>

      <footer className="bg-gray-900 py-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-gray-400 text-sm">
            {interpolate(contact.footerNote, { year })}
          </p>
        </div>
      </footer>
    </>
  );
}
