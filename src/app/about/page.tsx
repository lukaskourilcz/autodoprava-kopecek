"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import { Waypoints, ChevronsUp, ShieldPlus } from "lucide-react";

// Define the type for reasons
type Reason = {
  icon: "Waypoints" | "ChevronsUp" | "ShieldPlus";
  title: string;
  description: string;
};

export default function About() {
  const { t } = useTranslation();

  // Cast `t('about.reasons')` as an array of reasons
  const reasons: Reason[] = t("about.reasons", {
    returnObjects: true,
  }) as Reason[];

  // Define the icons mapping with explicit type
  const icons: Record<"Waypoints" | "ChevronsUp" | "ShieldPlus", JSX.Element> =
    {
      Waypoints: <Waypoints />,
      ChevronsUp: <ChevronsUp />,
      ShieldPlus: <ShieldPlus />,
    };

  return (
    <section
      id="o-nas"
      className="bg-gradient-to-b from-gray-100 to-gray-200 py-16 px-4 sm:px-8 md:px-16 lg:px-32"
    >
      <div className="max-w-5xl mx-auto">
        <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
          {t("about.title")}
        </h2>
        {t("about.paragraphs", { returnObjects: true }).map(
          (paragraph: string, index: number) => (
            <p
              key={index}
              className="text-lg text-gray-700 leading-relaxed mb-6"
            >
              {paragraph}
            </p>
          )
        )}
        <div className="bg-gray-50 p-8 rounded-lg shadow-lg">
          <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
            {t("about.reasonsTitle")}
          </h3>
          <ul className="space-y-6">
            {reasons.map((reason, index) => (
              <li key={index} className="flex items-center space-x-4">
                <div className="flex-shrink-0 w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center text-white font-bold">
                  {icons[reason.icon]}
                </div>
                <p className="text-lg text-gray-700">
                  <span className="font-bold">{reason.title}:</span>{" "}
                  {reason.description}
                </p>
              </li>
            ))}
          </ul>
          <p className="text-lg text-gray-700 mt-8">{t("about.closingText")}</p>
        </div>
      </div>
    </section>
  );
}
