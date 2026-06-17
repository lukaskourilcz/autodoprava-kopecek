"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { SUPPORTED_LOCALES, LOCALE_DETAILS } from "@/lib/locale";
import { useClickAway } from "@/hooks/useClickAway";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { useContent } from "@/content/useContent";
import { uiStrings } from "@/lib/ui-strings";

export default function Navbar() {
  const router = useRouter();
  const { locale, texts } = useContent();
  const ui = uiStrings(locale);

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

  const activeSection = useScrollSpy(navLinks.map((link) => link.hash));
  const activeLanguage = LOCALE_DETAILS[locale];

  return (
    <nav className="sticky top-0 z-50 border-b border-white/5 bg-gray-900/95 text-white shadow-lg shadow-black/10 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}#home`}
          className="-ml-1 flex min-w-0 items-center gap-2 rounded px-1 focus-ring"
          aria-label={texts.contact.logoAlt}
        >
          <Image
            src="/pics/logo-whiteyellow-nav.png"
            alt=""
            width={881}
            height={411}
            className="logo-animation block h-9 w-auto"
            priority
          />
          <span className="hidden whitespace-nowrap text-[10px] font-bold uppercase leading-none tracking-wider xs:inline sm:text-[11px]">
            <span className="text-yellow-400">Autodoprava</span>
            <span className="text-white"> Kopeček</span>
          </span>
        </Link>

        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map(({ hash, label }) => {
            const isActive = activeSection === hash;
            return (
              <li key={hash}>
                <Link
                  href={`/${locale}#${hash}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative flex h-11 items-center rounded-md px-3 text-sm font-medium transition-colors focus-ring ${
                    isActive
                      ? "text-yellow-400"
                      : "text-gray-100 hover:bg-white/5 hover:text-yellow-400"
                  }`}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={`absolute inset-x-3 bottom-1.5 h-0.5 origin-left rounded-full bg-yellow-400 transition-transform duration-300 ${
                      isActive ? "scale-x-100" : "scale-x-0"
                    }`}
                  />
                </Link>
              </li>
            );
          })}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="relative" ref={languageMenuRef}>
            <button
              type="button"
              aria-label={ui.changeLanguage(activeLanguage.label)}
              aria-haspopup="menu"
              aria-expanded={languageMenuOpen}
              onClick={() => setLanguageMenuOpen((open) => !open)}
              className="flex h-11 items-center gap-1.5 rounded-md px-2 text-xs font-medium text-gray-100 transition-colors hover:bg-white/5 focus-ring sm:px-2.5"
            >
              <Image
                src={activeLanguage.flag}
                alt=""
                width={20}
                height={20}
                className="flex-shrink-0 rounded-full"
              />
              <span className="font-semibold">{activeLanguage.short}</span>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform duration-200 ${languageMenuOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              role="menu"
              className={`absolute right-0 mt-2 w-44 origin-top-right overflow-hidden rounded-lg bg-white py-1 text-gray-800 shadow-xl ring-1 ring-black/5 transition-all duration-150 ease-out ${
                languageMenuOpen
                  ? "translate-y-0 scale-100 opacity-100"
                  : "pointer-events-none invisible -translate-y-1 scale-95 opacity-0"
              }`}
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
                    className={`flex w-full items-center gap-3 px-4 py-2.5 text-sm hover:bg-gray-50 focus-visible:bg-gray-50 focus-visible:outline-none ${
                      code === locale
                        ? "bg-gray-50 font-semibold text-gray-900"
                        : "text-gray-700"
                    }`}
                  >
                    <Image src={flag} alt="" width={20} height={20} className="rounded-full" />
                    <span>{label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <button
            type="button"
            aria-label={mobileMenuOpen ? ui.closeMenu : ui.openMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-menu"
            className="inline-flex h-11 w-11 items-center justify-center rounded-md text-white transition-colors hover:bg-white/5 focus-ring lg:hidden"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <div
        className={`grid overflow-hidden bg-gray-900/98 backdrop-blur transition-[grid-template-rows,opacity] duration-300 ease-out lg:hidden ${
          mobileMenuOpen
            ? "grid-rows-[1fr] border-t border-white/5 opacity-100"
            : "grid-rows-[0fr] opacity-0"
        }`}
      >
        <ul
          id="primary-menu"
          className={`min-h-0 overflow-hidden px-4 py-2 ${mobileMenuOpen ? "" : "invisible"}`}
        >
          {navLinks.map(({ hash, label }, index) => (
            <li
              key={hash}
              style={{ transitionDelay: mobileMenuOpen ? `${index * 45}ms` : "0ms" }}
              className={`transition-all duration-300 ${
                mobileMenuOpen ? "translate-x-0 opacity-100" : "-translate-x-2 opacity-0"
              }`}
            >
              <Link
                href={`/${locale}#${hash}`}
                onClick={() => setMobileMenuOpen(false)}
                aria-current={activeSection === hash ? "true" : undefined}
                className={`block rounded-md px-3 py-3 text-base font-medium transition-colors focus-ring ${
                  activeSection === hash
                    ? "bg-white/5 text-yellow-400"
                    : "text-gray-100 hover:bg-white/5 hover:text-yellow-400"
                }`}
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
