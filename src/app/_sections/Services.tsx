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
      className="section bg-gradient-to-b from-white to-gray-200 py-20 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-32"
    >
      <div className="max-w-6xl mx-auto text-center">
        <SectionHeading title={services.title} className="mb-12" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {qualities.map(({ Icon, title, description }) => (
            <div key={title} className="flex flex-col items-center px-2">
              <IconBadge className="w-16 h-16 mb-4 rounded-full bg-yellow-50 ring-1 ring-yellow-200 text-yellow-600">
                <Icon className="w-8 h-8" aria-hidden="true" />
              </IconBadge>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">{description}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {transportTypes.map(({ Icon, title, description }) => (
            <article
              key={title}
              className="flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
            >
              <IconBadge className="w-14 h-14 mb-4 rounded-xl bg-gray-100 text-gray-700">
                <Icon className="w-7 h-7" aria-hidden="true" />
              </IconBadge>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{title}</h4>
              <p className="text-gray-600 text-sm leading-relaxed">{description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
