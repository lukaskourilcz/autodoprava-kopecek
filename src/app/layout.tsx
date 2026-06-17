import { headers } from "next/headers";
import { Inter, Plus_Jakarta_Sans } from "next/font/google";
import "../styles/globals.css";
import { normalizeLocale } from "../lib/locale";
import { uiStrings } from "../lib/ui-strings";

const fontSans = Inter({
  subsets: ["latin", "latin-ext"],
  variable: "--font-sans",
  display: "swap",
});

const fontDisplay = Plus_Jakarta_Sans({
  subsets: ["latin", "latin-ext"],
  variable: "--font-display",
  display: "swap",
  weight: ["600", "700", "800"],
});

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
  const ui = uiStrings(lang);

  return (
    <html lang={lang} suppressHydrationWarning>
      <body className={`${fontSans.variable} ${fontDisplay.variable}`}>
        {/* Enable scroll-reveal before first paint; gated so no-JS visitors still
            see content (the hidden state in globals.css requires this class). */}
        <script
          dangerouslySetInnerHTML={{
            __html: "document.documentElement.classList.add('reveal-enabled')",
          }}
        />
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] focus:bg-yellow-500 focus:text-gray-900 focus:px-4 focus:py-2 focus:rounded-md focus:font-semibold"
        >
          {ui.skipToContent}
        </a>
        {children}
      </body>
    </html>
  );
}
