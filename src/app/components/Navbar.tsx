'use client';

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { usePathname, useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import '../../lib/i18n'; // Ensure this points to the correct path for your i18n.ts file

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const currentLocale = pathname.split('/')[1] || 'cs'; // Extract locale from the URL

  const { t, i18n } = useTranslation(); // UseTranslation with default namespace 'common'
  const [dropdownVisible, setDropdownVisible] = useState(false);

  // Dynamically change language when URL locale changes
  useEffect(() => {
    if (i18n.language !== currentLocale) {
      i18n.changeLanguage(currentLocale).catch((err) =>
        console.error('Failed to change language:', err)
      );
    }
  }, [currentLocale, i18n]);

  const languages = [
    { code: 'cs', label: 'Čeština', flag: '/flags/cz.png' },
    { code: 'en', label: 'English', flag: '/flags/en.png' },
    { code: 'de', label: 'Deutsch', flag: '/flags/de.png' },
  ];

  const handleLanguageChange = (code: string) => {
    router.push(`/${code}${pathname.slice(currentLocale.length + 1)}`); // Update the URL with the new locale
    setDropdownVisible(false);
  };

  return (
    <nav className="sticky top-0 bg-gray-800 text-white p-4 flex justify-between items-center z-50">
      {/* Navbar Sections */}
      <ul className="flex space-x-6">
        <li>
          <Link href={`/${currentLocale}`} className="hover:text-gray-400">
            {t('home')}
          </Link>
        </li>
        <li>
          <Link href={`/${currentLocale}/about`} className="hover:text-gray-400">
            {t('about')}
          </Link>
        </li>
        <li>
          <Link href={`/${currentLocale}/services`} className="hover:text-gray-400">
            {t('services')}
          </Link>
        </li>
        <li>
          <Link href={`/${currentLocale}/fleet`} className="hover:text-gray-400">
            {t('fleet')}
          </Link>
        </li>
        <li>
          <Link href={`/${currentLocale}/contact`} className="hover:text-gray-400">
            {t('contact')}
          </Link>
        </li>
      </ul>

      {/* Language Dropdown */}
      <div className="relative">
        <button
          onClick={() => setDropdownVisible(!dropdownVisible)}
          className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
        >
          <Image
            src={languages.find((lang) => lang.code === currentLocale)?.flag || ''}
            alt={currentLocale}
            width={20}
            height={20}
            className="rounded-full"
          />
          <span>{languages.find((lang) => lang.code === currentLocale)?.label}</span>
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
