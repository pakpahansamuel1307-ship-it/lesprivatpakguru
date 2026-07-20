"use client";

import { motion } from "framer-motion";
import { FiBookOpen, FiHome, FiLayers, FiMail, FiUser } from "react-icons/fi";
import { SECTIONS, TEACHER } from "@/lib/constants";
import { useDeck } from "@/hooks/useDeck";
import ThemeToggle from "@/components/ui/ThemeToggle";

const ICONS = {
  home: FiHome,
  about: FiUser,
  subjects: FiBookOpen,
  classes: FiLayers,
  contact: FiMail,
};

export default function Navigation() {
  const { activeIndex, goToId } = useDeck();

  return (
    <>
      {/* Logo mark, top-left */}
      <div className="fixed left-4 top-4 z-50 sm:left-6 sm:top-6">
        <button
          type="button"
          onClick={() => goToId("home")}
          data-cursor="hover"
          className="flex items-center gap-2 rounded-full border border-ink/10 bg-cream/70 px-4 py-2 font-display text-sm font-semibold tracking-tight text-ink shadow-soft backdrop-blur-md dark:border-cream/10 dark:bg-ink/60 dark:text-cream"
          aria-label="Kembali ke Home"
        >
          <span className="grid h-6 w-6 place-items-center rounded-full bg-sunshine text-[11px] font-bold text-ink">
            HP
          </span>
          <span className="hidden sm:inline">Pak Harinuan</span>
        </button>
      </div>

      {/* Desktop floating pill nav, top-right */}
      <nav
        aria-label="Navigasi utama"
        className="fixed right-6 top-6 z-50 hidden items-center gap-1 rounded-full border border-ink/10 bg-cream/70 p-1.5 shadow-soft backdrop-blur-md dark:border-cream/10 dark:bg-ink/60 md:flex"
      >
        {SECTIONS.map((section) => {
          const isActive = section.index === activeIndex;
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => goToId(section.id)}
              data-cursor="hover"
              aria-current={isActive ? "true" : undefined}
              className="relative rounded-full px-4 py-2 text-sm font-semibold text-ink/70 transition-colors hover:text-ink dark:text-cream/60 dark:hover:text-cream"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill"
                  className="absolute inset-0 rounded-full bg-ink dark:bg-cream"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <span className={`relative z-10 ${isActive ? "text-cream dark:text-ink" : ""}`}>
                {section.label}
              </span>
            </button>
          );
        })}
        <a
          href={TEACHER.whatsappHref}
          target="_blank"
          rel="noopener noreferrer"
          data-cursor="hover"
          className="ml-1 rounded-full bg-sunshine px-4 py-2 text-sm font-bold text-ink transition-transform hover:scale-105"
        >
          Contact Me
        </a>
        <div className="ml-1 border-l border-ink/10 pl-2 dark:border-cream/10">
          <ThemeToggle />
        </div>
      </nav>

      {/* Mobile floating bottom nav */}
      <nav
        aria-label="Navigasi utama"
        className="fixed inset-x-4 bottom-4 z-50 flex items-center justify-between gap-1 rounded-full border border-ink/10 bg-cream/85 p-1.5 shadow-soft backdrop-blur-md dark:border-cream/10 dark:bg-ink/80 md:hidden"
      >
        {SECTIONS.map((section) => {
          const isActive = section.index === activeIndex;
          const Icon = ICONS[section.id];
          return (
            <button
              key={section.id}
              type="button"
              onClick={() => goToId(section.id)}
              aria-current={isActive ? "true" : undefined}
              aria-label={section.label}
              className="relative grid h-11 flex-1 place-items-center rounded-full text-ink/60 dark:text-cream/60"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-pill-mobile"
                  className="absolute inset-0 rounded-full bg-ink dark:bg-cream"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              <Icon
                size={18}
                className={`relative z-10 ${isActive ? "text-cream dark:text-ink" : ""}`}
              />
            </button>
          );
        })}
        <ThemeToggle className="flex-shrink-0" />
      </nav>
    </>
  );
}
