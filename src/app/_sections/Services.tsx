"use client";

import {
  BriefcaseConveyorBelt,
  Users,
  HeartHandshake,
  Heater,
} from "lucide-react";
import { useContent } from "@/content/useContent";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export default function Services() {
  const { services } = useContent().texts;

  // The four headline qualities shown as a slim strip under the heading.
  const qualities = [
    { Icon: HeartHandshake, ...services.items.safety },
    { Icon: Heater, ...services.items.comfort },
    { Icon: Users, ...services.items.capacity },
    { Icon: BriefcaseConveyorBelt, ...services.items.luggage },
  ];

  // The transport types shown as a numbered editorial list.
  const transportTypes = [
    services.irregularBusTransport.schoolTransport,
    services.irregularBusTransport.sportsTransport,
    services.irregularBusTransport.groupsTransport,
    services.corporateTransport,
    services.irregularBusTransport.weddingTransport,
    services.irregularBusTransport.replacementTransport,
    services.irregularBusTransport.airportTransfers,
    services.cargoTransport,
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
