"use client";

import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import "../../lib/i18n";
import { Language } from "../../types";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation();
  const dropdownRef = useRef<HTMLDivElement>(null);

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const activeLocale = searchParams.get("lang") || "cs";

  useEffect(() => {
    if (i18n.language !== activeLocale) {
      i18n
        .changeLanguage(activeLocale)
        .catch((err) => console.error("Failed to change language:", err));
    }
  }, [activeLocale, i18n]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownVisible(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setDropdownVisible(false);
        setMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const languages: Language[] = [
    { code: "cs", label: "Čeština", flag: "/flags/cz.png" },
    { code: "en", label: "English", flag: "/flags/en.png" },
    { code: "de", label: "Deutsch", flag: "/flags/de.png" },
  ];

  const handleLanguageChange = (code: string) => {
    const currentHash = window.location.hash;
    const basePath = window.location.pathname;
    router.push(`${basePath}?lang=${code}${currentHash}`);
    setDropdownVisible(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent, code: string) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleLanguageChange(code);
    }
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-2 focus:left-2 focus:z-[100] focus:bg-yellow-400 focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded-md"
      >
        {t("accessibility.skipToContent")}
      </a>
      <nav
        className="sticky top-0 bg-gray-800 opacity-90 text-white p-4 flex justify-between items-center z-50"
        role="navigation"
        aria-label={t("accessibility.mainNavigation")}
      >
        <div className="flex items-center space-x-4">
          <div className="logo-container flex items-center">
            <Image
              src="/pics/logo-whiteyellow-nav.webp"
              alt="Autodoprava Kopeček - Logo"
              width={90}
              height={90}
              className="logo-animation"
              priority
            />
            <Link
              href={`/?lang=${activeLocale}#home`}
              className="hover:text-gray-200 block ml-4"
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
          id="main-menu"
          className={`${
            menuOpen ? "block" : "hidden"
          } lg:flex lg:space-x-6 bg-gray-800 lg:bg-transparent lg:flex-row lg:static absolute top-full left-0 w-full lg:w-auto p-4 lg:p-0`}
          role="menubar"
        >
          <li className="text-center" role="none">
            <Link
              href={`/?lang=${activeLocale}#about`}
              className="hover:text-yellow-400 block py-2 lg:py-0"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
            >
              {t("about.title")}
            </Link>
          </li>
          <li className="text-center" role="none">
            <Link
              href={`/?lang=${activeLocale}#services`}
              className="hover:text-yellow-400 block py-2 lg:py-0"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
            >
              {t("services.title")}
            </Link>
          </li>
          <li className="text-center" role="none">
            <Link
              href={`/?lang=${activeLocale}#fleet`}
              className="hover:text-yellow-400 block py-2 lg:py-0"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
            >
              {t("fleet.title")}
            </Link>
          </li>
          <li className="text-center" role="none">
            <Link
              href={`/?lang=${activeLocale}#contact`}
              className="hover:text-yellow-400 block py-2 lg:py-0"
              role="menuitem"
              onClick={() => setMenuOpen(false)}
            >
              {t("contact.title")}
            </Link>
          </li>
        </ul>

        <div className="flex items-center space-x-4">
          <button
            className="sm:block lg:hidden text-white focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2 focus:ring-offset-gray-800 rounded-md p-1 -mr-1"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-expanded={menuOpen}
            aria-controls="main-menu"
            aria-label={t("accessibility.menuToggle")}
          >
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setDropdownVisible(!dropdownVisible)}
              className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-yellow-400"
              aria-expanded={dropdownVisible}
              aria-haspopup="listbox"
              aria-label={t("accessibility.languageSelector")}
            >
              <Image
                src={
                  languages.find((lang) => lang.code === activeLocale)?.flag || ""
                }
                alt=""
                width={20}
                height={20}
                className="rounded-full"
                aria-hidden="true"
              />
              <span className="hidden sm:inline">
                {languages.find((lang) => lang.code === activeLocale)?.label}
              </span>
              <ChevronDown size={16} aria-hidden="true" />
            </button>
            {dropdownVisible && (
              <div
                className="absolute right-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg w-36"
                role="listbox"
                aria-label={t("accessibility.languageSelector")}
              >
                {languages.map(({ code, label, flag }) => (
                  <button
                    key={code}
                    onClick={() => handleLanguageChange(code)}
                    onKeyDown={(e) => handleKeyDown(e, code)}
                    className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-md last:rounded-b-md"
                    role="option"
                    aria-selected={code === activeLocale}
                  >
                    <Image
                      src={flag}
                      alt=""
                      width={20}
                      height={20}
                      className="rounded-full"
                      aria-hidden="true"
                    />
                    <span>{label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}
