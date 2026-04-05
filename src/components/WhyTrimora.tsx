"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const features = [
  {
    icon: "💬",
    title: "Care Coaching",
    description:
      "Ongoing support from dedicated health coaches who guide you through every step of your treatment journey.",
    color: "#2e936f",
  },
  {
    icon: "🩺",
    title: "Licensed Providers",
    description:
      "Board-certified physicians and clinicians review every treatment plan tailored to your unique needs.",
    color: "#956bad",
  },
  {
    icon: "📱",
    title: "100% Online Care",
    description:
      "Access your treatments, consultations, and support from anywhere — no office visits required.",
    color: "#8cb0b2",
  },
  {
    icon: "🚚",
    title: "Fast Shipping",
    description:
      "Medications and treatments shipped directly to your door with discreet, expedited packaging.",
    color: "#eb8771",
  },
  {
    icon: "🕐",
    title: "24/7 Support",
    description:
      "Round-the-clock access to our care team whenever you have questions or need assistance.",
    color: "#c6a673",
  },
];

export default function WhyTrimora() {
  return (
    <section id="why-trimora" className="py-[72px] md:py-[100px] bg-[var(--background)]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block px-3.5 py-[5px] rounded-full bg-[var(--primary)]/[0.08] text-[var(--primary)] text-[11px] font-bold uppercase tracking-[0.08em] mb-5">
            Why Choose Us
          </span>
          <h2
            className="text-[30px] md:text-[38px] lg:text-[44px] font-extrabold tracking-[-0.025em] leading-[1.1] text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Benefits that make a difference
          </h2>
          <p className="mt-4 text-[17px] text-[var(--foreground)]/50 max-w-[560px] mx-auto font-medium leading-[1.6]">
            Experience healthcare designed around your life, not the other way around.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.08}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.25 }}
                className="group h-full p-6 rounded-[22px] bg-white shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.08)] transition-shadow duration-300 cursor-default"
              >
                <div
                  className="w-[52px] h-[52px] rounded-[14px] flex items-center justify-center text-[24px] mb-5 transition-transform duration-200 group-hover:scale-110"
                  style={{ backgroundColor: feature.color + "12" }}
                >
                  {feature.icon}
                </div>
                <h3 className="font-bold text-[16px] mb-2 text-[var(--foreground)]">
                  {feature.title}
                </h3>
                <p className="text-[13px] text-[var(--foreground)]/50 leading-[1.6] font-medium">
                  {feature.description}
                </p>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
