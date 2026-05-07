"use client";

import React, {
  createContext,
  useContext,
  useMemo,
  type ReactNode,
} from "react";
import {
  type SupportedLocale,
  DEFAULT_LOCALE,
} from "../../lib/locale";
import {
  type Translations,
  getTranslations,
  interpolate,
} from "../../lib/translations";

type Ctx = {
  locale: SupportedLocale;
  raw: Translations;
};

const TranslationContext = createContext<Ctx>({
  locale: DEFAULT_LOCALE,
  raw: getTranslations(DEFAULT_LOCALE),
});

export function TranslationProvider({
  locale,
  children,
}: {
  locale: SupportedLocale;
  children: ReactNode;
}) {
  const value = useMemo<Ctx>(
    () => ({ locale, raw: getTranslations(locale) }),
    [locale]
  );
  return (
    <TranslationContext.Provider value={value}>
      {children}
    </TranslationContext.Provider>
  );
}

type Path = string;

export function useTranslation() {
  const { locale, raw } = useContext(TranslationContext);

  function t(
    key: Path,
    vars?: Record<string, string | number>
  ): string {
    const value = walk(raw, key);
    if (typeof value !== "string") {
      if (process.env.NODE_ENV !== "production") {
        console.warn(`[i18n] missing or non-string key: ${key}`);
      }
      return key;
    }
    return interpolate(value, vars);
  }

  function tx<T>(key: Path): T {
    return walk(raw, key) as T;
  }

  return { t, tx, locale, raw };
}

function walk(obj: unknown, path: string): unknown {
  return path
    .split(".")
    .reduce<unknown>(
      (acc, segment) =>
        acc && typeof acc === "object" && segment in acc
          ? (acc as Record<string, unknown>)[segment]
          : undefined,
      obj
    );
}

const BOLD_RE = /<b>(.*?)<\/b>/g;

export function RichText({ text }: { text: string }) {
  const parts: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let i = 0;
  const re = new RegExp(BOLD_RE.source, "g");
  while ((match = re.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push(text.slice(lastIndex, match.index));
    }
    parts.push(<strong key={i++}>{match[1]}</strong>);
    lastIndex = re.lastIndex;
  }
  if (lastIndex < text.length) {
    parts.push(text.slice(lastIndex));
  }
  return <>{parts}</>;
}
