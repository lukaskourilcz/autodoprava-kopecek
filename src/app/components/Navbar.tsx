"use client";

import { useState, useRef } from "react";
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
  const languageMenuRef = useRef<HTMLDivElement>(null);

  useClickAway(languageMenuRef, () => setLanguageMenuOpen(false), languageMenuOpen);
  useEscapeKey(() => {
    setLanguageMenuOpen(false);
    setMobileMenuOpen(false);
  });

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

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80 text-white shadow-lg shadow-black/10 border-b border-white/5">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}#home`}
          className="flex items-center gap-2 min-w-0 -ml-1 px-1 rounded focus-ring"
          aria-label={texts.contact.logoAlt}
        >
          <Image
            src="/pics/logo-whiteyellow-nav.png"
            alt=""
            width={881}
            height={411}
            className="logo-animation h-8 w-auto block"
            priority
          />
          <span className="hidden xs:inline sm:inline font-bold uppercase tracking-wider leading-none text-[10px] sm:text-[11px] whitespace-nowrap">
            <span className="text-yellow-400">Autodoprava</span>
            <span className="text-white"> Kopeček</span>
          </span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {navLinks.map(({ hash, label }) => (
            <li key={hash}>
              <Link
                href={`/${locale}#${hash}`}
                className="block px-3 h-9 leading-9 text-sm font-medium text-gray-100 hover:text-yellow-400 hover:bg-white/5 rounded-md transition-colors focus-ring"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="relative" ref={languageMenuRef}>
            <button
              type="button"
              aria-label={`Změnit jazyk (aktuální: ${activeLanguage.label})`}
              aria-haspopup="menu"
              aria-expanded={languageMenuOpen}
              onClick={() => setLanguageMenuOpen((open) => !open)}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 h-9 text-xs font-medium text-gray-100 hover:bg-white/5 rounded-md transition-colors focus-ring"
            >
              <Image
                src={activeLanguage.flag}
                alt=""
                width={20}
                height={20}
                className="rounded-full flex-shrink-0"
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
                className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-lg shadow-xl ring-1 ring-black/5 py-1 overflow-hidden"
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
                      className={`flex items-center gap-3 w-full px-4 py-2.5 text-sm hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none ${
                        code === locale
                          ? "font-semibold text-gray-900 bg-gray-50"
                          : "text-gray-700"
                      }`}
                    >
                      <Image
                        src={flag}
                        alt=""
                        width={20}
                        height={20}
                        className="rounded-full"
                      />
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
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-md text-white hover:bg-white/5 transition-colors focus-ring"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <ul
        id="primary-menu"
        className={`${
          mobileMenuOpen ? "block" : "hidden"
        } lg:hidden border-t border-white/5 bg-gray-900/98 backdrop-blur px-4 py-2`}
      >
        {navLinks.map(({ hash, label }) => (
          <li key={hash}>
            <Link
              href={`/${locale}#${hash}`}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-3 text-base font-medium text-gray-100 hover:text-yellow-400 hover:bg-white/5 rounded-md transition-colors focus-ring"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
