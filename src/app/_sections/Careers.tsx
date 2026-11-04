"use client";

import Image from "next/image";
import { Check, Phone, MapPin, Route } from "lucide-react";
import { useContent } from "@/content/useContent";
import { telHref } from "@/lib/contactLinks";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import { Button } from "../components/ui/Button";

const SITE_URL = "https://www.autobusyhodonin.cz";
/** The day the advert went live; Google needs it for the JobPosting snippet. */
const DATE_POSTED = "2026-11-04";

export default function Careers() {
  const { texts, locale } = useContent();
  const { careers, contact } = texts;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: careers.position,
    description: [...careers.paragraphs, `${careers.requirementsTitle}: ${careers.requirements.join(", ")}.`]
      .map((text) => `<p>${text}</p>`)
      .join(""),
    datePosted: DATE_POSTED,
    employmentType: ["PART_TIME", "TEMPORARY", "CONTRACTOR"],
    hiringOrganization: {
      "@type": "Organization",
      name: "Autodoprava Kopeček",
      sameAs: SITE_URL,
      logo: `${SITE_URL}/favicon.png`,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        streetAddress: contact.addressLine1,
        addressLocality: "Lužice",
        postalCode: "696 18",
        addressCountry: "CZ",
      },
    },
    inLanguage: locale,
  };

  return (
    <section
      id="careers"
      className="section relative overflow-hidden bg-ink-deep text-white py-20 sm:py-28"
    >
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Soft yellow glow and a road-stripe accent keep the dark band from feeling flat. */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-brand/10 blur-3xl"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1.5 bg-[repeating-linear-gradient(90deg,theme(colors.brand.DEFAULT)_0_48px,transparent_48px_80px)] opacity-60"
      />

      <div className="container-site relative">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_400px] lg:gap-16 items-start">
          <div>
            <Reveal>
              <SectionHeading dark kicker={careers.kicker} title={careers.position} />
              {careers.tags.length > 0 && (
                <ul className="mt-6 flex flex-wrap gap-2">
                  {careers.tags.map((tag) => (
                    <li
                      key={tag}
                      className="rounded-full border border-brand/40 bg-brand/10 px-3.5 py-1.5 text-sm font-medium text-brand-light"
                    >
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
              <div className="mt-8 space-y-4 max-w-prose">
                {careers.paragraphs.map((paragraph, index) => (
                  <p key={index} className="text-gray-300 leading-relaxed">
                    {paragraph}
                  </p>
                ))}
              </div>
            </Reveal>

            <Reveal className="mt-12">
              <div className="grid gap-10 sm:grid-cols-2">
                <div>
                  <h3 className="flex items-center gap-2 font-display text-lg font-semibold text-white">
                    <Route className="h-5 w-5 text-brand" aria-hidden="true" />
                    {careers.workTitle}
                  </h3>
                  <ul className="mt-4 space-y-2.5">
                    {careers.work.map((item) => (
                      <li key={item} className="flex items-center gap-3 text-gray-300">
                        <span className="h-1.5 w-1.5 flex-shrink-0 rounded-full bg-brand" aria-hidden="true" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-display text-lg font-semibold text-white">
                    {careers.fleetTitle}
                  </h3>
                  <ul className="mt-4 grid grid-cols-2 gap-2.5">
                    {careers.fleetBrands.map((brand) => (
                      <li
                        key={brand}
                        className="flex h-14 items-center justify-center rounded-lg border border-white/10 bg-white/[0.04] font-display text-base font-bold uppercase tracking-[0.14em] text-white"
                      >
                        {brand}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </Reveal>
          </div>

          <Reveal>
            <article className="overflow-hidden rounded-2xl bg-white text-ink shadow-2xl shadow-black/40 ring-1 ring-white/10 lg:sticky lg:top-[calc(var(--nav-height)+1.5rem)]">
              <div className="relative aspect-[16/9]">
                <Image
                  src="/pics/uvodka7.jpg"
                  alt=""
                  fill
                  sizes="(max-width: 1024px) 100vw, 400px"
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent" />
                <p className="absolute bottom-3 left-4 flex items-center gap-1.5 text-xs font-medium text-white/90">
                  <MapPin className="h-3.5 w-3.5 text-brand-light" aria-hidden="true" />
                  {contact.addressLine2}
                </p>
              </div>

              <div className="p-6 sm:p-8">
                <h3 className="font-display text-xl font-bold">{careers.requirementsTitle}</h3>
                <ul className="mt-5 space-y-3.5">
                  {careers.requirements.map((requirement) => (
                    <li key={requirement} className="flex items-start gap-3">
                      <span className="mt-0.5 flex h-5 w-5 flex-shrink-0 items-center justify-center rounded-full bg-brand">
                        <Check className="h-3.5 w-3.5 text-ink" strokeWidth={3} aria-hidden="true" />
                      </span>
                      <span className="text-gray-700 leading-snug">{requirement}</span>
                    </li>
                  ))}
                </ul>

                <div className="mt-7 border-t border-gray-200 pt-6">
                  <p className="font-medium text-ink">{careers.closingText}</p>
                  <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-gray-500">
                    {careers.phoneLabel}
                  </p>
                  <Button href={telHref(careers.phone)} className="mt-2 w-full text-lg">
                    <Phone size={18} aria-hidden="true" />
                    {careers.phone}
                  </Button>
                  <div className="mt-6 flex items-center gap-3">
                    <span className="block h-0.5 w-8 bg-brand" aria-hidden="true" />
                    <p className="text-sm">
                      <span className="font-display font-semibold text-ink">
                        {careers.signature.name}
                      </span>
                      <span className="text-gray-500"> · {careers.signature.role}</span>
                    </p>
                  </div>
                </div>
              </div>
            </article>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
