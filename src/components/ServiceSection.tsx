"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

interface ServiceSectionProps {
  id: string;
  label: string;
  title: string;
  accentWord: string;
  listHeading: string;
  features: string[];
  images: [string, string, string]; // [large left, medium right-top, medium right-bottom]
  bgColor: string;
  accentColor: string;
  ctaText?: string;
  ctaHref?: string;
  comingSoon?: boolean;
  reversed?: boolean;
}

export default function ServiceSection({
  id,
  label,
  title,
  accentWord,
  listHeading,
  features,
  images,
  bgColor,
  accentColor,
  ctaText,
  ctaHref = "#get-started",
  comingSoon = false,
  reversed = false,
}: ServiceSectionProps) {
  // Split title around accentWord to color it
  const titleParts = title.split(accentWord);

  return (
    <section id={id} className="py-[80px] md:py-[120px]" style={{ backgroundColor: bgColor }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className={`grid lg:grid-cols-2 gap-10 lg:gap-[60px] ${reversed ? "" : ""}`}>
          {/* Left Column: large image + features list */}
          <div className={reversed ? "lg:order-2" : ""}>
            <AnimatedSection direction={reversed ? "right" : "left"}>
              <div className="relative w-full aspect-[4/5] max-w-[520px] rounded-[24px] overflow-hidden mb-8">
                <Image
                  src={images[0]}
                  alt={label}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 40vw, 90vw"
                />
                {comingSoon && (
                  <div className="absolute inset-0 bg-black/10 flex items-end justify-center pb-8">
                    <motion.div
                      initial={{ scale: 0.9, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true }}
                      className="px-7 py-3 rounded-full bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.12)]"
                    >
                      <span
                        className="font-extrabold text-[15px] tracking-[0.05em] uppercase"
                        style={{ color: accentColor, fontFamily: "var(--font-heading)" }}
                      >
                        Coming Soon
                      </span>
                    </motion.div>
                  </div>
                )}
              </div>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h3
                className="text-[20px] md:text-[22px] font-semibold text-[var(--foreground)] mb-4 tracking-[-0.01em]"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                {listHeading}
              </h3>
              <ul className="space-y-2.5">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.25 + i * 0.05, duration: 0.35 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="w-[24px] h-[24px] rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: accentColor }}
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-[15px] font-medium text-[var(--foreground)]/75">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
              {ctaText && !comingSoon && (
                <a
                  href={ctaHref}
                  className="inline-block mt-7 px-8 py-[13px] rounded-full text-white font-bold text-[13px] tracking-[0.05em] uppercase transition-all duration-200 hover:shadow-lg hover:-translate-y-[1px]"
                  style={{ backgroundColor: accentColor }}
                >
                  {ctaText}
                </a>
              )}
              {comingSoon && (
                <span
                  className="inline-block mt-7 px-8 py-[13px] rounded-full font-bold text-[13px] tracking-[0.05em] uppercase border-2 opacity-70 cursor-not-allowed"
                  style={{ borderColor: accentColor, color: accentColor }}
                >
                  Coming Soon
                </span>
              )}
            </AnimatedSection>
          </div>

          {/* Right Column: label + heading + 2 images */}
          <div className={reversed ? "lg:order-1" : ""}>
            <AnimatedSection delay={0.1}>
              <span
                className="block text-[10px] md:text-[11px] font-bold uppercase tracking-[0.16em] text-[var(--foreground)]/70 mb-4"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                {label}
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h2
                className="text-[34px] md:text-[44px] lg:text-[52px] font-semibold leading-[1.05] tracking-[-0.025em] text-[var(--foreground)] mb-8"
                style={{ fontFamily: "var(--font-accent)" }}
              >
                {titleParts[0]}
                <span style={{ color: accentColor }}>{accentWord}</span>
                {titleParts[1] || ""}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <div className="grid grid-cols-2 gap-4 md:gap-5">
                <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden">
                  <Image
                    src={images[1]}
                    alt={`${label} lifestyle`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 22vw, 45vw"
                  />
                </div>
                <div className="relative aspect-[3/4] rounded-[20px] overflow-hidden">
                  <Image
                    src={images[2]}
                    alt={`${label} detail`}
                    fill
                    className="object-cover"
                    sizes="(min-width: 1024px) 22vw, 45vw"
                  />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
