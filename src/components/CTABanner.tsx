"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

export default function CTABanner() {
  return (
    <section
      id="get-started"
      className="py-[80px] md:py-[110px] bg-gradient-to-br from-[#2e936f] via-[#267d5e] to-[#1a6b4f] relative overflow-hidden"
    >
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 80, repeat: Infinity, ease: "linear" }}
          className="absolute -top-[120px] -right-[120px] w-[400px] h-[400px] rounded-full border border-white/[0.06]"
        />
        <motion.div
          animate={{ rotate: -360 }}
          transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
          className="absolute -bottom-[160px] -left-[160px] w-[500px] h-[500px] rounded-full border border-white/[0.06]"
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-white/[0.02]" />
      </div>

      <div className="relative max-w-[720px] mx-auto px-6 lg:px-10 text-center">
        <AnimatedSection>
          <h2
            className="text-[30px] md:text-[40px] lg:text-[48px] font-extrabold text-white leading-[1.1] tracking-[-0.025em] mb-5"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready to Transform Your Health?
          </h2>
        </AnimatedSection>
        <AnimatedSection delay={0.15}>
          <p className="text-[17px] md:text-[19px] text-white/70 mb-10 leading-[1.6] font-medium">
            Start your personalized treatment plan today. Licensed providers,
            clear pricing, and treatments delivered to your door.
          </p>
        </AnimatedSection>
        <AnimatedSection delay={0.3}>
          <div className="flex flex-col sm:flex-row gap-3.5 justify-center">
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#"
              className="px-10 py-[15px] rounded-full bg-white text-[var(--primary)] font-bold text-[16px] tracking-[-0.01em] shadow-[0_8px_30px_rgba(0,0,0,0.15)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.2)] transition-shadow duration-200"
            >
              Get Started Now
            </motion.a>
            <motion.a
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              href="#"
              className="px-10 py-[15px] rounded-full border border-white/25 text-white font-bold text-[16px] tracking-[-0.01em] hover:bg-white/[0.08] transition-colors duration-200"
            >
              Talk to a Provider
            </motion.a>
          </div>
        </AnimatedSection>
        <AnimatedSection delay={0.45}>
          <p className="mt-8 text-[13px] text-white/40 font-medium">
            No commitment required &bull; Cancel anytime &bull; HIPAA compliant
          </p>
        </AnimatedSection>
      </div>
    </section>
  );
}
