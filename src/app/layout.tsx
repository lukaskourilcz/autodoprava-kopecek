import { Suspense } from "react";
import "../styles/globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Autodoprava Kopeček | Váš spolehlivý dopravní partner",
  description: "Moderní a spolehlivá autobusová doprava v Hodoníně. Zajišťujeme komfortní přepravu pro skupiny i jednotlivce.",
  icons: {
    icon: "/favicon.ico", 
    shortcut: "/favicon.ico",
    apple: "/favicon.png",
  },
  openGraph: {
    title: "Autodoprava Kopeček | Váš spolehlivý dopravní partner",
    description: "Moderní a spolehlivá autobusová doprava v Hodoníně. Zajišťujeme komfortní přepravu pro skupiny i jednotlivce.",
    url: "https://www.autobusyhodonin.cz",
    type: "website",
    images: [
      {
        url: "https://www.autobusyhodonin.cz/_next/image?url=%2Fpics%2Ftourismo.png&w=750&q=75",
        width: 750,
        height: 500,
        alt: "Autodoprava Kopeček autobus",
      },
    ],
    locale: "cs_CZ",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <body>
        <Suspense fallback={<p>Loading navbar...</p>}>
          <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}
