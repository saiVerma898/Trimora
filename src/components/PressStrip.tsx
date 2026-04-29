"use client";

import { motion } from "framer-motion";

/**
 * "As Featured In" press strip.
 *
 * NOTE: These are stylized text wordmarks rendered with CSS — they are NOT
 * pixel-perfect reproductions of the publications' copyrighted logo files.
 * Replace with licensed logo assets if/when actual press coverage is secured.
 */

type Mark = {
  name: string;
  className: string; // tailwind classes for typography
  style?: React.CSSProperties;
};

const marks: Mark[] = [
  {
    name: "Forbes",
    className: "text-[24px] md:text-[28px] tracking-[0.01em]",
    style: {
      fontFamily: "'Times New Roman', Georgia, serif",
      fontWeight: 900,
      fontStyle: "italic",
      letterSpacing: "-0.01em",
    },
  },
  {
    name: "The New York Times",
    className: "text-[14px] md:text-[16px]",
    style: {
      fontFamily: "'Times New Roman', Georgia, serif",
      fontWeight: 700,
      letterSpacing: "0",
    },
  },
  {
    name: "Yahoo!",
    className: "text-[24px] md:text-[28px]",
    style: {
      fontFamily: "Helvetica, Arial, sans-serif",
      fontWeight: 900,
      letterSpacing: "-0.04em",
      fontStyle: "italic",
    },
  },
  {
    name: "Healthline",
    className: "text-[18px] md:text-[20px]",
    style: {
      fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
      fontWeight: 700,
      letterSpacing: "-0.02em",
    },
  },
  {
    name: "BLOOMBERG",
    className: "text-[14px] md:text-[16px]",
    style: {
      fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
      fontWeight: 900,
      letterSpacing: "0.02em",
    },
  },
  {
    name: "WebMD",
    className: "text-[20px] md:text-[24px]",
    style: {
      fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
      fontWeight: 800,
      letterSpacing: "-0.03em",
    },
  },
];

interface PressStripProps {
  /** Background color for the strip section */
  bg?: string;
  /** Whether to show the "AS FEATURED IN" eyebrow label */
  showLabel?: boolean;
  /** Override label text */
  label?: string;
  /** Color of the wordmarks (default: warm dark) */
  markColor?: string;
}

export default function PressStrip({
  bg = "transparent",
  showLabel = true,
  label = "As Featured In",
  markColor = "#242220",
}: PressStripProps) {
  return (
    <section className="py-10 md:py-14" style={{ backgroundColor: bg }}>
      <div className="max-w-[1180px] mx-auto px-6">
        {showLabel && (
          <p className="text-center text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] text-[#242220]/40 mb-6 md:mb-8">
            {label}
          </p>
        )}

        {/* Desktop: equal-spaced grid; Mobile: scrolling marquee */}
        <div className="hidden md:flex flex-wrap items-center justify-center gap-x-10 lg:gap-x-14 gap-y-6 opacity-65">
          {marks.map((m) => (
            <motion.span
              key={m.name}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4 }}
              className={m.className}
              style={{ color: markColor, ...m.style }}
            >
              {m.name}
            </motion.span>
          ))}
        </div>

        {/* Mobile: gentle horizontal scroll */}
        <div className="md:hidden overflow-hidden">
          <motion.div
            animate={{ x: [0, -800] }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="flex items-center gap-x-10 whitespace-nowrap"
            style={{ width: "max-content" }}
          >
            {[...marks, ...marks].map((m, i) => (
              <span
                key={`${m.name}-${i}`}
                className={m.className}
                style={{ color: markColor, opacity: 0.65, ...m.style }}
              >
                {m.name}
              </span>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
