import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        sans: ["var(--font-georgian)", "var(--font-inter)", "sans-serif"],
        latin: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-georgian-serif)", "serif"],
      },
    },
  },
  plugins: [],
};
export default config;
