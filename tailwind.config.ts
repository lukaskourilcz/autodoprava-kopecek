import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";


export default {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
    },
  },
  plugins: [scrollbarHide],
} satisfies Config;
