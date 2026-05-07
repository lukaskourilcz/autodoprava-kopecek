import LocalePage from "./LocalePage";
import type { SupportedLocale } from "../../lib/locale";

export const dynamicParams = false;

export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return <LocalePage locale={locale as SupportedLocale} />;
}
