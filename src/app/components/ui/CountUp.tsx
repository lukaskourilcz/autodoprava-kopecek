"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Counts a whole number up from zero the first time it scrolls into view.
 * Handles grouped values with a trailing plus ("500 000+", "500,000+");
 * anything else (e.g. "7+1") renders as-is. The real value is rendered
 * until the animation starts, so crawlers and no-JS visitors see it too.
 */
export function CountUp({ value, durationMs = 1200 }: { value: string; durationMs?: number }) {
  const match = value.match(/^([\d\s.,]+?)\s*(\+?)$/);
  const digitsOnly = match ? match[1].replace(/\D/g, "") : "";
  const numeric = digitsOnly ? parseInt(digitsOnly, 10) : null;
  const separator = match?.[1].match(/[\s.,]/)?.[0] ?? "";
  const suffix = match?.[2] ?? "";
  const format = (n: number) =>
    separator ? String(n).replace(/\B(?=(\d{3})+(?!\d))/g, separator) : String(n);
  const ref = useRef<HTMLSpanElement>(null);
  const startedRef = useRef(false);
  const prefersReducedMotion = usePrefersReducedMotion();
  const [display, setDisplay] = useState<number | null>(numeric);

  useEffect(() => {
    if (numeric === null || prefersReducedMotion) return;
    const element = ref.current;
    if (!element || typeof IntersectionObserver === "undefined") return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting || startedRef.current) return;
        startedRef.current = true;
        observer.disconnect();
        const start = performance.now();
        const tick = (now: number) => {
          const progress = Math.min((now - start) / durationMs, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          setDisplay(Math.round(numeric * eased));
          if (progress < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      },
      { threshold: 0.4 }
    );
    observer.observe(element);
    return () => observer.disconnect();
  }, [numeric, prefersReducedMotion, durationMs]);

  return (
    <span ref={ref}>
      {numeric === null || display === null ? value : format(display) + suffix}
    </span>
  );
}
