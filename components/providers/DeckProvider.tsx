"use client";

import {
  createContext,
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { SECTIONS } from "@/lib/constants";
import { useLenis } from "@/hooks/useLenis";

export interface DeckContextValue {
  activeIndex: number;
  goTo: (index: number) => void;
  goToId: (id: string) => void;
}

export const DeckContext = createContext<DeckContextValue>({
  activeIndex: 0,
  goTo: () => undefined,
  goToId: () => undefined,
});

const SNAP_SETTLE_MS = 140;
const SNAP_DURATION = 0.9;
const GOTO_DURATION = 1.15;
const EASE = (t: number) => 1 - Math.pow(1 - t, 4);

export default function DeckProvider({ children }: { children: ReactNode }) {
  const { lenis, scrollTo } = useLenis();
  const [activeIndex, setActiveIndex] = useState(0);

  const offsetsRef = useRef<number[]>([]);
  const settleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const programmatic = useRef(false);
  const rafId = useRef<number | null>(null);

  const measure = useCallback(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>("[data-deck-section]")
    );
    offsetsRef.current = nodes.map((node) => node.offsetTop);
  }, []);

  const nearestIndex = useCallback((y: number) => {
    const offsets = offsetsRef.current;
    if (offsets.length === 0) return 0;
    let closest = 0;
    let min = Infinity;
    offsets.forEach((offset: number, i: number) => {
      const dist = Math.abs(offset - y);
      if (dist < min) {
        min = dist;
        closest = i;
      }
    });
    return closest;
  }, []);

  const goTo = useCallback(
    (index: number) => {
      const clamped = Math.min(Math.max(index, 0), SECTIONS.length - 1);
      const target = offsetsRef.current[clamped];
      if (target === undefined) return;

      programmatic.current = true;
      setActiveIndex(clamped);

      const id = SECTIONS[clamped]?.id;
      if (id && history.replaceState) {
        history.replaceState(null, "", `#${id}`);
      }

      scrollTo(target, {
        duration: GOTO_DURATION,
        easing: EASE,
        onComplete: () => {
          programmatic.current = false;
        },
      });
    },
    [scrollTo]
  );

  const goToId = useCallback(
    (id: string) => {
      const index = SECTIONS.findIndex((s) => s.id === id);
      if (index >= 0) goTo(index);
    },
    [goTo]
  );

  // Initial measure + hash-based entry point.
  useEffect(() => {
    measure();
    const onLoadResize = () => measure();
    window.addEventListener("resize", onLoadResize);
    window.addEventListener("orientationchange", onLoadResize);

    const hash = window.location.hash.replace("#", "");
    if (hash) {
      const index = SECTIONS.findIndex((s) => s.id === hash);
      if (index > 0) {
        // Jump instantly on first paint, no animation.
        requestAnimationFrame(() => {
          const target = offsetsRef.current[index];
          if (target !== undefined) {
            window.scrollTo(0, target);
            setActiveIndex(index);
          }
        });
      }
    }

    return () => {
      window.removeEventListener("resize", onLoadResize);
      window.removeEventListener("orientationchange", onLoadResize);
    };
  }, [measure]);

  // Scroll tracking + snap-to-nearest-section on settle.
  useEffect(() => {
    const onScroll = () => {
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        const y = window.scrollY;
        const idx = nearestIndex(y);
        setActiveIndex((prev) => (prev === idx ? prev : idx));

        if (settleTimer.current) clearTimeout(settleTimer.current);
        settleTimer.current = setTimeout(() => {
          if (programmatic.current) return;
          const currentY = window.scrollY;
          const nearest = nearestIndex(currentY);
          const target = offsetsRef.current[nearest];
          if (target !== undefined && Math.abs(target - currentY) > 2) {
            programmatic.current = true;
            scrollTo(target, {
              duration: SNAP_DURATION,
              easing: EASE,
              onComplete: () => {
                programmatic.current = false;
              },
            });
          }
        }, SNAP_SETTLE_MS);
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    if (lenis) {
      lenis.on("scroll", onScroll);
    }

    return () => {
      window.removeEventListener("scroll", onScroll);
      lenis?.off("scroll", onScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
      if (settleTimer.current) clearTimeout(settleTimer.current);
    };
  }, [lenis, nearestIndex, scrollTo]);

  // Keyboard navigation.
  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || target?.isContentEditable) return;

      switch (event.key) {
        case "ArrowDown":
        case "PageDown":
          event.preventDefault();
          goTo(activeIndex + 1);
          break;
        case "ArrowUp":
        case "PageUp":
          event.preventDefault();
          goTo(activeIndex - 1);
          break;
        case "Home":
          event.preventDefault();
          goTo(0);
          break;
        case "End":
          event.preventDefault();
          goTo(SECTIONS.length - 1);
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [activeIndex, goTo]);

  return (
    <DeckContext.Provider value={{ activeIndex, goTo, goToId }}>
      {children}
    </DeckContext.Provider>
  );
}
