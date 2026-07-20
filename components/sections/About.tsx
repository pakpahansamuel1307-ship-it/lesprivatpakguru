"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ABOUT, ABOUT_STATS } from "@/lib/constants";
import { IconSticker } from "@/components/ui/Stickers";
import HandDrawnUnderline from "@/components/ui/HandDrawnUnderline";
import AmbientBlobs from "@/components/ui/AmbientBlobs";

const lineVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};

const lineItem = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function About() {
  const paragraphLines = ABOUT.paragraph
    .split(/(?<=\. )/)
    .filter((line) => line.trim().length > 0);

  return (
    <section
      id="about"
      data-deck-section
      aria-label="About"
      className="deck-slide relative flex items-center overflow-hidden bg-fog py-24 dark:bg-ink-soft"
    >
      <AmbientBlobs
        blobs={[{ color: "#28C878", size: 320, top: "10%", right: "-8%", opacity: 0.15 }]}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-16 px-6 sm:px-8 lg:grid-cols-2 lg:gap-12 lg:px-12">
        {/* Text column */}
        <div>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-terracotta dark:text-marigold"
          >
            {ABOUT.eyebrow}
          </motion.p>

          <h2 className="font-display text-4xl font-semibold leading-[1.05] text-ink dark:text-cream sm:text-5xl lg:text-6xl">
            <motion.span
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55 }}
              className="block"
            >
              {ABOUT.heading}
            </motion.span>
            <span className="relative mt-1 inline-block">
              <motion.span
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.55, delay: 0.1 }}
                className="relative z-10"
              >
                {ABOUT.highlightName}
              </motion.span>
              <HandDrawnUnderline
                variant="circle"
                color="#FFED00"
                className="-inset-x-4 -inset-y-3 h-[140%] w-[115%]"
              />
            </span>
          </h2>

          <motion.div
            variants={lineVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            className="mt-6 max-w-lg space-y-1 text-base leading-relaxed text-ink/70 dark:text-cream/70 sm:text-lg"
          >
            {paragraphLines.map((line, i) => (
              <motion.span key={i} variants={lineItem} className="block">
                {line.trim()}
              </motion.span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="mt-10 grid grid-cols-3 gap-4 border-t border-ink/10 pt-6 dark:border-cream/10"
          >
            {ABOUT_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-semibold text-ink dark:text-cream sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium leading-snug text-ink/50 dark:text-cream/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Photo column */}
        <div className="relative mx-auto w-full max-w-sm lg:max-w-none">
          <motion.div
            initial={{ rotate: 0 }}
            whileInView={{ rotate: 360 }}
            viewport={{ once: true }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="absolute -inset-6 -z-10 rounded-full border-2 border-dashed border-ink/15 dark:border-cream/15"
            aria-hidden="true"
          />
          <div
            className="absolute -inset-x-2 bottom-[-1.5rem] top-6 -z-10 translate-x-4 rounded-t-[9999px] rounded-b-[2rem] bg-mint"
            aria-hidden="true"
          />

          <motion.div
            initial={{ clipPath: "inset(100% 0% 0% 0% round 9999px 9999px 2rem 2rem)" }}
            whileInView={{ clipPath: "inset(0% 0% 0% 0% round 9999px 9999px 2rem 2rem)" }}
            viewport={{ once: true }}
            transition={{ duration: 1, ease: [0.65, 0, 0.35, 1] }}
            className="relative aspect-[4/5] w-full overflow-hidden rounded-t-[9999px] rounded-b-[2rem] shadow-soft-lg"
          >
            <Image
              src="/images/about-teacher.jpg"
              alt="Pak Harinuan Pakpahan bersama siswa di sekolah"
              fill
              sizes="(max-width: 1024px) 80vw, 38vw"
              className="object-cover"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6, ease: "backOut" }}
            className="absolute -right-4 top-6 animate-float sm:-right-8"
          >
            <IconSticker bg="#829CFF">
              <span className="text-2xl">✌️</span>
            </IconSticker>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.75, ease: "backOut" }}
            className="absolute -bottom-4 -left-4 animate-float-slow sm:-left-6"
          >
            <IconSticker bg="#F6CD46">
              <span className="text-2xl">🙂</span>
            </IconSticker>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
