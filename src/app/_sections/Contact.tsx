"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUp, ArrowUpRight, Clock, Mail, MapPinHouse, Phone } from "lucide-react";
import { useContent } from "@/content/useContent";
import { telHref, mailtoHref, mapsSearchHref } from "@/lib/contactLinks";
import { interpolate } from "@/lib/format";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";

export default function Contact() {
  const { locale, texts } = useContent();
  const { contact, a11y } = texts;

  const phoneLink = telHref(contact.phone);
  const mailLink = mailtoHref(contact.email, contact.mailSubject);
  const address = `${contact.addressLine1}, ${contact.addressLine2}`;
  const mapLink = mapsSearchHref(address);
  // Keyless Google Maps embed; see NEEDED.md for the optional Embed API upgrade.
  const mapEmbedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(
    address
  )}&z=12&hl=${locale}&output=embed`;
  const year = new Date().getFullYear();

  const footerLinks = (["about", "services", "fleet", "contact"] as const).map((hash) => ({
    hash,
    label: texts[hash].title,
  }));

  const labelClasses = "block text-xs font-semibold uppercase tracking-wider text-gray-400";

  return (
    <>
      <section id="contact" className="section bg-ink py-20 sm:py-28">
        <div className="container-site">
          <Reveal>
            <SectionHeading dark title={contact.title} description={contact.description} />
          </Reveal>

          <Reveal className="mt-12">
            <div className="grid gap-12 lg:grid-cols-[1fr,320px]">
              <address className="not-italic grid gap-8 sm:grid-cols-2">
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-start gap-4 text-gray-200 hover:text-white transition-colors"
                >
                  <MapPinHouse className="w-5 h-5 mt-0.5 text-brand flex-shrink-0" aria-hidden="true" />
                  <span>
                    <span className={labelClasses}>{contact.addressLabel}</span>
                    <span className="mt-1 block font-medium group-hover:underline">
                      {contact.addressLine1}, {contact.addressLine2}
                    </span>
                    <span className="mt-0.5 flex items-center gap-1 text-xs text-gray-400">
                      {contact.mapLabel}
                      <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                    </span>
                  </span>
                </a>

                <a
                  href={phoneLink}
                  className="group flex items-start gap-4 text-gray-200 hover:text-white transition-colors"
                >
                  <Phone className="w-5 h-5 mt-0.5 text-brand flex-shrink-0" aria-hidden="true" />
                  <span>
                    <span className={labelClasses}>{contact.phoneLabel}</span>
                    <span className="mt-1 block font-medium group-hover:underline">
                      {contact.phone}
                    </span>
                  </span>
                </a>

                <a
                  href={mailLink}
                  className="group flex items-start gap-4 text-gray-200 hover:text-white transition-colors"
                >
                  <Mail className="w-5 h-5 mt-0.5 text-brand flex-shrink-0" aria-hidden="true" />
                  <span>
                    <span className={labelClasses}>{contact.emailLabel}</span>
                    <span className="mt-1 block font-medium break-words group-hover:underline">
                      {contact.email}
                    </span>
                  </span>
                </a>

                <div className="flex items-start gap-4 text-gray-200">
                  <Clock className="w-5 h-5 mt-0.5 text-brand flex-shrink-0" aria-hidden="true" />
                  <span>
                    <span className={labelClasses}>{contact.hoursLabel}</span>
                    <span className="mt-1 block">{contact.hours}</span>
                  </span>
                </div>
              </address>

              <div className="lg:border-l lg:border-white/10 lg:pl-10">
                <h3 className={`${labelClasses} mb-4`}>{contact.billingTitle}</h3>
                <dl className="space-y-2 text-gray-200">
                  <div className="flex gap-2">
                    <dt className="font-semibold text-white">{contact.companyIDLabel}:</dt>
                    <dd>{contact.companyID}</dd>
                  </div>
                  <div className="flex gap-2">
                    <dt className="font-semibold text-white">{contact.taxIDLabel}:</dt>
                    <dd>{contact.taxID}</dd>
                  </div>
                </dl>
                <Image
                  src="/pics/logo-whiteyellow-nav.png"
                  alt={contact.logoAlt}
                  width={881}
                  height={411}
                  className="hidden lg:block object-contain w-36 h-auto mt-6"
                />
              </div>
            </div>

            <div className="mt-12 relative rounded-xl overflow-hidden border border-white/10 bg-ink-soft">
              {/* Fallback behind the iframe: visible when embeds are blocked (ad-blockers, strict privacy modes). */}
              <a
                href={mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 text-gray-300 hover:text-white transition-colors"
              >
                <MapPinHouse className="w-6 h-6 text-brand" aria-hidden="true" />
                <span className="text-sm font-medium">{address}</span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  {contact.mapLabel}
                  <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
                </span>
              </a>
              <iframe
                src={mapEmbedSrc}
                title={contact.mapTitle}
                className="relative block w-full h-64 sm:h-80"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row gap-3">
              <Button href={phoneLink}>
                <Phone size={18} aria-hidden="true" />
                {contact.callCta}
              </Button>
              <Button href={mailLink} variant="outline">
                <Mail size={18} aria-hidden="true" />
                {contact.emailCta}
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <footer className="bg-ink-deep border-t border-white/10">
        <div className="container-site py-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          <div>
            <Image
              src="/pics/logo-whiteyellow-nav.png"
              alt={contact.logoAlt}
              width={881}
              height={411}
              className="object-contain w-32 h-auto"
            />
            <p className="mt-4 text-sm text-gray-400 leading-relaxed max-w-xs">
              {contact.footerBlurb}
            </p>
          </div>

          <nav>
            <ul className="space-y-2.5">
              {footerLinks.map(({ hash, label }) => (
                <li key={hash}>
                  <Link
                    href={`/${locale}#${hash}`}
                    className="text-sm text-gray-400 hover:text-white transition-colors focus-ring rounded"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <address className="not-italic space-y-2.5 text-sm">
            <a
              href={phoneLink}
              className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors focus-ring rounded"
            >
              <Phone className="w-4 h-4 text-brand" aria-hidden="true" />
              {contact.phone}
            </a>
            <a
              href={mailLink}
              className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors break-words focus-ring rounded"
            >
              <Mail className="w-4 h-4 text-brand" aria-hidden="true" />
              {contact.email}
            </a>
            <a
              href={mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-gray-400 hover:text-white transition-colors focus-ring rounded"
            >
              <MapPinHouse className="w-4 h-4 text-brand" aria-hidden="true" />
              {address}
            </a>
          </address>
        </div>

        <div className="border-t border-white/10">
          <div className="container-site py-5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-gray-500 text-sm text-center">
              {interpolate(contact.footerNote, { year })}
            </p>
            <Link
              href={`/${locale}#home`}
              aria-label={a11y.backToTop}
              className="w-10 h-10 flex items-center justify-center rounded-full border border-white/20 text-gray-300 hover:text-white hover:border-white/50 transition-colors focus-ring"
            >
              <ArrowUp size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </footer>
    </>
  );
}
