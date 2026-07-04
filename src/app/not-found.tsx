import { headers } from "next/headers";
import { normalizeLocale } from "../lib/locale";
import { defaultContent } from "../content/defaults";
import { Button } from "./components/ui/Button";

export default async function NotFound() {
  const h = await headers();
  const locale = normalizeLocale(h.get("x-locale"));
  const t = defaultContent.texts[locale].errors;

  return (
    <main className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4 text-center">
      <p className="font-display text-7xl font-bold text-brand mb-4" aria-hidden="true">
        404
      </p>
      <h1 className="font-display text-2xl sm:text-3xl font-bold text-ink mb-3">
        {t.notFoundTitle}
      </h1>
      <p className="text-gray-600 mb-8 max-w-md leading-relaxed">{t.notFoundDescription}</p>
      <Button href={`/${locale}`}>{t.backHome}</Button>
    </main>
  );
}
