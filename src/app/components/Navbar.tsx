'use client';

import { ChevronDown } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

export default function Navbar() {
    const [language, setLanguage] = useState("cz");
    const [dropdownVisible, setDropdownVisible] = useState(false); // State for dropdown visibility

    const languages = [
        { code: "cz", label: "Čeština", flag: "/flags/cz.png" },
        { code: "en", label: "English", flag: "/flags/en.png" },
        { code: "de", label: "Deutsch", flag: "/flags/de.png" },
    ];

    const handleLanguageChange = (code: string) => {
        setLanguage(code);
        setDropdownVisible(false); // Close the dropdown after selecting a language
        // Optional: Add logic to change app language here
    };

    return (
        <nav className="sticky top-0 bg-gray-800 text-white p-4 flex justify-between items-center z-50">
            {/* Left Navigation Links */}
            <div>
                <ul className="flex space-x-6 pl-5">
                    <li>
                        <Link href="/" className="hover:text-gray-400">
                            Úvod
                        </Link>
                    </li>
                    <li>
                        <Link href="/o-nas" className="hover:text-gray-400">
                            O nás
                        </Link>
                    </li>
                    <li>
                        <Link href="/sluzby" className="hover:text-gray-400">
                            Služby
                        </Link>
                    </li>
                    <li>
                        <Link href="/vozovy-park" className="hover:text-gray-400">
                            Vozový park
                        </Link>
                    </li>
                    <li>
                        <Link href="/kontakt" className="hover:text-gray-400">
                            Kontakt
                        </Link>
                    </li>
                </ul>
            </div>

            {/* Language Dropdown */}
            <div className="relative">
                <button
                    onClick={() => setDropdownVisible(!dropdownVisible)} // Toggle dropdown visibility
                    className="flex items-center space-x-2 bg-gray-700 px-4 py-2 rounded-md hover:bg-gray-600"
                >
                    <Image
                        src={languages.find((lang) => lang.code === language)?.flag || ""}
                        alt={language}
                        width={20}
                        height={20}
                        className="rounded-full"
                    />
                    <span>
                        {languages.find((lang) => lang.code === language)?.label}
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
