"use client";

import Image from "next/image";
import { useContent } from "@/content/useContent";
import { telHref, mailtoHref, mapsSearchHref } from "@/lib/contactLinks";
import { interpolate } from "@/lib/format";
import type { SupportedLocale } from "@/lib/locale";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Button } from "../components/ui/Button";

const navHeader: Record<SupportedLocale, string> = {
  cs: "Navigace",
  en: "Navigation",
  de: "Navigation",
};

const eyebrow = "block text-[14px] font-semibold uppercase tracking-[0.04em] text-onyx/50";
const valueLink =
  "mt-2 block font-display text-[22px] font-semibold tracking-display text-onyx transition-colors hover:text-jetstream";

export default function Contact() {
  const { locale, texts } = useContent();
  const { contact } = texts;

  const phoneLink = telHref(contact.phone);
  const mailLink = mailtoHref(contact.email, contact.mailSubject);
  const mapLink = mapsSearchHref(`${contact.addressLine1}, ${contact.addressLine2}`);
  const year = new Date().getFullYear();

  const navLinks = [
    { hash: "about", label: texts.about.title },
    { hash: "services", label: texts.services.title },
    { hash: "fleet", label: texts.fleet.title },
    { hash: "contact", label: texts.contact.title },
  ];

  return (
    <>
      <section
        id="contact"
        className="section bg-cloud py-[70px] px-[40px] max-[640px]:px-5"
      >
        <SectionHeading title={contact.title} description={contact.description} />

        <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
          <div className="space-y-10">
            <a href={mapLink} target="_blank" rel="noopener noreferrer" className="group block focus-ring">
              <span className={eyebrow}>{contact.addressLabel}</span>
              <span className={`${valueLink} group-hover:text-jetstream`}>
                {contact.addressLine1}, {contact.addressLine2}
              </span>
              <span className="mt-1 block text-[16px] tracking-body text-onyx/50">
                {contact.mapLabel} →
              </span>
            </a>

            <a href={phoneLink} className="group block focus-ring">
              <span className={eyebrow}>{contact.phoneLabel}</span>
              <span className={`${valueLink} group-hover:text-jetstream`}>{contact.phone}</span>
            </a>

            <a href={mailLink} className="group block focus-ring">
              <span className={eyebrow}>{contact.emailLabel}</span>
              <span className={`${valueLink} group-hover:text-jetstream break-all`}>
                {contact.email}
              </span>
            </a>

            <div>
              <span className={eyebrow}>{contact.hoursLabel}</span>
              <span className="mt-2 block text-[18px] tracking-body text-onyx">{contact.hours}</span>
            </div>
          </div>

          <div className="flex flex-col items-start">
            <span className={eyebrow}>{contact.billingTitle}</span>
            <dl className="mt-4 space-y-2 text-[18px] tracking-body text-onyx">
              <div className="flex gap-3">
                <dt className="font-semibold">{contact.companyIDLabel}</dt>
                <dd>{contact.companyID}</dd>
              </div>
              <div className="flex gap-3">
                <dt className="font-semibold">{contact.taxIDLabel}</dt>
                <dd>{contact.taxID}</dd>
              </div>
            </dl>

            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Button href={phoneLink} ariaLabel={`${contact.callCta}: ${contact.phone}`}>
                {contact.callCta}
              </Button>
              <Button href={mailLink}>{contact.emailLabel}</Button>
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-onyx text-cloud px-[40px] py-[70px] max-[640px]:px-5">
        <div className="grid gap-12 md:grid-cols-3">
          <div>
            <h3 className="text-[18px] font-semibold tracking-body text-cloud">
              {navHeader[locale]}
            </h3>
            <ul className="mt-5">
              {navLinks.map(({ hash, label }) => (
                <li key={hash}>
                  <a
                    href={`/${locale}#${hash}`}
                    className="block py-2.5 text-[18px] font-normal tracking-body text-cloud/70 transition-colors hover:text-cloud focus-ring"
                  >
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-[18px] font-semibold tracking-body text-cloud">
              {contact.title}
            </h3>
            <ul className="mt-5">
              <li>
                <a
                  href={phoneLink}
                  className="block py-2.5 text-[18px] font-normal tracking-body text-cloud/70 transition-colors hover:text-cloud focus-ring"
                >
                  {contact.phone}
                </a>
              </li>
              <li>
                <a
                  href={mailLink}
                  className="block break-all py-2.5 text-[18px] font-normal tracking-body text-cloud/70 transition-colors hover:text-cloud focus-ring"
                >
                  {contact.email}
                </a>
              </li>
              <li className="py-2.5 text-[18px] font-normal tracking-body text-cloud/70">
                {contact.hours}
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-[18px] font-semibold tracking-body text-cloud">
              {contact.addressLabel}
            </h3>
            <address className="mt-5 space-y-1 text-[18px] not-italic tracking-body text-cloud/70">
              <p>{contact.addressLine1}</p>
              <p>{contact.addressLine2}</p>
              <p className="pt-3">
                {contact.companyIDLabel} {contact.companyID} · {contact.taxIDLabel}{" "}
                {contact.taxID}
              </p>
            </address>
          </div>
        </div>

        <div className="mt-[70px] flex flex-col gap-6 border-t border-cloud/15 pt-8 sm:flex-row sm:items-center sm:justify-between">
          <Image
            src="/pics/logo-white-nav.png"
            alt={contact.logoAlt}
            width={881}
            height={411}
            className="h-7 w-auto"
          />
          <p className="text-[16px] tracking-body text-cloud/50">
            {interpolate(contact.footerNote, { year })}
          </p>
        </div>
      </footer>
    </>
  );
}
