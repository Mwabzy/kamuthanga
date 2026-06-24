import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./data/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: "#2F4A3C", // primary
        sage: "#7B9A82", // secondary
        cream: "#FAF8F3", // page background
        offwhite: "#FBFAF6", // cards
        brown: "#8A6E55", // warm brown accent
        taupe: "#C9B8A3", // dividers / accents
        ink: "#262A22", // body text
        muted: "#6B6F63", // muted text
      },
      fontFamily: {
        // Wired up via next/font CSS variables in app/layout.tsx
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      borderRadius: {
        "2xl": "1.25rem",
        "3xl": "1.75rem",
      },
      boxShadow: {
        soft: "0 2px 8px -2px rgba(38, 42, 34, 0.08), 0 8px 24px -8px rgba(38, 42, 34, 0.12)",
        lift: "0 8px 28px -6px rgba(38, 42, 34, 0.18)",
      },
      maxWidth: {
        content: "72rem",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.7s cubic-bezier(0.22, 1, 0.36, 1) both",
      },
    },
  },
  plugins: [],
};

export default config;
