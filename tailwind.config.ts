import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        sunshine: "#FFED00",
        marigold: "#F6CD46",
        ink: "#15140D",
        "ink-soft": "#2B2A22",
        cream: "#FCF5EB",
        fog: "#F1F1EA",
        terracotta: "#BA4B2F",
        "terracotta-deep": "#8F3A22",
        periwinkle: "#6C82F0",
        "periwinkle-soft": "#829CFF",
        mint: "#28C878",
      },
      fontFamily: {
        display: ["var(--font-fredoka)", "system-ui", "sans-serif"],
        body: ["var(--font-jakarta)", "system-ui", "sans-serif"],
        serif: ["var(--font-fraunces)", "Georgia", "serif"],
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      boxShadow: {
        soft: "0 20px 60px -15px rgba(21, 20, 13, 0.25)",
        "soft-lg": "0 30px 80px -20px rgba(21, 20, 13, 0.35)",
        glow: "0 0 0 1px rgba(255, 237, 0, 0.4), 0 20px 50px -10px rgba(255, 237, 0, 0.35)",
        card: "8px 8px 0px 0px rgba(21, 20, 13, 1)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0) rotate(0deg)" },
          "50%": { transform: "translateY(-14px) rotate(3deg)" },
        },
        "float-slow": {
          "0%, 100%": { transform: "translateY(0) translateX(0)" },
          "50%": { transform: "translateY(-10px) translateX(6px)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        blob: {
          "0%, 100%": { borderRadius: "42% 58% 65% 35% / 45% 40% 60% 55%" },
          "50%": { borderRadius: "60% 40% 35% 65% / 55% 65% 35% 45%" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-soft": {
          "0%, 100%": { transform: "scale(1)" },
          "50%": { transform: "scale(1.04)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float-slow 8s ease-in-out infinite",
        "spin-slow": "spin-slow 18s linear infinite",
        blob: "blob 10s ease-in-out infinite",
        marquee: "marquee 24s linear infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
