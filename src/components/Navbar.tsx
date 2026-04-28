"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { label: "Weight Loss", href: "#weight-loss" },
    { label: "Peptides & Longevity", href: "#peptides" },
    { label: "Men's Health", href: "#mens-health" },
    { label: "Women's Health", href: "#womens-health" },
  ];

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/95 backdrop-blur-xl shadow-[0_1px_0_rgba(0,0,0,0.06)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo */}
          <a href="#" className="flex items-center group">
            <span
              className={`text-[26px] font-extrabold tracking-[-0.03em] transition-colors duration-500 ${
                scrolled ? "text-[var(--foreground)]" : "text-white"
              }`}
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Trimora
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className={`text-[15px] font-medium transition-colors duration-300 ${
                  scrolled
                    ? "text-[var(--foreground)]/60 hover:text-[var(--foreground)]"
                    : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <a
              href="/funnel"
              className={`px-7 py-2.5 rounded-full text-[14px] font-bold tracking-[-0.01em] transition-all duration-300 ${
                scrolled
                  ? "bg-[var(--primary)] text-white hover:bg-[var(--primary-dark)]"
                  : "bg-white text-[var(--primary)] hover:bg-white/90"
              }`}
            >
              Get Started
            </a>
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden flex flex-col gap-[6px] p-2.5 -mr-2.5"
            aria-label="Toggle menu"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                animate={
                  mobileOpen
                    ? i === 0
                      ? { rotate: 45, y: 8 }
                      : i === 1
                      ? { opacity: 0 }
                      : { rotate: -45, y: -8 }
                    : { rotate: 0, y: 0, opacity: 1 }
                }
                className={`block h-[2px] rounded-full transition-colors duration-500 ${
                  i === 1 ? "w-[18px]" : "w-[24px]"
                } ${scrolled || mobileOpen ? "bg-[var(--foreground)]" : "bg-white"}`}
              />
            ))}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="lg:hidden bg-white border-t border-black/[0.04] overflow-hidden"
          >
            <nav className="flex flex-col px-6 py-5 gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileOpen(false)}
                  className="text-[16px] font-medium text-[var(--foreground)]/70 hover:text-[var(--foreground)] transition-colors py-3 px-2 rounded-xl hover:bg-black/[0.03]"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/funnel"
                onClick={() => setMobileOpen(false)}
                className="mt-3 px-7 py-3.5 rounded-full bg-[var(--primary)] text-white text-[15px] font-bold text-center"
              >
                Get Started
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
