"use client";

import { motion } from "framer-motion";

/**
 * "Featured Coverage In" press strip.
 *
 * NOTE: These are stylized text wordmarks rendered with CSS using common
 * publication typefaces (serif italic, condensed sans, etc.) — they are
 * NOT pixel-perfect reproductions of any publication's copyrighted logo
 * file. Replace with licensed logo assets if/when actual press coverage
 * is secured.
 */

type Mark = {
  name: string;
  className?: string;
  style?: React.CSSProperties;
};

const marks: Mark[] = [
  {
    name: "Forbes",
    style: {
      fontFamily: "'Times New Roman', Georgia, serif",
      fontWeight: 900,
      fontStyle: "italic",
      fontSize: 26,
      letterSpacing: "-0.01em",
      color: "#1f3e5b",
    },
  },
  {
    name: "WebMD",
    style: {
      fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
      fontWeight: 800,
      fontStyle: "italic",
      fontSize: 22,
      letterSpacing: "-0.03em",
      color: "#1f3e5b",
    },
  },
  {
    name: "yahoo!",
    style: {
      fontFamily: "'Helvetica Neue', Helvetica, sans-serif",
      fontWeight: 900,
      fontStyle: "italic",
      fontSize: 24,
      letterSpacing: "-0.05em",
      color: "#1f3e5b",
    },
  },
  {
    name: "NEW YORK POST",
    style: {
      fontFamily: "Georgia, 'Times New Roman', serif",
      fontWeight: 900,
      fontStyle: "italic",
      fontSize: 14,
      letterSpacing: "0",
      color: "#1f3e5b",
      WebkitTextStroke: "0.4px #1f3e5b",
    },
  },
];

interface PressStripProps {
  /** Background color for the strip section */
  bg?: string;
  /** Whether to show the centered eyebrow label (defaults true) */
  showEyebrow?: boolean;
}

export default function PressStrip({ bg = "transparent", showEyebrow = true }: PressStripProps) {
  return (
    <section className="py-6 md:py-8" style={{ backgroundColor: bg }}>
      <div className="max-w-[1100px] mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-7 lg:gap-10">
          {/* Left: FEATURED COVERAGE IN + stars */}
          <div className="flex flex-col items-center md:items-start flex-shrink-0">
            {showEyebrow && (
              <p
                className="text-[11px] md:text-[12px] font-extrabold uppercase tracking-[0.14em] leading-[1.25] text-center md:text-left"
                style={{ color: "#1f3e5b" }}
              >
                Featured
                <br className="hidden md:block" />
                <span className="md:inline"> Coverage In</span>
              </p>
            )}
            <div
              className="mt-2 inline-flex items-center gap-[2px] px-3 py-[5px] rounded-md"
              style={{ background: "#f5c548" }}
            >
              {[0, 1, 2, 3, 4].map((i) => (
                <Star key={i} />
              ))}
            </div>
          </div>

          {/* Vertical divider — desktop only */}
          <div className="hidden md:block w-px self-stretch" style={{ background: "#1f3e5b22" }} />

          {/* Right: stylized publication wordmarks */}
          <div className="flex flex-wrap items-center justify-center gap-x-7 md:gap-x-9 lg:gap-x-12 gap-y-3">
            {marks.map((m) => (
              <motion.span
                key={m.name}
                initial={{ opacity: 0, y: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4 }}
                className={m.className}
                style={m.style}
              >
                {m.name}
              </motion.span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function Star() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="white" stroke="white" strokeWidth="0" aria-hidden="true">
      <path d="M12 2l2.94 6.96L22 9.91l-5.5 5.06L18.18 22 12 18.27 5.82 22l1.68-7.03L2 9.91l7.06-.95L12 2z" />
    </svg>
  );
}
