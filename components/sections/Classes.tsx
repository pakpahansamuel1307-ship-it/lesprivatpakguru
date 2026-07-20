"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import { FaRocket } from "react-icons/fa";
import { CLASSES, CLASSES_INTRO, TEACHER } from "@/lib/constants";
import HandDrawnUnderline from "@/components/ui/HandDrawnUnderline";

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.16, delayChildren: 0.1 } },
};

const card = {
  hidden: { opacity: 0, y: 50 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as const },
  },
};

function waLink(title: string) {
  const text = `Halo Pak Harinuan, saya ingin tanya soal kelas ${title}.`;
  return `${TEACHER.whatsappHref}?text=${encodeURIComponent(text)}`;
}

export default function Classes() {
  return (
    <section
      id="classes"
      data-deck-section
      aria-label="Classes"
      className="deck-slide relative flex items-center overflow-hidden bg-fog py-24 dark:bg-ink-soft"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mx-auto mb-14 max-w-2xl text-center"
        >
          <p className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-terracotta dark:text-marigold">
            {CLASSES_INTRO.eyebrow}
          </p>
          <h2 className="relative inline-block font-display text-4xl font-semibold text-ink dark:text-cream sm:text-5xl lg:text-6xl">
            {CLASSES_INTRO.heading}
            <HandDrawnUnderline
              variant="squiggle"
              color="#6C82F0"
              className="-bottom-4 left-0 h-4 w-full"
            />
          </h2>
          <p className="mt-6 text-base leading-relaxed text-ink/60 dark:text-cream/60 sm:text-lg">
            {CLASSES_INTRO.subtitle}
          </p>
        </motion.div>

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {CLASSES.map((option, i) => (
            <motion.div
              key={option.id}
              variants={card}
              whileHover={{ y: -8, rotate: i % 2 === 0 ? -1.2 : 1.2 }}
              transition={{ type: "spring", stiffness: 240, damping: 18 }}
              className="group flex flex-col overflow-hidden rounded-[2rem] bg-white shadow-soft transition-shadow duration-300 hover:shadow-soft-lg dark:bg-white/5"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image
                  src={option.image}
                  alt={option.title}
                  fill
                  sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute left-4 top-4 grid h-10 w-10 place-items-center rounded-full bg-marigold text-ink shadow-soft">
                  <FaRocket size={16} />
                </div>
              </div>

              <div className="flex flex-1 flex-col p-6">
                <h3 className="font-display text-xl font-semibold text-ink dark:text-cream">
                  {option.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-ink/60 dark:text-cream/60">
                  {option.description}
                </p>

                <ul className="mt-4 space-y-2">
                  {option.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm text-ink/70 dark:text-cream/70"
                    >
                      <span className="grid h-4 w-4 flex-shrink-0 place-items-center rounded-full bg-mint/20 text-mint">
                        <FiCheck size={11} strokeWidth={3} />
                      </span>
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href={waLink(option.title)}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="hover"
                  className="group/btn mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-bold text-cream transition-all duration-300 hover:gap-3 hover:bg-terracotta dark:bg-cream dark:text-ink"
                >
                  Booking {option.title}
                  <FiArrowRight className="transition-transform duration-300 group-hover/btn:translate-x-1" />
                </a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
