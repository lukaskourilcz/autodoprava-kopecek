"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { SUPPORTED_LOCALES, LOCALE_DETAILS } from "@/lib/locale";
import { useClickAway } from "@/hooks/useClickAway";
import { useEscapeKey } from "@/hooks/useEscapeKey";
import { useActiveSection } from "@/hooks/useActiveSection";
import { useContent } from "@/content/useContent";

const SECTION_IDS = ["about", "services", "fleet", "contact"] as const;

export default function Navbar() {
  const router = useRouter();
  const { locale, texts } = useContent();

  const [languageMenuOpen, setLanguageMenuOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const languageMenuRef = useRef<HTMLDivElement>(null);
  const activeSection = useActiveSection(SECTION_IDS);

  useClickAway(languageMenuRef, () => setLanguageMenuOpen(false), languageMenuOpen);
  useEscapeKey(() => {
    setLanguageMenuOpen(false);
    setMobileMenuOpen(false);
  });

  // Lock page scroll behind the fullscreen mobile menu.
  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  const changeLanguage = (code: (typeof SUPPORTED_LOCALES)[number]) => {
    const hash = typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`/${code}${hash}`, { scroll: false });
    setLanguageMenuOpen(false);
  };

  const navLinks = SECTION_IDS.map((hash) => ({
    hash,
    label: texts[hash].title,
  }));

  const activeLanguage = LOCALE_DETAILS[locale];

  return (
    <>
    <nav className="sticky top-0 z-50 bg-ink/95 backdrop-blur supports-[backdrop-filter]:bg-ink/85 text-white border-b border-white/10">
      <div className="container-site flex h-14 max-w-7xl items-center justify-between gap-3">
        <Link
          href={`/${locale}#home`}
          className="flex items-center gap-2.5 min-w-0 -ml-1 px-1 rounded focus-ring"
          aria-label={texts.contact.logoAlt}
          onClick={() => setMobileMenuOpen(false)}
        >
          <Image
            src="/pics/logo-whiteyellow-nav.png"
            alt=""
            width={881}
            height={411}
            className="logo-animation h-9 w-auto block"
            priority
          />
          <span className="hidden min-[400px]:inline font-display font-bold uppercase tracking-wider leading-none text-xs sm:text-[13px] whitespace-nowrap">
            <span className="text-brand-light">Autodoprava</span>
            <span className="text-white"> Kopeček</span>
          </span>
        </Link>

        <ul className="hidden md:flex items-center gap-1">
          {navLinks.map(({ hash, label }) => {
            const isActive = activeSection === hash;
            return (
              <li key={hash}>
                <Link
                  href={`/${locale}#${hash}`}
                  aria-current={isActive ? "true" : undefined}
                  className={`relative block px-3 h-10 leading-10 text-sm font-medium rounded-md transition-colors focus-ring ${
                    isActive
                      ? "text-brand-light"
                      : "text-gray-100 hover:text-brand-light hover:bg-white/5"
                  }`}
                >
                  {label}
                  <span
                    aria-hidden="true"
                    className={`absolute left-3 right-3 bottom-1.5 h-0.5 rounded-full bg-brand transition-opacity ${
                      isActive ? "opacity-100" : "opacity-0"
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
              aria-label={`${texts.a11y.changeLanguage} (${activeLanguage.label})`}
              aria-haspopup="menu"
              aria-expanded={languageMenuOpen}
              onClick={() => setLanguageMenuOpen((open) => !open)}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 h-10 text-xs font-medium text-gray-100 hover:bg-white/5 rounded-md transition-colors focus-ring"
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
            aria-label={mobileMenuOpen ? texts.a11y.closeMenu : texts.a11y.openMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="primary-menu"
            className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md text-white hover:bg-white/5 transition-colors focus-ring"
            onClick={() => setMobileMenuOpen((open) => !open)}
          >
            {mobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

    </nav>

    {/* Fullscreen mobile menu. Sits outside <nav> because its backdrop-filter
        would otherwise become the containing block of this fixed overlay. */}
    <div
      id="primary-menu"
      className={`md:hidden fixed inset-x-0 top-[var(--nav-height)] bottom-0 z-40 bg-ink transition-all duration-300 ease-out ${
        mobileMenuOpen ? "opacity-100 visible translate-y-0" : "opacity-0 invisible -translate-y-2"
      }`}
    >
      <ul className="container-site pt-6">
        {navLinks.map(({ hash, label }) => (
          <li key={hash}>
            <Link
              href={`/${locale}#${hash}`}
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between py-4 font-display text-2xl font-semibold text-white border-b border-white/10 hover:text-brand-light transition-colors focus-ring"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
}
