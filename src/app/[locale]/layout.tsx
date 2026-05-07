import { notFound } from "next/navigation";
import { SUPPORTED_LOCALES, type SupportedLocale } from "../../lib/locale";
import { TranslationProvider } from "../components/TranslationProvider";
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
  if (!(SUPPORTED_LOCALES as readonly string[]).includes(locale)) {
    notFound();
  }
  const typedLocale = locale as SupportedLocale;

  return (
    <TranslationProvider locale={typedLocale}>
      <Navbar locale={typedLocale} />
      {children}
    </TranslationProvider>
  );
}
