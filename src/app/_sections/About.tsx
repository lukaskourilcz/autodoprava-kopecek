"use client";

import { Waypoints, ChevronsUp, ShieldPlus } from "lucide-react";
import { useContent } from "@/content/useContent";
import { SectionHeading } from "../components/ui/SectionHeading";
import { IconBadge } from "../components/ui/IconBadge";
import { Reveal } from "../components/ui/Reveal";
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
      className="section bg-gradient-to-b from-gray-100 to-gray-200 px-4 py-20 sm:px-8 sm:py-24 md:px-16 lg:px-32"
    >
      <div className="mx-auto max-w-5xl">
        <SectionHeading title={about.title} />

        <Reveal className="mx-auto max-w-prose">
          {about.paragraphs.map((paragraph, index) => (
            <p
              key={index}
              className="mb-6 text-left text-base leading-relaxed text-gray-700 md:text-lg"
            >
              {paragraph}
            </p>
          ))}
        </Reveal>

        <Reveal className="mt-12 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200 sm:p-10">
          <h3 className="mb-8 text-center text-xl font-bold text-gray-900 sm:text-2xl">
            {about.reasonsTitle}
          </h3>
          <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {about.reasons.map((reason, index) => {
              const Icon = reasonIcons[reason.icon] ?? Waypoints;
              return (
                <li key={index}>
                  <Reveal
                    className="group flex flex-col items-center px-2 text-center"
                    delay={index * 90}
                  >
                    <IconBadge className="mb-3 h-12 w-12 rounded-full bg-yellow-500 text-white shadow-sm transition-transform duration-300 group-hover:scale-110">
                      <Icon />
                    </IconBadge>
                    <h4 className="mb-1 font-bold text-gray-900">{reason.title}</h4>
                    <p className="text-base leading-relaxed text-gray-700">
                      {reason.description}
                    </p>
                  </Reveal>
                </li>
              );
            })}
          </ul>
          <p className="mx-auto mt-8 max-w-2xl text-center text-base leading-relaxed text-gray-700 sm:text-lg">
            {about.closingText}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
