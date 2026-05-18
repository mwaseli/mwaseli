import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0f0f1e",
        surface: "#1a1a2e",
        primary: "#00d4ff",
        secondary: "#ff006e",
        accent: "#8338ec",
        muted: "#6c757d",
        success: "#10b981",
        warning: "#f59e0b",
        error: "#ef4444",
        foreground: "#ffffff",
      },
      fontFamily: {
        sans: ["var(--font-sans)"],
      },
    },
  },
  plugins: [],
};

export default config;
