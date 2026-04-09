import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        "background-light": "#f1f2f4",
        "background-dark": "#010918",
        "space-blue": "#020617",
        "glass-border": "rgba(168, 85, 247, 0.2)",
        foreground: "var(--foreground)",
        background: "var(--background)",
      },
      fontFamily: {
        sans: ['-apple'],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "1rem",
        xl: "1.5rem",
      },
      boxShadow: {
        "vector-glow": "0 0 15px rgba(168, 85, 247, 0.3)",
      },
      animation: {
        ping: "ping 1s cubic-bezier(0, 0, 0.2, 1) infinite",
        pulse: "pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
      },
      keyframes: {
        ping: {
          "75%, 100%": {
            transform: "scale(2)",
            opacity: "0",
          },
        },
      },
    },
  },
  plugins: [],
};

export default config;
