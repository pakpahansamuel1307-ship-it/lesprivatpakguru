"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface HandDrawnUnderlineProps {
  className?: string;
  color?: string;
  variant?: "squiggle" | "circle";
}

export default function HandDrawnUnderline({
  className,
  color = "#FFED00",
  variant = "squiggle",
}: HandDrawnUnderlineProps) {
  const draw = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 1,
      transition: { duration: 1, ease: [0.65, 0, 0.35, 1] as const, delay: 0.3 },
    },
  };

  if (variant === "circle") {
    return (
      <svg
        viewBox="0 0 220 90"
        className={cn("pointer-events-none absolute", className)}
        aria-hidden="true"
        fill="none"
      >
        <motion.ellipse
          cx="110"
          cy="45"
          rx="100"
          ry="34"
          stroke={color}
          strokeWidth="5"
          strokeLinecap="round"
          variants={draw}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 300 24"
      className={cn("pointer-events-none absolute", className)}
      aria-hidden="true"
      fill="none"
    >
      <motion.path
        d="M4 16C40 6 76 6 112 14C148 22 184 22 220 12C240 6 260 6 296 12"
        stroke={color}
        strokeWidth="6"
        strokeLinecap="round"
        variants={draw}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      />
    </svg>
  );
}
