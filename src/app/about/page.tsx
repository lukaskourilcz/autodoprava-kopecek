"use client";

import React from "react";
import { useTranslation } from "react-i18next";
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

export default function About() {
  const { t } = useTranslation();

  const paragraphs = 
  t("about.paragraphs", 
    { returnObjects: true });
  const paragraphArray =
   Array.isArray(paragraphs) ? 
   paragraphs : [];

  const reasons = t("about.reasons", { returnObjects: true });
  const reasonsArray: Reason[] = Array.isArray(reasons) ? reasons : [];

  return (
    <section
      id="o-nas"
      className="bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-4 sm:px-8 md:px-16 lg:px-32"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-4">
          {t("about.title")}
        </h2>
        <div className="w-5/6 mx-auto mb-4 border-t-2 border-gray-300"></div>

        {paragraphArray.map((paragraph, index) => (
          <p key={index} className="text-lg text-gray-700 leading-relaxed mb-6 md:text-left text-center px-4">
            {paragraph}
          </p>
        ))}

        <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {t("about.reasonsTitle")}
          </h3>
          <ul className="space-y-6">
            {reasonsArray.map((reason, index) => {
              const IconComponent = icons[reason.icon];
              return (
                <li key={index} className="flex items-center space-x-4">
                  <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                    <IconComponent />
                  </div>
                  <p className="text-lg text-gray-700">
                    <span className="font-bold">{reason.title}:</span> {reason.description}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="text-lg text-gray-700 mt-8">{t("about.closingText")}</p>
        </div>
      </div>
    </section>
  );
}
