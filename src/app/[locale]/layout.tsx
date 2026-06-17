import { notFound } from "next/navigation";
import { SUPPORTED_LOCALES, isSupportedLocale } from "@/lib/locale";
import { LocaleProvider } from "@/content/locale-context";
import Navbar from "../components/Navbar";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) {
    notFound();
  }

  return (
    <LocaleProvider locale={locale}>
      <Navbar />
      {children}
    </LocaleProvider>
  );
}
