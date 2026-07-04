import { headers } from "next/headers";
import { Archivo, Inter } from "next/font/google";
import "../styles/globals.css";
import { normalizeLocale } from "../lib/locale";
import { defaultContent } from "../content/defaults";

const inter = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-inter",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin", "latin-ext"],
  variable: "--font-archivo",
  display: "swap",
});

const SITE_URL = "https://www.autobusyhodonin.cz";

export const metadata = {
  metadataBase: new URL(SITE_URL),
  alternates: {
    languages: { cs: "/cs", en: "/en", de: "/de" },
  },
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
        url: "https://www.autobusyhodonin.cz/og.jpg",
        width: 1200,
        height: 630,
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
  const { skipToContent } = defaultContent.texts[lang].a11y;
  const contact = defaultContent.texts.cs.contact;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Autodoprava Kopeček",
    description: defaultContent.texts[lang].home.description,
    foundingDate: "2012",
    telephone: contact.phone,
    email: contact.email,
    url: SITE_URL,
    image: `${SITE_URL}/pics/uvodka.jpg`,
    address: {
      "@type": "PostalAddress",
      streetAddress: contact.addressLine1,
      addressLocality: "Lužice",
      postalCode: "696 18",
      addressCountry: "CZ",
    },
    areaServed: "Hodonín, Jihomoravský kraj, Česká republika",
  };

  return (
    <html lang={lang} className={`${inter.variable} ${archivo.variable}`}>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-brand focus:text-ink focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
        >
          {skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
