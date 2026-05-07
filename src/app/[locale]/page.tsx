import { notFound } from "next/navigation";
import LocalePage from "./LocalePage";
import { SUPPORTED_LOCALES, type SupportedLocale } from "../../lib/locale";

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!(SUPPORTED_LOCALES as readonly string[]).includes(locale)) {
    notFound();
  }
  return <LocalePage locale={locale as SupportedLocale} />;
}
