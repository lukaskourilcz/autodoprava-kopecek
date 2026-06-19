"use client";

import { useContent } from "@/content/useContent";
import { SectionHeading } from "../components/ui/SectionHeading";

// Cloud-canvas content section. Flat, left-edge anchored, no cards or shadows —
// generous negative space and an engineering-manifesto numbered grid carry the
// "why us" reasons.
export default function About() {
  const { about } = useContent().texts;

  return (
    <section
      id="about"
      className="section bg-cloud py-[70px] px-[40px] max-[640px]:px-5"
    >
      <SectionHeading title={about.title} />

      <div className="max-w-prose space-y-6">
        {about.paragraphs.map((paragraph, index) => (
          <p
            key={index}
            className="text-[18px] leading-[1.3] tracking-body text-onyx/80"
          >
            {paragraph}
          </p>
        ))}
      </div>

      <div className="mt-[70px]">
        <h3 className="mb-12 max-w-prose font-display text-[28px] font-semibold leading-tight tracking-display text-onyx">
          {about.reasonsTitle}
        </h3>

        <ul className="grid grid-cols-1 gap-px border-t border-onyx/15 md:grid-cols-3">
          {about.reasons.map((reason, index) => (
            <li
              key={index}
              className="border-b border-onyx/15 py-8 md:border-b-0 md:border-r md:border-onyx/15 md:pr-8 md:last:border-r-0"
            >
              <span className="block font-display text-[18px] font-semibold tracking-body text-jetstream">
                {String(index + 1).padStart(2, "0")}
              </span>
              <h4 className="mt-4 font-display text-[22px] font-semibold tracking-display text-onyx">
                {reason.title}
              </h4>
              <p className="mt-3 text-[18px] leading-[1.3] tracking-body text-onyx/70">
                {reason.description}
              </p>
            </li>
          ))}
        </ul>

        <p className="mt-12 max-w-prose text-[22px] leading-[1.3] tracking-body text-onyx">
          {about.closingText}
        </p>
      </div>
    </section>
  );
}
