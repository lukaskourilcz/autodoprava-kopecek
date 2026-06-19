"use client";

import { useContent } from "@/content/useContent";
import { SectionHeading } from "../components/ui/SectionHeading";

// Cloud-canvas section. The services read as a typographic spec sheet — hairline
// rules and negative space instead of cards, badges or decorative icons.
export default function Services() {
  const { services } = useContent().texts;

  const qualities = [
    services.items.safety,
    services.items.comfort,
    services.items.capacity,
    services.items.luggage,
  ];

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
    <section
      id="services"
      className="section bg-cloud py-[70px] px-[40px] max-[640px]:px-5"
    >
      <SectionHeading title={services.title} description={services.description} />

      <ul className="grid grid-cols-1 border-t border-onyx/15 sm:grid-cols-2 lg:grid-cols-4">
        {qualities.map(({ title, description }) => (
          <li key={title} className="border-b border-onyx/15 py-8 pr-8">
            <h3 className="font-display text-[22px] font-semibold tracking-display text-onyx">
              {title}
            </h3>
            <p className="mt-3 text-[18px] leading-[1.3] tracking-body text-onyx/70">
              {description}
            </p>
          </li>
        ))}
      </ul>

      <ul className="mt-[70px] grid grid-cols-1 border-t border-onyx/15 md:grid-cols-2">
        {transportTypes.map(({ title, description }, index) => (
          <li
            key={title}
            className="border-b border-onyx/15 py-8 md:[&:nth-child(odd)]:border-r md:[&:nth-child(odd)]:border-onyx/15 md:[&:nth-child(odd)]:pr-10 md:[&:nth-child(even)]:pl-10"
          >
            <div className="flex items-baseline gap-5">
              <span className="font-display text-[18px] font-semibold tracking-body text-jetstream">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div>
                <h4 className="font-display text-[22px] font-semibold tracking-display text-onyx">
                  {title}
                </h4>
                <p className="mt-3 text-[18px] leading-[1.3] tracking-body text-onyx/70">
                  {description}
                </p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
