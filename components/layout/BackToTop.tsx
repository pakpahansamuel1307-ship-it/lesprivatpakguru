"use client";

import { AnimatePresence, motion } from "framer-motion";
import { FiArrowUp } from "react-icons/fi";
import { useDeck } from "@/hooks/useDeck";

export default function BackToTop() {
  const { activeIndex, goTo } = useDeck();
  const visible = activeIndex > 0;

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={() => goTo(0)}
          initial={{ opacity: 0, y: 12, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.8 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          whileHover={{ scale: 1.08 }}
          whileTap={{ scale: 0.94 }}
          data-cursor="hover"
          aria-label="Kembali ke atas"
          className="fixed bottom-20 right-4 z-40 grid h-12 w-12 place-items-center rounded-full bg-ink text-cream shadow-soft-lg sm:bottom-6 sm:right-6 md:bottom-6 dark:bg-cream dark:text-ink"
        >
          <FiArrowUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
