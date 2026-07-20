"use client";

import { motion } from "framer-motion";
import { SECTIONS } from "@/lib/constants";
import { useDeck } from "@/hooks/useDeck";

export default function SectionIndicator() {
  const { activeIndex, goTo } = useDeck();

  return (
    <div className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-3 rounded-full border border-ink/10 bg-cream/60 px-2 py-4 shadow-soft backdrop-blur-md dark:border-cream/10 dark:bg-ink/50 lg:flex">
      {SECTIONS.map((section) => {
        const isActive = section.index === activeIndex;
        return (
          <div key={section.id} className="group relative flex items-center">
            <span
              className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-full bg-ink px-3 py-1 text-xs font-semibold text-cream opacity-0 transition-opacity duration-200 group-hover:opacity-100 dark:bg-cream dark:text-ink"
              role="presentation"
            >
              {section.label}
            </span>
            <button
              type="button"
              onClick={() => goTo(section.index)}
              aria-label={`Ke bagian ${section.label}`}
              aria-current={isActive ? "true" : undefined}
              data-cursor="hover"
              className="relative grid h-6 w-6 place-items-center"
            >
              <motion.span
                animate={{ scale: isActive ? 1 : 0.55 }}
                transition={{ duration: 0.25, ease: "easeOut" }}
                className={`block h-2.5 w-2.5 rounded-full bg-ink dark:bg-cream ${
                  isActive ? "opacity-100" : "opacity-40"
                }`}
              />
              {isActive && (
                <motion.span
                  layoutId="indicator-ring"
                  className="absolute inset-0 rounded-full border-2 border-sunshine"
                  transition={{ type: "spring", stiffness: 350, damping: 28 }}
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
}
