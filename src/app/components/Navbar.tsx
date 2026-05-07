"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import "../../lib/i18n";
import { normalizeLocale, SUPPORTED_LOCALES } from "../../lib/i18n";

const languages = [
  { code: "cs" as const, label: "Čeština", short: "CS", flag: "/flags/cz.png" },
  { code: "en" as const, label: "English", short: "EN", flag: "/flags/en.png" },
  { code: "de" as const, label: "Deutsch", short: "DE", flag: "/flags/de.png" },
];

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeLocale = normalizeLocale(searchParams.get("lang"));
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (i18n.language !== activeLocale) {
      i18n
        .changeLanguage(activeLocale)
        .catch((err) => console.error("Failed to change language:", err));
    }
  }, [activeLocale, i18n]);

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
    const basePath =
      typeof window !== "undefined" ? window.location.pathname : "/";
    router.replace(`${basePath}?lang=${code}${currentHash}`, { scroll: false });
    setDropdownVisible(false);
  };

  const navLinks = [
    { hash: "about", label: t("about.title") },
    { hash: "services", label: t("services.title") },
    { hash: "fleet", label: t("fleet.title") },
    { hash: "contact", label: t("contact.title") },
  ];

  const activeLang =
    languages.find((lang) => lang.code === activeLocale) ?? languages[0];

  return (
    <nav className="sticky top-0 bg-gray-800/95 text-white p-4 flex justify-between items-center z-50">
      <div className="flex items-center space-x-4">
        <div className="logo-container flex items-center">
          <Image
            src="/pics/logo-whiteyellow-nav.png"
            alt={t("contact.logoAlt")}
            width={90}
            height={90}
            className="logo-animation"
            priority
          />
          <Link
            href={`/?lang=${activeLocale}#home`}
            className="hover:text-gray-200 block ml-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 rounded"
          >
            <span className="font-bold text-base md:text-lg uppercase md:leading-tight">
              <span className="text-yellow-400">AUTODOPRAVA</span>
              <br />
              <span>KOPEČEK</span>
            </span>
          </Link>
        </div>
      </div>

      <ul
        id="primary-menu"
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:flex lg:space-x-6 bg-gray-800 lg:bg-transparent lg:flex-row lg:static absolute top-full left-0 w-full lg:w-auto p-4 lg:p-0`}
      >
        {navLinks.map(({ hash, label }) => (
          <li key={hash} className="text-center">
            <Link
              href={`/?lang=${activeLocale}#${hash}`}
              onClick={() => setMenuOpen(false)}
              className="hover:text-yellow-400 block py-3 lg:py-1 px-2 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 rounded"
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center space-x-4">
        <button
          type="button"
          aria-label={menuOpen ? "Zavřít menu" : "Otevřít menu"}
          aria-expanded={menuOpen}
          aria-controls="primary-menu"
          className="block lg:hidden text-white p-2 -mr-1 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400 rounded"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
        <div className="relative" ref={dropdownRef}>
          <button
            type="button"
            aria-label={`Změnit jazyk (aktuální: ${activeLang.label})`}
            aria-haspopup="menu"
            aria-expanded={dropdownVisible}
            onClick={() => setDropdownVisible(!dropdownVisible)}
            className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-yellow-400"
          >
            <Image
              src={activeLang.flag}
              alt=""
              width={20}
              height={20}
              className="rounded-full"
            />
            <span className="sm:hidden font-semibold">{activeLang.short}</span>
            <span className="hidden sm:inline">{activeLang.label}</span>
            <ChevronDown size={16} aria-hidden="true" />
          </button>
          {dropdownVisible && (
            <div
              role="menu"
              className="absolute right-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg w-44 py-1"
            >
              {languages.map(({ code, label, flag }) => (
                <button
                  type="button"
                  role="menuitem"
                  key={code}
                  onClick={() => handleLanguageChange(code)}
                  aria-current={code === activeLocale}
                  className={`flex items-center space-x-3 w-full px-4 py-3 hover:bg-gray-100 focus-visible:bg-gray-100 focus-visible:outline-none ${
                    code === activeLocale ? "font-semibold" : ""
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
      </div>
    </nav>
  );
}
