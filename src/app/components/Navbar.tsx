"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown, Menu, X } from "lucide-react";
import "../../lib/i18n";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation();

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

  const languages = [
    { code: "cs", label: "Čeština", flag: "/flags/cz.png" },
    { code: "en", label: "English", flag: "/flags/en.png" },
    { code: "de", label: "Deutsch", flag: "/flags/de.png" },
  ];

  const handleLanguageChange = (code: string) => {
    const currentHash = window.location.hash; // Includes the hash (#services, #about)
    const basePath = window.location.pathname; // Base path of the URL (e.g., "/")
    router.push(`${basePath}?lang=${code}${currentHash}`); // Ensure correct order
    setDropdownVisible(false);
  };

  return (
    <nav className="sticky top-0 bg-gray-800 opacity-90 text-white p-4 flex justify-between items-center z-50">
      {/* Logo and Brand */}
      <div className="flex items-center space-x-4">
        <div className="logo-container flex items-center">
          <Image
            src="/pics/logo-white-nav.png"
            alt="Logo"
            width={85}
            height={85}
            className="logo-animation mx-3"
            priority
          />
          <span className="font-bold text-lg uppercase leading-tight ml-4">
  <span className="text-yellow-400">AUTODOPRAVA</span>
  <br />
  <span>KOPEČEK.CZ</span>
</span>
        </div>
        {/* Hamburger Icon */}
        <button
          className="sm:block lg:hidden text-white focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Navigation Links */}
      <ul
        className={`${
          menuOpen ? "block" : "hidden"
        } lg:flex space-y-4 lg:space-y-0 lg:space-x-6 bg-gray-800 lg:bg-transparent lg:flex-row lg:static absolute top-full left-0 w-full lg:w-auto p-4 pl-8 lg:p-0`}
      >
        <li>
          <Link
            href={`/?lang=${activeLocale}#about`}
            className="hover:text-yellow-400 block"
          >
            {t("about.title")}
          </Link>
        </li>
        <li>
          <Link
            href={`/?lang=${activeLocale}#services`}
            className="hover:text-yellow-400 block"
          >
            {t("services.title")}
          </Link>
        </li>
        <li>
          <Link
            href={`/?lang=${activeLocale}#fleet`}
            className="hover:text-yellow-400 block"
          >
            {t("fleet.title")}
          </Link>
        </li>
        <li>
          <Link
            href={`/?lang=${activeLocale}#contact`}
            className="hover:text-yellow-400 block"
          >
            {t("contact.title")}
          </Link>
        </li>
      </ul>

      {/* Language Selector */}
      <div className="relative">
        <button
          onClick={() => setDropdownVisible(!dropdownVisible)}
          className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
        >
          <Image
            src={
              languages.find((lang) => lang.code === activeLocale)?.flag || ""
            }
            alt={activeLocale}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span>
            {languages.find((lang) => lang.code === activeLocale)?.label}
          </span>
          <ChevronDown size={16} />
        </button>
        {dropdownVisible && (
          <div className="absolute right-0 mt-2 bg-white text-gray-800 rounded-md shadow-lg w-36">
            {languages.map(({ code, label, flag }) => (
              <button
                key={code}
                onClick={() => handleLanguageChange(code)}
                className="flex items-center space-x-2 w-full px-4 py-2 hover:bg-gray-100"
              >
                <Image
                  src={flag}
                  alt={code}
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
    </nav>
  );
}
