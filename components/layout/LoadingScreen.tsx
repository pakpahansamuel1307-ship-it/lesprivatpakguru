"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { SECTIONS } from "@/lib/constants";

/**
 * A "starting the presentation" loading screen: ticks through the slide
 * numbers the way a presenter app shows "Preparing slide 3 of 5..." before
 * the deck reveals. Auto-dismisses; also removable by content ready state.
 */
export default function LoadingScreen() {
  const [visible, setVisible] = useState(true);
  const [tick, setTick] = useState(0);

  useEffect(() => {
    if (document.readyState === "complete") {
      // Give the tick animation a moment to feel intentional even on fast loads.
      const t = setTimeout(() => setVisible(false), 900);
      return () => clearTimeout(t);
    }

    const onLoad = () => setTimeout(() => setVisible(false), 500);
    window.addEventListener("load", onLoad);
    const fallback = setTimeout(() => setVisible(false), 2600);
    return () => {
      window.removeEventListener("load", onLoad);
      clearTimeout(fallback);
    };
  }, []);

  useEffect(() => {
    if (!visible) return;
    const interval = setInterval(() => {
      setTick((n) => (n + 1) % SECTIONS.length);
    }, 220);
    return () => clearInterval(interval);
  }, [visible]);

  useEffect(() => {
    document.body.style.overflow = visible ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [visible]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.6, ease: "easeInOut" } }}
          className="fixed inset-0 z-[200] grid place-items-center bg-ink"
          role="status"
          aria-live="polite"
          aria-label="Memuat halaman"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex flex-col items-center gap-6"
          >
            <div className="flex items-baseline gap-2 font-display text-cream">
              <span className="text-6xl font-semibold tabular-nums">
                {String(tick + 1).padStart(2, "0")}
              </span>
              <span className="text-lg text-cream/40">/ {String(SECTIONS.length).padStart(2, "0")}</span>
            </div>
            <div className="h-1 w-40 overflow-hidden rounded-full bg-cream/15">
              <motion.div
                className="h-full rounded-full bg-sunshine"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "easeInOut" }}
              />
            </div>
            <p className="text-xs font-semibold uppercase tracking-[0.3em] text-cream/50">
              Menyiapkan kelas
            </p>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
