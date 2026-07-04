"use client";

import Image from "next/image";
import { Waypoints, ChevronsUp, ShieldPlus } from "lucide-react";
import { useContent } from "@/content/useContent";
import { isLocalImage } from "@/lib/images";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";
import type { AboutReason } from "@/content/types";

const reasonIcons: Record<AboutReason["icon"], typeof Waypoints> = {
  Waypoints,
  ChevronsUp,
  ShieldPlus,
};

export default function About() {
  const { texts, images } = useContent();
  const { about } = texts;

  return (
    <section id="about" className="section bg-ink text-white py-20 sm:py-28">
      <div className="container-site">
        <Reveal>
          <SectionHeading dark kicker={about.kicker} title={about.title} />
        </Reveal>

        <div className="mt-10 grid gap-12 lg:grid-cols-[1fr,auto] lg:gap-20 items-start">
          <Reveal>
            <div className="space-y-5 max-w-prose">
              {about.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-gray-300 leading-relaxed">
                  {paragraph}
                </p>
              ))}
            </div>
            {images.about.length > 0 && (
              <div className="mt-10 grid grid-cols-2 gap-4">
                {images.about.map((src, index) => (
                  <div
                    key={`${src}-${index}`}
                    className="relative aspect-[4/3] rounded-xl overflow-hidden"
                  >
                    <Image
                      src={src}
                      alt=""
                      fill
                      sizes="(max-width: 1024px) 46vw, 350px"
                      unoptimized={!isLocalImage(src)}
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}
          </Reveal>

          {about.stats.length > 0 && (
            <Reveal>
              <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-1 gap-8 lg:gap-10 lg:border-l lg:border-white/10 lg:pl-12 lg:min-w-[220px]">
                {about.stats.map(({ value, label }) => (
                  <div key={label}>
                    <p className="font-display text-4xl sm:text-5xl font-bold text-brand tabular-nums leading-none">
                      {value}
                    </p>
                    <p className="mt-2 text-sm text-gray-400">{label}</p>
                  </div>
                ))}
              </div>
            </Reveal>
          )}
        </div>

        <Reveal className="mt-16 sm:mt-20">
          <h3 className="font-display text-xl sm:text-2xl font-semibold text-white">
            {about.reasonsTitle}
          </h3>
          <ul className="mt-8 grid gap-8 md:grid-cols-3">
            {about.reasons.map((reason, index) => {
              const Icon = reasonIcons[reason.icon] ?? Waypoints;
              return (
                <li key={index}>
                  <Icon className="w-6 h-6 text-brand" aria-hidden="true" />
                  <p className="mt-3 font-display font-semibold text-white">{reason.title}</p>
                  <p className="mt-1.5 text-sm text-gray-400 leading-relaxed">
                    {reason.description}
                  </p>
                </li>
              );
            })}
          </ul>
          <p className="mt-12 text-gray-300 leading-relaxed max-w-prose">
            {about.closingText}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
