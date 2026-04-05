"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function CTABanner() {
  return (
    <section
      id="get-started"
      className="py-16 md:py-24 bg-gradient-to-r from-[var(--primary)] to-[#1a8a62] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -top-20 -right-20 w-80 h-80 rounded-full border border-white/10"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 45, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full border border-white/10"
        />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-white mb-6"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to Transform Your Health?
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={0.2}>
          <p className="text-lg md:text-xl text-white/80 mb-10 max-w-2xl mx-auto">
            Start your personalized treatment plan today. Licensed providers,
            clear pricing, and treatments delivered to your door.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.4}>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="#"
              className="px-10 py-4 rounded-full bg-white text-[var(--primary)] font-bold text-lg shadow-xl hover:shadow-2xl transition-shadow"
            >
              Get Started Now
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              href="#"
              className="px-10 py-4 rounded-full border-2 border-white/30 text-white font-bold text-lg hover:bg-white/10 transition-colors"
            >
              Talk to a Provider
            </motion.a>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.6}>
          <p className="mt-8 text-sm text-white/50">
            No commitment required &bull; Cancel anytime &bull; HIPAA compliant
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
