import { Suspense } from "react";
import "../styles/globals.css";
import Navbar from "./components/Navbar";
import Head from "next/head";

export const metadata = {
  title: "Autodoprava Kopeček | Váš spolehlivý dopravní partner",
  description:
    "Jsme tu pro vás, ať už potřebujete zajistit pohodlnou přepravu osob nebo bezpečný transport nákladu.",
    icons: {
      icon: "/favicon.ico", 
      shortcut: "/favicon.ico",
      apple: "/favicon.png",
    },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="cs">
      <Head>
      <meta property="og:title" content="Autodoprava Kopeček | Váš spolehlivý dopravní partner" />
        <meta property="og:description" content="Moderní a spolehlivá autobusová doprava v Hodoníně. Zajišťujeme komfortní přepravu pro skupiny i jednotlivce." />
        <meta property="og:image" content="https://www.autobusyhodonin.cz/_next/image?url=%2Fpics%2Ftourismo.png&w=750&q=75" />
        <meta property="og:url" content="https://www.autobusyhodonin.cz" />
        <meta property="og:type" content="website" />
        <meta property="og:locale" content="cs_CZ" />
      </Head>
      <body>
        <Suspense fallback={<p>Loading navbar...</p>}>
          <Navbar />
        </Suspense>
        {children}
      </body>
    </html>
  );
}