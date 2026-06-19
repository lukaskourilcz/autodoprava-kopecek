"use client";

import Image from "next/image";
import { useContent } from "@/content/useContent";
import type { SupportedLocale } from "@/lib/locale";

// The monumental display band — the brand's aerospace-scale showstopper. A
// single wordmark fills the viewport on the stratosphere→cloud gradient while a
// coach reveals from the bottom edge. No supporting copy shares the viewport;
// the type is the content.
const heritage: Record<SupportedLocale, string> = {
  cs: "Rodinná doprava od roku 2012",
  en: "Family-run transport since 2012",
  de: "Familienbetrieb seit 2012",
};

export default function Brand() {
  const { locale, texts } = useContent();

  return (
    <section className="relative isolate flex min-h-[94vh] flex-col overflow-hidden bg-atmosphere">
      <div className="px-[40px] pt-[148px] max-[640px]:px-5 max-[640px]:pt-32">
        <p className="mb-6 font-text text-[18px] font-semibold uppercase tracking-[0.04em] text-cloud/90">
          {heritage[locale]}
        </p>
        <p className="text-display text-cloud">KOPEČEK</p>
      </div>

      <div className="relative mt-auto h-[42vh] min-h-[260px] w-full">
        <Image
          src="/pics/tourismo.jpg"
          alt={texts.contact.logoAlt}
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover object-center"
          style={{
            maskImage: "linear-gradient(to bottom, transparent 0%, #000 34%)",
            WebkitMaskImage: "linear-gradient(to bottom, transparent 0%, #000 34%)",
          }}
        />
      </div>
    </section>
  );
}
