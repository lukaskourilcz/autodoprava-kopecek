"use client";

import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { ChevronDown } from "lucide-react";
import "../../lib/i18n";

export default function Navbar() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { t, i18n } = useTranslation();

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const activeLocale = searchParams.get("lang") || "cs"; // Get the current language from query params

  // Change language only after render
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
    router.push(`/?lang=${code}`);
    setDropdownVisible(false);
  };

  return (
    <nav className="sticky top-0 bg-gray-800 text-white p-4 flex justify-between items-center z-50">
      <ul className="flex space-x-6">
        <li>
          <Link href={`/?lang=${activeLocale}`} className="hover:text-gray-400">
            {t("home.title")}
          </Link>
        </li>
        <li>
          <Link
            href={`/?lang=${activeLocale}#about`}
            className="hover:text-gray-400"
          >
            {t("about.title")}
          </Link>
        </li>
        <li>
          <Link
            href={`/?lang=${activeLocale}#services`}
            className="hover:text-gray-400"
          >
            {t("services.title")}
          </Link>
        </li>
        <li>
          <Link
            href={`/?lang=${activeLocale}#fleet`}
            className="hover:text-gray-400"
          >
            {t("fleet.title")}
          </Link>
        </li>
        <li>
          <Link
            href={`/?lang=${activeLocale}#contact`}
            className="hover:text-gray-400"
          >
            {t("contact.title")}
          </Link>
        </li>
      </ul>

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
