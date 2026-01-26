"use client";

import React from "react";
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
  LucideIcon,
} from "lucide-react";
import { useTranslation } from "react-i18next";

interface ServiceItem {
  icon: LucideIcon;
  titleKey: string;
  descriptionKey: string;
}

const mainServices: ServiceItem[] = [
  {
    icon: HeartHandshake,
    titleKey: "services.items.safety.title",
    descriptionKey: "services.items.safety.description",
  },
  {
    icon: Heater,
    titleKey: "services.items.comfort.title",
    descriptionKey: "services.items.comfort.description",
  },
  {
    icon: Users,
    titleKey: "services.items.capacity.title",
    descriptionKey: "services.items.capacity.description",
  },
  {
    icon: BriefcaseConveyorBelt,
    titleKey: "services.items.luggage.title",
    descriptionKey: "services.items.luggage.description",
  },
];

const transportServices: ServiceItem[] = [
  {
    icon: Backpack,
    titleKey: "services.irregularBusTransport.schoolTransport.title",
    descriptionKey: "services.irregularBusTransport.schoolTransport.description",
  },
  {
    icon: Volleyball,
    titleKey: "services.irregularBusTransport.sportsTransport.title",
    descriptionKey: "services.irregularBusTransport.sportsTransport.description",
  },
  {
    icon: Building2,
    titleKey: "services.irregularBusTransport.groupsTransport.title",
    descriptionKey: "services.irregularBusTransport.groupsTransport.description",
  },
  {
    icon: Route,
    titleKey: "services.corporateTransport.title",
    descriptionKey: "services.corporateTransport.description",
  },
  {
    icon: BookHeart,
    titleKey: "services.irregularBusTransport.weddingTransport.title",
    descriptionKey: "services.irregularBusTransport.weddingTransport.description",
  },
  {
    icon: Bus,
    titleKey: "services.irregularBusTransport.replacementTransport.title",
    descriptionKey: "services.irregularBusTransport.replacementTransport.description",
  },
  {
    icon: PlaneTakeoff,
    titleKey: "services.irregularBusTransport.airportTransfers.title",
    descriptionKey: "services.irregularBusTransport.airportTransfers.description",
  },
  {
    icon: Truck,
    titleKey: "services.cargoTransport.title",
    descriptionKey: "services.cargoTransport.description",
  },
];

export default function Services() {
  const { t } = useTranslation();

  return (
    <section
      id="sluzby"
      className="bg-gradient-to-b from-white to-gray-300 py-12 sm:py-16 px-4 sm:px-8 md:px-16 lg:px-32"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800 mb-8 sm:mb-12">
          {t("services.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-12 sm:mb-16">
          {mainServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <article key={index} className="flex flex-col items-center p-4">
                <Icon
                  className="w-12 h-12 sm:w-16 sm:h-16 lg:w-20 lg:h-20 mb-4 text-gray-700"
                  aria-hidden="true"
                />
                <h3 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mt-2">
                  {t(service.descriptionKey)}
                </p>
              </article>
            );
          })}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
          {transportServices.map((service, index) => {
            const Icon = service.icon;
            return (
              <article
                key={index}
                className="flex flex-col items-center text-center bg-white shadow-md hover:shadow-lg transition-shadow rounded-lg p-4 sm:p-6"
              >
                <Icon
                  className="w-10 h-10 sm:w-12 sm:h-12 mb-3 sm:mb-4 text-gray-600"
                  aria-hidden="true"
                />
                <h4 className="text-base sm:text-lg lg:text-xl font-semibold text-gray-800 mb-2">
                  {t(service.titleKey)}
                </h4>
                <p className="text-gray-600 text-xs sm:text-sm">
                  {t(service.descriptionKey)}
                </p>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
