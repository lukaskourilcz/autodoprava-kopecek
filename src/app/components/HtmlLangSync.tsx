"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { normalizeLocale } from "../../lib/i18n";

export default function HtmlLangSync() {
  const pathname = usePathname();
  const segment = pathname?.split("/")[1] ?? "";
  const lang = normalizeLocale(segment);

  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.lang = lang;
    }
  }, [lang]);

  return null;
}
