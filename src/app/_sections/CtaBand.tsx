"use client";

import { Phone, Mail } from "lucide-react";
import { useContent } from "@/content/useContent";
import { telHref, mailtoHref } from "@/lib/contactLinks";
import { Button } from "../components/ui/Button";
import { Reveal } from "../components/ui/Reveal";

export default function CtaBand() {
  const { texts } = useContent();
  const { cta, contact } = texts;

  return (
    <section className="section bg-brand">
      <div className="container-site py-14 sm:py-16">
        <Reveal>
          <div className="flex flex-col lg:flex-row lg:items-center gap-8 lg:gap-12">
            <div className="lg:flex-1">
              <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-ink">
                {cta.title}
              </h2>
              <p className="mt-2 text-ink/80 leading-relaxed max-w-xl">{cta.description}</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 flex-shrink-0">
              <Button href={telHref(contact.phone)} variant="secondary">
                <Phone size={18} aria-hidden="true" />
                {contact.callCta}: {contact.phone}
              </Button>
              <Button
                href={mailtoHref(contact.email, contact.mailSubject)}
                variant="outlineDark"
              >
                <Mail size={18} aria-hidden="true" />
                {contact.emailCta}
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
