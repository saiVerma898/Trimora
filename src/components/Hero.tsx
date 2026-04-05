"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const serviceCards = [
  {
    name: "Weight Loss",
    image: "/images/card-weightloss.png",
    href: "#weight-loss",
    bg: "#d6f2da",
  },
  {
    name: "Peptides & Longevity",
    image: "/images/card-peptides.png",
    href: "#peptides",
    bg: "#e5f2f2",
  },
  {
    name: "Men's Health",
    image: "/images/card-mens.png",
    href: "#mens-health",
    bg: "#f2ebe1",
  },
  {
    name: "Women's Health",
    image: "/images/card-womens.png",
    href: "#womens-health",
    bg: "#ffe8f4",
  },
  {
    name: "Weight Loss",
    image: "/images/card-weightloss.png",
    href: "#weight-loss",
    bg: "#d6f2da",
  },
  {
    name: "Peptides & Longevity",
    image: "/images/card-peptides.png",
    href: "#peptides",
    bg: "#e5f2f2",
  },
];

export default function Hero() {
  return (
    <section className="relative bg-gradient-to-b from-[#1a4d35] via-[#1f5c3f] to-[#2e936f] overflow-hidden">
      {/* Main hero content */}
      <div className="relative pt-[140px] pb-[50px] md:pt-[160px] md:pb-[60px]">
        <div className="max-w-[1400px] mx-auto px-6 lg:px-12 text-center">
          {/* Subheading */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-white/70 text-[15px] md:text-[16px] font-medium mb-6 tracking-[0.01em]"
          >
            Join <span className="font-bold text-white">500,000+</span> Trimora patients
          </motion.p>

          {/* Main headline */}
          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-[42px] sm:text-[56px] md:text-[72px] lg:text-[86px] font-extrabold leading-[1.02] tracking-[-0.04em] text-white mb-7"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Healthcare,
            <br />
            <span className="text-[#7dd4a8]">redefined</span> for real life.
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="text-white/65 text-[16px] md:text-[18px] leading-[1.65] max-w-[620px] mx-auto font-medium"
          >
            We provide medical care online—simple, direct, and led by licensed
            providers. No waiting rooms. No unnecessary steps. Just care that works.
          </motion.p>
        </div>
      </div>

      {/* Service cards carousel */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.65 }}
        className="relative pb-[60px] md:pb-[80px]"
      >
        {/* Large TRIMORA watermark behind cards */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none overflow-hidden">
          <span
            className="text-[140px] md:text-[220px] lg:text-[280px] font-extrabold text-white/[0.04] tracking-[-0.05em] whitespace-nowrap select-none"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            TRIMORA
          </span>
        </div>

        <div className="relative overflow-hidden">
          <motion.div
            animate={{ x: [0, -1200] }}
            transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
            className="flex gap-4 md:gap-5 pl-6 lg:pl-12"
          >
            {[...serviceCards, ...serviceCards].map((card, i) => (
              <a
                key={i}
                href={card.href}
                className="flex-shrink-0 group"
              >
                <div
                  className="w-[220px] md:w-[260px] h-[240px] md:h-[280px] rounded-[20px] overflow-hidden relative mb-3"
                  style={{ backgroundColor: card.bg }}
                >
                  <Image
                    src={card.image}
                    alt={card.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="260px"
                  />
                </div>
                <div className="flex items-center justify-between px-1">
                  <span className="text-white text-[15px] md:text-[16px] font-bold">
                    {card.name}
                  </span>
                  <span className="text-white/60 text-[18px] group-hover:translate-x-1 transition-transform">
                    →
                  </span>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
