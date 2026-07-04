import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          DEFAULT: "#eab308",
          light: "#facc15",
          tint: "#fefce8",
        },
        ink: {
          DEFAULT: "#111827",
          soft: "#1f2937",
          deep: "#0a0e1a",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-archivo)", "var(--font-inter)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [scrollbarHide],
} satisfies Config;
