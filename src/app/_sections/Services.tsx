"use client";

import Image from "next/image";
import {
  BriefcaseConveyorBelt,
  Users,
  HeartHandshake,
  Heater,
} from "lucide-react";
import { useContent } from "@/content/useContent";
import { isLocalImage } from "@/lib/images";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export default function Services() {
  const { texts, images } = useContent();
  const { services } = texts;

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
              <article
                key={title}
                className="group relative rounded-xl overflow-hidden aspect-[4/3] md:aspect-[3/4] lg:aspect-[4/3]"
              >
                <Image
                  src={image}
                  alt=""
                  fill
                  sizes="(max-width: 768px) 92vw, 380px"
                  unoptimized={!isLocalImage(image)}
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/35 to-black/5"
                  aria-hidden="true"
                />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <h4 className="font-display text-lg font-semibold text-white">{title}</h4>
                  <p className="mt-1 text-sm text-white/80 leading-relaxed line-clamp-3">
                    {description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-12">
          {transportTypes.map(({ title, description }, index) => (
            <Reveal key={title}>
              <article className="flex gap-5 py-6 border-b border-gray-200 h-full">
                <span
                  className="font-display text-sm font-semibold text-gray-400 tabular-nums pt-1"
                  aria-hidden="true"
                >
                  {String(index + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="font-display text-lg font-semibold text-ink">{title}</h4>
                  <p className="mt-1.5 text-sm text-gray-600 leading-relaxed">{description}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
