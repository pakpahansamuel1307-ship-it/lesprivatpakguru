"use client";

import { useRef, useState, type ReactNode, type MouseEvent } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MagneticButtonProps {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "solid" | "outline" | "ghost";
  target?: string;
  rel?: string;
  className?: string;
  "aria-label"?: string;
}

interface Ripple {
  id: number;
  x: number;
  y: number;
}

const variants = {
  solid: "bg-ink text-cream dark:bg-cream dark:text-ink",
  outline: "border-2 border-ink text-ink dark:border-cream dark:text-cream bg-transparent",
  ghost: "bg-sunshine text-ink",
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "solid",
  target,
  rel,
  className,
  ...aria
}: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const handleMouseMove = (e: MouseEvent) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    setOffset({ x: x * 0.3, y: y * 0.3 });
  };

  const handleMouseLeave = () => setOffset({ x: 0, y: 0 });

  const handleClick = (e: MouseEvent) => {
    const el = ref.current;
    if (el) {
      const rect = el.getBoundingClientRect();
      const id = Date.now();
      setRipples((prev) => [
        ...prev,
        { id, x: e.clientX - rect.left, y: e.clientY - rect.top },
      ]);
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 650);
    }
    onClick?.();
  };

  const sharedProps = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    onClick: handleClick,
    "data-cursor": "hover",
    className: cn(
      "group relative isolate inline-flex items-center justify-center overflow-hidden rounded-full px-7 py-3.5 text-sm font-bold shadow-soft transition-shadow hover:shadow-soft-lg",
      variants[variant],
      className
    ),
    ...aria,
  };

  const content = (
    <motion.span
      animate={{ x: offset.x, y: offset.y }}
      transition={{ type: "spring", stiffness: 150, damping: 12, mass: 0.4 }}
      className="relative z-10 flex items-center gap-2"
    >
      {children}
    </motion.span>
  );

  const ripplesEl = ripples.map((r) => (
    <motion.span
      key={r.id}
      initial={{ scale: 0, opacity: 0.45 }}
      animate={{ scale: 4, opacity: 0 }}
      transition={{ duration: 0.65, ease: "easeOut" }}
      style={{ left: r.x, top: r.y }}
      className="pointer-events-none absolute h-8 w-8 -translate-x-1/2 -translate-y-1/2 rounded-full bg-current opacity-30"
    />
  ));

  if (href) {
    return (
      <motion.a
        href={href}
        target={target}
        rel={rel}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        {...sharedProps}
      >
        {content}
        {ripplesEl}
      </motion.a>
    );
  }

  return (
    <motion.button
      type="button"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
      {...sharedProps}
    >
      {content}
      {ripplesEl}
    </motion.button>
  );
}
