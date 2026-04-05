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
    <section id={id} className="py-16 md:py-24" style={{ backgroundColor: bgColor }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`grid md:grid-cols-2 gap-12 lg:gap-20 items-center ${
            reversed ? "md:direction-rtl" : ""
          }`}
          style={{ direction: reversed ? "rtl" : "ltr" }}
        >
          {/* Image */}
          <AnimatedSection direction={reversed ? "right" : "left"}>
            <div
              className="relative w-full aspect-[4/3] rounded-3xl overflow-hidden shadow-lg"
              style={{ direction: "ltr" }}
            >
              <Image
                src={image}
                alt={title}
                fill
                className="object-cover"
              />
              {comingSoon && (
                <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    whileInView={{ scale: 1, opacity: 1 }}
                    viewport={{ once: true }}
                    className="px-6 py-3 rounded-full bg-white/95 shadow-xl animate-pulse-badge"
                  >
                    <span className="font-bold text-lg" style={{ color: accentColor }}>
                      Coming Soon
                    </span>
                  </motion.div>
                </div>
              )}
            </div>
          </AnimatedSection>

          {/* Content */}
          <div style={{ direction: "ltr" }}>
            <AnimatedSection delay={0.1}>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-4"
                style={{ backgroundColor: accentColor + "20", color: accentColor }}
              >
                {subtitle}
              </span>
            </AnimatedSection>

            <AnimatedSection delay={0.2}>
              <h2
                className="text-3xl md:text-4xl lg:text-5xl font-extrabold leading-tight mb-6"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {title}
              </h2>
            </AnimatedSection>

            <AnimatedSection delay={0.3}>
              <p className="text-base md:text-lg text-[var(--foreground)]/60 mb-8 leading-relaxed">
                {description}
              </p>
            </AnimatedSection>

            <AnimatedSection delay={0.4}>
              <ul className="space-y-3 mb-8">
                {features.map((feature, i) => (
                  <motion.li
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.5 + i * 0.1 }}
                    className="flex items-center gap-3"
                  >
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs flex-shrink-0"
                      style={{ backgroundColor: accentColor }}
                    >
                      ✓
                    </span>
                    <span className="text-sm md:text-base font-medium">
                      {feature}
                    </span>
                  </motion.li>
                ))}
              </ul>
            </AnimatedSection>

            <AnimatedSection delay={0.6}>
              {comingSoon ? (
                <button
                  disabled
                  className="px-8 py-3.5 rounded-full text-white font-semibold opacity-60 cursor-not-allowed"
                  style={{ backgroundColor: accentColor }}
                >
                  Coming Soon
                </button>
              ) : (
                <a
                  href={ctaHref}
                  className="inline-block px-8 py-3.5 rounded-full text-white font-semibold transition-all hover:shadow-lg hover:-translate-y-0.5"
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
