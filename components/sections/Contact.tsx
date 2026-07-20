"use client";

import { motion } from "framer-motion";
import { FaTiktok, FaWhatsapp } from "react-icons/fa";
import { CONTACT, TEACHER } from "@/lib/constants";
import MagneticButton from "@/components/ui/MagneticButton";
import AmbientBlobs from "@/components/ui/AmbientBlobs";
import { useDeck } from "@/hooks/useDeck";

const contactRows = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    value: TEACHER.whatsapp,
    href: TEACHER.whatsappHref,
    Icon: FaWhatsapp,
  },
  {
    id: "tiktok",
    label: "TikTok",
    value: TEACHER.tiktok,
    href: TEACHER.tiktokHref,
    Icon: FaTiktok,
  },
];

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] as const },
  },
};

export default function Contact() {
  const { goTo } = useDeck();
  const year = new Date().getFullYear();

  return (
    <section
      id="contact"
      data-deck-section
      aria-label="Contact"
      className="deck-slide relative flex flex-col justify-between overflow-hidden bg-terracotta py-20 text-cream"
    >
      <AmbientBlobs
        blobs={[
          { color: "#8F3A22", size: 420, top: "-15%", right: "-10%", opacity: 0.55 },
          { color: "#F6CD46", size: 260, bottom: "5%", left: "-6%", opacity: 0.18, delay: "-4s" },
        ]}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center px-6 sm:px-8 lg:px-12">
        <motion.div
          variants={container}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
        >
          <motion.p
            variants={item}
            className="mb-4 text-xs font-bold uppercase tracking-[0.3em] text-marigold"
          >
            {CONTACT.eyebrow}
          </motion.p>

          <motion.h2
            variants={item}
            className="font-serif text-5xl italic leading-[1.05] text-cream sm:text-7xl lg:text-8xl"
          >
            {CONTACT.heading}
          </motion.h2>

          <motion.p variants={item} className="mt-6 max-w-md text-base leading-relaxed text-cream/75 sm:text-lg">
            {CONTACT.subheading}
          </motion.p>

          <motion.div variants={item} className="mt-10 space-y-4">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cream/50">
              {TEACHER.fullName}
            </p>
            {contactRows.map(({ id, label, value, href, Icon }) => (
              <a
                key={id}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="hover"
                className="group flex w-fit items-center gap-4"
              >
                <motion.span
                  whileHover={{ scale: 1.15, rotate: -8 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="grid h-12 w-12 flex-shrink-0 place-items-center rounded-full bg-cream text-terracotta shadow-soft"
                >
                  <Icon size={20} />
                </motion.span>
                <span className="border-b border-transparent text-lg font-medium text-cream transition-colors group-hover:border-cream/60 sm:text-xl">
                  {value}
                  <span className="ml-2 text-xs font-normal uppercase tracking-wide text-cream/50">
                    {label}
                  </span>
                </span>
              </a>
            ))}
          </motion.div>

          <motion.div variants={item} className="mt-10">
            <MagneticButton
              href={TEACHER.whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              variant="outline"
              className="border-cream text-cream"
            >
              {CONTACT.ctaBoxed}
            </MagneticButton>
          </motion.div>
        </motion.div>
      </div>

      <footer className="relative z-10 mx-auto mt-16 w-full max-w-5xl border-t border-cream/15 px-6 pt-6 sm:px-8 lg:px-12">
        <div className="flex flex-col items-center justify-between gap-4 text-xs text-cream/50 sm:flex-row">
          <p>
            © {year} {TEACHER.fullName}. Dibuat dengan dedikasi untuk siswa Indonesia.
          </p>
          <button
            type="button"
            onClick={() => goTo(0)}
            data-cursor="hover"
            className="font-semibold uppercase tracking-[0.2em] text-cream/70 underline-offset-4 hover:text-cream hover:underline"
          >
            Back to top
          </button>
        </div>
      </footer>
    </section>
  );
}
