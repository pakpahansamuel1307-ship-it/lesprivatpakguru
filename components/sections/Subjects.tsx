"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { SUBJECTS, SUBJECTS_INTRO } from "@/lib/constants";
import SectionHeading from "@/components/ui/SectionHeading";

const GLOW: Record<string, string> = {
  periwinkle: "#829CFF",
  mint: "#28C878",
  marigold: "#F6CD46",
};

const grid = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15, delayChildren: 0.15 } },
};

const card = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Subjects() {
  return (
    <section
      id="subjects"
      data-deck-section
      aria-label="Subjects"
      className="deck-slide relative flex items-center overflow-hidden bg-cream py-24 dark:bg-ink"
    >
      <div className="mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12">
        <SectionHeading
          align="center"
          eyebrow={SUBJECTS_INTRO.eyebrow}
          heading={SUBJECTS_INTRO.heading}
          subtitle={SUBJECTS_INTRO.subtitle}
          className="mx-auto mb-14"
        />

        <motion.div
          variants={grid}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3"
        >
          {SUBJECTS.map((subject) => {
            const glowColor = GLOW[subject.glow] ?? "#FFED00";
            return (
              <motion.div
                key={subject.id}
                variants={card}
                whileHover={{ y: -10 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                className="group relative"
              >
                <div
                  className="absolute inset-4 -z-10 rounded-[2rem] opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-50"
                  style={{ backgroundColor: glowColor }}
                  aria-hidden="true"
                />
                <div className="relative aspect-square overflow-hidden rounded-[2rem] shadow-soft transition-shadow duration-500 group-hover:shadow-soft-lg">
                  <Image
                    src={subject.image}
                    alt={`Ilustrasi mata pelajaran ${subject.name}`}
                    fill
                    sizes="(max-width: 768px) 90vw, (max-width: 1200px) 45vw, 30vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/10 to-transparent"
                    aria-hidden="true"
                  />
                  <div
                    className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 transition-all duration-500 group-hover:ring-4"
                    style={{ boxShadow: "inset 0 0 0 0 transparent" }}
                    aria-hidden="true"
                  />
                  <h3 className="absolute bottom-5 left-6 font-display text-2xl font-semibold text-cream sm:text-3xl">
                    {subject.name}
                  </h3>
                </div>
                <p className="mt-4 px-1 text-sm leading-relaxed text-ink/65 dark:text-cream/65">
                  {subject.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
