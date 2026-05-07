import { Suspense } from "react";
import "../styles/globals.css";
import Navbar from "./components/Navbar";
import HtmlLangSync from "./components/HtmlLangSync";

export const metadata = {
  title: "Autodoprava Kopeček | Váš spolehlivý dopravní partner",
  description:
    "Moderní a spolehlivá autobusová doprava v Hodoníně. Zajišťujeme komfortní přepravu pro skupiny i jednotlivce.",
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Autodoprava Kopeček | Váš spolehlivý dopravní partner",
    description:
      "Moderní a spolehlivá autobusová doprava v Hodoníně. Zajišťujeme komfortní přepravu pro skupiny i jednotlivce.",
    url: "https://www.autobusyhodonin.cz",
    type: "website",
    images: [
      {
        url: "https://www.autobusyhodonin.cz/pics/uvodka.jpg",
        width: 750,
        height: 500,
        alt: "Autodoprava Kopeček",
      },
    ],
    locale: "cs_CZ",
  },
};

const NavbarSkeleton = () => (
  <div
    aria-hidden="true"
    className="sticky top-0 bg-gray-800 text-white p-4 h-[122px] z-50"
  />
);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-yellow-500 focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
        >
          Přeskočit na obsah
        </a>
        <HtmlLangSync />
        <Suspense fallback={<NavbarSkeleton />}>
          <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
