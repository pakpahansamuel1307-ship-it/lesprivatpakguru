"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  eyebrow: string;
  heading: ReactNode;
  subtitle?: string;
  align?: "left" | "center";
  tone?: "ink" | "cream";
  className?: string;
}

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.12 },
  },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
};

export default function SectionHeading({
  eyebrow,
  heading,
  subtitle,
  align = "left",
  tone = "ink",
  className,
}: SectionHeadingProps) {
  const isCenter = align === "center";
  const toneText = tone === "cream" ? "text-cream" : "text-ink";
  const toneMuted = tone === "cream" ? "text-cream/70" : "text-ink/60";
  const toneEyebrow = tone === "cream" ? "text-marigold" : "text-terracotta";

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.6 }}
      className={cn(isCenter ? "text-center" : "text-left", className)}
    >
      <motion.p
        variants={item}
        className={cn(
          "mb-3 text-xs font-bold uppercase tracking-[0.3em]",
          toneEyebrow
        )}
      >
        {eyebrow}
      </motion.p>
      <motion.h2
        variants={item}
        className={cn(
          "font-display text-4xl font-semibold leading-[1.05] text-balance sm:text-5xl lg:text-6xl",
          toneText
        )}
      >
        {heading}
      </motion.h2>
      {subtitle && (
        <motion.p
          variants={item}
          className={cn(
            "mt-4 max-w-xl text-base leading-relaxed sm:text-lg",
            toneMuted,
            isCenter ? "mx-auto" : ""
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </motion.div>
  );
}
