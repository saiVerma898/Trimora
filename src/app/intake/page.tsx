"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { trackEvent } from "@/lib/analytics";

interface StepProps {
  onNext: (data: Record<string, string>) => void;
  onBack?: () => void;
  formData: Record<string, string>;
}

/* ─── Step 1: Weight Loss Goal ─── */
function StepGoal({ onNext }: StepProps) {
  const goals = ["Losing 1-20 lbs", "Losing 21-50 lbs", "Losing 51+ lbs", "Not sure yet"];
  return (
    <div className="text-center">
      <h2 className="text-[24px] md:text-[30px] font-extrabold tracking-[-0.02em] text-[#242220] mb-2" style={{ fontFamily: "var(--font-accent)" }}>
        What&rsquo;s your weight loss goal?
      </h2>
      <p className="text-[15px] text-[#242220]/50 mb-8 font-medium">Select the option that best describes your goal.</p>
      <div className="space-y-3 max-w-[440px] mx-auto">
        {goals.map((goal) => (
          <button key={goal} onClick={() => onNext({ goal })}
            className="w-full py-4 px-6 rounded-[14px] bg-white border border-black/[0.06] text-[#242220] text-[16px] font-semibold text-left hover:border-[#2e936f] hover:bg-[#2e936f]/[0.03] transition-all shadow-sm"
          >
            {goal}
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Step 2: Gender ─── */
function StepGender({ onNext, onBack }: StepProps) {
  const options = ["Male", "Female", "Non-binary", "Prefer not to say"];
  return (
    <div className="text-center">
      <h2 className="text-[24px] md:text-[30px] font-extrabold tracking-[-0.02em] text-[#242220] mb-2" style={{ fontFamily: "var(--font-accent)" }}>
        What is your biological sex?
      </h2>
      <p className="text-[15px] text-[#242220]/50 mb-8 font-medium">This helps our providers create the right treatment plan.</p>
      <div className="space-y-3 max-w-[440px] mx-auto">
        {options.map((opt) => (
          <button key={opt} onClick={() => onNext({ gender: opt })}
            className="w-full py-4 px-6 rounded-[14px] bg-white border border-black/[0.06] text-[#242220] text-[16px] font-semibold text-left hover:border-[#2e936f] hover:bg-[#2e936f]/[0.03] transition-all shadow-sm"
          >
            {opt}
          </button>
        ))}
      </div>
      <button onClick={onBack} className="mt-6 text-[14px] text-[#242220]/40 font-medium hover:text-[#242220]/60 transition-colors">
        ← Back
      </button>
    </div>
  );
}

/* ─── Step 3: Age ─── */
function StepAge({ onNext, onBack }: StepProps) {
  const ranges = ["18-29", "30-39", "40-49", "50-59", "60+"];
  return (
    <div className="text-center">
      <h2 className="text-[24px] md:text-[30px] font-extrabold tracking-[-0.02em] text-[#242220] mb-2" style={{ fontFamily: "var(--font-accent)" }}>
        What is your age range?
      </h2>
      <p className="text-[15px] text-[#242220]/50 mb-8 font-medium">Age helps us determine the best treatment options.</p>
      <div className="space-y-3 max-w-[440px] mx-auto">
        {ranges.map((r) => (
          <button key={r} onClick={() => onNext({ age: r })}
            className="w-full py-4 px-6 rounded-[14px] bg-white border border-black/[0.06] text-[#242220] text-[16px] font-semibold text-left hover:border-[#2e936f] hover:bg-[#2e936f]/[0.03] transition-all shadow-sm"
          >
            {r}
          </button>
        ))}
      </div>
      <button onClick={onBack} className="mt-6 text-[14px] text-[#242220]/40 font-medium hover:text-[#242220]/60 transition-colors">
        ← Back
      </button>
    </div>
  );
}

/* ─── Step 4: Current Weight & Height ─── */
function StepBody({ onNext, onBack }: StepProps) {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  return (
    <div className="text-center">
      <h2 className="text-[24px] md:text-[30px] font-extrabold tracking-[-0.02em] text-[#242220] mb-2" style={{ fontFamily: "var(--font-accent)" }}>
        Tell us about yourself
      </h2>
      <p className="text-[15px] text-[#242220]/50 mb-8 font-medium">This helps calculate your BMI and personalize treatment.</p>
      <div className="max-w-[440px] mx-auto space-y-4">
        <div>
          <label className="block text-[13px] font-bold text-[#242220]/50 uppercase tracking-[0.06em] mb-2 text-left">Current Weight (lbs)</label>
          <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="e.g. 200"
            className="w-full py-4 px-5 rounded-[14px] bg-white border border-black/[0.08] text-[#242220] text-[16px] font-medium focus:outline-none focus:border-[#2e936f] focus:ring-2 focus:ring-[#2e936f]/20 transition-all"
          />
        </div>
        <div>
          <label className="block text-[13px] font-bold text-[#242220]/50 uppercase tracking-[0.06em] mb-2 text-left">Height</label>
          <select value={height} onChange={(e) => setHeight(e.target.value)}
            className="w-full py-4 px-5 rounded-[14px] bg-white border border-black/[0.08] text-[#242220] text-[16px] font-medium focus:outline-none focus:border-[#2e936f] focus:ring-2 focus:ring-[#2e936f]/20 transition-all appearance-none"
          >
            <option value="">Select height</option>
            {["4'10\"","4'11\"","5'0\"","5'1\"","5'2\"","5'3\"","5'4\"","5'5\"","5'6\"","5'7\"","5'8\"","5'9\"","5'10\"","5'11\"","6'0\"","6'1\"","6'2\"","6'3\"","6'4\"","6'5\"","6'6\""].map(h => (
              <option key={h} value={h}>{h}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => weight && height ? onNext({ weight, height }) : null}
          disabled={!weight || !height}
          className="w-full py-4 rounded-full bg-[#2e936f] text-white font-bold text-[15px] tracking-[-0.01em] hover:bg-[#257a5c] transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-4"
        >
          Continue
        </button>
      </div>
      <button onClick={onBack} className="mt-6 text-[14px] text-[#242220]/40 font-medium hover:text-[#242220]/60 transition-colors">
        ← Back
      </button>
    </div>
  );
}

/* ─── Step 5: Medical History ─── */
function StepMedical({ onNext, onBack }: StepProps) {
  const [conditions, setConditions] = useState<string[]>([]);
  const opts = ["Type 2 Diabetes", "High Blood Pressure", "Thyroid Disorder", "Heart Disease", "None of the above"];
  const toggle = (c: string) => {
    if (c === "None of the above") { setConditions(["None of the above"]); return; }
    setConditions(prev => prev.includes(c) ? prev.filter(x => x !== c) : [...prev.filter(x => x !== "None of the above"), c]);
  };
  return (
    <div className="text-center">
      <h2 className="text-[24px] md:text-[30px] font-extrabold tracking-[-0.02em] text-[#242220] mb-2" style={{ fontFamily: "var(--font-accent)" }}>
        Do you have any of these conditions?
      </h2>
      <p className="text-[15px] text-[#242220]/50 mb-8 font-medium">Select all that apply. This helps your provider assess eligibility.</p>
      <div className="space-y-3 max-w-[440px] mx-auto">
        {opts.map((opt) => (
          <button key={opt} onClick={() => toggle(opt)}
            className={`w-full py-4 px-6 rounded-[14px] border text-[16px] font-semibold text-left transition-all shadow-sm ${
              conditions.includes(opt)
                ? "bg-[#2e936f]/[0.08] border-[#2e936f] text-[#2e936f]"
                : "bg-white border-black/[0.06] text-[#242220] hover:border-[#2e936f]/40"
            }`}
          >
            <span className="flex items-center gap-3">
              <span className={`w-5 h-5 rounded border-2 flex items-center justify-center flex-shrink-0 ${
                conditions.includes(opt) ? "bg-[#2e936f] border-[#2e936f]" : "border-[#242220]/20"
              }`}>
                {conditions.includes(opt) && <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>}
              </span>
              {opt}
            </span>
          </button>
        ))}
        <button
          onClick={() => conditions.length > 0 ? onNext({ conditions: conditions.join(", ") }) : null}
          disabled={conditions.length === 0}
          className="w-full py-4 rounded-full bg-[#2e936f] text-white font-bold text-[15px] hover:bg-[#257a5c] transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-4"
        >
          Continue
        </button>
      </div>
      <button onClick={onBack} className="mt-6 text-[14px] text-[#242220]/40 font-medium hover:text-[#242220]/60 transition-colors">
        ← Back
      </button>
    </div>
  );
}

/* ─── Step 6: Contact Info ─── */
function StepContact({ onNext, onBack }: StepProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [state, setState] = useState("");
  const valid = name && email && phone && state;
  return (
    <div className="text-center">
      <h2 className="text-[24px] md:text-[30px] font-extrabold tracking-[-0.02em] text-[#242220] mb-2" style={{ fontFamily: "var(--font-accent)" }}>
        Almost there! Tell us how to reach you.
      </h2>
      <p className="text-[15px] text-[#242220]/50 mb-8 font-medium">A licensed provider will review your information.</p>
      <div className="max-w-[440px] mx-auto space-y-4">
        {[
          { label: "Full Name", value: name, set: setName, type: "text", placeholder: "Jane Smith" },
          { label: "Email Address", value: email, set: setEmail, type: "email", placeholder: "jane@example.com" },
          { label: "Phone Number", value: phone, set: setPhone, type: "tel", placeholder: "(555) 123-4567" },
        ].map((f) => (
          <div key={f.label}>
            <label className="block text-[13px] font-bold text-[#242220]/50 uppercase tracking-[0.06em] mb-2 text-left">{f.label}</label>
            <input type={f.type} value={f.value} onChange={(e) => f.set(e.target.value)} placeholder={f.placeholder}
              className="w-full py-4 px-5 rounded-[14px] bg-white border border-black/[0.08] text-[#242220] text-[16px] font-medium focus:outline-none focus:border-[#2e936f] focus:ring-2 focus:ring-[#2e936f]/20 transition-all"
            />
          </div>
        ))}
        <div>
          <label className="block text-[13px] font-bold text-[#242220]/50 uppercase tracking-[0.06em] mb-2 text-left">State</label>
          <select value={state} onChange={(e) => setState(e.target.value)}
            className="w-full py-4 px-5 rounded-[14px] bg-white border border-black/[0.08] text-[#242220] text-[16px] font-medium focus:outline-none focus:border-[#2e936f] focus:ring-2 focus:ring-[#2e936f]/20 transition-all appearance-none"
          >
            <option value="">Select state</option>
            {["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS","KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM","NY","NC","ND","OH","OK","OR","PA","RI","SC","SD","TN","TX","UT","VT","VA","WA","WV","WI","WY"].map(s => (
              <option key={s} value={s}>{s}</option>
            ))}
          </select>
        </div>
        <button
          onClick={() => valid ? onNext({ name, email, phone, state }) : null}
          disabled={!valid}
          className="w-full py-4 rounded-full bg-[#2e936f] text-white font-bold text-[15px] hover:bg-[#257a5c] transition-all disabled:opacity-40 disabled:cursor-not-allowed mt-4"
        >
          Submit My Application
        </button>
      </div>
      <button onClick={onBack} className="mt-6 text-[14px] text-[#242220]/40 font-medium hover:text-[#242220]/60 transition-colors">
        ← Back
      </button>
    </div>
  );
}

/* ─── Step 7: Success ─── */
function StepSuccess() {
  return (
    <div className="text-center">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", duration: 0.5 }}
        className="w-[80px] h-[80px] rounded-full bg-[#2e936f]/10 flex items-center justify-center mx-auto mb-6"
      >
        <svg width="36" height="36" viewBox="0 0 24 24" fill="none" stroke="#2e936f" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12" /></svg>
      </motion.div>
      <h2 className="text-[28px] md:text-[34px] font-extrabold tracking-[-0.02em] text-[#242220] mb-3" style={{ fontFamily: "var(--font-accent)" }}>
        You&rsquo;re all set!
      </h2>
      <p className="text-[16px] text-[#242220]/55 mb-6 font-medium leading-[1.6] max-w-[440px] mx-auto">
        A licensed Trimora provider will review your information within 24 hours. Check your email for next steps.
      </p>
      <div className="bg-white rounded-[16px] p-6 max-w-[440px] mx-auto shadow-sm mb-8">
        <p className="text-[14px] text-[#242220]/50 font-medium mb-4">What happens next:</p>
        {["Provider reviews your evaluation", "Personalized treatment plan created", "Medication shipped to your door"].map((s, i) => (
          <div key={i} className="flex items-center gap-3 mb-3 last:mb-0">
            <div className="w-[24px] h-[24px] rounded-full bg-[#2e936f] flex items-center justify-center flex-shrink-0">
              <span className="text-white text-[11px] font-bold">{i + 1}</span>
            </div>
            <span className="text-[14px] text-[#242220]/70 font-medium">{s}</span>
          </div>
        ))}
      </div>
      <a href="/" className="inline-block px-8 py-3.5 rounded-full bg-[#2e936f] text-white font-bold text-[15px] hover:bg-[#257a5c] transition-all">
        Back to Trimora
      </a>
    </div>
  );
}

/* ─── Main Intake Form Page ─── */
const STEPS = [StepGoal, StepGender, StepAge, StepBody, StepMedical, StepContact];
const TOTAL_STEPS = STEPS.length;

export default function IntakePage() {
  const [step, setStep] = useState(0);
  const [formData, setFormData] = useState<Record<string, string>>({});
  const [done, setDone] = useState(false);

  // Track intake start
  useEffect(() => {
    trackEvent("intake_started");
  }, []);

  // Track step views
  useEffect(() => {
    trackEvent("intake_step_viewed", { step: step + 1, total: TOTAL_STEPS });
  }, [step]);

  const handleNext = (data: Record<string, string>) => {
    const updated = { ...formData, ...data };
    setFormData(updated);
    trackEvent("intake_step_completed", { step: step + 1, fields: Object.keys(data) });
    if (step >= TOTAL_STEPS - 1) {
      trackEvent("intake_completed", { ...updated });
      window.location.href = "/intake/approved";
      return;
    } else {
      setStep(step + 1);
    }
  };
  const handleBack = () => {
    trackEvent("intake_step_back", { from_step: step + 1 });
    setStep(Math.max(0, step - 1));
  };

  const CurrentStep = done ? StepSuccess : STEPS[step];
  const progress = done ? 100 : ((step + 1) / TOTAL_STEPS) * 100;

  return (
    <main className="min-h-screen bg-[#f7f4f0]" style={{ fontFamily: "'Red Hat Text', 'Onest', sans-serif" }}>
      {/* Header */}
      <div className="bg-[#f7f4f0] border-b border-black/[0.04] py-3 px-6">
        <div className="max-w-[600px] mx-auto flex items-center justify-between">
          <span className="text-[18px] font-extrabold tracking-[-0.02em] text-[#242220]" style={{ fontFamily: "var(--font-heading)" }}>
            Trimora
          </span>
          <div className="flex items-center gap-1.5">
            {[...Array(5)].map((_, i) => <span key={i} className="text-[#c6a673] text-[12px]">★</span>)}
            <span className="text-[11px] text-[#242220]/40 font-bold ml-1">4.9/5</span>
          </div>
        </div>
      </div>

      {/* Progress bar */}
      <div className="h-[3px] bg-[#e4dcd8]">
        <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} className="h-full bg-[#2e936f]" />
      </div>

      {/* Form content */}
      <div className="max-w-[600px] mx-auto px-6 py-12 md:py-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={done ? "done" : step}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            <CurrentStep onNext={handleNext} onBack={handleBack} formData={formData} />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#f7f4f0]/90 backdrop-blur-lg border-t border-black/[0.04] py-3 px-6">
        <div className="max-w-[600px] mx-auto flex items-center justify-between">
          <p className="text-[11px] text-[#242220]/30 font-medium">HIPAA Compliant &bull; 256-bit Encryption</p>
          <p className="text-[11px] text-[#242220]/30 font-medium">&copy; {new Date().getFullYear()} Trimora Health</p>
        </div>
      </div>
    </main>
  );
}
