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
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Services() {
  const { t } = useTranslation();

  const services = [
    {
      icon: <HeartHandshake className="w-20 h-20 mb-4" />,
      title: t("services.items.safety.title"),
      description: t("services.items.safety.description"),
    },
    {
      icon: <Heater className="w-20 h-20 mb-4" />,
      title: t("services.items.comfort.title"),
      description: t("services.items.comfort.description"),
    },
    {
      icon: <Users className="w-20 h-20 mb-4" />,
      title: t("services.items.capacity.title"),
      description: t("services.items.capacity.description"),
    },
    {
      icon: <BriefcaseConveyorBelt className="w-20 h-20 mb-4" />,
      title: t("services.items.luggage.title"),
      description: t("services.items.luggage.description"),
    },
  ];

  const irregularTransportSections = [
    {
      icon: <Backpack className="w-12 h-12 text-gray-600" />,
      title: t("services.irregularBusTransport.schoolTransport.title"),
      description: t(
        "services.irregularBusTransport.schoolTransport.description"
      ),
    },
    {
      icon: <Volleyball className="w-12 h-12 text-gray-600" />,
      title: t("services.irregularBusTransport.sportsTransport.title"),
      description: t(
        "services.irregularBusTransport.sportsTransport.description"
      ),
    },
    {
      icon: <Building2 className="w-12 h-12 text-gray-600" />,
      title: t("services.irregularBusTransport.groupsTransport.title"),
      description: t(
        "services.irregularBusTransport.groupsTransport.description"
      ),
    },
    {
      icon: <PlaneTakeoff className="w-12 h-12 text-gray-600" />,
      title: t("services.irregularBusTransport.airportTransfers.title"),
      description: t(
        "services.irregularBusTransport.airportTransfers.description"
      ),
    },
    {
      icon: <BookHeart className="w-12 h-12 text-gray-600" />,
      title: t("services.irregularBusTransport.weddingTransport.title"),
      description: t(
        "services.irregularBusTransport.weddingTransport.description"
      ),
    },
    {
      icon: <Bus className="w-12 h-12 text-gray-600" />,
      title: t("services.irregularBusTransport.replacementTransport.title"),
      description: t(
        "services.irregularBusTransport.replacementTransport.description"
      ),
    },
  ];

  return (
    <section
      id="sluzby"
      className="bg-gray-100 py-16 px-4 sm:px-8 md:px-16 lg:px-32 bg-gradient-to-b from-gray-100 to-gray-300"
    >
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">
          {t("services.title")}
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="flex flex-col items-center">
              {service.icon}
              <h3 className="text-xl font-semibold text-gray-800">
                {service.title}
              </h3>
              <p className="text-gray-600 text-sm mt-2">
                {service.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mb-12">
  <h3 className="text-4xl font-bold text-gray-800 mb-12 text-center">
    {t("services.irregularBusTransport.title")}
  </h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-x-8 gap-y-12 -mb-8">
    {irregularTransportSections.map((section, index) => (
      <div
        key={index}
        className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6"
      >
        <div className="w-12 h-12 mb-4 text-gray-600">{section.icon}</div>
        <h4 className="text-xl font-semibold text-gray-800 mb-2">
          {section.title}
        </h4>
        <p className="text-gray-600 text-sm">{section.description}</p>
      </div>
    ))}
    <div className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6">
      <div className="w-12 h-12 mb-4 text-gray-600">
        <Route className="w-full h-full" />
      </div>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">
        {t("services.corporateTransport.title")}
      </h4>
      <p className="text-gray-600 text-sm">
        {t("services.corporateTransport.description")}
      </p>
    </div>
    <div className="flex flex-col items-center text-center bg-white shadow-md rounded-lg p-6">
      <div className="w-12 h-12 mb-4 text-gray-600">
        <Truck className="w-full h-full" />
      </div>
      <h4 className="text-xl font-semibold text-gray-800 mb-2">
        {t("services.cargoTransport.title")}
      </h4>
      <p className="text-gray-600 text-sm">
        {t("services.cargoTransport.description")}
      </p>
    </div>
  </div>
</div>



      </div>
    </section>
  );
}
