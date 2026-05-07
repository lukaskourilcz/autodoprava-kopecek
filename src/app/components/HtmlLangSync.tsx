"use client";

import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { normalizeLocale } from "../../lib/i18n";

export default function HtmlLangSync() {
  const searchParams = useSearchParams();
  const lang = normalizeLocale(searchParams.get("lang"));

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return null;
}
