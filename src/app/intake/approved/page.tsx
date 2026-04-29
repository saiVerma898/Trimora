"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

/* ──────────────────────────────────────────────────────────
   DESIGN TOKENS
   ────────────────────────────────────────────────────────── */
const C = {
  bg: "#fafbfc",
  bgWarm: "#f7f4ee",
  card: "#ffffff",
  text: "#1a2e23",
  textMuted: "#65766c",
  textFaint: "#a3aea7",
  accent: "#2e936f",
  accentDark: "#206e52",
  accentLight: "#e8f4ee",
  gold: "#c6a673",
  goldLight: "#f3eadb",
  border: "#e7ecea",
  borderStrong: "#d4dcd7",
  rose: "#e87d6f",
};

/* ─────── Countdown Timer ─────── */
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

/* ─────── Icons ─────── */
const Check = ({ color = C.accent, size = 14, stroke = 3 }: { color?: string; size?: number; stroke?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

const Shield = ({ size = 16, color = C.accent }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

const Lock = ({ size = 16, color = C.textMuted }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
  </svg>
);

const Clock = ({ size = 14, color = "currentColor" }: { size?: number; color?: string }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

/* ─────── Animated success ring ─────── */
function SuccessRing({ value, size = 132 }: { value: number; size?: number }) {
  const r = size / 2 - 8;
  const c = 2 * Math.PI * r;
  return (
    <div className="relative" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle cx={size / 2} cy={size / 2} r={r} stroke={C.border} strokeWidth="6" fill="none" />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          stroke={C.accent}
          strokeWidth="6"
          fill="none"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={{ strokeDashoffset: c }}
          animate={{ strokeDashoffset: c - (c * value) / 100 }}
          transition={{ duration: 1.6, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <p className="text-[34px] font-extrabold leading-none" style={{ color: C.accent, fontFamily: "var(--font-heading)" }}>
          {value}%
        </p>
        <p className="text-[10px] font-bold uppercase tracking-[0.12em] mt-1.5" style={{ color: C.accent }}>
          Very High
        </p>
      </div>
    </div>
  );
}

/* ──────────────────────────────────────────────────────────
   MAIN PAGE
   ────────────────────────────────────────────────────────── */
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

  useEffect(() => { trackEvent("approved_page_viewed"); }, []);
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
      if (!res.ok || !data.url) throw new Error(data.error || "Could not create checkout session");
      window.location.href = data.url;
    } catch (err) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setErrorMsg(message);
      trackEvent("checkout_error", { error: message });
      setLoading(false);
    }
  };

  return (
    <main style={{ background: C.bg, color: C.text, fontFamily: "'Lora', Georgia, serif" }}>

      {/* ═══ STICKY HEADER ═══ */}
      <header className="sticky top-0 z-40 backdrop-blur-xl bg-white/85 border-b" style={{ borderColor: C.border }}>
        <div className="max-w-[680px] mx-auto px-5 h-[56px] flex items-center justify-between">
          <span className="text-[22px] font-bold tracking-[-0.02em]" style={{ color: C.text }}>
            Trimora
          </span>
          <div className="flex items-center gap-2">
            <Shield size={14} color={C.accent} />
            <span className="text-[11px] font-semibold" style={{ color: C.textMuted, fontFamily: "'Onest', sans-serif" }}>
              HIPAA Protected
            </span>
          </div>
        </div>
      </header>

      {/* ═══ APPROVAL HERO ═══ */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{
          background: `radial-gradient(ellipse 80% 60% at 50% 0%, ${C.accentLight} 0%, transparent 60%)`
        }} />
        <div className="relative max-w-[680px] mx-auto px-5 pt-12 pb-10 text-center">
          {/* Approved chip */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-7"
            style={{ background: C.accent, color: "white" }}
          >
            <Check color="white" size={13} stroke={3.5} />
            <span className="text-[11px] font-bold uppercase tracking-[0.14em]" style={{ fontFamily: "'Onest', sans-serif" }}>
              Pre-Approved
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-[30px] sm:text-[38px] md:text-[44px] leading-[1.08] tracking-[-0.02em] font-semibold mb-3"
          >
            Your GLP-1 plan is{" "}
            <span style={{ color: C.accent, fontStyle: "italic" }}>ready</span>.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-[15px] md:text-[17px] font-light max-w-[460px] mx-auto"
            style={{ color: C.textMuted }}
          >
            Based on your responses, you&rsquo;re an excellent candidate for medical weight loss with Trimora.
          </motion.p>
        </div>
      </section>

      {/* ═══ SUCCESS METRIC + PROFILE ═══ */}
      <section className="max-w-[680px] mx-auto px-5 pb-10">
        <div className="rounded-[20px] overflow-hidden" style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: "0 1px 3px rgba(0,0,0,0.02)" }}>
          {/* Success ring */}
          <div className="px-6 py-8 text-center" style={{ background: `linear-gradient(180deg, ${C.accentLight}40 0%, transparent 100%)` }}>
            <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-5" style={{ color: C.textMuted, fontFamily: "'Onest', sans-serif" }}>
              Treatment Success Probability
            </p>
            <div className="flex justify-center mb-4">
              <SuccessRing value={94} size={132} />
            </div>
            <p className="text-[14px] font-light" style={{ color: C.textMuted }}>
              Based on patients with similar profiles
            </p>
          </div>

          {/* Profile grid */}
          <div className="border-t grid grid-cols-2 sm:grid-cols-4" style={{ borderColor: C.border }}>
            {[
              { label: "Current", value: "245", unit: "lbs" },
              { label: "Goal", value: "165", unit: "lbs" },
              { label: "BMI", value: "31.6", unit: "" },
              { label: "To lose", value: "80", unit: "lbs" },
            ].map((item, i) => (
              <div
                key={item.label}
                className="text-center py-5 px-2"
                style={{
                  borderRight: i < 3 ? `1px solid ${C.border}` : "none",
                  borderBottom: i < 2 ? `1px solid ${C.border}` : "none",
                }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] mb-1.5" style={{ color: C.textFaint, fontFamily: "'Onest', sans-serif" }}>
                  {item.label}
                </p>
                <p className="text-[22px] font-bold leading-none" style={{ color: C.text, fontFamily: "var(--font-heading)" }}>
                  {item.value}
                  {item.unit && (
                    <span className="text-[12px] font-medium ml-1" style={{ color: C.textMuted }}>{item.unit}</span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ JOURNEY TIMELINE ═══ */}
      <section className="max-w-[680px] mx-auto px-5 pb-12">
        <h2 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.01em] text-center mb-7">
          Your <span style={{ color: C.accent, fontStyle: "italic" }}>6-month</span> projection
        </h2>
        <div className="rounded-[20px] p-6 md:p-7" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <div className="relative">
            {/* Connecting line */}
            <div className="absolute top-[18px] left-[18px] right-[18px] h-[2px]" style={{ background: C.border }} />
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: "10%" }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="absolute top-[18px] left-[18px] h-[2px]"
              style={{ background: C.accent }}
            />
            <div className="relative grid grid-cols-3">
              {[
                { label: "Today", weight: "245", note: "Starting" },
                { label: "12 Weeks", weight: "215", note: "−30 lbs" },
                { label: "6 Months", weight: "165", note: "Goal weight" },
              ].map((m, i) => (
                <div key={m.label} className="flex flex-col items-center text-center">
                  <div
                    className="w-[36px] h-[36px] rounded-full flex items-center justify-center mb-3"
                    style={{
                      background: i === 0 ? C.accent : C.card,
                      border: `2px solid ${i === 0 ? C.accent : C.borderStrong}`,
                      color: i === 0 ? "white" : C.textFaint,
                    }}
                  >
                    {i === 0 ? <Check color="white" size={14} stroke={3.5} /> : <span className="text-[12px] font-bold">{i + 1}</span>}
                  </div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.1em] mb-1" style={{ color: C.textMuted, fontFamily: "'Onest', sans-serif" }}>
                    {m.label}
                  </p>
                  <p className="text-[18px] font-bold" style={{ color: C.text, fontFamily: "var(--font-heading)" }}>
                    {m.weight}
                    <span className="text-[11px] font-medium ml-0.5" style={{ color: C.textFaint }}>lbs</span>
                  </p>
                  <p className="text-[10px] font-medium mt-1" style={{ color: i === 0 ? C.accent : C.textFaint, fontFamily: "'Onest', sans-serif" }}>
                    {m.note}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══ WHAT'S INCLUDED ═══ */}
      <section className="max-w-[680px] mx-auto px-5 pb-12">
        <h2 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.01em] text-center mb-2">
          Everything <span style={{ color: C.accent, fontStyle: "italic" }}>included</span>
        </h2>
        <p className="text-[14px] text-center mb-7 font-light" style={{ color: C.textMuted }}>
          No memberships, no hidden fees.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: "💊", title: "GLP-1 medication", desc: "Cost included in plan" },
            { icon: "👨‍⚕️", title: "1:1 physician care", desc: "Board-certified clinicians" },
            { icon: "🚚", title: "Free shipping", desc: "Discreet, expedited" },
            { icon: "🛡️", title: "Money-back guarantee", desc: "If it doesn't work" },
            { icon: "💬", title: "24/7 support", desc: "Real humans, anytime" },
            { icon: "📊", title: "Personalized plan", desc: "Adjusted to your body" },
          ].map((item) => (
            <div
              key={item.title}
              className="flex items-center gap-3.5 p-4 rounded-[14px]"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
            >
              <div
                className="flex-shrink-0 w-[40px] h-[40px] rounded-[10px] flex items-center justify-center text-[20px]"
                style={{ background: C.accentLight }}
              >
                {item.icon}
              </div>
              <div className="min-w-0">
                <p className="text-[14px] font-semibold leading-tight" style={{ color: C.text, fontFamily: "'Onest', sans-serif" }}>
                  {item.title}
                </p>
                <p className="text-[12px] font-light mt-0.5" style={{ color: C.textMuted, fontFamily: "'Onest', sans-serif" }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ HOW IT WORKS ═══ */}
      <section className="max-w-[680px] mx-auto px-5 pb-12">
        <h2 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.01em] text-center mb-7">
          How it <span style={{ color: C.accent, fontStyle: "italic" }}>works</span>
        </h2>
        <div className="rounded-[20px] p-6 md:p-7 relative" style={{ background: C.card, border: `1px solid ${C.border}` }}>
          <div className="absolute left-[2.4rem] top-[3rem] bottom-[3rem] w-[2px]" style={{ background: C.border }} />
          <div className="space-y-5 relative">
            {[
              { title: "Provider review", desc: "A licensed clinician reviews your medical history within 24 hours." },
              { title: "Prescription approval", desc: "If approved, your personalized treatment plan is created." },
              { title: "Medication shipped", desc: "Tracking arrives within 2 business days. Always free." },
              { title: "Monthly refills", desc: "Quick check-in form each month. Provider adjusts as needed." },
              { title: "Unlimited support", desc: "24/7 access to our care team for any question." },
            ].map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, x: -8 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
                className="flex gap-4 items-start relative"
              >
                <div
                  className="w-[36px] h-[36px] rounded-full flex items-center justify-center flex-shrink-0 relative z-10"
                  style={{
                    background: C.card,
                    border: `2px solid ${C.accent}`,
                    color: C.accent,
                  }}
                >
                  <span className="text-[13px] font-bold" style={{ fontFamily: "'Onest', sans-serif" }}>{i + 1}</span>
                </div>
                <div className="flex-1 pt-1">
                  <p className="text-[15px] font-semibold mb-0.5" style={{ color: C.text, fontFamily: "'Onest', sans-serif" }}>
                    {s.title}
                  </p>
                  <p className="text-[13px] font-light leading-[1.55]" style={{ color: C.textMuted, fontFamily: "'Onest', sans-serif" }}>
                    {s.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ URGENCY BANNER ═══ */}
      <section className="max-w-[680px] mx-auto px-5 pb-6">
        <div
          className="flex items-center justify-between gap-3 px-5 py-3.5 rounded-full"
          style={{ background: C.text, color: "white" }}
        >
          <div className="flex items-center gap-2.5">
            <Clock size={14} color="white" />
            <span className="text-[12px] md:text-[13px] font-medium" style={{ fontFamily: "'Onest', sans-serif" }}>
              Your approval is reserved for
            </span>
          </div>
          <span className="text-[15px] md:text-[16px] font-bold tabular-nums" style={{ fontFamily: "var(--font-heading)" }}>
            {countdown}
          </span>
        </div>
      </section>

      {/* ═══ MEDICATION SELECTION ═══ */}
      <section className="max-w-[680px] mx-auto px-5 pb-12">
        <h2 className="text-[22px] md:text-[28px] font-semibold tracking-[-0.01em] text-center mb-2">
          Choose your <span style={{ color: C.accent, fontStyle: "italic" }}>medication</span>
        </h2>
        <p className="text-[14px] text-center mb-7 font-light" style={{ color: C.textMuted }}>
          Both options are clinically proven and FDA-regulated.
        </p>

        <div className="space-y-4">
          {([
            {
              key: "semaglutide" as const,
              name: "Semaglutide",
              tagline: "Proven, effective, more affordable",
              tag: "Most Popular",
              tagBg: C.accent,
              priceInjection: 149,
              priceTablets: 249,
              originalPrice: 299,
              reviews: "29,100",
              features: ["Same active ingredient as branded GLP-1", "Once-weekly injection", "Free shipping", "Board-certified clinicians", "24/7 doctor messaging"],
            },
            {
              key: "tirzepatide" as const,
              name: "Tirzepatide",
              tagline: "Faster results, dual-action",
              tag: "Fastest Results",
              tagBg: C.gold,
              priceInjection: 199,
              priceTablets: 299,
              originalPrice: 399,
              reviews: "15,600",
              features: ["Dual GLP-1 + GIP receptor agonist", "Once-weekly injection", "Free shipping", "Board-certified clinicians", "24/7 doctor messaging"],
            },
          ]).map((p) => {
            const selected = selectedMed === p.key;
            const currentPrice = medForm === "injection" ? p.priceInjection : p.priceTablets;
            const save = p.originalPrice - currentPrice;
            return (
              <motion.div
                key={p.key}
                onClick={() => setSelectedMed(p.key)}
                whileTap={{ scale: 0.995 }}
                className="relative rounded-[18px] cursor-pointer transition-all overflow-hidden"
                style={{
                  background: C.card,
                  border: `2px solid ${selected ? C.accent : C.border}`,
                  boxShadow: selected ? `0 8px 24px -8px ${C.accent}30` : "0 1px 2px rgba(0,0,0,0.02)",
                }}
              >
                {/* Tag */}
                <span
                  className="absolute top-0 right-5 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.1em] text-white rounded-b-md"
                  style={{ background: p.tagBg, fontFamily: "'Onest', sans-serif" }}
                >
                  {p.tag}
                </span>

                <div className="p-5 md:p-6">
                  {/* Top: name + price */}
                  <div className="flex items-start gap-4 mb-4">
                    <div
                      className="flex-shrink-0 w-[18px] h-[18px] rounded-full mt-1.5"
                      style={{
                        border: `2px solid ${selected ? C.accent : C.borderStrong}`,
                        background: selected ? C.accent : "transparent",
                        boxShadow: selected ? "inset 0 0 0 3px white" : "none",
                      }}
                    />
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[20px] font-bold leading-tight" style={{ color: C.text }}>{p.name}</h3>
                      <p className="text-[13px] font-light mt-0.5" style={{ color: C.textMuted, fontFamily: "'Onest', sans-serif" }}>
                        {p.tagline}
                      </p>
                      <div className="flex items-center gap-1.5 mt-1.5">
                        <div className="flex gap-[1px]">
                          {[...Array(5)].map((_, i) => <span key={i} className="text-[11px]" style={{ color: C.gold }}>★</span>)}
                        </div>
                        <span className="text-[11px] font-medium" style={{ color: C.textFaint, fontFamily: "'Onest', sans-serif" }}>
                          {p.reviews} reviews
                        </span>
                      </div>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-[28px] md:text-[32px] font-extrabold leading-none" style={{ color: C.accent, fontFamily: "var(--font-heading)" }}>
                        ${currentPrice}
                      </p>
                      <p className="text-[12px] font-medium line-through mt-1" style={{ color: C.textFaint, fontFamily: "'Onest', sans-serif" }}>
                        ${p.originalPrice}
                      </p>
                      <p className="text-[10px] font-bold uppercase mt-0.5" style={{ color: C.accent, fontFamily: "'Onest', sans-serif" }}>
                        Save ${save}
                      </p>
                    </div>
                  </div>

                  {/* Expanded details */}
                  <AnimatePresence initial={false}>
                    {selected && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="pt-4 mt-1 border-t" style={{ borderColor: C.border }}>
                          {/* Form toggle */}
                          <div
                            className="flex p-1 rounded-[12px] mb-5"
                            style={{ background: C.bgWarm }}
                          >
                            {(["injection", "tablets"] as const).map((f) => (
                              <button
                                key={f}
                                onClick={(e) => { e.stopPropagation(); setMedForm(f); }}
                                className="flex-1 py-2.5 text-[12px] font-bold uppercase tracking-[0.06em] rounded-[8px] transition-all"
                                style={{
                                  background: medForm === f ? "white" : "transparent",
                                  color: medForm === f ? C.text : C.textMuted,
                                  boxShadow: medForm === f ? "0 1px 3px rgba(0,0,0,0.08)" : "none",
                                  fontFamily: "'Onest', sans-serif",
                                }}
                              >
                                {f}{f === "tablets" ? " +$100" : ""}
                              </button>
                            ))}
                          </div>
                          <ul className="space-y-2">
                            {p.features.map((f) => (
                              <li key={f} className="flex items-center gap-2.5">
                                <div className="w-[18px] h-[18px] rounded-full flex items-center justify-center flex-shrink-0" style={{ background: C.accentLight }}>
                                  <Check color={C.accent} size={10} stroke={3.5} />
                                </div>
                                <span className="text-[13px] font-medium" style={{ color: C.textMuted, fontFamily: "'Onest', sans-serif" }}>{f}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>

        <button
          onClick={scrollToForm}
          className="w-full mt-6 py-[15px] rounded-full text-[15px] font-bold transition-all hover:shadow-lg flex items-center justify-center gap-2"
          style={{
            background: C.accent,
            color: "white",
            fontFamily: "'Onest', sans-serif",
            boxShadow: `0 6px 20px -4px ${C.accent}40`,
          }}
        >
          Continue with {selectedMed === "semaglutide" ? "Semaglutide" : "Tirzepatide"} — ${price}/mo
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12" />
            <polyline points="12 5 19 12 12 19" />
          </svg>
        </button>
      </section>

      {/* ═══ TESTIMONIALS ═══ */}
      <section className="py-12 md:py-16" style={{ background: `linear-gradient(180deg, ${C.bg} 0%, ${C.bgWarm} 100%)` }}>
        <div className="max-w-[680px] mx-auto px-5">
          <h2 className="text-[22px] md:text-[28px] font-semibold tracking-[-0.01em] text-center mb-2">
            Real <span style={{ color: C.accent, fontStyle: "italic" }}>results</span>, real people
          </h2>
          <p className="text-[14px] text-center mb-8 font-light" style={{ color: C.textMuted }}>
            Stories from verified Trimora patients.
          </p>
          <div className="space-y-4">
            {[
              { name: "Katie R.", avatar: "/images/avatars/avatar-katie.png", quote: "Trimora saved my life. I reached my goal weight in just 5 months and the support was incredible.", lost: "Lost 38 lbs in 5 months" },
              { name: "Rachel G.", avatar: "/images/avatars/avatar-rachel.png", quote: "The world looks at me differently now. I lost 26 lbs in 3 months and have never been happier.", lost: "Lost 26 lbs" },
              { name: "Shannon B.", avatar: "/images/avatars/avatar-shannon.png", quote: "I feel like myself again after losing 45 lbs of baby weight. The energy I have now is unreal.", lost: "Lost 45 lbs" },
            ].map((r) => (
              <div
                key={r.name}
                className="flex gap-4 p-5 rounded-[16px]"
                style={{ background: C.card, border: `1px solid ${C.border}` }}
              >
                <img
                  src={r.avatar}
                  alt={r.name}
                  className="w-[44px] h-[44px] rounded-full object-cover flex-shrink-0"
                  style={{ border: `2px solid ${C.accentLight}` }}
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-[14px] font-bold" style={{ color: C.text }}>{r.name}</p>
                    <div className="flex gap-[1px]">
                      {[...Array(5)].map((_, i) => <span key={i} className="text-[11px]" style={{ color: C.gold }}>★</span>)}
                    </div>
                  </div>
                  <p className="text-[12px] font-bold mb-2" style={{ color: C.accent, fontFamily: "'Onest', sans-serif" }}>
                    {r.lost}
                  </p>
                  <p className="text-[14px] font-light leading-[1.55] italic" style={{ color: C.textMuted }}>
                    &ldquo;{r.quote}&rdquo;
                  </p>
                  <div className="flex items-center gap-1.5 mt-3">
                    <Check size={10} color={C.accent} stroke={3.5} />
                    <span className="text-[11px] font-bold" style={{ color: C.accent, fontFamily: "'Onest', sans-serif" }}>
                      Verified Customer
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ STATS ═══ */}
      <section className="max-w-[680px] mx-auto px-5 py-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { value: "18%", label: "Avg body weight loss" },
            { value: "9/10", label: "Most effective rated" },
            { value: "6.5\"", label: "Avg waist reduction" },
            { value: "93%", label: "Maintained results" },
          ].map((s, i) => (
            <motion.div
              key={s.value}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="text-center py-6 px-3 rounded-[16px]"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
            >
              <p className="text-[28px] md:text-[32px] font-extrabold leading-none mb-2" style={{ color: C.accent, fontFamily: "var(--font-heading)" }}>
                {s.value}
              </p>
              <p className="text-[11px] font-medium leading-[1.4]" style={{ color: C.textMuted, fontFamily: "'Onest', sans-serif" }}>
                {s.label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ═══ GUARANTEE ═══ */}
      <section className="max-w-[680px] mx-auto px-5 pb-12">
        <div
          className="rounded-[20px] p-7 md:p-9 text-center relative overflow-hidden"
          style={{ background: C.goldLight, border: `1px solid ${C.gold}30` }}
        >
          <div
            className="w-[60px] h-[60px] rounded-full flex items-center justify-center mx-auto mb-4"
            style={{ background: "white", border: `2px solid ${C.gold}` }}
          >
            <Shield size={26} color={C.gold} />
          </div>
          <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: C.gold, fontFamily: "'Onest', sans-serif" }}>
            Trimora Guarantee
          </p>
          <h3 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.01em] mb-3" style={{ color: C.text }}>
            The only thing you&rsquo;ll lose is the weight.
          </h3>
          <p className="text-[14px] font-light max-w-[440px] mx-auto" style={{ color: C.textMuted }}>
            If you don&rsquo;t lose weight by the end of your complete program, request a refund. No questions, no hassle.
          </p>
        </div>
      </section>

      {/* ═══ CHECKOUT FORM ═══ */}
      <div ref={formRef}>
        <section className="py-12 md:py-16" style={{ background: C.bgWarm }}>
          <div className="max-w-[520px] mx-auto px-5">
            <div
              className="rounded-[20px] p-6 md:p-8"
              style={{ background: C.card, border: `1px solid ${C.border}`, boxShadow: "0 8px 32px -12px rgba(0,0,0,0.08)" }}
            >
              <div className="text-center mb-6">
                <p className="text-[10px] font-bold uppercase tracking-[0.16em] mb-2" style={{ color: C.accent, fontFamily: "'Onest', sans-serif" }}>
                  Final Step
                </p>
                <h2 className="text-[22px] md:text-[26px] font-semibold tracking-[-0.01em]" style={{ color: C.text }}>
                  Complete your order
                </h2>
              </div>

              {/* Order summary */}
              <div
                className="flex items-center justify-between p-4 rounded-[12px] mb-5"
                style={{ background: C.bgWarm, border: `1px solid ${C.border}` }}
              >
                <div>
                  <p className="text-[13px] font-bold" style={{ color: C.text, fontFamily: "'Onest', sans-serif" }}>
                    {selectedMed === "semaglutide" ? "Semaglutide" : "Tirzepatide"}
                  </p>
                  <p className="text-[11px] font-medium uppercase tracking-[0.06em]" style={{ color: C.textMuted, fontFamily: "'Onest', sans-serif" }}>
                    {medForm} · First month
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-[24px] font-extrabold leading-none" style={{ color: C.accent, fontFamily: "var(--font-heading)" }}>
                    ${price}
                  </p>
                  <p className="text-[10px] font-bold uppercase mt-0.5" style={{ color: C.accent, fontFamily: "'Onest', sans-serif" }}>
                    Save ${savings}
                  </p>
                </div>
              </div>

              <form onSubmit={handleCheckout} className="space-y-4">
                <div>
                  <label
                    className="block text-[11px] font-bold uppercase tracking-[0.08em] mb-2"
                    style={{ color: C.textMuted, fontFamily: "'Onest', sans-serif" }}
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full py-[14px] px-4 rounded-[10px] text-[15px] font-medium focus:outline-none transition-all"
                    style={{
                      background: C.bg,
                      border: `1px solid ${C.borderStrong}`,
                      color: C.text,
                      fontFamily: "'Onest', sans-serif",
                    }}
                    onFocus={(e) => (e.currentTarget.style.borderColor = C.accent)}
                    onBlur={(e) => (e.currentTarget.style.borderColor = C.borderStrong)}
                  />
                </div>

                {errorMsg && (
                  <div
                    className="p-3 rounded-[10px] text-[13px] font-medium"
                    style={{ background: "#fef2f2", border: "1px solid #fecaca", color: "#b91c1c", fontFamily: "'Onest', sans-serif" }}
                  >
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading || !email}
                  className="w-full py-[16px] rounded-full text-[15px] font-bold transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{
                    background: C.accent,
                    color: "white",
                    fontFamily: "'Onest', sans-serif",
                    boxShadow: `0 6px 20px -4px ${C.accent}40`,
                  }}
                >
                  {loading ? (
                    <>
                      <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none">
                        <circle cx="12" cy="12" r="10" stroke="white" strokeWidth="3" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="8" />
                      </svg>
                      Redirecting…
                    </>
                  ) : (
                    <>
                      Continue to secure payment
                      <Lock size={14} color="white" />
                    </>
                  )}
                </button>

                <div className="flex items-center justify-center gap-4 pt-3">
                  <div className="flex items-center gap-1.5">
                    <Lock size={12} color={C.textFaint} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: C.textFaint, fontFamily: "'Onest', sans-serif" }}>
                      256-bit SSL
                    </span>
                  </div>
                  <div className="w-px h-3" style={{ background: C.border }} />
                  <div className="flex items-center gap-1.5">
                    <Shield size={12} color={C.textFaint} />
                    <span className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: C.textFaint, fontFamily: "'Onest', sans-serif" }}>
                      HIPAA
                    </span>
                  </div>
                  <div className="w-px h-3" style={{ background: C.border }} />
                  <span className="text-[10px] font-bold uppercase tracking-[0.08em]" style={{ color: C.textFaint, fontFamily: "'Onest', sans-serif" }}>
                    Stripe
                  </span>
                </div>
              </form>
            </div>
          </div>
        </section>
      </div>

      {/* ═══ FAQ ═══ */}
      <section className="max-w-[680px] mx-auto px-5 py-12">
        <h2 className="text-[20px] md:text-[24px] font-semibold tracking-[-0.01em] text-center mb-7">
          Common <span style={{ color: C.accent, fontStyle: "italic" }}>questions</span>
        </h2>
        <div className="space-y-2">
          {[
            { q: "How does the Trimora plan work?", a: "Once approved, you'll receive your personalized GLP-1 medication monthly with ongoing physician guidance, 24/7 support, and our weight loss guarantee — all included." },
            { q: "What's included in the price?", a: "Everything. Medication cost is included in your monthly plan. Semaglutide starts at $149/month and Tirzepatide at $199/month for injection forms. Free shipping always." },
            { q: "Are the medications safe?", a: "Yes. The active ingredients are the same as in FDA-approved branded medications, produced in FDA-regulated pharmacies, and prescribed only after medical review." },
            { q: "What if I want to cancel?", a: "Cancel anytime — no contracts, no commitments. We also offer a money-back guarantee if the program doesn't work for you." },
          ].map((faq, i) => (
            <div
              key={i}
              className="rounded-[14px] overflow-hidden"
              style={{ background: C.card, border: `1px solid ${C.border}` }}
            >
              <button
                onClick={() => setFaqOpen(faqOpen === i ? null : i)}
                className="w-full flex items-center justify-between p-5 text-left"
              >
                <span className="text-[14px] md:text-[15px] font-semibold pr-3" style={{ color: C.text, fontFamily: "'Onest', sans-serif" }}>
                  {faq.q}
                </span>
                <motion.span
                  animate={{ rotate: faqOpen === i ? 45 : 0 }}
                  className="text-[20px] flex-shrink-0 leading-none font-light"
                  style={{ color: C.accent }}
                >
                  +
                </motion.span>
              </button>
              <AnimatePresence>
                {faqOpen === i && (
                  <motion.div
                    initial={{ height: 0 }}
                    animate={{ height: "auto" }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <p className="px-5 pb-5 text-[13px] md:text-[14px] font-light leading-[1.65]" style={{ color: C.textMuted, fontFamily: "'Onest', sans-serif" }}>
                      {faq.a}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </section>

      {/* ═══ FOOTER ═══ */}
      <footer className="py-10 px-5 border-t" style={{ background: C.card, borderColor: C.border }}>
        <div className="max-w-[680px] mx-auto text-center">
          <p className="text-[10px] font-light leading-[1.7] mb-3 max-w-[600px] mx-auto" style={{ color: C.textFaint, fontFamily: "'Onest', sans-serif" }}>
            Compounded medications are produced in FDA-regulated facilities but are not FDA-approved for safety, efficacy, or quality. Individual results may vary. Average weight loss with adherence is 1-2 lbs per week.
          </p>
          <p className="text-[10px] font-light mb-4" style={{ color: C.textFaint, fontFamily: "'Onest', sans-serif" }}>
            Prescriptions are issued only after an online consultation with a licensed provider.
          </p>
          <p className="text-[10px] font-medium" style={{ color: C.textFaint, fontFamily: "'Onest', sans-serif" }}>
            &copy; {new Date().getFullYear()} Trimora Health, Inc.
          </p>
        </div>
      </footer>
    </main>
  );
}
