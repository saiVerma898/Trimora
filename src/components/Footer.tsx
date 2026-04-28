"use client";

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
    { label: "Contact Us", href: "/funnel" },
    { label: "FAQs", href: "#" },
    { label: "Privacy Policy", href: "#" },
    { label: "Terms of Service", href: "#" },
    { label: "HIPAA Notice", href: "#" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#242220] text-white/80 pt-[72px] pb-10">
      <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-14">
          {/* Brand */}
          <AnimatedSection>
            <div className="flex items-center gap-2.5 mb-5">
              <div className="w-9 h-9 rounded-[10px] bg-[var(--primary)] flex items-center justify-center">
                <span
                  className="text-white font-extrabold text-[15px]"
                  style={{ fontFamily: "var(--font-heading)" }}
                >
                  T
                </span>
              </div>
              <span
                className="text-[22px] font-extrabold text-white tracking-[-0.02em]"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Trimora
              </span>
            </div>
            <p className="text-[14px] text-white/45 leading-[1.65] mb-6 font-medium">
              Personalized telehealth care from licensed providers. Healthcare,
              redefined for real life.
            </p>
            <div className="flex gap-3">
              {[
                { label: "X", icon: "𝕏" },
                { label: "IG", icon: "◎" },
                { label: "In", icon: "in" },
              ].map((social) => (
                <a
                  key={social.label}
                  href="#"
                  className="w-[38px] h-[38px] rounded-full bg-white/[0.07] flex items-center justify-center hover:bg-[var(--primary)] transition-colors duration-200 text-[13px] font-bold text-white/60 hover:text-white"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </AnimatedSection>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links], i) => (
            <AnimatedSection key={title} delay={0.08 * (i + 1)}>
              <h3 className="font-bold text-[15px] text-white mb-5 tracking-[-0.01em]">
                {title}
              </h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="text-[14px] text-white/45 hover:text-white transition-colors duration-200 font-medium"
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
        <div className="border-t border-white/[0.08] pt-8">
          <p className="text-[12px] text-white/25 leading-[1.7] mb-3 font-medium">
            <strong className="text-white/35">FDA Disclaimer:</strong> The
            statements on this website have not been evaluated by the Food and
            Drug Administration. These products are not intended to diagnose,
            treat, cure, or prevent any disease. Individual results may vary.
            Always consult with a qualified healthcare provider before beginning
            any treatment program.
          </p>
          <p className="text-[12px] text-white/25 leading-[1.7] mb-3 font-medium">
            <strong className="text-white/35">Telehealth Notice:</strong>{" "}
            Trimora provides telehealth consultations with licensed healthcare
            providers. Services are available in select states. Prescription
            products require a valid prescription from a licensed provider after
            a telehealth consultation.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-7">
            <p className="text-[12px] text-white/25 font-medium">
              &copy; {new Date().getFullYear()} Trimora Health, Inc. All rights
              reserved.
            </p>
            <p className="text-[12px] text-white/25 font-medium">
              HIPAA Compliant &bull; LegitScript Certified &bull; BBB Accredited
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
