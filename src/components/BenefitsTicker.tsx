"use client";

import { motion } from "framer-motion";

const benefits = [
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="3" width="20" height="14" rx="2" ry="2" /><line x1="8" y1="21" x2="16" y2="21" /><line x1="12" y1="17" x2="12" y2="21" />
      </svg>
    ),
    label: "100% ONLINE",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="12" y1="1" x2="12" y2="23" /><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
      </svg>
    ),
    label: "CLEAR PRICING",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13" /><polygon points="16 8 20 8 23 11 23 16 16 16 16 8" /><circle cx="5.5" cy="18.5" r="2.5" /><circle cx="18.5" cy="18.5" r="2.5" />
      </svg>
    ),
    label: "SHIPPED TO YOUR DOOR",
  },
  {
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    label: "LICENSED MEDICAL PROVIDERS",
  },
];

function BenefitItem({ icon, label }: { icon: React.ReactNode; label: string }) {
  return (
    <div className="flex items-center gap-3 flex-shrink-0 px-6 md:px-8">
      <div className="w-[42px] h-[42px] rounded-[12px] border border-[var(--foreground)]/10 flex items-center justify-center text-[var(--foreground)]/60">
        {icon}
      </div>
      <span className="text-[12px] md:text-[13px] font-bold tracking-[0.1em] text-[var(--foreground)]/70 whitespace-nowrap">
        {label}
      </span>
    </div>
  );
}

export default function BenefitsTicker() {
  const allBenefits = [...benefits, ...benefits, ...benefits, ...benefits];

  return (
    <section className="py-8 md:py-10 bg-[var(--background)] overflow-hidden border-b border-black/[0.04]">
      <motion.div
        animate={{ x: [0, -1600] }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="flex items-center"
      >
        {allBenefits.map((benefit, i) => (
          <BenefitItem key={i} icon={benefit.icon} label={benefit.label} />
        ))}
      </motion.div>
    </section>
  );
}
