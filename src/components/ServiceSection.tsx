"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

interface ServiceSectionProps {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  features: string[];
  image: string;
  bgColor: string;
  accentColor: string;
  ctaText?: string;
  ctaHref?: string;
  comingSoon?: boolean;
  reversed?: boolean;
}

export default function ServiceSection({
  id,
  title,
  subtitle,
  description,
  features,
  image,
  bgColor,
  accentColor,
  ctaText = "Get Started",
  ctaHref = "#get-started",
  comingSoon = false,
  reversed = false,
}: ServiceSectionProps) {
  return (
    <section id={id} className="py-[72px] md:py-[100px]" style={{ backgroundColor: bgColor }}>
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className={`grid lg:grid-cols-2 gap-10 lg:gap-[72px] items-center`}>
          {/* Image - order changes on reversed */}
          <AnimatedSection
            direction={reversed ? "right" : "left"}
            className={reversed ? "lg:order-2" : ""}
          >
            <div className="relative w-full aspect-[4/3] rounded-[24px] overflow-hidden shadow-[0_12px_40px_rgba(0,0,0,0.08)]">
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
                sizes="(min-width: 1024px) 50vw, 100vw"
              />
              {comingSoon && (
                <div className="absolute inset-0 bg-black/15 backdrop-blur-[1px] flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.85, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="px-7 py-3 rounded-full bg-white/95 shadow-[0_8px_30px_rgba(0,0,0,0.12)] animate-pulse-badge"
                  >
                    <span
                      className="font-extrabold text-[17px] tracking-[-0.01em]"
                      style={{ color: accentColor, fontFamily: "var(--font-heading)" }}
                    >
                      Coming Soon
                    </span>
                  </motion.div>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Content */}
          <div className={reversed ? "lg:order-1" : ""}>
            <AnimatedSection delay={0.1}>
              <span
                className="inline-block px-3.5 py-[5px] rounded-full text-[11px] font-bold uppercase tracking-[0.08em] mb-5"
                style={{ backgroundColor: accentColor + "18", color: accentColor }}
              >
                {subtitle}
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.15}>
              <h2
                className="text-[30px] md:text-[38px] lg:text-[44px] font-extrabold leading-[1.1] tracking-[-0.025em] mb-5 text-[var(--foreground)]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {title}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <p className="text-[16px] md:text-[17px] text-[var(--foreground)]/55 mb-7 leading-[1.65] font-medium">
                {description}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.25}>
              <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 + i * 0.06, duration: 0.4 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="w-[22px] h-[22px] rounded-full flex items-center justify-center flex-shrink-0"
                      style={{ backgroundColor: accentColor }}
                    >
                      <svg
                        width="11"
                        height="11"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="white"
                        strokeWidth="3.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </span>
                    <span className="text-[15px] font-medium text-[var(--foreground)]/80">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              {comingSoon ? (
                <span
                  className="inline-block px-8 py-[13px] rounded-full text-white font-bold text-[15px] opacity-50 cursor-not-allowed"
                  style={{ backgroundColor: accentColor }}
                >
                  Coming Soon
                </span>
              ) : (
                <a
                  href={ctaHref}
                  className="inline-block px-8 py-[13px] rounded-full text-white font-bold text-[15px] tracking-[-0.01em] transition-all duration-200 hover:shadow-lg hover:-translate-y-[1px]"
                  style={{ backgroundColor: accentColor }}
                >
                  {ctaText}
                </a>
              )}
            </AnimatedSection>
          </div>
        </div>
      </div>
    </section>
  );
}
