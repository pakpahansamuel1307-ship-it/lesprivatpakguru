"use client";

import { AnimatePresence, motion } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { useDeck } from "@/hooks/useDeck";

export default function SlideCounter() {
  const { activeIndex } = useDeck();
  const total = SECTIONS.length;
  const current = SECTIONS[activeIndex];

  return (
    <div
      className="fixed bottom-6 left-4 z-40 hidden select-none items-center gap-3 rounded-full border border-ink/10 bg-cream/60 px-4 py-2 shadow-soft backdrop-blur-md dark:border-cream/10 dark:bg-ink/50 sm:left-6 md:flex"
      aria-hidden="true"
    >
      <div className="flex items-baseline gap-1 font-display text-ink dark:text-cream">
        <AnimatePresence mode="wait">
          <motion.span
            key={activeIndex}
            initial={{ y: 8, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -8, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="text-base font-semibold"
          >
            {String(activeIndex + 1).padStart(2, "0")}
          </motion.span>
        </AnimatePresence>
        <span className="text-xs text-ink/40 dark:text-cream/40">/ {String(total).padStart(2, "0")}</span>
      </div>
      <span className="h-3 w-px bg-ink/15 dark:bg-cream/15" />
      <AnimatePresence mode="wait">
        <motion.span
          key={current?.id}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.25 }}
          className="text-xs font-semibold uppercase tracking-[0.2em] text-ink/60 dark:text-cream/60"
        >
          {current?.label}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}
