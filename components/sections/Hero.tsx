"use client";

import { useEffect, useRef, type MouseEvent } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import gsap from "gsap";
import { FiArrowDown, FiArrowRight } from "react-icons/fi";
import { HERO, HERO_STATS, TEACHER } from "@/lib/constants";
import { useDeck } from "@/hooks/useDeck";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import MagneticButton from "@/components/ui/MagneticButton";
import { HeartsSticker, TicketBadge, WaveSticker } from "@/components/ui/Stickers";
import AmbientBlobs from "@/components/ui/AmbientBlobs";

export default function Hero() {
  const { goToId } = useDeck();
  const reducedMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);

  const mvX = useMotionValue(0);
  const mvY = useMotionValue(0);
  const springX = useSpring(mvX, { stiffness: 60, damping: 20 });
  const springY = useSpring(mvY, { stiffness: 60, damping: 20 });
  const parallax1X = useTransform(springX, (v: number) => v * 14);
  const parallax1Y = useTransform(springY, (v: number) => v * 14);
  const parallax2X = useTransform(springX, (v: number) => v * -10);
  const parallax2Y = useTransform(springY, (v: number) => v * -10);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    mvX.set((e.clientX - rect.left) / rect.width - 0.5);
    mvY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  useEffect(() => {
    if (reducedMotion || !rootRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from("[data-hero=eyebrow]", { y: 16, opacity: 0, duration: 0.6 })
        .from(
          "[data-hero=heading-line]",
          { y: 46, opacity: 0, duration: 0.8, stagger: 0.12 },
          "-=0.35"
        )
        .from("[data-hero=subheading]", { y: 20, opacity: 0, duration: 0.6 }, "-=0.45")
        .from(
          "[data-hero=cta]",
          { y: 16, opacity: 0, duration: 0.5, stagger: 0.1 },
          "-=0.35"
        )
        .from("[data-hero=stats]", { y: 16, opacity: 0, duration: 0.5 }, "-=0.3")
        .from(
          "[data-hero=photo]",
          { scale: 0.9, opacity: 0, duration: 0.9, ease: "power4.out" },
          "-=0.9"
        )
        .from(
          "[data-hero=sticker]",
          {
            scale: 0,
            opacity: 0,
            duration: 0.6,
            stagger: 0.15,
            ease: "back.out(2.2)",
          },
          "-=0.5"
        );
    }, rootRef);

    return () => ctx.revert();
  }, [reducedMotion]);

  return (
    <section
      id="home"
      data-deck-section
      aria-label="Home"
      ref={rootRef}
      onMouseMove={handleMouseMove}
      className="deck-slide relative flex items-center overflow-hidden bg-cream pb-24 pt-28 dark:bg-ink md:pb-16 md:pt-24"
    >
      <AmbientBlobs
        blobs={[
          { color: "#FFED00", size: 380, top: "-8%", left: "-6%", opacity: 0.35 },
          { color: "#829CFF", size: 300, bottom: "0%", right: "2%", opacity: 0.2, delay: "-3s" },
        ]}
      />

      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-6 sm:px-8 lg:grid-cols-2 lg:gap-10 lg:px-12">
        {/* Text column */}
        <div className="relative z-10 max-w-xl">
          <p
            data-hero="eyebrow"
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-terracotta dark:text-marigold"
          >
            {HERO.eyebrow}
          </p>

          <h1 className="font-display text-[2.6rem] font-semibold leading-[1.05] text-ink text-balance dark:text-cream sm:text-6xl lg:text-[3.6rem]">
            <span className="block overflow-hidden">
              <span data-hero="heading-line" className="block">
                Selamat datang
              </span>
            </span>
            <span className="relative mt-1 block overflow-hidden">
              <span data-hero="heading-line" className="relative block">
                <span className="relative z-10">di kelas </span>
                <span className="relative z-10 whitespace-nowrap">
                  Pak Guru
                  <motion.span
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.7, delay: 1.1, ease: [0.65, 0, 0.35, 1] }}
                    style={{ originX: 0 }}
                    className="absolute -inset-x-2 bottom-1 -z-10 h-[0.5em] -rotate-1 bg-sunshine"
                    aria-hidden="true"
                  />
                </span>
              </span>
            </span>
          </h1>

          <p
            data-hero="subheading"
            className="mt-6 text-base leading-relaxed text-ink/70 dark:text-cream/70 sm:text-lg"
          >
            {HERO.subheading}
          </p>

          <div data-hero="cta" className="mt-8 flex flex-wrap items-center gap-4">
            <MagneticButton href={TEACHER.whatsappHref} target="_blank" rel="noopener noreferrer" variant="ghost">
              {HERO.ctaPrimary}
              <FiArrowRight className="transition-transform group-hover:translate-x-1" />
            </MagneticButton>
            <MagneticButton onClick={() => goToId("subjects")} variant="outline">
              {HERO.ctaSecondary}
            </MagneticButton>
          </div>

          <div data-hero="stats" className="mt-12 flex flex-wrap gap-x-8 gap-y-4">
            {HERO_STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-display text-2xl font-semibold text-ink dark:text-cream">
                  {stat.value}
                </p>
                <p className="text-xs font-medium uppercase tracking-wide text-ink/50 dark:text-cream/50">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Photo column */}
        <div className="relative z-10 mx-auto w-full max-w-md lg:max-w-none">
          <div
            data-hero="photo"
            className="relative aspect-[4/5] w-full overflow-hidden rounded-[2.5rem] shadow-soft-lg sm:aspect-[5/5.2]"
          >
            <div
              className="absolute -inset-6 -z-10 rounded-[3rem] bg-marigold/60 animate-blob"
              aria-hidden="true"
            />
            <motion.div
              className="h-full w-full"
              animate={reducedMotion ? undefined : { scale: [1, 1.06, 1] }}
              transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            >
              <Image
                src="/images/hero-teacher.jpg"
                alt="Pak Harinuan Pakpahan mengajar dari meja belajarnya"
                fill
                priority
                sizes="(max-width: 1024px) 90vw, 40vw"
                className="object-cover"
              />
            </motion.div>
          </div>

          <motion.div
            data-hero="sticker"
            style={{ x: parallax1X, y: parallax1Y }}
            className="absolute -left-6 top-8 animate-float sm:-left-10"
          >
            <HeartsSticker />
          </motion.div>

          <motion.div
            data-hero="sticker"
            style={{ x: parallax2X, y: parallax2Y }}
            className="absolute -right-2 -top-4 animate-float sm:-right-6"
          >
            <WaveSticker />
          </motion.div>

          <motion.div
            data-hero="sticker"
            style={{ x: parallax1X, y: parallax1Y }}
            className="absolute -bottom-5 right-4 rotate-[-4deg] animate-float-slow sm:right-8"
          >
            <TicketBadge>{HERO.badge}</TicketBadge>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        type="button"
        onClick={() => goToId("about")}
        data-cursor="hover"
        aria-label="Gulir ke bagian About"
        className="absolute bottom-6 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink/50 dark:text-cream/50 md:flex"
      >
        <span className="text-[10px] font-semibold uppercase tracking-[0.3em]">Scroll</span>
        <motion.span
          animate={reducedMotion ? undefined : { y: [0, 6, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <FiArrowDown size={16} />
        </motion.span>
      </button>
    </section>
  );
}
