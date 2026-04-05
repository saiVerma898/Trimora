"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import AnimatedSection from "./AnimatedSection";

const doctors = [
  {
    name: "Dr. Sarah Mitchell",
    credential: "MD, FACP",
    university: "Stanford University School of Medicine",
    specialties: ["Internal Medicine", "Weight Management", "Preventive Care"],
    image: "/images/doctor-female.png",
  },
  {
    name: "Dr. James Crawford",
    credential: "MD, ABIM",
    university: "Johns Hopkins University School of Medicine",
    specialties: ["Men's Health", "Endocrinology", "Regenerative Medicine"],
    image: "/images/doctor-male.png",
  },
];

export default function Doctors() {
  return (
    <section className="py-16 md:py-24 bg-[#f2f0ed]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-16">
          <span className="inline-block px-3 py-1 rounded-full bg-[var(--stone)]/15 text-[var(--stone)] text-xs font-bold uppercase tracking-wider mb-4">
            Our Medical Team
          </span>
          <h2
            className="text-3xl md:text-4xl lg:text-5xl font-extrabold"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our Doctors
          </h2>
          <p className="mt-4 text-lg text-[var(--foreground)]/50 max-w-2xl mx-auto">
            Board-certified physicians dedicated to providing exceptional,
            personalized care.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {doctors.map((doctor, i) => (
            <AnimatedSection key={doctor.name} delay={i * 0.2}>
              <motion.div
                whileHover={{ y: -6 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow"
              >
                <div className="relative w-full aspect-[3/4]">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3
                    className="text-xl font-bold"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {doctor.name}
                  </h3>
                  <p className="text-[var(--primary)] font-semibold text-sm mt-1">
                    {doctor.credential}
                  </p>
                  <p className="text-[var(--foreground)]/40 text-sm mt-1 italic" style={{ fontFamily: "var(--font-accent)" }}>
                    {doctor.university}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {doctor.specialties.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-1 rounded-full bg-[var(--primary)]/8 text-[var(--primary)] text-xs font-medium"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
