import "../styles/globals.css";
import Navbar from "./components/Navbar";
import '../i18n'

export const metadata = {
  title: "Autodoprava Kopecek",
  description: "Your trusted transportation partner",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs">
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
