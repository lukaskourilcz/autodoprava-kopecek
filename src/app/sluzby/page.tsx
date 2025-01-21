"use client";

import React from "react";
import {
  BriefcaseConveyorBelt,
  Users,
  HeartHandshake,
  Heater,
} from "lucide-react";
import { useTranslation } from "react-i18next";

export default function Sluzby() {
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

  return (
    <section
      id="sluzby"
      className="bg-gray-100 py-16 px-4 sm:px-8 md:px-16 lg:px-32"
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

        {/* Nepravidelná autobusová doprava */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            {t("services.irregularBusTransport.title")}
          </h3>
          <div className="space-y-6 text-left">
            <div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-2">
                {t("services.irregularBusTransport.schoolTransport.title")}
              </h4>
              <p className="text-gray-600">
                {t("services.irregularBusTransport.schoolTransport.description")}
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-2">
                {t("services.irregularBusTransport.sportsTransport.title")}
              </h4>
              <p className="text-gray-600">
                {t("services.irregularBusTransport.sportsTransport.description")}
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-2">
                {t("services.irregularBusTransport.groupsTransport.title")}
              </h4>
              <p className="text-gray-600">
                {t("services.irregularBusTransport.groupsTransport.description")}
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-2">
                {t("services.irregularBusTransport.airportTransfers.title")}
              </h4>
              <p className="text-gray-600">
                {t("services.irregularBusTransport.airportTransfers.description")}
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-2">
                {t("services.irregularBusTransport.weddingTransport.title")}
              </h4>
              <p className="text-gray-600">
                {t("services.irregularBusTransport.weddingTransport.description")}
              </p>
            </div>
            <div>
              <h4 className="text-2xl font-semibold text-gray-800 mb-2">
                {t("services.irregularBusTransport.replacementTransport.title")}
              </h4>
              <p className="text-gray-600">
                {t("services.irregularBusTransport.replacementTransport.description")}
              </p>
            </div>
          </div>
        </div>

        {/* Firemní linková doprava */}
        <div className="mb-12">
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            {t("services.corporateTransport.title")}
          </h3>
          <p className="text-gray-600 text-left">
            {t("services.corporateTransport.description")}
          </p>
        </div>

        {/* Nákladní doprava */}
        <div>
          <h3 className="text-3xl font-bold text-gray-800 mb-6">
            {t("services.cargoTransport.title")}
          </h3>
          <p className="text-gray-600 text-left">
            {t("services.cargoTransport.description")}
          </p>
        </div>
      </div>
    </section>
  );
}
