"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Small heart icon used inside HeartsSticker. */
function Heart({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 sm:h-6 sm:w-6" aria-hidden="true">
      <path
        d="M12 20.5s-7.5-4.6-10-9.2C.6 8 2 4.5 5.4 4c2-.3 3.8.7 4.6 2.3C10.8 4.7 12.6 3.7 14.6 4c3.4.5 4.8 4 3.4 7.3-2.5 4.6-10 9.2-10 9.2z"
        fill={color}
        stroke="#15140D"
        strokeWidth="1.2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** The orange card with three little hearts, echoing the original Home slide sticker. */
export function HeartsSticker({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "flex items-center gap-1.5 rounded-2xl border-2 border-white bg-[#FF7A59] px-4 py-3 shadow-soft",
        className
      )}
      aria-hidden="true"
    >
      <Heart color="#829CFF" />
      <Heart color="#F6CD46" />
      <Heart color="#829CFF" />
    </div>
  );
}

/** The blue circle with a waving hand, echoing the original Home slide sticker. */
export function WaveSticker({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "grid h-16 w-16 place-items-center rounded-full border-4 border-white bg-periwinkle shadow-soft sm:h-20 sm:w-20",
        className
      )}
      aria-hidden="true"
    >
      <svg viewBox="0 0 48 48" className="h-9 w-9 sm:h-11 sm:w-11">
        <g stroke="#15140D" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M14 44c-3-2-6-6-6-11V21a3 3 0 0 1 6 0v6"
            fill="#F6CD46"
          />
          <path d="M14 27v-9a3 3 0 1 1 6 0v8" fill="#F6CD46" />
          <path d="M20 26v-11a3 3 0 1 1 6 0v11" fill="#F6CD46" />
          <path d="M26 26v-8a3 3 0 1 1 6 0v11c0 8-5 15-11 15h-3" fill="#F6CD46" />
          <path d="M8 10 6 6M13 6l-1-5M19 6l1-5" stroke="#FF7A59" />
        </g>
      </svg>
    </div>
  );
}

/** Ticket-shaped badge, e.g. "Belajar secara Privat". */
export function TicketBadge({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "relative inline-flex items-center justify-center rounded-2xl bg-marigold px-6 py-3 text-center font-display text-sm font-semibold text-ink shadow-soft before:absolute before:left-[-9px] before:top-1/2 before:h-4 before:w-4 before:-translate-y-1/2 before:rounded-full before:bg-cream after:absolute after:right-[-9px] after:top-1/2 after:h-4 after:w-4 after:-translate-y-1/2 after:rounded-full after:bg-cream dark:before:bg-ink dark:after:bg-ink",
        className
      )}
      style={{
        borderTop: "1.5px dashed rgba(21,20,13,0.35)",
        borderBottom: "1.5px dashed rgba(21,20,13,0.35)",
      }}
    >
      {children}
    </div>
  );
}

/** Small circular icon sticker, e.g. peace sign / smiley used in the About slide. */
export function IconSticker({
  className,
  bg = "#F6CD46",
  children,
}: {
  className?: string;
  bg?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={cn(
        "grid h-14 w-14 place-items-center rounded-full border-4 border-white shadow-soft sm:h-16 sm:w-16",
        className
      )}
      style={{ backgroundColor: bg }}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}
