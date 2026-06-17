"use client";

import { Waypoints, ChevronsUp, ShieldPlus } from "lucide-react";
import { useContent } from "@/content/useContent";
import { SectionHeading } from "../components/ui/SectionHeading";
import { IconBadge } from "../components/ui/IconBadge";
import type { AboutReason } from "@/content/types";

const reasonIcons: Record<AboutReason["icon"], typeof Waypoints> = {
  Waypoints,
  ChevronsUp,
  ShieldPlus,
};

export default function About() {
  const { about } = useContent().texts;

  return (
    <section
      id="about"
      className="section bg-gradient-to-b from-gray-100 to-gray-200 py-20 sm:py-24 px-4 sm:px-8 md:px-16 lg:px-32"
    >
      <div className="max-w-5xl mx-auto">
        <SectionHeading title={about.title} />

        {about.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-base md:text-lg text-gray-700 leading-relaxed mb-6 md:text-left text-center px-4 max-w-prose mx-auto"
          >
            {paragraph}
          </p>
        ))}

        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm ring-1 ring-gray-200 mt-12">
          <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-8 text-center">
            {about.reasonsTitle}
          </h3>
          <ul className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {about.reasons.map((reason, index) => {
              const Icon = reasonIcons[reason.icon] ?? Waypoints;
              return (
                <li key={index} className="flex flex-col items-center text-center px-2">
                  <IconBadge className="w-12 h-12 mb-3 rounded-full bg-yellow-500 text-white shadow-sm">
                    <Icon />
                  </IconBadge>
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
            {about.closingText}
          </p>
        </div>
      </div>
    </section>
  );
}
