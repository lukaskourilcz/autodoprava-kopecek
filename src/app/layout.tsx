import { Suspense } from "react";
import "../styles/globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Autodoprava Kopeček",
  description:
    "Jsme tu pro vás, ať už potřebujete zajistit pohodlnou přepravu osob nebo bezpečný transport nákladu.",
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
