"use client";

import { ChevronDown } from "lucide-react";
import { useContent } from "@/content/useContent";
import { SectionHeading } from "../components/ui/SectionHeading";
import { Reveal } from "../components/ui/Reveal";

export default function Faq() {
  const { faq } = useContent().texts;
  if (faq.items.length === 0) return null;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.items.map(({ question, answer }) => ({
      "@type": "Question",
      name: question,
      acceptedAnswer: { "@type": "Answer", text: answer },
    })),
  };

  return (
    <section id="faq" className="section bg-gray-50 py-20 sm:py-28">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <div className="container-site">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,380px)_1fr] lg:gap-20">
          <Reveal>
            <SectionHeading title={faq.title} />
          </Reveal>

          <Reveal>
            <div className="border-t border-gray-200">
              {faq.items.map(({ question, answer }, index) => (
                <details key={index} className="group border-b border-gray-200">
                  <summary className="flex items-center justify-between gap-4 py-5 cursor-pointer list-none font-display font-semibold text-ink [&::-webkit-details-marker]:hidden focus-ring">
                    {question}
                    <ChevronDown
                      className="w-5 h-5 flex-shrink-0 text-gray-400 transition-transform duration-200 group-open:rotate-180"
                      aria-hidden="true"
                    />
                  </summary>
                  <p className="pb-5 text-gray-600 leading-relaxed max-w-2xl">{answer}</p>
                </details>
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
