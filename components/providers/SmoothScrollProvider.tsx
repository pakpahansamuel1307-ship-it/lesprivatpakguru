"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/useReducedMotion";

export interface LenisContextValue {
  lenis: Lenis | null;
  scrollTo: (target: number | string | HTMLElement, options?: Parameters<Lenis["scrollTo"]>[1]) => void;
}

export const LenisContext = createContext<LenisContextValue>({
  lenis: null,
  scrollTo: () => undefined,
});

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

export default function SmoothScrollProvider({ children }: { children: ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);
  const [, forceRender] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    // Respect the OS-level reduced-motion preference by skipping the
    // inertia-based smoothing entirely and falling back to native scroll.
    if (reducedMotion) {
      lenisRef.current?.destroy();
      lenisRef.current = null;
      forceRender((n) => n + 1);
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t: number) => Math.min(1, 1 - Math.pow(2, -10 * t)),
      wheelMultiplier: 1,
      touchMultiplier: 1.15,
      syncTouch: true,
    });

    lenisRef.current = lenis;
    forceRender((n) => n + 1);

    lenis.on("scroll", ScrollTrigger.update);

    gsap.ticker.add((time: number) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [reducedMotion]);

  const scrollTo = useCallback<LenisContextValue["scrollTo"]>((target, options) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, options);
      return;
    }
    // Fallback for reduced-motion mode where Lenis is not mounted.
    const el =
      typeof target === "string"
        ? document.querySelector(target)
        : target instanceof HTMLElement
          ? target
          : null;
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    } else if (typeof target === "number") {
      window.scrollTo({ top: target, behavior: "smooth" });
    }
  }, []);

  return (
    <LenisContext.Provider value={{ lenis: lenisRef.current, scrollTo }}>
      {children}
    </LenisContext.Provider>
  );
}
