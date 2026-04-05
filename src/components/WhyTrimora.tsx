"use client";

import { motion } from "framer-motion";
import AnimatedSection from "./AnimatedSection";

const features = [
  {
    icon: "💬",
    title: "Care Coaching",
    description:
      "Ongoing support from dedicated health coaches who guide you through every step of your treatment journey.",
    color: "var(--forest)",
  },
  {
    icon: "🩺",
    title: "Licensed Providers",
    description:
      "Board-certified physicians and clinicians review every treatment plan tailored to your unique needs.",
    color: "var(--berry)",
  },
  {
    icon: "📱",
    title: "100% Online Care",
    description:
      "Access your treatments, consultations, and support from anywhere — no office visits required.",
    color: "var(--frozen)",
  },
  {
    icon: "🚚",
    title: "Fast Shipping",
    description:
      "Medications and treatments shipped directly to your door with discreet, expedited packaging.",
    color: "var(--passion-fruit)",
  },
  {
    icon: "🕐",
    title: "24/7 Support",
    description:
      "Round-the-clock access to our care team whenever you have questions or need assistance.",
    color: "var(--sand)",
  },
];

export default function WhyTrimora() {
  return (
    <section id="why-trimora" className="py-16 md:py-24 bg-[var(--background)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--primary)]/10 text-[var(--primary)] text-xs font-bold uppercase tracking-wider mb-4">
            Why Choose Us
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Benefits that make a difference
          </h2>
          <p className="mt-4 text-lg text-[var(--foreground)]/50 max-w-2xl mx-auto">
            Experience healthcare designed around your life, not the other way around.
          </p>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.1}>
              <motion.div
                whileHover={{ y: -8, scale: 1.02 }}
                transition={{ duration: 0.3 }}
                className="group h-full p-6 rounded-3xl bg-white shadow-sm hover:shadow-xl transition-shadow cursor-default"
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl mb-5 transition-transform group-hover:scale-110"
                  style={{ backgroundColor: feature.color + "15" }}
                >
                  {feature.icon}
                </div>
                <h3 className="font-bold text-lg mb-2">{feature.title}</h3>
                <p className="text-sm text-[var(--foreground)]/50 leading-relaxed">
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
