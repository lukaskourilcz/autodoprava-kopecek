"use client";

import Image from "next/image";
import { Clock, Mail, MapPinHouse, Phone } from "lucide-react";
import { useContent } from "@/content/useContent";
import { telHref, mailtoHref, mapsSearchHref } from "@/lib/contactLinks";
import { interpolate } from "@/lib/format";
import { uiStrings } from "@/lib/ui-strings";
import { SectionHeading } from "../components/ui/SectionHeading";
import { IconBadge } from "../components/ui/IconBadge";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";

export default function Contact() {
  const { locale, texts } = useContent();
  const contact = texts.contact;
  const ui = uiStrings(locale);

  const phoneLink = telHref(contact.phone);
  const mailLink = mailtoHref(contact.email, contact.mailSubject);
  const mapLink = mapsSearchHref(`${contact.addressLine1}, ${contact.addressLine2}`);
  const year = new Date().getFullYear();

  return (
    <>
      <section
        id="contact"
        className="section relative overflow-hidden px-4 py-20 sm:px-8 sm:py-24 md:px-16 lg:px-32"
      >
        <Image
          src="/pics/footer-map.jpg"
          alt=""
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-gray-900/40" aria-hidden="true" />
        <Reveal className="relative z-10 mx-auto max-w-4xl rounded-2xl bg-white/95 p-6 shadow-xl ring-1 ring-black/5 backdrop-blur-sm sm:p-10">
          <SectionHeading title={contact.title} description={contact.description} />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-start">
            <address className="not-italic space-y-5">
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

            <div className="border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-10">
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
              <div className="mt-6 flex justify-start">
                <Image
                  src="/pics/logo-black-footer.png"
                  alt={contact.logoAlt}
                  width={160}
                  height={160}
                  className="object-contain w-32 h-auto"
                />
              </div>
            </div>
          </div>

          <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col sm:flex-row gap-3 justify-center">
            <Button href={phoneLink}>
              <Phone size={18} aria-hidden="true" />
              {contact.callCta}
            </Button>
            <Button href={mailLink} variant="secondary">
              <Mail size={18} aria-hidden="true" />
              {ui.sendEmail}
            </Button>
          </div>
        </Reveal>
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
