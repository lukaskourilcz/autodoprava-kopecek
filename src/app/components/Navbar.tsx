'use client';

import { ChevronDown } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentLocale = searchParams.get('locale') || 'cs';

  const [dropdownVisible, setDropdownVisible] = useState(false);
  const { t, i18n } = useTranslation();

  i18n.changeLanguage(currentLocale); // Set the language dynamically

  const languages = [
    { code: 'cs', label: 'Čeština', flag: '/flags/cz.png' },
    { code: 'en', label: 'English', flag: '/flags/en.png' },
    { code: 'de', label: 'Deutsch', flag: '/flags/de.png' },
  ];

  return (
    <nav className="sticky top-0 bg-gray-800 text-white p-4 flex justify-between items-center z-50">
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
              <Link
                key={code}
                href={`${pathname}?locale=${code}`} // Update locale in the URL
                onClick={() => setDropdownVisible(false)}
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
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
