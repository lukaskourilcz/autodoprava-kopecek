"use client";

import React from "react";
import { useTranslation } from "../components/TranslationProvider";
import { Waypoints, ChevronsUp, ShieldPlus } from "lucide-react";

const icons = {
  Waypoints,
  ChevronsUp,
  ShieldPlus,
};

type Reason = {
  icon: keyof typeof icons;
  title: string;
  description: string;
};

export default function AboutSection() {
  const { t, tx } = useTranslation();

  const paragraphArray = tx<string[]>("about.paragraphs") ?? [];
  const reasonsArray = (tx<Reason[]>("about.reasons") ?? []) as Reason[];

  return (
    <section
      id="about-content"
      className="bg-gradient-to-b from-gray-100 to-gray-200 py-20 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-32"
    >
      <div className="max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <span className="section-accent mx-auto" aria-hidden="true" />
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-gray-900">
            {t("about.title")}
          </h2>
        </div>

        {paragraphArray.map((paragraph, index) => (
          <p
            key={index}
            className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 md:text-left text-center px-4 max-w-prose mx-auto"
          >
            {paragraph}
          </p>
        ))}

        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm ring-1 ring-gray-200 mt-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">
            {t("about.reasonsTitle")}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {reasonsArray.map((reason, index) => {
              const IconComponent = icons[reason.icon];
              return (
                <li
                  key={index}
                  className="flex flex-col items-center text-center px-2"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center text-white shadow-sm mb-3">
                    <IconComponent />
                  </div>
                  <p className="text-base text-gray-700 leading-relaxed">
                    <span className="font-bold text-gray-900 block mb-1">
                      {reason.title}
                    </span>
                    {reason.description}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="text-base sm:text-lg text-gray-700 mt-8 text-center max-w-2xl mx-auto leading-relaxed">
            {t("about.closingText")}
          </p>
        </div>
      </div>
    </section>
  );
}
