"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/hooks/useReducedMotion";

/**
 * Custom cursor: a small dot that follows the pointer with a slight lag,
 * and expands into a yellow ring whenever it crosses an element flagged
 * with `data-cursor="hover"`. Disabled entirely on touch devices and when
 * the user prefers reduced motion.
 */
export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch || reducedMotion) {
      setEnabled(false);
      return;
    }
    setEnabled(true);
    document.body.classList.add("no-cursor");

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let dotX = mouseX;
    let dotY = mouseY;
    let rafId: number;

    const onMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onOver = (e: MouseEvent) => {
      const target = (e.target as HTMLElement)?.closest('[data-cursor="hover"]');
      setHovering(Boolean(target));
    };

    const tick = () => {
      dotX += (mouseX - dotX) * 0.18;
      dotY += (mouseY - dotY) * 0.18;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${dotX}px, ${dotY}px, 0) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseover", onOver);
    rafId = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("no-cursor");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseover", onOver);
      cancelAnimationFrame(rafId);
    };
  }, [reducedMotion]);

  if (!enabled) return null;

  return (
    <div
      ref={dotRef}
      className="cursor-dot"
      style={{
        width: hovering ? 52 : 12,
        height: hovering ? 52 : 12,
        borderRadius: "9999px",
        backgroundColor: hovering ? "transparent" : "#FFED00",
        border: hovering ? "2px solid #FFED00" : "none",
        transition: "width 0.25s ease, height 0.25s ease, background-color 0.25s ease, border 0.25s ease",
      }}
      aria-hidden="true"
    />
  );
}
