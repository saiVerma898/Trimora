"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { trackEvent } from "@/lib/analytics";

/* ─────── Countdown Timer Hook ─────── */
function useCountdown(initialMinutes: number) {
  const [seconds, setSeconds] = useState(initialMinutes * 60);
  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);
  const m = Math.floor(seconds / 60);
  const s = seconds % 60;
  return `${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`;
}

/* ─────── Check Icon ─────── */
const Check = ({ color = "#2e936f", size = 14 }: { color?: string; size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

/* ─────── Section Wrapper ─────── */
const Section = ({ children, bg = "#f5f0e8", className = "" }: { children: React.ReactNode; bg?: string; className?: string }) => (
  <section className={`py-10 md:py-14 ${className}`} style={{ backgroundColor: bg }}>
    <div className="max-w-[680px] mx-auto px-5">{children}</div>
  </section>
);

/* ═══════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════ */
export default function ApprovedPage() {
  const countdown = useCountdown(11);
  const [selectedMed, setSelectedMed] = useState<"semaglutide" | "tirzepatide">("semaglutide");
  const [medForm, setMedForm] = useState<"injection" | "tablets">("injection");
  const [faqOpen, setFaqOpen] = useState<number | null>(null);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const price = selectedMed === "semaglutide" ? (medForm === "injection" ? 149 : 249) : (medForm === "injection" ? 199 : 299);
  const originalPrice = selectedMed === "semaglutide" ? 299 : 399;
  const savings = originalPrice - price;

  // Track view on mount
  useEffect(() => {
    trackEvent("approved_page_viewed");
  }, []);

  // Track medication selection changes
  useEffect(() => {
    trackEvent("medication_selected", { medication: selectedMed, form: medForm, price });
  }, [selectedMed, medForm, price]);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    trackEvent("checkout_cta_clicked", { medication: selectedMed, form: medForm, price });
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);
    setLoading(true);
    trackEvent("checkout_initiated", { medication: selectedMed, form: medForm, price, email });

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ medication: selectedMed, form: medForm, email }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error || "Could not create checkout session");
      }
      // Redirect to Stripe-hosted checkout
      window.location.href = data.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setErrorMsg(message);
      trackEvent("checkout_error", { error: message });
      setLoading(false);
    }
  };

  return (
    <main className="bg-[#f5f0e8] min-h-screen" style={{ fontFamily: "'Red Hat Text', sans-serif" }}>

      {/* ── HEADER ── */}
      <header className="bg-white py-4 px-5 shadow-[0_1px_0_rgba(0,0,0,0.06)]">
        <div className="max-w-[680px] mx-auto flex items-center justify-between">
          <span className="text-[22px] font-extrabold tracking-[-0.03em] text-[#242220]" style={{ fontFamily: "var(--font-heading)" }}>
            Trimora
          </span>
          <div className="flex items-center gap-1">
            {[...Array(5)].map((_, i) => <span key={i} className="text-[#c6a673] text-[13px]">★</span>)}
            <span className="text-[11px] text-[#242220]/40 font-bold ml-1">3.4k Reviews</span>
          </div>
        </div>
      </header>

      {/* ── APPROVAL HERO ── */}
      <Section bg="#f5f0e8">
        <div className="text-center mb-8">
          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.6 }}
            className="w-[72px] h-[72px] rounded-full bg-[#2e936f]/10 flex items-center justify-center mx-auto mb-5"
          >
            <Check size={32} />
          </motion.div>
          <h1 className="text-[26px] md:text-[34px] font-extrabold tracking-[-0.02em] text-[#242220] mb-2" style={{ fontFamily: "var(--font-accent)" }}>
            Your GLP-1 prescription plan <span className="text-[#2e936f]">approval</span>!
          </h1>
        </div>

        {/* User Profile Card */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm mb-8">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-center">
            {[
              { label: "Current Weight", value: "245 lbs" },
              { label: "Goal Weight", value: "145 lbs" },
              { label: "Metabolism", value: "Fat Protein" },
              { label: "Sex", value: "Male" },
            ].map((item) => (
              <div key={item.label}>
                <p className="text-[11px] font-bold text-[#242220]/40 uppercase tracking-[0.06em] mb-1">{item.label}</p>
                <p className="text-[16px] font-bold text-[#242220]">{item.value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Success Rate */}
        <div className="bg-white rounded-[20px] p-6 shadow-sm text-center">
          <p className="text-[13px] font-bold text-[#242220]/40 uppercase tracking-[0.06em] mb-2">Chance of Success with GLP-1</p>
          <p className="text-[48px] font-extrabold text-[#2e936f] leading-none mb-1" style={{ fontFamily: "var(--font-heading)" }}>
            94.6%
          </p>
          <p className="text-[14px] font-bold text-[#2e936f] uppercase tracking-[0.08em]">VERY HIGH</p>
          <p className="text-[14px] text-[#242220]/50 font-medium mt-3">You have a <strong className="text-[#242220]">very high</strong> chance of success</p>
        </div>
      </Section>

      {/* ── PROGRESS TIMELINE ── */}
      <Section bg="white">
        <div className="flex items-center justify-between mb-4">
          {["Today", "12 Weeks", "6 Months"].map((label, i) => (
            <div key={label} className="flex flex-col items-center">
              <div className={`w-[40px] h-[40px] rounded-full flex items-center justify-center mb-2 ${
                i === 0 ? "bg-[#2e936f] text-white" : "bg-[#e4dcd8] text-[#242220]/40"
              }`}>
                <span className="font-bold text-[14px]">{i + 1}</span>
              </div>
              <p className="text-[12px] font-bold text-[#242220]/60">{label}</p>
            </div>
          ))}
        </div>
        <div className="h-[3px] bg-[#e4dcd8] rounded-full relative mb-6">
          <div className="absolute left-0 top-0 h-full w-[10%] bg-[#2e936f] rounded-full" />
        </div>
        <p className="text-center text-[14px] text-[#242220]/50 font-medium">Your personalized weight loss timeline</p>
      </Section>

      {/* ── GOALS ── */}
      <Section bg="#f5f0e8">
        <h2 className="text-[24px] md:text-[30px] font-extrabold tracking-[-0.02em] text-[#242220] text-center mb-6" style={{ fontFamily: "var(--font-accent)" }}>
          The goals <span className="text-[#2e936f]">you will accomplish</span> with your plan
        </h2>
        <div className="space-y-3">
          {["Lose 100 lbs", "Reset metabolic \"set point\"", "Look and feel healthier"].map((goal) => (
            <div key={goal} className="flex items-center gap-3 bg-white rounded-[14px] p-4 shadow-sm">
              <div className="w-[28px] h-[28px] rounded-full bg-[#2e936f] flex items-center justify-center flex-shrink-0">
                <Check color="white" size={13} />
              </div>
              <span className="text-[16px] font-semibold text-[#242220]">{goal}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── PLAN OVERVIEW ── */}
      <Section bg="white">
        <h2 className="text-[22px] md:text-[26px] font-extrabold tracking-[-0.02em] text-[#242220] text-center mb-6" style={{ fontFamily: "var(--font-accent)" }}>
          Your plan includes:
        </h2>
        <div className="space-y-3">
          {[
            "Prescription to fast, effective GLP-1 (medication cost included)",
            "1:1 Physician Guidance",
            "Weight Loss Guarantee + community and more!",
          ].map((item) => (
            <div key={item} className="flex items-start gap-3">
              <div className="w-[24px] h-[24px] rounded-full bg-[#2e936f] flex items-center justify-center flex-shrink-0 mt-0.5">
                <Check color="white" size={11} />
              </div>
              <span className="text-[15px] font-medium text-[#242220]/75">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── 5 STEPS ── */}
      <Section bg="#f5f0e8">
        <h2 className="text-[22px] md:text-[26px] font-extrabold tracking-[-0.02em] text-[#242220] text-center mb-8" style={{ fontFamily: "var(--font-accent)" }}>
          How it works
        </h2>
        <div className="space-y-5">
          {[
            { step: 1, title: "Physician Review", desc: "A licensed provider reviews your medical history and creates your plan." },
            { step: 2, title: "Fast Prescription Approval", desc: "Approved in less than 24 hours. No office visits required." },
            { step: 3, title: "Medication Shipping", desc: "You'll receive tracking within 2 business days. Free expedited shipping." },
            { step: 4, title: "Monthly Refills", desc: "Quick refill form each month. Your provider adjusts dosing as needed." },
            { step: 5, title: "Unlimited Support", desc: "24/7 access to our care team for questions and guidance." },
          ].map((s) => (
            <motion.div key={s.step} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
              className="flex gap-4 items-start"
            >
              <div className="w-[36px] h-[36px] rounded-full bg-[#c6a673] flex items-center justify-center flex-shrink-0">
                <span className="text-white font-bold text-[14px]">{s.step}</span>
              </div>
              <div>
                <h3 className="text-[16px] font-bold text-[#242220] mb-1">{s.title}</h3>
                <p className="text-[14px] text-[#242220]/50 font-medium leading-[1.6]">{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </Section>

      {/* ── URGENCY TIMER ── */}
      <div className="bg-[#242220] py-4 px-5 text-center">
        <p className="text-white/70 text-[14px] font-medium">
          Your approval is reserved for{" "}
          <span className="text-white font-extrabold text-[18px] ml-1 font-mono">{countdown}</span>
        </p>
      </div>

      {/* ── PRODUCT SELECTION ── */}
      <Section bg="white" className="!py-12 md:!py-16">
        <h2 className="text-[24px] md:text-[30px] font-extrabold tracking-[-0.02em] text-[#242220] text-center mb-2" style={{ fontFamily: "var(--font-accent)" }}>
          Choose your medication
        </h2>
        <p className="text-[14px] text-[#242220]/50 text-center mb-8 font-medium">Select the option that&rsquo;s right for you.</p>

        <div className="space-y-4">
          {/* Semaglutide Card */}
          <div
            onClick={() => setSelectedMed("semaglutide")}
            className={`relative rounded-[20px] border-2 p-6 cursor-pointer transition-all ${
              selectedMed === "semaglutide" ? "border-[#2e936f] bg-[#2e936f]/[0.02] shadow-md" : "border-black/[0.06] bg-white hover:border-[#2e936f]/30"
            }`}
          >
            <span className="absolute -top-3 left-5 px-3 py-0.5 rounded-full bg-[#2e936f] text-white text-[10px] font-bold uppercase tracking-[0.08em]">Most Popular</span>
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[20px] font-bold text-[#242220]">Semaglutide</h3>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-[#c6a673] text-[11px]">★</span>)}
                  <span className="text-[11px] text-[#242220]/35 font-medium ml-1">29.1k Reviews</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[28px] font-extrabold text-[#2e936f]" style={{ fontFamily: "var(--font-heading)" }}>
                  ${selectedMed === "semaglutide" ? (medForm === "injection" ? 149 : 249) : 149}
                </p>
                <p className="text-[13px] text-[#242220]/35 line-through font-medium">$299</p>
                <p className="text-[11px] text-[#2e936f] font-bold">Save ${selectedMed === "semaglutide" ? (medForm === "injection" ? 150 : 50) : 150}</p>
              </div>
            </div>

            {selectedMed === "semaglutide" && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.25 }}>
                {/* Form toggle */}
                <div className="flex gap-2 mb-5">
                  {(["injection", "tablets"] as const).map((f) => (
                    <button key={f} onClick={(e) => { e.stopPropagation(); setMedForm(f); }}
                      className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-bold uppercase tracking-[0.05em] transition-all ${
                        medForm === f ? "bg-[#2e936f] text-white" : "bg-[#f5f0e8] text-[#242220]/50 hover:bg-[#e4dcd8]"
                      }`}
                    >
                      {f}{f === "tablets" ? " (+$100)" : ""}
                    </button>
                  ))}
                </div>
                {/* Features */}
                <div className="space-y-2">
                  {["Same active ingredient as Ozempic\u00AE & Wegovy\u00AE", "Injection or tablet form", "Free shipping", "Board-certified clinicians", "24/7 doctor messaging"].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5">
                      <Check size={12} />
                      <span className="text-[13px] text-[#242220]/60 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>

          {/* Tirzepatide Card */}
          <div
            onClick={() => setSelectedMed("tirzepatide")}
            className={`relative rounded-[20px] border-2 p-6 cursor-pointer transition-all ${
              selectedMed === "tirzepatide" ? "border-[#2e936f] bg-[#2e936f]/[0.02] shadow-md" : "border-black/[0.06] bg-white hover:border-[#2e936f]/30"
            }`}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-[20px] font-bold text-[#242220]">Tirzepatide</h3>
                <div className="flex items-center gap-1 mt-1">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-[#c6a673] text-[11px]">★</span>)}
                  <span className="text-[11px] text-[#242220]/35 font-medium ml-1">15.6k Reviews</span>
                </div>
              </div>
              <div className="text-right">
                <p className="text-[28px] font-extrabold text-[#2e936f]" style={{ fontFamily: "var(--font-heading)" }}>
                  ${selectedMed === "tirzepatide" ? (medForm === "injection" ? 199 : 299) : 199}
                </p>
                <p className="text-[13px] text-[#242220]/35 line-through font-medium">$399</p>
                <p className="text-[11px] text-[#2e936f] font-bold">Save ${selectedMed === "tirzepatide" ? (medForm === "injection" ? 200 : 100) : 200}</p>
              </div>
            </div>

            {selectedMed === "tirzepatide" && (
              <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} transition={{ duration: 0.25 }}>
                <div className="flex gap-2 mb-5">
                  {(["injection", "tablets"] as const).map((f) => (
                    <button key={f} onClick={(e) => { e.stopPropagation(); setMedForm(f); }}
                      className={`flex-1 py-2.5 rounded-[10px] text-[13px] font-bold uppercase tracking-[0.05em] transition-all ${
                        medForm === f ? "bg-[#2e936f] text-white" : "bg-[#f5f0e8] text-[#242220]/50 hover:bg-[#e4dcd8]"
                      }`}
                    >
                      {f}{f === "tablets" ? " (+$100)" : ""}
                    </button>
                  ))}
                </div>
                <div className="space-y-2">
                  {["Same active ingredient as Mounjaro\u00AE & Zepbound\u00AE", "Easy injection", "Board-certified clinicians", "Same-day shipping capability", "24/7 doctor messaging"].map((feat) => (
                    <div key={feat} className="flex items-center gap-2.5">
                      <Check size={12} />
                      <span className="text-[13px] text-[#242220]/60 font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}
          </div>
        </div>

        <button onClick={scrollToForm}
          className="w-full mt-6 py-4 rounded-full bg-[#2e936f] text-white font-bold text-[16px] hover:bg-[#257a5c] transition-all hover:shadow-lg"
        >
          Continue — ${price}/first month
        </button>
        <p className="text-center text-[12px] text-[#242220]/35 mt-3 font-medium">
          Your approval is reserved for <span className="font-bold text-[#242220]/50">{countdown}</span>
        </p>
      </Section>

      {/* ── SOCIAL PROOF ── */}
      <Section bg="#f5f0e8">
        <h2 className="text-[22px] md:text-[26px] font-extrabold tracking-[-0.02em] text-[#242220] text-center mb-8" style={{ fontFamily: "var(--font-accent)" }}>
          The <span className="text-[#2e936f]">results</span> speak for themselves!
        </h2>
        <div className="space-y-4">
          {[
            { name: "Katie R.", avatar: "/images/avatars/avatar-katie.png", quote: "Trimora saved my life. I reached my goal weight in just 5 months. The support team was incredible.", lost: "5 months to goal" },
            { name: "Rachel G.", avatar: "/images/avatars/avatar-rachel.png", quote: "The world looks at me differently now. I lost 26 lbs in 3 months and I've never been happier.", lost: "Lost 26 lbs" },
            { name: "Shannon B.", avatar: "/images/avatars/avatar-shannon.png", quote: "I feel like myself again. I lost 45 lbs of baby weight and I have more energy than ever.", lost: "Lost 45 lbs" },
          ].map((r) => (
            <div key={r.name} className="bg-white rounded-[16px] p-5 shadow-sm">
              <div className="flex items-center gap-3 mb-3">
                <div className="relative w-[36px] h-[36px] rounded-full overflow-hidden flex-shrink-0">
                  <Image src={r.avatar} alt={r.name} fill className="object-cover" sizes="36px" />
                </div>
                <div>
                  <p className="text-[14px] font-bold text-[#242220]">{r.name}</p>
                  <p className="text-[11px] text-[#2e936f] font-bold">{r.lost}</p>
                </div>
                <div className="ml-auto flex gap-[1px]">
                  {[...Array(5)].map((_, i) => <span key={i} className="text-[#c6a673] text-[12px]">★</span>)}
                </div>
              </div>
              <p className="text-[14px] text-[#242220]/60 leading-[1.65] italic font-medium" style={{ fontFamily: "var(--font-accent)" }}>
                &ldquo;{r.quote}&rdquo;
              </p>
              <div className="flex items-center gap-1.5 mt-3">
                <Check size={11} color="#2e936f" />
                <span className="text-[11px] text-[#2e936f] font-bold">Verified Customer</span>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* ── STATS ── */}
      <Section bg="white">
        <div className="grid grid-cols-2 gap-4">
          {[
            { value: "18%", label: "Average reduction in body weight" },
            { value: "9/10", label: "Patients say most effective treatment" },
            { value: "6.5\"", label: "Average reduction in waist size" },
            { value: "93%", label: "Patients have kept weight off" },
          ].map((s) => (
            <div key={s.value} className="bg-[#f5f0e8] rounded-[16px] p-5 text-center">
              <p className="text-[28px] font-extrabold text-[#2e936f] mb-1" style={{ fontFamily: "var(--font-heading)" }}>{s.value}</p>
              <p className="text-[12px] text-[#242220]/45 font-medium leading-[1.4]">{s.label}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ── WHAT'S INCLUDED ── */}
      <Section bg="#f5f0e8">
        <h2 className="text-[22px] md:text-[26px] font-extrabold tracking-[-0.02em] text-[#242220] text-center mb-6" style={{ fontFamily: "var(--font-accent)" }}>
          What&rsquo;s included
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            "Access to GLP-1 medication (cost included)",
            "No insurance necessary",
            "Board-certified doctor review",
            "1:1 Physician guidance",
            "Custom metabolic report",
            "Sample meal plan based on metabolism",
            "Nutrition report",
          ].map((item) => (
            <div key={item} className="flex items-center gap-3 bg-white rounded-[12px] p-4 shadow-sm">
              <div className="w-[22px] h-[22px] rounded-full bg-[#2e936f] flex items-center justify-center flex-shrink-0">
                <Check color="white" size={10} />
              </div>
              <span className="text-[13px] font-semibold text-[#242220]/70">{item}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* ── GUARANTEE ── */}
      <Section bg="white">
        <div className="text-center">
          <div className="w-[56px] h-[56px] rounded-full bg-[#c6a673]/15 flex items-center justify-center mx-auto mb-4">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#c6a673" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
            </svg>
          </div>
          <p className="text-[12px] font-bold text-[#c6a673] uppercase tracking-[0.1em] mb-2">Weight Loss Guarantee</p>
          <p className="text-[15px] text-[#242220]/60 font-medium leading-[1.6] max-w-[480px] mx-auto">
            If you do not lose weight by the end of your complete program, you can request a refund. It is that simple!
          </p>
        </div>
      </Section>

      {/* ── CHECKOUT FORM ── */}
      <div ref={formRef}>
        <Section bg="#f5f0e8" className="!py-12 md:!py-16">
          <div className="bg-white rounded-[24px] p-6 md:p-8 shadow-md">
            <h2 className="text-[22px] font-extrabold tracking-[-0.02em] text-[#242220] mb-1 text-center" style={{ fontFamily: "var(--font-accent)" }}>
              Complete your order
            </h2>
            <p className="text-[14px] text-[#242220]/45 text-center mb-6 font-medium">
              {selectedMed === "semaglutide" ? "Semaglutide" : "Tirzepatide"} — {medForm} — <strong className="text-[#2e936f]">${price}/first month</strong>
            </p>

            <form onSubmit={handleCheckout} className="space-y-4">
              <div>
                <label className="block text-[12px] font-bold text-[#242220]/45 uppercase tracking-[0.05em] mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="w-full py-3.5 px-4 rounded-[10px] border border-black/[0.08] text-[15px] font-medium text-[#242220] focus:outline-none focus:border-[#2e936f] focus:ring-2 focus:ring-[#2e936f]/15 transition-all bg-[#faf9f7]"
                />
                <p className="text-[11px] text-[#242220]/40 mt-2 font-medium">
                  You&rsquo;ll enter your card and shipping details on the next secure step.
                </p>
              </div>

              {errorMsg && (
                <div className="rounded-[10px] bg-red-50 border border-red-100 p-3">
                  <p className="text-[13px] text-red-700 font-medium">{errorMsg}</p>
                </div>
              )}

              <button
                type="submit"
                disabled={loading || !email}
                className="w-full mt-2 py-4 rounded-full bg-[#2e936f] text-white font-bold text-[16px] uppercase tracking-[0.03em] hover:bg-[#257a5c] transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="8" />
                    </svg>
                    Redirecting…
                  </>
                ) : (
                  <>Continue to secure checkout — ${price}</>
                )}
              </button>
              <p className="text-center text-[11px] text-[#242220]/40 font-medium">
                Powered by Stripe &bull; Cancel anytime
              </p>
            </form>

            {/* Trust badges */}
            <div className="flex items-center justify-center gap-4 mt-5 pt-4 border-t border-black/[0.04]">
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#242220" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.3}>
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                <span className="text-[11px] text-[#242220]/30 font-medium">Encrypted</span>
              </div>
              <div className="flex items-center gap-1.5">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#242220" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity={0.3}>
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span className="text-[11px] text-[#242220]/30 font-medium">HIPAA Protected</span>
              </div>
              <span className="text-[11px] text-[#242220]/25 font-medium">Visa &bull; MC &bull; Amex</span>
            </div>
          </div>
        </Section>
      </div>

      {/* ── FAQ ── */}
      <Section bg="white">
        <h2 className="text-[20px] font-extrabold tracking-[-0.02em] text-[#242220] text-center mb-6" style={{ fontFamily: "var(--font-accent)" }}>
          Frequently Asked Questions
        </h2>
        <div className="space-y-2">
          {[
            { q: "What is the Trimora Prescription Plan?", a: "The Trimora plan gives you access to GLP-1 medications prescribed by licensed providers, along with ongoing physician guidance, 24/7 support, and our weight loss guarantee." },
            { q: "What is the cost of medication?", a: "Medication cost is included in your plan. Semaglutide starts at $149/month and Tirzepatide at $199/month for injection forms. No hidden fees." },
            { q: "Is it difficult to take the meds?", a: "Not at all. Injections are once per week with a simple pen device. Tablets are taken once daily. Both are easy and painless." },
            { q: "Are these medications FDA approved?", a: "The active ingredients (semaglutide and tirzepatide) are the same as in FDA-approved branded medications. Our compounded versions are produced in FDA-regulated pharmacies." },
          ].map((faq, i) => (
            <div key={i} className="bg-[#f5f0e8] rounded-[12px] overflow-hidden">
              <button onClick={() => setFaqOpen(faqOpen === i ? null : i)} className="w-full flex items-center justify-between p-4 text-left">
                <span className="text-[14px] font-bold text-[#242220] pr-3">{faq.q}</span>
                <motion.span animate={{ rotate: faqOpen === i ? 45 : 0 }} className="text-[20px] text-[#c6a673] flex-shrink-0 font-light">+</motion.span>
              </button>
              <AnimatePresence>
                {faqOpen === i && (
                  <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} transition={{ duration: 0.2 }} className="overflow-hidden">
                    <p className="px-4 pb-4 text-[13px] text-[#242220]/50 leading-[1.7] font-medium">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Section>

      {/* ── FOOTER DISCLAIMER ── */}
      <footer className="bg-[#f5f0e8] border-t border-black/[0.04] py-8 px-5">
        <div className="max-w-[680px] mx-auto">
          <p className="text-[11px] text-[#242220]/25 leading-[1.7] font-medium mb-3">
            Results may vary. Individual results depend on adherence to the program and clinician recommendations. Compounded GLP-1s are produced in FDA-regulated facilities but are not FDA-approved for safety, efficacy, or quality. Average weight loss with adherence is 1-2 lbs per week.
          </p>
          <p className="text-[11px] text-[#242220]/25 leading-[1.7] font-medium mb-4">
            Prescriptions are issued after an online consultation with an independent licensed provider. Trimora does not produce compounded medications.
          </p>
          <p className="text-[11px] text-[#242220]/20 font-medium">&copy; {new Date().getFullYear()} Trimora Health, Inc. All rights reserved.</p>
        </div>
      </footer>
    </main>
  );
}
