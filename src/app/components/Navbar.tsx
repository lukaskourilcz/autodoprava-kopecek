"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { SUPPORTED_LOCALES, LOCALE_DETAILS } from "@/lib/locale";
import { useClickAway } from "@/hooks/useClickAway";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useContent } from "@/content/useContent";

export default function Navbar() {
  const router = useRouter();
  const { locale, texts } = useContent();

  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);

  useClickAway(languageMenuRef, () => setLanguageMenuOpen(false), languageMenuOpen);
  useEscapeKey(() => {
    setLanguageMenuOpen(false);
    setMobileMenuOpen(false);
  });

  // The nav floats transparently over the atmospheric hero, then settles onto a
  // solid onyx surface once the hero scrolls away so it stays legible on white.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const changeLanguage = (code: (typeof SUPPORTED_LOCALES)[number]) => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`/${code}${hash}`, { scroll: false });
    setLanguageMenuOpen(false);
  };

  const navLinks = [
    { hash: "about", label: texts.about.title },
    { hash: "services", label: texts.services.title },
    { hash: "fleet", label: texts.fleet.title },
    { hash: "contact", label: texts.contact.title },
  ];

  const activeLanguage = LOCALE_DETAILS[locale];
  const onyxSurface = scrolled || mobileMenuOpen;

  return (
    <nav
      className={`fixed top-0 inset-x-0 z-50 text-cloud transition-colors duration-300 ${
        onyxSurface ? "bg-onyx" : "bg-transparent"
      }`}
    >
      <div className="flex h-[76px] items-center justify-between gap-4 px-[40px] max-[640px]:px-5">
        <Link
          href={`/${locale}#home`}
          className="flex items-center gap-3 min-w-0 focus-ring"
          aria-label={texts.contact.logoAlt}
        >
          <Image
            src="/pics/logo-white-nav.png"
            alt=""
            width={881}
            height={411}
            className="logo-animation h-8 w-auto block"
            priority
          />
          <span className="hidden sm:inline font-text font-semibold tracking-body text-[18px] leading-none whitespace-nowrap">
            Autodoprava Kopeček
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-7">
          {navLinks.map(({ hash, label }) => (
            <li key={hash}>
              <Link
                href={`/${locale}#${hash}`}
                className="block text-[18px] font-normal tracking-body text-cloud/90 hover:text-cloud transition-colors focus-ring"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="relative" ref={languageMenuRef}>
            <button
              type="button"
              aria-label={`Změnit jazyk (aktuální: ${activeLanguage.label})`}
              aria-haspopup="menu"
              aria-expanded={languageMenuOpen}
              onClick={() => setLanguageMenuOpen((open) => !open)}
              className="flex items-center gap-1.5 px-2.5 h-10 text-[16px] font-normal text-cloud/90 hover:text-cloud transition-colors focus-ring"
            >
              <Image
                src={activeLanguage.flag}
                alt=""
                width={20}
                height={20}
                className="flex-shrink-0"
              />
              <span className="font-semibold">{activeLanguage.short}</span>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform ${languageMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
            {languageMenuOpen && (
              <div
                role="menu"
                className="absolute right-0 mt-3 w-48 bg-onyx text-cloud border border-cloud/15 py-1"
              >
                {SUPPORTED_LOCALES.map((code) => {
                  const { label, flag } = LOCALE_DETAILS[code];
                  return (
                    <button
                      type="button"
                      role="menuitem"
                      key={code}
                      onClick={() => changeLanguage(code)}
                      aria-current={code === locale}
                      className={`flex items-center gap-3 w-full px-4 py-3 text-[16px] hover:bg-cloud/10 focus-visible:bg-cloud/10 focus-visible:outline-none ${
                        code === locale ? "font-semibold text-cloud" : "text-cloud/70"
                      }`}
                    >
                      <Image src={flag} alt="" width={20} height={20} />
                      <span>{label}</span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-menu"
            className="lg:hidden inline-flex items-center justify-center w-10 h-10 text-cloud hover:bg-cloud/10 transition-colors focus-ring"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <ul
        id="primary-menu"
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } lg:hidden border-t border-cloud/10 bg-onyx px-5 py-2`}
      >
        {navLinks.map(({ hash, label }) => (
          <li key={hash}>
            <Link
              href={`/${locale}#${hash}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block py-4 text-[18px] font-normal tracking-body text-cloud/90 hover:text-cloud transition-colors focus-ring"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
