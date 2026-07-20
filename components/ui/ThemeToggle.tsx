"use client";

import { motion } from "framer-motion";
import { FiMoon, FiSun } from "react-icons/fi";
import { useTheme } from "@/hooks/useTheme";

export default function ThemeToggle({ className }: { className?: string }) {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? "Aktifkan mode terang" : "Aktifkan mode gelap"}
      aria-pressed={isDark}
      data-cursor="hover"
      className={`relative grid h-9 w-9 place-items-center rounded-full border border-ink/10 bg-white/40 text-ink transition-colors hover:bg-white/70 dark:border-cream/15 dark:bg-white/5 dark:text-cream dark:hover:bg-white/10 ${className ?? ""}`}
    >
      <motion.span
        key={theme}
        initial={{ rotate: -90, opacity: 0, scale: 0.6 }}
        animate={{ rotate: 0, opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        className="grid place-items-center"
      >
        {isDark ? <FiSun size={16} /> : <FiMoon size={16} />}
      </motion.span>
    </button>
  );
}
