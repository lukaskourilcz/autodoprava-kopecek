"use client";

import type { CSSProperties, ReactNode } from "react";
import { useInView } from "@/hooks/useInView";

/**
 * Wraps content in a scroll-reveal animation (fade + rise). The actual hidden
 * state lives in globals.css under `html.reveal-enabled [data-reveal]`, scoped
 * to `prefers-reduced-motion: no-preference`, so no-JS and reduced-motion
 * visitors always see fully visible content. `delay` staggers grouped items.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  style,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  style?: CSSProperties;
}) {
  const { ref, inView } = useInView();

  return (
    <div
      ref={ref}
      data-reveal=""
      className={`${className}${inView ? " is-visible" : ""}`}
      style={delay ? { ...style, "--reveal-delay": `${delay}ms` } as CSSProperties : style}
    >
      {children}
    </div>
  );
}
