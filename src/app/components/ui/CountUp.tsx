"use client";

import { useEffect, useRef, useState } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

/**
 * Counts a whole number up from zero the first time it scrolls into view.
 * Non-numeric values (e.g. "7+1") render as-is. The real value is rendered
 * until the animation starts, so crawlers and no-JS visitors see it too.
 */
export function CountUp({ value, durationMs = 1200 }: { value: string; durationMs?: number }) {
  const numeric = /^\d+$/.test(value) ? parseInt(value, 10) : null;
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

  return <span ref={ref}>{numeric === null ? value : display}</span>;
}
