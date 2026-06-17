"use client";

import { useEffect, useState } from "react";
import { ArrowUp } from "lucide-react";
import { useLocale } from "@/content/locale-context";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { uiStrings } from "@/lib/ui-strings";

/** Floating "scroll back to top" control, revealed once the visitor scrolls down the page. */
export function BackToTop() {
  const locale = useLocale();
  const ui = uiStrings(locale);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <button
      type="button"
      aria-label={ui.backToTop}
      onClick={() =>
        window.scrollTo({ top: 0, behavior: prefersReducedMotion ? "auto" : "smooth" })
      }
      className={`fixed bottom-5 right-5 z-40 inline-flex h-11 w-11 items-center justify-center rounded-full bg-gray-900 text-white shadow-lg ring-1 ring-white/10 transition-all duration-300 hover:bg-gray-800 hover:-translate-y-0.5 focus-ring ${
        visible
          ? "opacity-100 translate-y-0"
          : "pointer-events-none translate-y-3 opacity-0"
      }`}
    >
      <ArrowUp size={20} aria-hidden="true" />
    </button>
  );
}
