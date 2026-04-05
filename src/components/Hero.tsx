"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const badges = [
  { icon: "🩺", label: "Licensed Providers" },
  { icon: "💻", label: "100% Online" },
  { icon: "💰", label: "Clear Pricing" },
  { icon: "📦", label: "Shipped to Door" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20 bg-gradient-to-b from-[#d6f2da]/40 to-[var(--background)]">
      {/* Decorative background circles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ scale: [1, 1.1, 1], rotate: [0, 5, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-[var(--primary)]/5"
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1], rotate: [0, -3, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-[var(--frozen)]/10"
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 md:py-24">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-center md:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-sm font-semibold mb-6"
            >
              <span className="w-2 h-2 rounded-full bg-[var(--primary)] animate-pulse" />
              Now Accepting New Patients
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight tracking-tight"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Join 500,000+{" "}
              <span className="text-[var(--primary)]">Trimora</span> patients
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-6 text-lg md:text-xl text-[var(--foreground)]/60 max-w-lg mx-auto md:mx-0"
            >
              Healthcare, redefined for real life. Personalized treatments
              delivered to your door by licensed providers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 flex flex-col sm:flex-row gap-4 justify-center md:justify-start"
            >
              <a
                href="#get-started"
                className="px-8 py-4 rounded-full bg-[var(--primary)] text-white font-semibold text-lg hover:bg-[var(--primary)]/90 transition-all hover:shadow-xl hover:shadow-[var(--primary)]/20 hover:-translate-y-0.5"
              >
                Get Started
              </a>
              <a
                href="#why-trimora"
                className="px-8 py-4 rounded-full border-2 border-[var(--foreground)]/10 text-[var(--foreground)] font-semibold text-lg hover:border-[var(--primary)] hover:text-[var(--primary)] transition-all"
              >
                Learn More
              </a>
            </motion.div>

            {/* Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4"
            >
              {badges.map((badge, i) => (
                <motion.div
                  key={badge.label}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4, delay: 1 + i * 0.1 }}
                  className="flex flex-col items-center gap-2 p-3 rounded-2xl bg-white/80 shadow-sm"
                >
                  <span className="text-2xl">{badge.icon}</span>
                  <span className="text-xs font-semibold text-[var(--foreground)]/70">
                    {badge.label}
                  </span>
                </motion.div>
              ))}
            </motion.div>
          </div>

          {/* Right image */}
          <motion.div
            initial={{ opacity: 0, scale: 1.1 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative hidden md:block"
          >
            <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="/images/hero-doctor.png"
                alt="Trimora Healthcare"
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl p-4 flex items-center gap-3"
            >
              <div className="w-12 h-12 rounded-full bg-[var(--primary)]/10 flex items-center justify-center">
                <span className="text-[var(--primary)] text-xl">✓</span>
              </div>
              <div>
                <p className="font-bold text-sm">Board Certified</p>
                <p className="text-xs text-[var(--foreground)]/50">
                  All providers licensed
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
