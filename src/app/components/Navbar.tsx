"use client";

import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import { SUPPORTED_LOCALES, type SupportedLocale } from "../../lib/locale";
import { useTranslation } from "./TranslationProvider";

const languages = [
  { code: "cs" as const, label: "Čeština", short: "CS", flag: "/flags/cz.png" },
  { code: "en" as const, label: "English", short: "EN", flag: "/flags/en.png" },
  { code: "de" as const, label: "Deutsch", short: "DE", flag: "/flags/de.png" },
];

export default function Navbar({ locale }: { locale: SupportedLocale }) {
  const router = useRouter();
  const { t } = useTranslation();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setDropdownVisible(false);
      }
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setDropdownVisible(false);
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onClickOutside);
      document.removeEventListener("keydown", onKey);
    };
  }, []);

  const handleLanguageChange = (code: (typeof SUPPORTED_LOCALES)[number]) => {
    const currentHash =
      typeof window !== "undefined" ? window.location.hash : "";
    router.replace(`/${code}${currentHash}`, { scroll: false });
    setDropdownVisible(false);
  };

  const navLinks = [
    { hash: "about", label: t("about.title") },
    { hash: "services", label: t("services.title") },
    { hash: "fleet", label: t("fleet.title") },
    { hash: "contact", label: t("contact.title") },
  ];

  const activeLang =
    languages.find((lang) => lang.code === locale) ?? languages[0];

  return (
    <nav className="sticky top-0 z-50 bg-gray-900/95 backdrop-blur supports-[backdrop-filter]:bg-gray-900/80 text-white shadow-lg shadow-black/10 border-b border-white/5">
      <div className="mx-auto flex h-12 max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8">
        <Link
          href={`/${locale}#home`}
          className="flex items-center gap-2 min-w-0 -ml-1 px-1 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
          aria-label={t("contact.logoAlt")}
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
              className="block px-3 h-9 leading-9 text-sm font-medium text-gray-100 hover:text-yellow-400 hover:bg-white/5 rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
              >
                {label}
              </Link>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="relative" ref={dropdownRef}>
            <button
              type="button"
              aria-label={`Změnit jazyk (aktuální: ${activeLang.label})`}
              aria-haspopup="menu"
              aria-expanded={dropdownVisible}
              onClick={() => setDropdownVisible(!dropdownVisible)}
              className="flex items-center gap-1.5 px-2 sm:px-2.5 h-9 text-xs font-medium text-gray-100 hover:bg-white/5 rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
            >
              <Image
                src={activeLang.flag}
                alt=""
                width={20}
                height={20}
                className="rounded-full flex-shrink-0"
              />
              <span className="font-semibold">{activeLang.short}</span>
              <ChevronDown
                size={14}
                aria-hidden="true"
                className={`transition-transform ${
                  dropdownVisible ? "rotate-180" : ""
                }`}
              />
            </button>
            {dropdownVisible && (
              <div
                role="menu"
                className="absolute right-0 mt-2 w-44 bg-white text-gray-800 rounded-lg shadow-xl ring-1 ring-black/5 py-1 overflow-hidden"
              >
                {languages.map(({ code, label, flag }) => (
                  <button
                    type="button"
                    role="menuitem"
                    key={code}
                    onClick={() => handleLanguageChange(code)}
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
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
            aria-expanded={menuOpen}
            aria-controls="primary-menu"
            className="lg:hidden inline-flex items-center justify-center w-9 h-9 rounded-md text-white hover:bg-white/5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      <ul
        id="primary-menu"
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:hidden border-t border-white/5 bg-gray-900/98 backdrop-blur px-4 py-2`}
      >
        {navLinks.map(({ hash, label }) => (
          <li key={hash}>
            <Link
              href={`/${locale}#${hash}`}
              onClick={() => setMenuOpen(false)}
              className="block px-3 py-3 text-base font-medium text-gray-100 hover:text-yellow-400 hover:bg-white/5 rounded-md transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
