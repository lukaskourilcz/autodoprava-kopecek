import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

// Heart Aerospace-inspired design language: a near-monochrome palette of an
// atmospheric stratosphere purple-gray, a single deep jetstream-blue accent
// used only for outlines, plus onyx and cloud carrying the structural weight.
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        stratosphere: "var(--color-stratosphere)",
        jetstream: "var(--color-jetstream-blue)",
        onyx: "var(--color-onyx)",
        cloud: "var(--color-cloud)",
      },
      fontFamily: {
        // Neue Haas Grotesk is proprietary; the design's own substitute list
        // names Helvetica Neue, which is the closest widely-available match.
        display: ["var(--font-display)"],
        text: ["var(--font-text)"],
      },
      letterSpacing: {
        display: "-0.02em",
        body: "-0.01em",
      },
      maxWidth: {
        prose: "65ch",
      },
    },
  },
  plugins: [scrollbarHide],
} satisfies Config;
