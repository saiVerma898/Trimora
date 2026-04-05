"use client";

import Link from "next/link";
import AnimatedSection from "./AnimatedSection";

const footerLinks = {
  Services: [
    { label: "Weight Loss", href: "#weight-loss" },
    { label: "Men's Health", href: "#mens-health" },
    { label: "Women's Health", href: "#womens-health" },
    { label: "Nutrition", href: "#nutrition" },
    { label: "Supplements", href: "#supplements" },
    { label: "Peptides & Longevity", href: "#peptides" },
  ],
  Company: [
    { label: "About Us", href: "#" },
    { label: "Our Doctors", href: "#doctors" },
    { label: "Testimonials", href: "#testimonials" },
    { label: "Careers", href: "#" },
    { label: "Press", href: "#" },
  ],
  Support: [
    { label: "Contact Us", href: "#" },
    { label: "FAQs", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "HIPAA Notice", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#242220] text-white/80 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <AnimatedSection>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-lg bg-[var(--primary)] flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <span
                className="text-xl font-bold text-white"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Trimora
              </span>
            </div>
            <p className="text-sm text-white/50 leading-relaxed mb-6">
              Personalized telehealth care from licensed providers. Healthcare,
              redefined for real life.
            </p>
            <div className="flex gap-4">
              {["Twitter", "Instagram", "LinkedIn"].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-[var(--primary)] transition-colors text-xs font-medium"
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], i) => (
            <AnimatedSection key={title} delay={0.1 * (i + 1)}>
              <h3 className="font-bold text-white mb-4">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-sm text-white/50 hover:text-white transition-colors"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </AnimatedSection>
          ))}
        </div>

        {/* Disclaimer */}
        <div className="border-t border-white/10 pt-8">
          <p className="text-xs text-white/30 leading-relaxed mb-4">
            <strong>FDA Disclaimer:</strong> The statements on this website have
            not been evaluated by the Food and Drug Administration. These
            products are not intended to diagnose, treat, cure, or prevent any
            disease. Individual results may vary. Always consult with a
            qualified healthcare provider before beginning any treatment program.
          </p>
          <p className="text-xs text-white/30 leading-relaxed mb-4">
            <strong>Telehealth Notice:</strong> Trimora provides telehealth
            consultations with licensed healthcare providers. Services are
            available in select states. Prescription products require a valid
            prescription from a licensed provider after a telehealth
            consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-6">
            <p className="text-xs text-white/30">
              &copy; {new Date().getFullYear()} Trimora Health, Inc. All rights
              reserved.
            </p>
            <p className="text-xs text-white/30">
              HIPAA Compliant &bull; LegitScript Certified &bull; BBB Accredited
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
