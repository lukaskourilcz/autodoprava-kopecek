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
import { useTranslation } from "../components/TranslationProvider";

export default function ServicesSection() {
  const { t } = useTranslation();

  const services = [
    {
      icon: HeartHandshake,
      title: t("services.items.safety.title"),
      description: t("services.items.safety.description"),
    },
    {
      icon: Heater,
      title: t("services.items.comfort.title"),
      description: t("services.items.comfort.description"),
    },
    {
      icon: Users,
      title: t("services.items.capacity.title"),
      description: t("services.items.capacity.description"),
    },
    {
      icon: BriefcaseConveyorBelt,
      title: t("services.items.luggage.title"),
      description: t("services.items.luggage.description"),
    },
  ];

  const irregularTransportSections = [
    {
      icon: Backpack,
      title: t("services.irregularBusTransport.schoolTransport.title"),
      description: t(
        "services.irregularBusTransport.schoolTransport.description"
      ),
    },
    {
      icon: Volleyball,
      title: t("services.irregularBusTransport.sportsTransport.title"),
      description: t(
        "services.irregularBusTransport.sportsTransport.description"
      ),
    },
    {
      icon: Building2,
      title: t("services.irregularBusTransport.groupsTransport.title"),
      description: t(
        "services.irregularBusTransport.groupsTransport.description"
      ),
    },
    {
      icon: Route,
      title: t("services.corporateTransport.title"),
      description: t("services.corporateTransport.description"),
    },
    {
      icon: BookHeart,
      title: t("services.irregularBusTransport.weddingTransport.title"),
      description: t(
        "services.irregularBusTransport.weddingTransport.description"
      ),
    },
    {
      icon: Bus,
      title: t("services.irregularBusTransport.replacementTransport.title"),
      description: t(
        "services.irregularBusTransport.replacementTransport.description"
      ),
    },
    {
      icon: PlaneTakeoff,
      title: t("services.irregularBusTransport.airportTransfers.title"),
      description: t(
        "services.irregularBusTransport.airportTransfers.description"
      ),
    },
    {
      icon: Truck,
      title: t("services.cargoTransport.title"),
      description: t("services.cargoTransport.description"),
    },
  ];

  return (
    <section
      id="services-content"
      className="bg-gradient-to-b from-white to-gray-200 py-20 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-32"
    >
      <div className="max-w-6xl mx-auto text-center">
        <span className="section-accent mx-auto" aria-hidden="true" />
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900 mb-12">
          {t("services.title")}
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {services.map(({ icon: Icon, title, description }, index) => (
            <div key={index} className="flex flex-col items-center px-2">
              <div className="w-16 h-16 mb-4 rounded-full bg-yellow-50 ring-1 ring-yellow-200 flex items-center justify-center text-yellow-600">
                <Icon className="w-8 h-8" aria-hidden="true" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
              <p className="text-gray-600 text-sm mt-2 leading-relaxed">
                {description}
              </p>
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {irregularTransportSections.map(
            ({ icon: Icon, title, description }, index) => (
              <article
                key={index}
                className="flex flex-col items-center text-center bg-white rounded-2xl p-6 shadow-sm ring-1 ring-gray-200 hover:shadow-md hover:-translate-y-0.5 transition-all"
              >
                <div className="w-14 h-14 mb-4 rounded-xl bg-gray-100 flex items-center justify-center text-gray-700">
                  <Icon className="w-7 h-7" aria-hidden="true" />
                </div>
                <h4 className="text-lg font-semibold text-gray-900 mb-2">
                  {title}
                </h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {description}
                </p>
              </article>
            )
          )}
        </div>
      </div>
    </section>
  );
}
