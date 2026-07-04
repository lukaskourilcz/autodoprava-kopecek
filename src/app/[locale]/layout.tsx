import { notFound } from "next/navigation";
import type { Metadata } from "next";
import {
  SUPPORTED_LOCALES,
  isSupportedLocale,
  type SupportedLocale,
} from "@/lib/locale";
import { defaultContent } from "@/content/defaults";
import { LocaleProvider } from "@/content/locale-context";
import Navbar from "../components/Navbar";

const SITE_URL = "https://www.autobusyhodonin.cz";
const OG_LOCALES: Record<SupportedLocale, string> = {
  cs: "cs_CZ",
  en: "en_GB",
  de: "de_DE",
};

export function generateStaticParams() {
  return SUPPORTED_LOCALES.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!isSupportedLocale(locale)) return {};
  const meta = defaultContent.texts[locale].meta;

  return {
    title: meta.title,
    description: meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: { cs: "/cs", en: "/en", de: "/de" },
    },
    openGraph: {
      title: meta.title,
      description: meta.description,
      url: `${SITE_URL}/${locale}`,
      type: "website",
      locale: OG_LOCALES[locale],
      alternateLocale: Object.values(OG_LOCALES).filter(
        (value) => value !== OG_LOCALES[locale]
      ),
      images: [
        {
          url: `${SITE_URL}/og.jpg`,
          width: 1200,
          height: 630,
          alt: "Autodoprava Kopeček",
        },
      ],
    },
  };
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
