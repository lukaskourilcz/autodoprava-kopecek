import { headers } from "next/headers";
import "../styles/globals.css";
import { normalizeLocale } from "../lib/locale";

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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const h = await headers();
  const lang = normalizeLocale(h.get("x-locale"));

  return (
    <html lang={lang}>
      <body>
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-yellow-500 focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
        >
          Přeskočit na obsah
        </a>
        {children}
      </body>
    </html>
  );
}
