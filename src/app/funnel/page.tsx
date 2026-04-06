"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const INTAKE_URL = "/intake";

/* ─── Sticky Navbar ─── */
function FunnelNav() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -84 }}
      animate={{ y: show ? 0 : -84 }}
      transition={{ duration: 0.35 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-lg shadow-[0_1px_0_rgba(0,0,0,0.06)]"
    >
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between h-[64px]">
        <span className="text-[22px] font-extrabold tracking-[-0.03em]" style={{ fontFamily: "var(--font-heading)" }}>
          Trimora
        </span>
        <a href={INTAKE_URL} className="px-6 py-2.5 rounded-full bg-[#2e936f] text-white text-[13px] font-bold tracking-[0.03em] uppercase hover:bg-[#257a5c] transition-colors">
          Get Approved
        </a>
      </div>
    </motion.header>
  );
}

/* ─── Promo Banner ─── */
function PromoBanner() {
  return (
    <div className="bg-black py-3 px-4 text-center">
      <div className="max-w-[700px] mx-auto flex flex-col items-center gap-1.5">
        <div className="inline-flex items-center gap-2 px-5 py-1.5 rounded-full bg-gradient-to-r from-[#fde68a] via-[#c6a673] to-[#c6a673]">
          <span className="text-black text-[14px] md:text-[16px] font-bold" style={{ fontFamily: "'Poppins', sans-serif" }}>
            SPRING Discount Applied!
          </span>
        </div>
        <p className="text-white/80 text-[14px] md:text-[16px] font-light">
          Just <strong className="text-white font-bold">$149</strong> + Fast, Free Shipping &bull; Fully backed by our weight loss guarantee!
        </p>
      </div>
    </div>
  );
}

/* ─── Hero ─── */
function FunnelHero() {
  return (
    <section id="hero" className="bg-[#f7f4f0] pt-6 pb-12 md:pb-20 overflow-hidden">
      {/* Inline nav */}
      <div className="max-w-[1280px] mx-auto px-6 flex items-center justify-between py-4 mb-8">
        <span className="text-[24px] font-extrabold tracking-[-0.03em]" style={{ fontFamily: "var(--font-heading)" }}>
          Trimora
        </span>
        <a href={INTAKE_URL} className="px-6 py-2.5 rounded-full bg-[#2e936f] text-white text-[13px] font-bold tracking-[0.03em] uppercase hover:bg-[#257a5c] transition-colors">
          Get Started
        </a>
      </div>

      <div className="max-w-[1280px] mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left */}
          <div>
            <motion.p initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="text-[15px] text-[#242220]/60 mb-4 font-medium">
              Join <strong className="text-[#242220]">500,000+</strong> Trimora patients
            </motion.p>
            <motion.h1 initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.6 }}
              className="text-[32px] sm:text-[40px] md:text-[48px] lg:text-[54px] font-extrabold leading-[1.08] tracking-[-0.03em] text-[#242220] mb-8"
              style={{ fontFamily: "var(--font-accent)" }}
            >
              Finally serious about weight loss? Shed your fat{" "}
              <span className="text-[#2e936f]">this spring</span> with personalized care and GLP-1 medication
            </motion.h1>

            {/* Checklist */}
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="space-y-3 mb-8">
              {[
                "Lose pounds of fat every week",
                "Trimora Guarantee",
                <><strong>No membership or hidden fees!</strong> Everything you need is included</>,
                <><strong>Start for just $149</strong>, no insurance required + free shipping</>,
                "HSA/FSA Approved!",
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="w-[22px] h-[22px] rounded-full bg-[#2e936f] flex items-center justify-center flex-shrink-0 mt-0.5">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
                  </div>
                  <span className="text-[15px] text-[#242220]/80 font-medium">{item}</span>
                </div>
              ))}
            </motion.div>

            <motion.a initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5 }}
              href={INTAKE_URL}
              className="inline-block px-10 py-4 rounded-full bg-[#2e936f] text-white font-bold text-[16px] tracking-[-0.01em] hover:bg-[#257a5c] transition-all hover:shadow-[0_8px_30px_rgba(46,147,111,0.3)]"
            >
              Am I Qualified?
            </motion.a>
          </div>

          {/* Right - Photo Grid */}
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.6 }}
            className="hidden lg:grid grid-cols-3 grid-rows-3 gap-3 h-[520px]"
          >
            {[
              { src: "/images/funnel/hero-grid-1.png", span: "col-span-1 row-span-2" },
              { src: "/images/funnel/hero-grid-2.png", span: "col-span-1 row-span-1" },
              { src: "/images/funnel/hero-grid-3.png", span: "col-span-1 row-span-1" },
              { src: "/images/funnel/hero-grid-4.png", span: "col-span-1 row-span-1" },
              { src: "/images/funnel/hero-grid-5.png", span: "col-span-1 row-span-2" },
              { src: "/images/funnel/hero-grid-6.png", span: "col-span-1 row-span-1" },
            ].map((img, i) => (
              <div key={i} className={`${img.span} relative rounded-[16px] overflow-hidden`}>
                <Image src={img.src} alt="" fill className="object-cover" sizes="220px" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

/* ─── Products ─── */
function Products() {
  const products = [
    { name: "GLP-1 Injections", tag: "Popular", price: "Starting at $149", desc: "One simple injection per week.", image: "/images/funnel/product-glp.png", bg: "#d6f2da" },
    { name: "GLP-1 Tablets", tag: "Rx", price: "Starting at $249", desc: "One dissolvable tablet per day.", image: "/images/funnel/product-tablets.png", bg: "#d6f2da" },
  ];
  return (
    <section id="products" className="py-[72px] bg-[#f7f4f0]">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-[30px] md:text-[40px] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#242220] mb-4" style={{ fontFamily: "var(--font-accent)" }}>
            Trusted by experts, <span className="text-[#2e936f]">priced for you.</span>
          </h2>
          <p className="text-[16px] text-[#242220]/55 max-w-[560px] mx-auto font-medium leading-[1.6]">
            Find the right GLP-1 medication with the confidence that comes from knowing it is doctor-approved and budget-friendly.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 gap-6 max-w-[800px] mx-auto">
          {products.map((p) => (
            <motion.div key={p.name} whileHover={{ y: -6 }} className="rounded-[24px] overflow-hidden shadow-sm hover:shadow-xl transition-shadow bg-white">
              <div className="relative h-[240px]" style={{ backgroundColor: p.bg }}>
                <span className="absolute top-4 left-4 px-3.5 py-1 rounded-full bg-[#2e936f] text-white text-[11px] font-bold uppercase tracking-[0.05em]">{p.tag}</span>
                <Image src={p.image} alt={p.name} fill className="object-contain p-8" sizes="400px" />
              </div>
              <div className="p-6">
                <h3 className="text-[20px] font-bold text-[#242220] mb-1">{p.name}</h3>
                <p className="text-[#c6a673] font-bold text-[16px] mb-1">{p.price}</p>
                <p className="text-[14px] text-[#242220]/50 mb-5 font-medium">{p.desc}</p>
                <a href={INTAKE_URL} className="block text-center py-3 rounded-full bg-[#2e936f] text-white font-bold text-[13px] tracking-[0.03em] uppercase hover:bg-[#257a5c] transition-colors">
                  Get Started
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Quotes / Social Proof ─── */
function QuotesSection() {
  return (
    <section id="quotes" className="py-[80px] bg-[#f2ebe1] text-center">
      <div className="max-w-[700px] mx-auto px-6">
        <p className="text-[13px] font-bold text-[#c6a673] uppercase tracking-[0.1em] mb-3">10,000+ Patients Agree</p>
        <div className="flex justify-center mb-5">
          {[...Array(5)].map((_, i) => <span key={i} className="text-[#c6a673] text-[28px]">★</span>)}
        </div>
        <h2 className="text-[28px] md:text-[38px] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#242220] mb-3" style={{ fontFamily: "var(--font-accent)" }}>
          &ldquo;When nothing else worked, <span className="text-[#2e936f]">Trimora did</span>&rdquo;
        </h2>
        <p className="text-[14px] text-[#242220]/50 font-medium">Verified Trimora Customer</p>
      </div>
    </section>
  );
}

/* ─── Weight Calculator ─── */
function WeightCalculator() {
  const [weight, setWeight] = useState(200);
  const loss = Math.round(weight * 0.23);
  return (
    <section id="weight-scale" className="py-[80px] bg-[#f7f4f0]">
      <div className="max-w-[700px] mx-auto px-6 text-center">
        <h2 className="text-[28px] md:text-[38px] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#242220] mb-4" style={{ fontFamily: "var(--font-accent)" }}>
          Want to <span className="text-[#2e936f]">reach your goal</span> weight fast?
        </h2>
        <p className="text-[16px] text-[#242220]/55 mb-10 font-medium leading-[1.6] max-w-[560px] mx-auto">
          GLP-1 is a naturally occurring hormone that regulates appetite and blood sugar, improving your metabolism and knocking out cravings.
        </p>
        <div className="bg-white rounded-[24px] p-8 md:p-12 shadow-sm">
          <p className="text-[14px] font-bold text-[#242220]/50 uppercase tracking-[0.08em] mb-6">Select your current weight:</p>
          <p className="text-[48px] font-extrabold text-[#242220] mb-2" style={{ fontFamily: "var(--font-heading)" }}>{weight} <span className="text-[24px] font-bold text-[#242220]/40">lbs</span></p>
          <input
            type="range" min={140} max={400} step={1} value={weight}
            onChange={(e) => setWeight(Number(e.target.value))}
            className="w-full h-2 rounded-full appearance-none cursor-pointer mb-8"
            style={{
              background: `linear-gradient(to right, #c6a673 ${((weight - 140) / 260) * 100}%, #e4dcd8 ${((weight - 140) / 260) * 100}%)`,
            }}
          />
          <div className="bg-[#f7f4f0] rounded-[16px] p-6">
            <p className="text-[14px] text-[#242220]/50 font-medium mb-1">Weight loss potential:</p>
            <p className="text-[42px] font-extrabold text-[#2e936f]" style={{ fontFamily: "var(--font-heading)" }}>
              {loss} <span className="text-[20px]">lbs</span>
            </p>
          </div>
        </div>
        <a href={INTAKE_URL} className="inline-block mt-8 px-10 py-4 rounded-full bg-[#2e936f] text-white font-bold text-[16px] hover:bg-[#257a5c] transition-all hover:shadow-lg">
          Get Started
        </a>
      </div>
    </section>
  );
}

/* ─── Stats Section ─── */
function StatsSection() {
  const stats = [
    { value: "18%", label: "Average weight loss" },
    { value: "9/10", label: "Patients call it the most effective treatment to date" },
    { value: "6.5\"", label: "Potential waist reduction" },
    { value: "93%", label: "Kept the weight off" },
  ];
  return (
    <section id="the-numbers" className="py-[80px] bg-[#f2ebe1]">
      <div className="max-w-[1100px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[28px] md:text-[38px] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#242220]" style={{ fontFamily: "var(--font-accent)" }}>
            Why are so many patients signing up for Trimora? <span className="text-[#2e936f]">It works.</span>
          </h2>
          <p className="mt-4 text-[16px] text-[#242220]/55 max-w-[500px] mx-auto font-medium">
            On average, patients in the Trimora program lose 15-20% of their body weight.
          </p>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-5">
          {stats.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="bg-white rounded-[20px] p-6 md:p-8 text-center shadow-sm"
            >
              <p className="text-[36px] md:text-[44px] font-extrabold text-[#2e936f] mb-2" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</p>
              <p className="text-[13px] text-[#242220]/50 font-medium leading-[1.5]">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Journey / How It Works ─── */
function Journey() {
  const steps = [
    { title: "Get Approved", desc: "Complete a quick online evaluation and one of our licensed providers will review your information within 24 hours.", image: "/images/funnel/journey-1.png" },
    { title: "Get Prescribed", desc: "Once approved, you'll receive a personalized care plan with medication tailored to your health goals.", image: "/images/funnel/journey-2.png" },
    { title: "Receive your Rx", desc: "Your medication ships directly to your door with discreet, expedited packaging. Start seeing results fast.", image: "/images/funnel/journey-3.png" },
  ];
  return (
    <section id="journey" className="py-[80px] bg-[#f7f4f0]">
      <div className="max-w-[900px] mx-auto px-6">
        <div className="text-center mb-14">
          <h2 className="text-[28px] md:text-[38px] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#242220] mb-4" style={{ fontFamily: "var(--font-accent)" }}>
            Begin your weight loss journey with Trimora.
          </h2>
          <p className="text-[16px] text-[#242220]/55 max-w-[500px] mx-auto font-medium leading-[1.6]">
            Start your transformation today with our easy, personalized process.
          </p>
        </div>
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-[28px] md:left-1/2 md:-translate-x-px top-0 bottom-0 w-[2px] bg-[#c6a673]/30 hidden md:block" />
          <div className="space-y-12 md:space-y-16">
            {steps.map((step, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: 0.1 }}
                className={`flex flex-col md:flex-row items-center gap-6 md:gap-12 ${i % 2 === 1 ? "md:flex-row-reverse" : ""}`}
              >
                <div className="flex-1 text-center md:text-left">
                  <div className="inline-flex items-center gap-2 mb-3">
                    <div className="w-[32px] h-[32px] rounded-full bg-[#c6a673] flex items-center justify-center text-white font-bold text-[14px]">{i + 1}</div>
                    <h3 className="text-[22px] font-bold text-[#242220]">{step.title}</h3>
                  </div>
                  <p className="text-[15px] text-[#242220]/55 font-medium leading-[1.6] max-w-[380px]">{step.desc}</p>
                </div>
                <div className="flex-1 relative w-full aspect-[4/3] max-w-[400px] rounded-[20px] overflow-hidden shadow-sm">
                  <Image src={step.image} alt={step.title} fill className="object-cover" sizes="400px" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="text-center mt-12">
          <a href={INTAKE_URL} className="inline-block px-10 py-4 rounded-full bg-[#2e936f] text-white font-bold text-[16px] hover:bg-[#257a5c] transition-all hover:shadow-lg">
            Get Started
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── Reviews ─── */
function Reviews() {
  const reviews = [
    { name: "Sarah K.", text: "The care team was incredibly supportive. I lost 34 lbs in just 4 months and have never felt better!", lost: "Lost 34 lbs" },
    { name: "Mike D.", text: "Very easy and convenient. The medication just works. I'm down 28 lbs and my energy levels are through the roof.", lost: "Lost 28 lbs" },
    { name: "Jennifer L.", text: "I was skeptical but the results speak for themselves. The doctors are knowledgeable and the process is seamless.", lost: "Lost 42 lbs" },
    { name: "Carlos R.", text: "The weight vanished! No crazy diets, no hours of cardio. This is how weight loss should be.", lost: "Lost 31 lbs" },
    { name: "Patricia M.", text: "Everyone I have come in contact with has been so kind and helpful! The 24/7 support is a game changer.", lost: "Lost 25 lbs" },
    { name: "David W.", text: "I was ready to give up on losing weight. Trimora changed everything. Best investment in my health ever.", lost: "Lost 47 lbs" },
  ];
  return (
    <section id="reviews" className="py-[80px] bg-[#f2ebe1] overflow-hidden">
      <div className="max-w-[1280px] mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-[28px] md:text-[38px] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#242220]" style={{ fontFamily: "var(--font-accent)" }}>
            There&rsquo;s a reason people are <span className="text-[#2e936f]">raving about us.</span>
          </h2>
        </div>
        <motion.div animate={{ x: [0, -1800] }} transition={{ duration: 45, repeat: Infinity, ease: "linear" }} className="flex gap-5">
          {[...reviews, ...reviews].map((r, i) => (
            <div key={i} className="flex-shrink-0 w-[340px] bg-white rounded-[20px] p-7 shadow-sm">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 rounded-full bg-[#c6a673]/20 flex items-center justify-center text-[#c6a673] font-bold text-[14px]">{r.name[0]}</div>
                <div>
                  <p className="font-bold text-[14px] text-[#242220]">{r.name}</p>
                  <p className="text-[12px] text-[#2e936f] font-bold">{r.lost}</p>
                </div>
                <div className="ml-auto flex gap-[1px]">
                  {[...Array(5)].map((_, j) => <span key={j} className="text-[#c6a673] text-[14px]">★</span>)}
                </div>
              </div>
              <p className="text-[14px] text-[#242220]/65 leading-[1.65] italic font-medium" style={{ fontFamily: "var(--font-accent)" }}>
                &ldquo;{r.text}&rdquo;
              </p>
            </div>
          ))}
        </motion.div>
        <div className="text-center mt-10">
          <a href={INTAKE_URL} className="inline-block px-10 py-4 rounded-full bg-[#2e936f] text-white font-bold text-[16px] hover:bg-[#257a5c] transition-all">
            I&rsquo;m Ready, Let&rsquo;s Go
          </a>
        </div>
      </div>
    </section>
  );
}

/* ─── FAQ ─── */
function FAQ() {
  const [open, setOpen] = useState<number | null>(null);
  const faqs = [
    { q: "How much does the program cost?", a: "$149 for your first month of treatment, with no contracts or commitments. Monthly refills are available at $299, which includes your medication, provider check-ins, and 24/7 support." },
    { q: "Will this work for me?", a: "GLP-1 medications are clinically proven to help patients lose 15-20% of their body weight. Our licensed providers will evaluate your health profile to ensure the treatment is right for you." },
    { q: "What if my insurance doesn't cover the medication?", a: "Our program is designed to be accessible without insurance. At $149/month, it's a fraction of the cost of branded alternatives. Your insurance may also reimburse you for branded GLP-1 options if prescribed." },
    { q: "What can I expect after I sign up?", a: "After completing your online evaluation, a licensed provider will review your information within 24 hours. If approved, your medication will be shipped directly to your door with free expedited shipping." },
  ];
  return (
    <section id="faq" className="py-[80px] bg-[#f7f4f0]">
      <div className="max-w-[720px] mx-auto px-6">
        <h2 className="text-[28px] md:text-[34px] font-extrabold tracking-[-0.025em] text-center text-[#242220] mb-10" style={{ fontFamily: "var(--font-accent)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-3">
          {faqs.map((faq, i) => (
            <div key={i} className="bg-white rounded-[16px] overflow-hidden shadow-sm">
              <button onClick={() => setOpen(open === i ? null : i)} className="w-full flex items-center justify-between p-5 text-left">
                <span className="text-[16px] font-bold text-[#242220] pr-4">{faq.q}</span>
                <motion.span animate={{ rotate: open === i ? 45 : 0 }} className="text-[24px] text-[#c6a673] flex-shrink-0">+</motion.span>
              </button>
              <motion.div initial={false} animate={{ height: open === i ? "auto" : 0, opacity: open === i ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
                <p className="px-5 pb-5 text-[14px] text-[#242220]/60 leading-[1.7] font-medium">{faq.a}</p>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Guarantee ─── */
function Guarantee() {
  return (
    <section id="guarantee" className="py-[80px] bg-[#f2ebe1]">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <div className="w-[72px] h-[72px] rounded-full bg-[#c6a673]/20 flex items-center justify-center mx-auto mb-6">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#c6a673" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
        </div>
        <p className="text-[13px] font-bold text-[#c6a673] uppercase tracking-[0.1em] mb-3">Trimora Guarantee</p>
        <h2 className="text-[28px] md:text-[36px] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#242220] mb-5" style={{ fontFamily: "var(--font-accent)" }}>
          The only thing you&rsquo;ll lose is extra weight.
        </h2>
        <p className="text-[16px] text-[#242220]/55 mb-8 font-medium leading-[1.6]">
          With over 500,000+ patients, we&rsquo;re confident you will reach your goal. If the medication doesn&rsquo;t work for you, we&rsquo;ll make it right.
        </p>
        <a href={INTAKE_URL} className="inline-block px-10 py-4 rounded-full bg-[#c6a673] text-white font-bold text-[16px] hover:bg-[#b8965f] transition-all hover:shadow-lg">
          Continue with Confidence
        </a>
      </div>
    </section>
  );
}

/* ─── Weight Goal Selector ─── */
function WeightGoal() {
  const goals = ["Losing 1-20 lbs", "Losing 21-50 lbs", "Losing 51+ lbs", "Not sure, I just want to lose the weight"];
  return (
    <section id="weight-loss-goal" className="py-[80px] bg-[#f7f4f0]">
      <div className="max-w-[600px] mx-auto px-6 text-center">
        <h2 className="text-[28px] md:text-[36px] font-extrabold tracking-[-0.025em] leading-[1.1] text-[#242220] mb-8" style={{ fontFamily: "var(--font-accent)" }}>
          What&rsquo;s your weight loss goal?
        </h2>
        <div className="space-y-3 mb-8">
          {goals.map((goal) => (
            <a key={goal} href={INTAKE_URL}
              className="block w-full py-4 px-6 rounded-[14px] bg-white text-[#242220] text-[16px] font-semibold text-left hover:bg-[#2e936f] hover:text-white transition-all shadow-sm hover:shadow-lg"
            >
              {goal}
            </a>
          ))}
        </div>
        <a href={INTAKE_URL} className="inline-block px-10 py-4 rounded-full bg-[#2e936f] text-white font-bold text-[16px] hover:bg-[#257a5c] transition-all">
          Continue
        </a>
      </div>
    </section>
  );
}

/* ─── Footer ─── */
function FunnelFooter() {
  return (
    <footer className="bg-white py-12 border-t border-black/[0.06]">
      <div className="max-w-[1100px] mx-auto px-6">
        {/* Feature bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
          {[
            { icon: "🛡️", label: "Trimora guarantee" },
            { icon: "🚚", label: "Free, expedited delivery" },
            { icon: "🩺", label: "Doctor-led plans & coaching" },
            { icon: "💲", label: "No hidden fees" },
          ].map((f) => (
            <div key={f.label} className="flex items-center gap-3">
              <span className="text-[24px]">{f.icon}</span>
              <span className="text-[13px] font-bold text-[#242220]/60">{f.label}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-black/[0.06] pt-8">
          <span className="text-[20px] font-extrabold tracking-[-0.02em] text-[#242220] block mb-4" style={{ fontFamily: "var(--font-heading)" }}>Trimora</span>
          <p className="text-[12px] text-[#242220]/35 leading-[1.7] mb-3 font-medium max-w-[800px]">
            Compounded drug products are not approved or evaluated for safety, effectiveness, or quality by the FDA. Prescription required. Individual results may vary and are not guaranteed. Always consult with a qualified healthcare provider before beginning any treatment program.
          </p>
          <p className="text-[12px] text-[#242220]/35 leading-[1.7] mb-6 font-medium max-w-[800px]">
            Certain materials on this website may be generated or enhanced using artificial intelligence technologies. Trimora does not produce compounded medications.
          </p>
          <p className="text-[12px] text-[#242220]/30 font-medium">&copy; {new Date().getFullYear()} Trimora Health, Inc. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Main Funnel Page ─── */
export default function FunnelPage() {
  return (
    <main className="bg-[#f7f4f0]" style={{ fontFamily: "'Red Hat Text', 'Onest', sans-serif" }}>
      <FunnelNav />
      <PromoBanner />
      <FunnelHero />
      <Products />
      <QuotesSection />
      <WeightCalculator />
      <StatsSection />
      <Journey />
      <Reviews />
      <FAQ />
      <Guarantee />
      <WeightGoal />
      <FunnelFooter />
    </main>
  );
}
