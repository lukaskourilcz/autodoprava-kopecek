import { Suspense } from "react";
import "../styles/globals.css";
import Navbar from "./components/Navbar";

export const metadata = {
  title: "Autodoprava Kopecek",
  description: "Your trusted transportation partner",
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
