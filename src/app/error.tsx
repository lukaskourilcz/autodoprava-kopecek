"use client";

import { usePathname } from "next/navigation";
import { normalizeLocale } from "../lib/locale";
import { defaultContent } from "../content/defaults";
import { Button } from "./components/ui/Button";

export default function Error({ reset }: { reset: () => void }) {
  const pathname = usePathname();
  const locale = normalizeLocale(pathname?.split("/")[1]);
  const t = defaultContent.texts[locale].errors;

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4 text-center">
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-3">
        {t.errorTitle}
      </h1>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">{t.errorDescription}</p>
      <div className="flex flex-col sm:flex-row gap-3">
        <Button onClick={reset}>{t.retry}</Button>
        <Button href={`/${locale}`} variant="secondary">
          {t.home}
        </Button>
      </div>
    </main>
  );
}
