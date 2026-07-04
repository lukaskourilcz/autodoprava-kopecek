"use client";

import Image from "next/image";
import {
  ArrowUpRight,
  BriefcaseConveyorBelt,
  ChevronLeft,
  Users,
  HeartHandshake,
  Heater,
} from "lucide-react";
import { useContent } from "@/content/useContent";
import { isLocalImage } from "@/lib/images";
import { mailtoHref } from "@/lib/contactLinks";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export default function Services() {
  const { texts, images } = useContent();
  const { services, contact } = texts;
  const inquiryHref = (title: string) =>
    mailtoHref(contact.email, `${contact.mailSubject} – ${title}`);

  // The four headline qualities shown as a slim strip under the heading.
  const qualities = [
    { Icon: HeartHandshake, ...services.items.safety },
    { Icon: Heater, ...services.items.comfort },
    { Icon: Users, ...services.items.capacity },
    { Icon: BriefcaseConveyorBelt, ...services.items.luggage },
  ];

  // The three most visual services get photo tiles…
  const featured = [
    { image: images.services.schoolTransport, ...services.irregularBusTransport.schoolTransport },
    { image: images.services.airportTransfers, ...services.irregularBusTransport.airportTransfers },
    { image: images.services.cargoTransport, ...services.cargoTransport },
  ];

  // …the rest are listed as a numbered editorial list.
  const transportTypes = [
    services.irregularBusTransport.sportsTransport,
    services.irregularBusTransport.groupsTransport,
    services.corporateTransport,
    services.irregularBusTransport.weddingTransport,
    services.irregularBusTransport.replacementTransport,
  ];

  return (
    <section id="services" className="section bg-gray-50 py-20 sm:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeading title={services.title} description={services.description} />
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-8 lg:gap-x-0 lg:divide-x lg:divide-gray-200 border-y border-gray-200 py-8">
            {qualities.map(({ Icon, title, description }) => (
              <div key={title} className="lg:px-8 lg:first:pl-0 lg:last:pr-0">
                <Icon className="w-6 h-6 text-brand" aria-hidden="true" />
                <h3 className="mt-3 font-display font-semibold text-ink">{title}</h3>
                <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{description}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {featured.map(({ image, title, description }) => (
              <div key={title}>
                {/* Desktop / hover devices: title only, description slides in on hover. */}
                <a
                  href={inquiryHref(title)}
                  className="group relative hidden md:block rounded-xl overflow-hidden md:aspect-[3/4] lg:aspect-[4/3] focus-ring"
                >
                  <Image
                    src={image}
                    alt={title}
                    fill
                    sizes="(max-width: 768px) 92vw, 380px"
                    unoptimized={!isLocalImage(image)}
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent pt-16 pb-4 px-5 transition-opacity duration-300 group-hover:opacity-0"
                  >
                    <span className="font-display text-lg font-semibold text-white">
                      {title}
                    </span>
                  </span>
                  <span className="absolute inset-0 bg-ink opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-5">
                    <span className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center text-brand">
                      <ArrowUpRight className="w-[18px] h-[18px]" aria-hidden="true" />
                    </span>
                    <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                    <span className="mt-2 block text-sm text-gray-300 leading-relaxed line-clamp-6">
                      {description}
                    </span>
                  </span>
                </a>

                {/* Mobile: swipe the photo aside to reveal the text panel. */}
                <div className="md:hidden relative rounded-xl overflow-hidden">
                  <div className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide">
                    <div className="relative w-full flex-shrink-0 snap-center aspect-[4/3]">
                      <Image
                        src={image}
                        alt={title}
                        fill
                        sizes="92vw"
                        unoptimized={!isLocalImage(image)}
                        className="object-cover"
                      />
                      <span
                        aria-hidden="true"
                        className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 to-transparent pt-16 pb-4 px-5"
                      >
                        <span className="font-display text-lg font-semibold text-white">
                          {title}
                        </span>
                      </span>
                      <span
                        aria-hidden="true"
                        className="absolute bottom-4 right-4 inline-flex items-center gap-1 rounded-full bg-ink/75 backdrop-blur-sm pl-1.5 pr-2.5 py-1.5 text-[11px] font-semibold text-white pointer-events-none"
                      >
                        <ChevronLeft className="w-3.5 h-3.5 nudge-x" />
                        {services.swipeHint}
                      </span>
                    </div>
                    <div className="w-full flex-shrink-0 snap-center bg-ink aspect-[4/3] overflow-y-auto p-5 flex flex-col justify-center">
                      <h3 className="font-display text-lg font-semibold text-white">{title}</h3>
                      <p className="mt-2 text-sm text-gray-300 leading-relaxed">{description}</p>
                      <a
                        href={inquiryHref(title)}
                        className="mt-3 inline-flex items-center gap-1 text-brand text-sm font-semibold focus-ring rounded"
                      >
                        {contact.emailCta}
                        <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal className="mt-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
            {transportTypes.map(({ title, description }, index) => (
              <a
                key={title}
                href={inquiryHref(title)}
                className="group flex gap-5 py-6 border-b border-gray-200 h-full focus-ring"
              >
                <span
                  className="font-display text-sm font-semibold text-gray-400 tabular-nums pt-1"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <span className="flex-1 block">
                  <h3 className="font-display text-lg font-semibold text-ink flex items-center justify-between gap-3">
                    {title}
                    <ArrowUpRight
                      className="w-4 h-4 flex-shrink-0 text-brand opacity-0 group-hover:opacity-100 group-focus-visible:opacity-100 transition-opacity"
                      aria-hidden="true"
                    />
                  </h3>
                  <span className="mt-1.5 block text-sm text-gray-600 leading-relaxed">
                    {description}
                  </span>
                </span>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
