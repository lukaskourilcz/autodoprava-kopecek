"use client";

import { createContext, useContext, type ReactNode } from "react";
import { DEFAULT_LOCALE, type SupportedLocale } from "@/lib/locale";

// Holds the locale taken from the URL (`/cs`, `/en`, `/de`). Content itself
// lives in the global store; this only tells components which language to show.
const LocaleContext = createContext<SupportedLocale>(DEFAULT_LOCALE);

export function LocaleProvider({
  locale,
  children,
}: {
  locale: SupportedLocale;
  children: ReactNode;
}) {
  return <LocaleContext.Provider value={locale}>{children}</LocaleContext.Provider>;
}

export function useLocale(): SupportedLocale {
  return useContext(LocaleContext);
}
