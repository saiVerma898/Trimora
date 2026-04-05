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
    <section id="doctors" className="py-[72px] md:py-[100px] bg-[#f2ebe1]">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <AnimatedSection className="text-center mb-14">
          <span className="inline-block px-3.5 py-[5px] rounded-full bg-[var(--stone)]/[0.12] text-[var(--stone)] text-[11px] font-bold uppercase tracking-[0.08em] mb-5">
            Our Medical Team
          </span>
          <h2
            className="text-[30px] md:text-[38px] lg:text-[44px] font-extrabold tracking-[-0.025em] leading-[1.1] text-[var(--foreground)]"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Our Doctors
          </h2>
          <p className="mt-4 text-[17px] text-[var(--foreground)]/50 max-w-[560px] mx-auto font-medium leading-[1.6]">
            Board-certified physicians dedicated to providing exceptional,
            personalized care.
          </p>
        </AnimatedSection>

        <div className="grid md:grid-cols-2 gap-7 max-w-[880px] mx-auto">
          {doctors.map((doctor, i) => (
            <AnimatedSection key={doctor.name} delay={i * 0.15}>
              <motion.div
                whileHover={{ y: -5 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-[24px] overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)] hover:shadow-[0_16px_48px_rgba(0,0,0,0.08)] transition-shadow duration-300"
              >
                <div className="relative w-full aspect-[4/5]">
                  <Image
                    src={doctor.image}
                    alt={doctor.name}
                    fill
                    className="object-cover"
                    sizes="(min-width: 768px) 50vw, 100vw"
                  />
                </div>
                <div className="p-6 md:p-7">
                  <h3
                    className="text-[20px] font-extrabold text-[var(--foreground)] tracking-[-0.01em]"
                    style={{ fontFamily: "var(--font-heading)" }}
                  >
                    {doctor.name}
                  </h3>
                  <p className="text-[var(--primary)] font-bold text-[14px] mt-1">
                    {doctor.credential}
                  </p>
                  <p
                    className="text-[var(--foreground)]/40 text-[13px] mt-1 italic font-medium"
                    style={{ fontFamily: "var(--font-accent)" }}
                  >
                    {doctor.university}
                  </p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {doctor.specialties.map((s) => (
                      <span
                        key={s}
                        className="px-3 py-[5px] rounded-full bg-[var(--primary)]/[0.07] text-[var(--primary)] text-[12px] font-bold"
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
