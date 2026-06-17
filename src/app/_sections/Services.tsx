"use client";

import {
  BriefcaseConveyorBelt,
  Users,
  HeartHandshake,
  Heater,
  Backpack,
  Volleyball,
  Building2,
  PlaneTakeoff,
  BookHeart,
  Bus,
  Route,
  Truck,
} from "lucide-react";
import { useContent } from "@/content/useContent";
import { SectionHeading } from "../components/ui/SectionHeading";
import { IconBadge } from "../components/ui/IconBadge";
import { Reveal } from "../components/ui/Reveal";

export default function Services() {
  const { services } = useContent().texts;

  // The four headline qualities shown as large yellow badges.
  const qualities = [
    { Icon: HeartHandshake, ...services.items.safety },
    { Icon: Heater, ...services.items.comfort },
    { Icon: Users, ...services.items.capacity },
    { Icon: BriefcaseConveyorBelt, ...services.items.luggage },
  ];

  // The transport types shown as cards below.
  const transportTypes = [
    { Icon: Backpack, ...services.irregularBusTransport.schoolTransport },
    { Icon: Volleyball, ...services.irregularBusTransport.sportsTransport },
    { Icon: Building2, ...services.irregularBusTransport.groupsTransport },
    { Icon: Route, ...services.corporateTransport },
    { Icon: BookHeart, ...services.irregularBusTransport.weddingTransport },
    { Icon: Bus, ...services.irregularBusTransport.replacementTransport },
    { Icon: PlaneTakeoff, ...services.irregularBusTransport.airportTransfers },
    { Icon: Truck, ...services.cargoTransport },
  ];

  return (
    <section
      id="services"
      className="section bg-gradient-to-b from-white to-gray-200 px-4 py-20 sm:px-8 sm:py-24 md:px-16 lg:px-32"
    >
      <div className="mx-auto max-w-6xl text-center">
        <SectionHeading title={services.title} className="mb-12" />

        <div className="mb-16 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {qualities.map(({ Icon, title, description }, index) => (
            <Reveal
              key={title}
              className="group flex flex-col items-center px-2"
              delay={index * 80}
            >
              <IconBadge className="mb-4 h-16 w-16 rounded-full bg-yellow-500 text-white shadow-md transition-transform duration-300 group-hover:scale-110">
                <Icon className="h-8 w-8" aria-hidden="true" />
              </IconBadge>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-gray-600">{description}</p>
            </Reveal>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {transportTypes.map(({ Icon, title, description }, index) => (
            <Reveal key={title} delay={(index % 4) * 70}>
              <article className="group flex h-full flex-col items-center rounded-2xl bg-white p-6 text-center shadow-sm ring-1 ring-gray-200 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:ring-yellow-200">
                <IconBadge className="mb-4 h-14 w-14 rounded-xl bg-gray-100 text-gray-700 transition-colors duration-300 group-hover:bg-yellow-50 group-hover:text-yellow-600">
                  <Icon className="h-7 w-7" aria-hidden="true" />
                </IconBadge>
                <h4 className="mb-2 text-lg font-semibold text-gray-900">{title}</h4>
                <p className="text-sm leading-relaxed text-gray-600">{description}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
